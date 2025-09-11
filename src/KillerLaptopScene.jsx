import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { KillerLaptop } from './components/KillerLaptop'

export default function KillerLaptopScene() {
	return (
		<div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
			<Canvas camera={{ position: [3, 2, 4], fov: 40 }} shadows>
				<color attach="background" args={[0.96, 0.96, 0.96]} />
				<ambientLight intensity={0.25} />
				<directionalLight
					position={[5, 8, 5]}
					intensity={2.0}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
				/>
				{/* High-contrast red/black/white vibe akin to Killer7 */}
				<Suspense fallback={null}>
					<KillerLaptop position={[0, 0, 0]} />
				</Suspense>
				<Environment preset="studio" />
				<OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
			</Canvas>
		</div>
	)
}


