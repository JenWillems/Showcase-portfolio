import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Tri-band cel material: picks among three flat colors by N·L thresholds

const ThreeBandToonMaterial = shaderMaterial(
	{
		colorA: new THREE.Color('#000000'),
		colorB: new THREE.Color('#514f8f'),
		colorC: new THREE.Color('#a99d9b'),
		t1: 0.33,
		t2: 0.66,
		lightDir: new THREE.Vector3(5, 8, 5),
	},
	/* glsl */ `
		varying vec3 vNormalW;
		void main() {
			vNormalW = normalize(normalMatrix * normal);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	/* glsl */ `
		uniform vec3 colorA;
		uniform vec3 colorB;
		uniform vec3 colorC;
		uniform float t1;
		uniform float t2;
		uniform vec3 lightDir;
		varying vec3 vNormalW;
		void main() {
			float ndl = max(0.0, dot(normalize(vNormalW), normalize(lightDir)));
			vec3 col = ndl < t1 ? colorA : (ndl < t2 ? colorB : colorC);
			gl_FragColor = vec4(col, 1.0);
		}
	`
)

extend({ ThreeBandToonMaterial })

export { ThreeBandToonMaterial }


