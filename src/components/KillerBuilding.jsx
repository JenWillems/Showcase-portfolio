import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ThreeBandToonMaterial } from '../materials/ThreeBandToonMaterial'

/**
 * IndustrialWindow Component
 * 
 * Creates a stylized industrial window with metal frame and cross bars.
 * Now includes click functionality to open color-matched popups.
 * 
 * @param {Array} position - [x, y, z] position of the window
 * @param {Array} size - [width, height, depth] dimensions of the window frame
 * @param {string} lightColor - Hex color for the window pane light
 * @param {Function} onClick - Function to call when window is clicked
 * @returns {JSX.Element} Industrial window with metal frame and cross bars
 */
function IndustrialWindow({ position = [0, 0, 0], size = [0.8, 1.0, 0.05], lightColor = '#ffff00', onClick }) {
	return (
		<group position={position}>
			{/* Metal frame - Main structural frame of the window */}
			<mesh>
				<boxGeometry args={size} />
				<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#7f8c8d'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
			</mesh>
			
			{/* Window pane - The actual glass/light surface - CLICKABLE */}
			<mesh position={[0, 0, size[2] * 0.6]} onClick={onClick}>
				<planeGeometry args={[size[0] * 0.85, size[1] * 0.85]} />
				<meshBasicMaterial color={lightColor} />
			</mesh>
			
			{/* Metal cross bars - Horizontal reinforcement bar */}
			<mesh position={[0, 0, size[2] * 0.7]}>
				<boxGeometry args={[size[0] * 0.85, 0.02, 0.01]} />
				<meshBasicMaterial color={'#2c3e50'} />
			</mesh>
			
			{/* Metal cross bars - Vertical reinforcement bar */}
			<mesh position={[0, 0, size[2] * 0.7]}>
				<boxGeometry args={[0.02, size[1] * 0.85, 0.01]} />
				<meshBasicMaterial color={'#2c3e50'} />
			</mesh>
		</group>
	)
}

/**
 * KillerBuilding3D Component (3D Only)
 * 
 * A 3D industrial building with modern architectural elements.
 * Features industrial windows, steel columns, ventilation systems, and utility infrastructure.
 * The building has a subtle rotation animation and uses custom toon shading materials.
 * 
 * @param {Object} props - React props passed to the component
 * @param {Function} props.onWindowClick - Callback function when a window is clicked
 * @returns {JSX.Element} 3D industrial building scene
 */
export function KillerBuilding3D({ onWindowClick, ...props }) {
	const ref = useRef()
	
	// Animation: Subtle rotation for dynamic visual interest
	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		if (ref.current) ref.current.rotation.y = Math.sin(t * 0.15) * 0.1
	})

	return (
		<group ref={ref} {...props}>
				{/* 
					MAIN BUILDING STRUCTURE
					The primary building block - a rectangular industrial structure
					Dimensions: 6x3x3 units (width x height x depth)
					Material: Industrial steel gray with toon shading
				*/}
			<mesh position={[0, 1.5, 0]} castShadow receiveShadow>
				<boxGeometry args={[6, 3, 3]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#7f8c8d'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
			</mesh>
				
				{/* 
					INDUSTRIAL STEEL COLUMNS
					Vertical structural supports that run along the front facade
					Positioned at regular intervals to create architectural rhythm
					Material: Darker steel gray for contrast against main building
				*/}
				{[-2.5, -1.25, 0, 1.25, 2.5].map((x) => (
					<mesh key={`column-${x}`} position={[x, 1.5, 1.52]} castShadow>
						<boxGeometry args={[0.2, 3.1, 0.1]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
			))}

				{/* 
					INDUSTRIAL DOOR ASSEMBLY
					Main entrance door with steel frame and industrial styling
					Positioned on the left side of the building facade
				*/}
				<group position={[-2.0, 0.9, 1.62]}>
					{/* Door frame - Steel structural frame */}
				<mesh>
						<boxGeometry args={[1.2, 1.8, 0.1]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Door panel - The actual door surface */}
					<mesh position={[0, 0, 0.06]}>
						<boxGeometry args={[0.9, 1.6, 0.02]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Industrial door handle - Functional door hardware */}
					<mesh position={[0.4, 0, 0.08]}>
						<boxGeometry args={[0.1, 0.05, 0.02]} />
						<meshBasicMaterial color={'#bdc3c7'} />
					</mesh>
				</group>

				{/* 
					INDUSTRIAL WINDOWS
					Four windows arranged in a 2x2 grid pattern
					Each window has a different colored light for visual variety
					- Bottom left: Coral red (#ff6b6b) - Production Floor
					- Bottom right: Teal (#4ecdc4) - Quality Control
					- Top left: Sky blue (#45b7d1) - Research & Development  
					- Top right: Golden yellow (#f9ca24) - Management Office
				*/}
				<IndustrialWindow 
					position={[0, 1.0, 1.62]} 
					lightColor="#ff6b6b" 
					onClick={() => onWindowClick('bottom-left')} 
				/>
				<IndustrialWindow 
					position={[2.0, 1.0, 1.62]} 
					lightColor="#4ecdc4" 
					onClick={() => onWindowClick('bottom-right')} 
				/>
				<IndustrialWindow 
					position={[0, 2.2, 1.62]} 
					lightColor="#45b7d1" 
					onClick={() => onWindowClick('top-left')} 
				/>
				<IndustrialWindow 
					position={[2.0, 2.2, 1.62]} 
					lightColor="#f9ca24" 
					onClick={() => onWindowClick('top-right')} 
				/>

				{/* 
					INDUSTRIAL ROOF
					Clean, minimal roof structure with industrial styling
					Slightly larger than the main building for architectural overhang
				*/}
				<mesh position={[0, 3.1, 1.60]}>
					<boxGeometry args={[6.2, 0.15, 0.15]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* 
					INDUSTRIAL VENTILATION SYSTEM
					Roof-mounted ventilation system for air circulation
					Includes main vent pipe and protective cap
				*/}
				<group position={[0, 2.8, 1.5]}>
					{/* Main vent pipe - Primary exhaust/ventilation duct */}
					<mesh position={[2.0, 0, 0]}>
						<cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Vent cap - Protective cover to prevent weather ingress */}
					<mesh position={[2.0, 0.35, 0]}>
						<cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
				</group>

				{/* 
					INDUSTRIAL PIPING SYSTEM
					Utility pipes running along the right side of the building
					Represents water, gas, or electrical conduit systems
				*/}
				<group position={[3.1, 1.0, 0]}>
					{/* Vertical pipe - Main utility line running up the building */}
					<mesh position={[0, 0, 0]}>
						<cylinderGeometry args={[0.08, 0.08, 2.0, 8]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Horizontal pipe - Branch line connecting to building systems */}
					<mesh position={[0, 1.5, 0]}>
						<cylinderGeometry args={[0.06, 0.06, 1.5, 8]} rotation={[0, 0, Math.PI / 2]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				</group>

				{/* 
					GROUND-LEVEL VENTILATION GRILLES
					Fresh air intake vents positioned at building base
					Essential for proper air circulation in industrial buildings
				*/}
				<mesh position={[-2.0, 0.3, 1.65]}>
					<boxGeometry args={[0.4, 0.3, 0.05]} />
					<meshBasicMaterial color={'#2c3e50'} />
				</mesh>
				<mesh position={[2.0, 0.3, 1.65]}>
					<boxGeometry args={[0.4, 0.3, 0.05]} />
					<meshBasicMaterial color={'#2c3e50'} />
				</mesh>

				{/* 
					LEFT SIDE UTILITY INFRASTRUCTURE
					Additional utility systems and equipment on the building's left side
					Includes utility pipes and electrical/mechanical equipment boxes
				*/}
				<group position={[-3.1, 1.0, 0]}>
					{/* Utility pipes - Secondary utility lines for building services */}
					<mesh position={[0, 0, 0]}>
						<cylinderGeometry args={[0.06, 0.06, 2.0, 8]} />
						<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
			</mesh>

					{/* Utility box - Electrical panel or mechanical equipment housing */}
					<mesh position={[0, 1.5, 0.3]}>
						<boxGeometry args={[0.2, 0.3, 0.15]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
			</mesh>
				</group>

				{/* 
					BACK SIDE VENTILATION SYSTEM
					Additional ventilation grilles on the building's rear facade
					Provides balanced air circulation throughout the building
				*/}
				<group position={[0, 1.5, -1.6]}>
					{/* Back ventilation - Left side fresh air intake */}
					<mesh position={[-1.5, 0.3, 0]}>
						<boxGeometry args={[0.4, 0.3, 0.08]} />
						<meshBasicMaterial color={'#2c3e50'} />
			</mesh>

					{/* Back ventilation - Right side fresh air intake */}
					<mesh position={[1.5, 0.3, 0]}>
						<boxGeometry args={[0.4, 0.3, 0.08]} />
						<meshBasicMaterial color={'#2c3e50'} />
			</mesh>
				</group>

				{/* 
					SILHOUETTE OUTLINE SYSTEM
					Creates a subtle outline effect around the main building structure
					Uses back-facing materials to create depth and definition
					Enhances the building's presence in the 3D scene
				*/}
				<group scale={[1.02, 1.02, 1.02]}>
					{/* Main building silhouette - Slightly larger outline of the primary structure */}
					<mesh position={[0, 1.5, 0]}>
						<boxGeometry args={[6, 3, 3]} />
						<meshBasicMaterial color={'#a99d9b'} side={THREE.BackSide} />
					</mesh>
					
					{/* Roof silhouette - Outline of the roof structure */}
					<mesh position={[0, 3.1, 1.55]}>
						<boxGeometry args={[6.2, 0.2, 0.2]} />
						<meshBasicMaterial color={'#a99d9b'} side={THREE.BackSide} />
					</mesh>
				</group>
		</group>
	)
}

// Export the 3D component as default for backward compatibility
export default KillerBuilding3D


