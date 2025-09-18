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
					STREET AND URBAN ENVIRONMENT
					Street scene with sidewalks, road markings, and urban infrastructure
					Creates a realistic urban setting for the industrial building
				*/}
				{/* Street surface - Main road */}
				<mesh position={[0, -0.1, 2.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<planeGeometry args={[8, 4]} />
					<meshBasicMaterial color={'#2c2c2c'} />
				</mesh>
				
				{/* Road markings - Center line */}
				<mesh position={[0, -0.05, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[0.1, 3.8]} />
					<meshBasicMaterial color={'#ffffff'} />
				</mesh>
				
				{/* Road markings - Lane dividers */}
				<mesh position={[-1.5, -0.05, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[0.05, 3.8]} />
					<meshBasicMaterial color={'#ffffff'} />
				</mesh>
				<mesh position={[1.5, -0.05, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[0.05, 3.8]} />
					<meshBasicMaterial color={'#ffffff'} />
				</mesh>
				
				{/* Left sidewalk */}
				<mesh position={[-4.5, -0.05, 2.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<planeGeometry args={[1.5, 4]} />
					<meshBasicMaterial color={'#4a4a4a'} />
				</mesh>
				
				{/* Right sidewalk */}
				<mesh position={[4.5, -0.05, 2.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
					<planeGeometry args={[1.5, 4]} />
					<meshBasicMaterial color={'#4a4a4a'} />
				</mesh>
				
				{/* Curb - Left side */}
				<mesh position={[-3.75, 0.05, 2.0]}>
					<boxGeometry args={[0.1, 0.2, 4]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Curb - Right side */}
				<mesh position={[3.75, 0.05, 2.0]}>
					<boxGeometry args={[0.1, 0.2, 4]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Street lights */}
				<group position={[-3.5, 0, 1.0]}>
					{/* Light post */}
					<mesh position={[0, 1.0, 0]}>
						<cylinderGeometry args={[0.05, 0.05, 2.0, 8]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Light fixture */}
					<mesh position={[0, 2.0, 0]}>
						<boxGeometry args={[0.3, 0.2, 0.2]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Light glow */}
					<mesh position={[0, 2.0, 0]}>
						<sphereGeometry args={[0.1, 8, 6]} />
						<meshBasicMaterial color={'#ffff88'} />
					</mesh>
				</group>
				
				<group position={[3.5, 0, 1.0]}>
					{/* Light post */}
					<mesh position={[0, 1.0, 0]}>
						<cylinderGeometry args={[0.05, 0.05, 2.0, 8]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Light fixture */}
					<mesh position={[0, 2.0, 0]}>
						<boxGeometry args={[0.3, 0.2, 0.2]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Light glow */}
					<mesh position={[0, 2.0, 0]}>
						<sphereGeometry args={[0.1, 8, 6]} />
						<meshBasicMaterial color={'#ffff88'} />
					</mesh>
				</group>
				
				{/* Manholes */}
				<mesh position={[-1.0, -0.1, 2.0]}>
					<cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[1.0, -0.1, 2.0]}>
					<cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Street signs */}
				<group position={[-3.0, 0, 0.0]}>
					{/* Sign post */}
					<mesh position={[0, 0.8, 0]}>
						<cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Sign panel */}
					<mesh position={[0, 1.6, 0]}>
						<boxGeometry args={[0.4, 0.2, 0.02]} />
						<meshBasicMaterial color={'#ffffff'} />
					</mesh>
				</group>
				
				<group position={[3.0, 0, 0.0]}>
					{/* Sign post */}
					<mesh position={[0, 0.8, 0]}>
						<cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
						<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					{/* Sign panel */}
					<mesh position={[0, 1.6, 0]}>
						<boxGeometry args={[0.4, 0.2, 0.02]} />
						<meshBasicMaterial color={'#ffffff'} />
					</mesh>
				</group>
				
				{/* Fire hydrant */}
				<group position={[-2.0, 0, 0.5]}>
					{/* Hydrant base */}
					<mesh position={[0, 0.2, 0]}>
						<cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
						<meshBasicMaterial color={'#ff6b6b'} />
					</mesh>
					{/* Hydrant top */}
					<mesh position={[0, 0.4, 0]}>
						<cylinderGeometry args={[0.06, 0.06, 0.2, 8]} />
						<meshBasicMaterial color={'#ff6b6b'} />
					</mesh>
					{/* Hydrant cap */}
					<mesh position={[0, 0.5, 0]}>
						<cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
				</group>
				
				{/* Trash can */}
				<group position={[2.0, 0, 0.5]}>
					{/* Trash can body */}
					<mesh position={[0, 0.2, 0]}>
						<cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					{/* Trash can lid */}
					<mesh position={[0, 0.4, 0]}>
						<cylinderGeometry args={[0.12, 0.12, 0.05, 8]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
				</group>

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
					BACK SIDE DETAILED FACADE
					Enhanced rear facade with windows, doors, utilities, and architectural details
					Creates a more realistic and interesting building backside
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
					BACK SIDE WINDOWS
					Industrial windows on the rear facade for natural lighting
					Positioned to provide light to interior spaces
				*/}
				{/* Back window - Left side */}
				<mesh position={[-1.8, 1.0, -1.52]}>
					<boxGeometry args={[0.6, 0.8, 0.05]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#7f8c8d'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[-1.8, 1.0, -1.50]}>
					<planeGeometry args={[0.5, 0.7]} />
					<meshBasicMaterial color={'#e8f4f8'} />
				</mesh>

				{/* Back window - Right side */}
				<mesh position={[1.8, 1.0, -1.52]}>
					<boxGeometry args={[0.6, 0.8, 0.05]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#7f8c8d'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[1.8, 1.0, -1.50]}>
					<planeGeometry args={[0.5, 0.7]} />
					<meshBasicMaterial color={'#e8f4f8'} />
				</mesh>

				{/* Back window - Upper level */}
				<mesh position={[0, 2.2, -1.52]}>
					<boxGeometry args={[0.8, 0.6, 0.05]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#7f8c8d'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[0, 2.2, -1.50]}>
					<planeGeometry args={[0.7, 0.5]} />
					<meshBasicMaterial color={'#e8f4f8'} />
				</mesh>

				{/* 
					BACK DOOR - DETAILED SERVICE ENTRANCE
					Industrial service door with enhanced details and hardware
					Positioned on the right side of the rear facade
				*/}
				{/* Service door frame - Main structural frame */}
				<mesh position={[2.2, 0.8, -1.52]}>
					<boxGeometry args={[0.8, 1.4, 0.1]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Service door panel - Main door surface */}
				<mesh position={[2.2, 0.8, -1.46]}>
					<boxGeometry args={[0.6, 1.2, 0.02]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Door panel divisions - Horizontal reinforcement bars */}
				<mesh position={[2.2, 0.5, -1.45]}>
					<boxGeometry args={[0.55, 0.02, 0.01]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[2.2, 1.1, -1.45]}>
					<boxGeometry args={[0.55, 0.02, 0.01]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Door panel divisions - Vertical reinforcement bars */}
				<mesh position={[1.95, 0.8, -1.45]}>
					<boxGeometry args={[0.02, 1.15, 0.01]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[2.45, 0.8, -1.45]}>
					<boxGeometry args={[0.02, 1.15, 0.01]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Door window - Small viewport */}
				<mesh position={[2.2, 1.0, -1.44]}>
					<boxGeometry args={[0.15, 0.2, 0.01]} />
					<meshBasicMaterial color={'#e8f4f8'} />
				</mesh>
				<mesh position={[2.2, 1.0, -1.43]}>
					<boxGeometry args={[0.17, 0.22, 0.005]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Door handle - Main handle assembly */}
				<mesh position={[2.45, 0.8, -1.44]}>
					<boxGeometry args={[0.08, 0.04, 0.02]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				
				{/* Door handle - Handle grip */}
				<mesh position={[2.48, 0.8, -1.42]}>
					<cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				
				{/* Door lock - Main lock mechanism */}
				<mesh position={[2.35, 0.8, -1.44]}>
					<boxGeometry args={[0.06, 0.08, 0.02]} />
					<meshBasicMaterial color={'#95a5a6'} />
				</mesh>
				
				{/* Door lock - Keyhole */}
				<mesh position={[2.35, 0.8, -1.43]}>
					<cylinderGeometry args={[0.01, 0.01, 0.01, 8]} />
					<meshBasicMaterial color={'#2c3e50'} />
				</mesh>
				
				{/* Door hinges - Left side hinges */}
				<mesh position={[1.88, 0.6, -1.44]}>
					<boxGeometry args={[0.04, 0.08, 0.02]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				<mesh position={[1.88, 1.0, -1.44]}>
					<boxGeometry args={[0.04, 0.08, 0.02]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				
				{/* Door hinges - Right side hinges */}
				<mesh position={[2.52, 0.6, -1.44]}>
					<boxGeometry args={[0.04, 0.08, 0.02]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				<mesh position={[2.52, 1.0, -1.44]}>
					<boxGeometry args={[0.04, 0.08, 0.02]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				
				{/* Door bolts - Security bolts */}
				<mesh position={[1.95, 0.4, -1.44]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				<mesh position={[2.45, 0.4, -1.44]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				<mesh position={[1.95, 1.2, -1.44]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				<mesh position={[2.45, 1.2, -1.44]}>
					<cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
					<meshBasicMaterial color={'#bdc3c7'} />
				</mesh>
				
				{/* Door threshold - Bottom seal */}
				<mesh position={[2.2, 0.1, -1.48]}>
					<boxGeometry args={[0.7, 0.05, 0.08]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				
				{/* Door header - Top frame reinforcement */}
				<mesh position={[2.2, 1.5, -1.48]}>
					<boxGeometry args={[0.7, 0.05, 0.08]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* 
					BACK SIDE UTILITY INFRASTRUCTURE
					Additional utility systems and equipment on the rear facade
					Includes electrical panels, pipes, and service connections
				*/}
				{/* Electrical panel - Left side */}
				<mesh position={[-2.2, 0.3, -1.52]}>
					<boxGeometry args={[0.3, 0.4, 0.08]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Electrical panel - Right side */}
				<mesh position={[2.2, 0.3, -1.52]}>
					<boxGeometry args={[0.3, 0.4, 0.08]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Utility pipes - Vertical runs */}
				<mesh position={[-0.8, 0.75, -1.52]}>
					<cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[0.8, 0.75, -1.52]}>
					<cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Horizontal utility connections */}
				<mesh position={[0, 1.5, -1.52]}>
					<cylinderGeometry args={[0.03, 0.03, 2.5, 8]} rotation={[0, 0, Math.PI / 2]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* 
					BACK SIDE ARCHITECTURAL DETAILS
					Additional architectural elements for visual interest
					Includes ledges, brackets, and structural details
				*/}
				{/* Architectural ledge - Upper level */}
				<mesh position={[0, 2.3, -1.48]}>
					<boxGeometry args={[4, 0.05, 0.15]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Support brackets */}
				<mesh position={[-1.5, 1.9, -1.48]}>
					<boxGeometry args={[0.1, 0.3, 0.1]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[1.5, 1.9, -1.48]}>
					<boxGeometry args={[0.1, 0.3, 0.1]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Weather protection overhang */}
				<mesh position={[0, 2.6, -1.42]}>
					<boxGeometry args={[5, 0.08, 0.2]} />
					<threeBandToonMaterial colorA={'#2c3e50'} colorB={'#34495e'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* 
					BACK SIDE VENTILATION ENHANCEMENTS
					Additional ventilation elements and exhaust systems
				*/}
				{/* Exhaust fan housing */}
				<mesh position={[-1.0, 2.5, -1.5]}>
					<cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[1.0, 2.5, -1.5]}>
					<cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* Exhaust pipes */}
				<mesh position={[-1.0, 2.2, -1.5]}>
					<cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>
				<mesh position={[1.0, 2.2, -1.5]}>
					<cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
					<threeBandToonMaterial colorA={'#34495e'} colorB={'#2c3e50'} colorC={'#5d6d7e'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
				</mesh>

				{/* 
					BACKYARD AREA - MESSY KILLER 7 STYLE
					Chaotic, cluttered outdoor space with industrial debris and scattered objects
					Inspired by Donut County's messy aesthetic but with Killer 7's dark industrial palette
				*/}
				<group position={[0, 0, -3.5]}>
					{/* Varied ground textures - Dirt, mud, and scattered debris */}
					<mesh position={[0, -0.1, 0]} receiveShadow>
						<planeGeometry args={[5, 4]} />
						<meshBasicMaterial color={'#5d4e37'} />
					</mesh>
					
					{/* Mud patches and oil stains */}
					<mesh position={[-1.5, -0.05, 0.5]}>
						<planeGeometry args={[0.8, 0.6]} />
						<meshBasicMaterial color={'#3d2f1f'} />
					</mesh>
					<mesh position={[1.2, -0.05, -0.8]}>
						<planeGeometry args={[0.6, 0.4]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					<mesh position={[0.3, -0.05, 1.5]}>
						<planeGeometry args={[0.5, 0.7]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					
					{/* Weathered fence - Left side (partially broken) */}
					<mesh position={[-2.5, 0.4, 0]}>
						<boxGeometry args={[0.08, 0.8, 4]} />
						<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Weathered fence - Right side (missing sections) */}
					<mesh position={[2.5, 0.3, 0]}>
						<boxGeometry args={[0.08, 0.6, 3]} />
						<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Back fence - Broken and leaning */}
					<mesh position={[0, 0.2, -2]} rotation={[0, 0, 0.1]}>
						<boxGeometry args={[5, 0.4, 0.08]} />
						<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Broken fence posts */}
					<mesh position={[-1.5, 0.3, -2]}>
						<boxGeometry args={[0.1, 0.6, 0.1]} />
						<threeBandToonMaterial colorA={'#6b5b47'} colorB={'#8b7355'} colorC={'#a68b5b'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					<mesh position={[1.5, 0.2, -2]}>
						<boxGeometry args={[0.1, 0.4, 0.1]} />
						<threeBandToonMaterial colorA={'#6b5b47'} colorB={'#8b7355'} colorC={'#a68b5b'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
					</mesh>
					
					{/* Dead/dying tree */}
					<group position={[-1.5, 0, 0.5]}>
						{/* Tree trunk - weathered and cracked */}
						<mesh position={[0, 0.4, 0]}>
							<cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
							<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
						{/* Sparse, brown foliage */}
						<mesh position={[0, 0.9, 0]}>
							<sphereGeometry args={[0.25, 6, 4]} />
							<meshBasicMaterial color={'#cd853f'} />
						</mesh>
					</group>
					
					{/* Scattered industrial debris - Broken machinery parts */}
					<mesh position={[-1.8, 0.1, -0.5]}>
						<boxGeometry args={[0.3, 0.2, 0.3]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					<mesh position={[-1.8, 0.3, -0.5]}>
						<boxGeometry args={[0.25, 0.2, 0.25]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					<mesh position={[-1.8, 0.5, -0.5]}>
						<boxGeometry args={[0.2, 0.2, 0.2]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					
					{/* Broken industrial equipment */}
					<mesh position={[-1.2, 0.05, -0.8]}>
						<boxGeometry args={[0.2, 0.1, 0.1]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					<mesh position={[-1.2, 0.1, -0.8]}>
						<boxGeometry args={[0.15, 0.05, 0.08]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					
					{/* Industrial pipe sections scattered around */}
					<mesh position={[-0.8, 0.05, -1.2]}>
						<cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					<mesh position={[0.5, 0.05, 0.8]}>
						<cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
						<meshBasicMaterial color={'#7f8c8d'} />
					</mesh>
					<mesh position={[1.2, 0.05, -0.3]}>
						<cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					
					{/* Broken electrical equipment */}
					<mesh position={[0.5, 0.2, 0.8]}>
						<boxGeometry args={[0.25, 0.1, 0.2]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					<mesh position={[0.5, 0.25, 0.8]}>
						<boxGeometry args={[0.15, 0.05, 0.15]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					
					{/* Overturned industrial table */}
					<group position={[0.5, 0, -0.5]} rotation={[0, 0, 0.3]}>
						{/* Broken table leg */}
						<mesh position={[0, 0.1, 0]}>
							<cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
							<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
						{/* Table top - cracked and dirty */}
						<mesh position={[0, 0.2, 0]}>
							<cylinderGeometry args={[0.3, 0.3, 0.03, 8]} />
							<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
					</group>
					
					{/* Broken chair - Fallen over */}
					<group position={[-0.8, 0, -0.8]} rotation={[0, 0, -0.4]}>
						{/* Chair seat - dirty and worn */}
						<mesh position={[0, 0.1, 0]}>
							<boxGeometry args={[0.25, 0.03, 0.25]} />
							<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
						{/* Chair back - broken */}
						<mesh position={[0, 0.2, -0.1]}>
							<boxGeometry args={[0.25, 0.2, 0.03]} />
							<threeBandToonMaterial colorA={'#8b7355'} colorB={'#a68b5b'} colorC={'#c4a484'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
					</group>
					
					{/* Industrial waste and scrap metal */}
					<mesh position={[1.2, 0.05, 0.8]}>
						<boxGeometry args={[0.15, 0.1, 0.1]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					<mesh position={[-0.3, 0.05, -1.2]}>
						<boxGeometry args={[0.1, 0.08, 0.12]} />
						<meshBasicMaterial color={'#7f8c8d'} />
					</mesh>
					<mesh position={[1.8, 0.05, -0.5]}>
						<boxGeometry args={[0.12, 0.06, 0.15]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					<mesh position={[-0.2, 0.05, -1.5]}>
						<boxGeometry args={[0.1, 0.08, 0.12]} />
						<meshBasicMaterial color={'#7f8c8d'} />
					</mesh>
					<mesh position={[0.1, 0.05, 1.8]}>
						<cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					<mesh position={[-1.0, 0.05, 0.8]}>
						<boxGeometry args={[0.08, 0.06, 0.1]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					
					{/* Broken light post - Fallen over */}
					<group position={[0.8, 0, -1.5]} rotation={[0, 0, 0.2]}>
						{/* Light post - bent and broken */}
						<mesh position={[0, 0.1, 0]}>
							<cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
							<threeBandToonMaterial colorA={'#5d6d7e'} colorB={'#7f8c8d'} colorC={'#a6acaf'} t1={0.33} t2={0.66} lightDir={[5,8,5]} invert={1.0} />
						</mesh>
						{/* Broken light fixture */}
						<mesh position={[0, 0.2, 0]}>
							<sphereGeometry args={[0.05, 6, 4]} />
							<meshBasicMaterial color={'#95a5a6'} />
						</mesh>
					</group>
					
					{/* More scattered industrial debris */}
					<mesh position={[0.3, 0.05, -0.8]}>
						<boxGeometry args={[0.12, 0.08, 0.15]} />
						<meshBasicMaterial color={'#2c3e50'} />
					</mesh>
					<mesh position={[-1.5, 0.05, 1.2]}>
						<cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
						<meshBasicMaterial color={'#5d6d7e'} />
					</mesh>
					<mesh position={[1.5, 0.05, 0.3]}>
						<boxGeometry args={[0.08, 0.06, 0.1]} />
						<meshBasicMaterial color={'#34495e'} />
					</mesh>
					<mesh position={[-0.5, 0.05, -0.3]}>
						<boxGeometry args={[0.1, 0.05, 0.08]} />
						<meshBasicMaterial color={'#7f8c8d'} />
					</mesh>
					
					{/* Puddles of oil and water */}
					<mesh position={[-0.5, -0.05, 1.2]}>
						<planeGeometry args={[0.4, 0.3]} />
						<meshBasicMaterial color={'#2c3e50'} transparent opacity={0.7} />
					</mesh>
					<mesh position={[1.0, -0.05, -0.8]}>
						<planeGeometry args={[0.3, 0.25]} />
						<meshBasicMaterial color={'#34495e'} transparent opacity={0.7} />
					</mesh>
					<mesh position={[-1.8, -0.05, -0.2]}>
						<planeGeometry args={[0.2, 0.2]} />
						<meshBasicMaterial color={'#2c3e50'} transparent opacity={0.7} />
					</mesh>
					<mesh position={[1.3, -0.05, 1.5]}>
						<planeGeometry args={[0.25, 0.2]} />
						<meshBasicMaterial color={'#34495e'} transparent opacity={0.7} />
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


