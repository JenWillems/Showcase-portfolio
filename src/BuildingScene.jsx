import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import KillerBuilding3D from './components/KillerBuilding'
import KillerBuildingWithPopup from './components/KillerBuildingWithPopup'

function StaticBuilding({ onWindowClick }) {
	return (
		<group>
			<KillerBuilding3D onWindowClick={onWindowClick} />
		</group>
	)
}

export default function BuildingScene() {
	return (
		<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
			<Canvas camera={{ position: [3, 3, 3], fov: 50 }} style={{ width: '100%', height: '100%' }}>
				<color attach="background" args={[0, 0, 0]} />
				<ambientLight intensity={0.25} />
				<directionalLight position={[5, 8, 6]} intensity={2.0} castShadow />
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
					<planeGeometry args={[20, 20]} />
					<meshStandardMaterial color={'#111111'} />
				</mesh>
				<StaticBuilding onWindowClick={(windowId) => {
					// Dispatch custom event for popup component to handle
					window.dispatchEvent(new CustomEvent('windowClick', { detail: windowId }))
				}} />
				<OrbitControls enablePan={false} />
			</Canvas>
			<KillerBuildingWithPopup />
		</div>
	)
}
