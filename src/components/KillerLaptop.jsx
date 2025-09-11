import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import omgImage from '../assets/omg.png'

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

export function KillerLaptop(props) {
	const groupRef = useRef()
	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		if (groupRef.current) {
			groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3
		}
	})

	const gradientMap = useMemo(() => createGradientTexture(4), [])
	// Black and yellow aesthetic
	const bodyColor = new THREE.Color('#111111')
	const plateColor = new THREE.Color('#1a1a1a')
	const detailColor = new THREE.Color('#2a2a2a')
	const edgeColor = new THREE.Color('#ffd400')
	const accentColor = new THREE.Color('#ffd400')

	// Precompute keyboard key positions (rows x cols)
	const keyPositions = useMemo(() => {
		const rows = 5
		const cols = 14
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
	}, [])

	// Load screen image texture
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
			{/* Base */}
			<group position={[0, 0, 0]}>
				<mesh position={[0, 0.05, 0]} castShadow receiveShadow>
					<boxGeometry args={[2.4, 0.1, 1.6]} />
					<meshToonMaterial color={bodyColor} gradientMap={gradientMap} />
				</mesh>
				{/* Keyboard plate */}
				<mesh position={[0, 0.11, 0]} castShadow receiveShadow>
					<boxGeometry args={[2.2, 0.02, 1.4]} />
					<meshToonMaterial color={plateColor} gradientMap={gradientMap} />
				</mesh>
				{/* Keyboard keys */}
				<group position={[0, 0.13, -0.2]}>
					{keyPositions.positions.map((p, i) => (
						<mesh key={i} position={[p[0], 0, p[2]]} castShadow>
							<boxGeometry args={[keyPositions.keySize, 0.02, keyPositions.keySize]} />
							<meshToonMaterial color={'#ffffff'} gradientMap={gradientMap} />
						</mesh>
					))}
				</group>
				{/* Touchpad */}
				<mesh position={[0.5, 0.12, 0.3]} castShadow>
					<boxGeometry args={[0.5, 0.005, 0.35]} />
					<meshToonMaterial color={detailColor} gradientMap={gradientMap} />
				</mesh>
				{/* Accent strip */}
				<mesh position={[0, 0.13, -0.7]}>
					<boxGeometry args={[2.0, 0.01, 0.05]} />
					<meshToonMaterial color={accentColor} gradientMap={gradientMap} />
				</mesh>
			</group>

			{/* Lid pivot located at back edge of base */}
			<group position={[0, 0.12, -0.75]}>
				{/* Hinge cylinder along X axis */}
				<mesh rotation={[0, 0, Math.PI * 0.5]} position={[0, 0, 0]} castShadow>
					<cylinderGeometry args={[0.035, 0.035, 2.2, 16]} />
					<meshToonMaterial color={bodyColor} gradientMap={gradientMap} />
				</mesh>
				{/* Rotating lid */}
				<group rotation={[-1.0, 0, 0]}>
					{/* Place the frame so its bottom edge sits at the hinge */}
					<mesh position={[0, 0.7, 0]} castShadow>
						<boxGeometry args={[2.2, 1.4, 0.08]} />
						<meshToonMaterial color={bodyColor} gradientMap={gradientMap} />
					</mesh>
					{/* Screen panel with image, slightly in front of frame */}
					<mesh position={[0, 0.7, 0.045]}>
						<planeGeometry args={[1.9, 1.15]} />
						<meshBasicMaterial map={screenTexture} toneMapped={false} />
					</mesh>
				</group>
			</group>

			{/* Bold silhouette outline: slightly scaled backfaces in yellow */}
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
				<mesh position={[0, 0.13, -0.7]}>
					<boxGeometry args={[2.0, 0.01, 0.05]} />
					<meshBasicMaterial color={edgeColor} side={THREE.BackSide} />
				</mesh>
				{/* Outline for lid in approximate open pose */}
				<group position={[0, 0.12, -0.75]}>
					<group rotation={[-1.0, 0, 0]}>
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


