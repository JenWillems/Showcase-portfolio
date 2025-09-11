import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { ThreeBandToonMaterial } from '../materials/ThreeBandToonMaterial'
import omgImage from '../assets/omg.png'

/**
 * createGradientTexture
 * Small 1D grayscale texture for MeshToonMaterial.gradientMap to produce
 * stepped, cel-like shading.
 */
function createGradientTexture(steps = 3) {
	const size = 256
	const data = new Uint8Array(3 * size)
	for (let i = 0; i < size; i++) {
		const t = Math.floor((i / size) * steps) / (steps - 1)
		const c = Math.round(t * 255)
		data[i * 3] = c
		data[i * 3 + 1] = c
		data[i * 3 + 2] = c
	}
	const texture = new THREE.DataTexture(data, size, 1, THREE.RGBFormat)
	texture.needsUpdate = true
	texture.minFilter = THREE.NearestFilter
	texture.magFilter = THREE.NearestFilter
	texture.generateMipmaps = false
	return texture
}

/**
 * Keyboard
 * Renders a grid of white toon keys on top of a keyboard plate.
 */
function Keyboard({ gradientMap, keyColor = '#ffffff', rows = 5, cols = 14 }) {
	const layout = useMemo(() => {
		const keySize = 0.12
		const gap = 0.02
		const width = cols * keySize + (cols - 1) * gap
		const depth = rows * keySize + (rows - 1) * gap
		const startX = -width / 2
		const startZ = -depth / 2
		const positions = []
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				positions.push([
					startX + c * (keySize + gap),
					0,
					startZ + r * (keySize + gap),
				])
			}
		}
		return { positions, keySize }
	}, [rows, cols])

	return (
		<group position={[0, 0.13, -0.2]}>
			{layout.positions.map((p, i) => (
				<mesh key={i} position={[p[0], 0, p[2]]} castShadow>
					<boxGeometry args={[layout.keySize, 0.02, layout.keySize]} />
					<threeBandToonMaterial colorA={'#000000'} colorB={'#514f8f'} colorC={'#a99d9b'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
				</mesh>
			))}
		</group>
	)
}

/**
 * Lid
 * Screen bezel + image, pivoting from the base hinge along X.
 */
function Lid({ gradientMap, bodyColor, texture, openRadians = -0.6 }) {
	return (
		<group position={[0, 0.12, -0.75]}>
			{/* Hinge cylinder along X axis */}
			<mesh rotation={[0, 0, Math.PI * 0.5]} position={[0, 0, 0]} castShadow>
				<cylinderGeometry args={[0.035, 0.035, 2.2, 16]} />
				<threeBandToonMaterial colorA={'#000000'} colorB={'#2b2958'} colorC={'#bfb3ad'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
			</mesh>
			{/* Rotating lid: change openRadians to open/close angle */}
			<group rotation={[openRadians, 0, 0]}>
				{/* Frame: bottom edge aligned to hinge position */}
				<mesh position={[0, 0.7, 0]} castShadow>
					<boxGeometry args={[2.2, 1.4, 0.08]} />
					<threeBandToonMaterial colorA={'#000000'} colorB={'#2b2958'} colorC={'#bfb3ad'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
				</mesh>
				{/* Screen panel with image, slightly in front of bezel */}
				<mesh position={[0, 0.7, 0.045]}>
					<planeGeometry args={[1.9, 1.15]} />
					<meshBasicMaterial map={texture} toneMapped={false} />
				</mesh>
			</group>
		</group>
	)
}

/**
 * KillerLaptop
 * Stylized cel-shaded laptop with bold outlines and image-mapped screen.
 */
export function KillerLaptop(props) {
	const groupRef = useRef()

	// Gentle idle yaw so it feels alive
	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		if (groupRef.current) {
			groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3
		}
	})

	// Materials and palette
	// Use 3 discrete bands for a bold cel look (dark/mid/highlight)
	const gradientMap = useMemo(() => createGradientTexture(3), [])
	const bodyColor = new THREE.Color('#111111')
	const plateColor = new THREE.Color('#1a1a1a')
	const detailColor = new THREE.Color('#2a2a2a')
	const edgeColor = new THREE.Color('#a99d9b')
	const accentColor = new THREE.Color('#a99d9b')

	// Load screen image texture (sRGB, no tone mapping for crisp UI)
	const screenTexture = useTexture(omgImage)
	if (screenTexture) {
		screenTexture.colorSpace = THREE.SRGBColorSpace
		screenTexture.minFilter = THREE.LinearFilter
		screenTexture.magFilter = THREE.LinearFilter
		screenTexture.wrapS = THREE.ClampToEdgeWrapping
		screenTexture.wrapT = THREE.ClampToEdgeWrapping
	}

	return (
		<group ref={groupRef} {...props}>
			{/* Base: chassis slab */}
			<group position={[0, 0, 0]}>
				<mesh position={[0, 0.05, 0]} castShadow receiveShadow>
					<boxGeometry args={[2.4, 0.1, 1.6]} />
					<threeBandToonMaterial colorA={'#000000'} colorB={'#2b2958'} colorC={'#bfb3ad'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
				</mesh>
				{/* Keyboard plate: slight inset panel */}
				<mesh position={[0, 0.11, 0]} castShadow receiveShadow>
					<boxGeometry args={[2.2, 0.02, 1.4]} />
					<threeBandToonMaterial colorA={'#000000'} colorB={'#2b2958'} colorC={'#bfb3ad'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
				</mesh>
				<Keyboard gradientMap={gradientMap} />
				{/* Touchpad: small panel near center-right */}
				<mesh position={[0.5, 0.12, 0.3]} castShadow>
					<boxGeometry args={[0.5, 0.005, 0.35]} />
					<threeBandToonMaterial colorA={'#000000'} colorB={'#2b2958'} colorC={'#bfb3ad'} t1={0.33} t2={0.66} lightDir={[5,8,5]} />
				</mesh>
				{/* Accent strip: thin yellow bar along front */}
				<mesh position={[0, 0.13, -0.7]}>
					<boxGeometry args={[2.0, 0.01, 0.05]} />
					<meshToonMaterial color={accentColor} gradientMap={gradientMap} />
				</mesh>
			</group>

			{/* Lid with hinge */}
			<Lid gradientMap={gradientMap} bodyColor={bodyColor} texture={screenTexture} openRadians={-0.6} />

			{/* Bold silhouette outline: backfaces slightly scaled for a toon edge */}
			<group scale={[1.02, 1.02, 1.02]}>
				<mesh position={[0, 0.05, 0]}>
					<boxGeometry args={[2.4, 0.1, 1.6]} />
					<meshBasicMaterial color={edgeColor} side={THREE.BackSide} />
				</mesh>
				<mesh position={[0, 0.11, 0]}>
					<boxGeometry args={[2.2, 0.02, 1.4]} />
					<meshBasicMaterial color={edgeColor} side={THREE.BackSide} />
				</mesh>
				<mesh position={[0.5, 0.12, 0.3]}>
					<boxGeometry args={[0.5, 0.005, 0.35]} />
					<meshBasicMaterial color={edgeColor} side={THREE.BackSide} />
				</mesh>
				{/* Outline for lid in approximate open pose (matches Lid) */}
				<group position={[0, 0.12, -0.75]}>
					<group rotation={[-0.6, 0, 0]}>
						<mesh position={[0, 0.7, 0]}>
							<boxGeometry args={[2.2, 1.4, 0.08]} />
							<meshBasicMaterial color={edgeColor} side={THREE.BackSide} />
						</mesh>
					</group>
				</group>
			</group>
		</group>
	)
}


