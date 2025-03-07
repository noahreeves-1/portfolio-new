"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random stars
function generateSpherePoints(count: number) {
  const points = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Random position on a sphere
    const radius = THREE.MathUtils.randFloat(2, 4.5);
    const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
    const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));

    points[i3] = radius * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = radius * Math.cos(phi);

    // Random colors with teal bias
    color[i3] = THREE.MathUtils.randFloat(0, 0.2);
    color[i3 + 1] = THREE.MathUtils.randFloat(0.5, 1.0);
    color[i3 + 2] = THREE.MathUtils.randFloat(0.8, 1.0);
  }

  return { positions: points, colors: color };
}

interface StarsProps {
  count: number;
  speed: number;
}

function Stars({ count, speed }: StarsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [pointData] = useState(() => generateSpherePoints(count));

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    if (pointsRef.current) {
      // Rotate the stars in different directions to create a dynamic field
      pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      pointsRef.current.rotation.y = Math.cos(time * 0.2) * 0.1;
      pointsRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={pointData.positions}
      colors={pointData.colors}
      stride={3}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function MovingGradient() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a custom shader material for the gradient
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      // Create a gradient from top to bottom with teal in the middle
      vec3 colorA = vec3(0.059, 0.09, 0.165); // #0f172a (dark slate)
      vec3 colorB = vec3(0.067, 0.369, 0.349); // #115e59 (teal)
      vec3 colorC = vec3(0.059, 0.09, 0.165); // #0f172a (dark slate)
      
      // Use the y coordinate for the gradient with a subtle wave
      float wave = sin(vUv.x * 3.0 + time * 0.2) * 0.05;
      float pos = vUv.y + wave;
      
      vec3 color;
      if (pos < 0.45) {
        float t = pos / 0.45;
        color = mix(colorA, colorB, t);
      } else {
        float t = (pos - 0.45) / 0.55;
        color = mix(colorB, colorC, t);
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = {
    time: { value: 0 },
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current && uniforms.time) {
      // Update the time uniform for the shader
      uniforms.time.value = time;

      // Slightly move the gradient over time
      meshRef.current.position.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[15, 15, 1]}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <MovingGradient />
        <Stars count={1000} speed={0.2} />
      </Canvas>
    </div>
  );
}
