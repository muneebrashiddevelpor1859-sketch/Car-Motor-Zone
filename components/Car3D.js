'use client';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PAINTS } from './paints';
import { Environment, ContactShadows, Sparkles, MeshReflectorMaterial } from '@react-three/drei';


function Wheel({ position, speed }) {
  const spin = useRef();
  useFrame((_, dt) => { spin.current.rotation.y += dt * speed.current; });
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={spin}>
        <mesh><cylinderGeometry args={[0.42, 0.42, 0.34, 40]} /><meshStandardMaterial color="#14161a" roughness={0.7} /></mesh>
        <mesh><cylinderGeometry args={[0.3, 0.3, 0.36, 32]} /><meshStandardMaterial color="#d5d8de" metalness={1} roughness={0.12} /></mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]} position={[0, 0.19, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.07]} /><meshStandardMaterial color="#8d939e" metalness={1} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Beam({ z }) {
  return (
    <mesh position={[2.85, 0.5, z]} rotation={[0, 0, Math.PI / 2]}>
      <coneGeometry args={[0.55, 1.9, 28, 1, true]} />
      <meshBasicMaterial color="#fff2cf" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Scene({ progress }) {
  const g = useRef();
  const speed = useRef(2);
  const paint = useMemo(() => new THREE.MeshPhysicalMaterial({ color: PAINTS[0].hex, metalness: 0.9, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05 }), []);
  const c1 = useMemo(() => new THREE.Color(), []);
  const c2 = useMemo(() => new THREE.Color(), []);
  const look = useMemo(() => new THREE.Vector3(0, 0.55, 0), []);

  useFrame((state, dt) => {
    const p = progress.current;
    // gaari ghoomti hai
    const target = p * Math.PI * 2.4 + 0.6;
    g.current.rotation.y += (target - g.current.rotation.y) * Math.min(1, dt * 4);
    // paint colour scroll ke sath badalta hai
    const f = p * (PAINTS.length - 1);
    const i = Math.min(PAINTS.length - 2, Math.floor(f));
    paint.color.lerpColors(c1.set(PAINTS[i].hex), c2.set(PAINTS[i + 1].hex), f - i);
    // camera dolly: door se qareeb, phir oopar
    const s = Math.sin(p * Math.PI);
    const r = 7.2 - 2.6 * s;
    const h = 1.5 + 1.3 * Math.sin(p * Math.PI * 2) * 0.5 + 0.4 * s;
    const a = 0.75;
    state.camera.position.lerp(new THREE.Vector3(r * Math.cos(a), h, r * Math.sin(a)), 0.06);
    state.camera.lookAt(look);
    // wheels ki raftar scroll ki tezi se
    speed.current += ((2 + Math.abs(p - (g.current.userData.lp ?? p)) * 900) - speed.current) * 0.1;
    g.current.userData.lp = p;
    // halka hover
    g.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.015;
  });

  return (
    <>
      <group ref={g} position={[0, 0.2, 0]}>
        <mesh material={paint} position={[0, 0.42, 0]}><boxGeometry args={[3.6, 0.5, 1.6]} /></mesh>
        <mesh material={paint} position={[1.45, 0.38, 0]} rotation={[0, 0, -0.25]}><boxGeometry args={[1.0, 0.3, 1.55]} /></mesh>
        <mesh material={paint} position={[-1.5, 0.5, 0]} rotation={[0, 0, 0.12]}><boxGeometry args={[0.9, 0.35, 1.55]} /></mesh>
        <mesh position={[-0.15, 0.88, 0]}><boxGeometry args={[1.7, 0.45, 1.35]} /><meshPhysicalMaterial color="#0c0f14" metalness={0.3} roughness={0.04} clearcoat={1} /></mesh>
        <mesh material={paint} position={[0.1, 1.12, 0]}><boxGeometry args={[1.2, 0.06, 1.3]} /></mesh>
        <mesh material={paint} position={[-1.95, 0.9, 0]}><boxGeometry args={[0.12, 0.05, 1.5]} /></mesh>
        {[0.5, -0.5].map((z) => (
          <mesh key={z} position={[1.92, 0.5, z]}><boxGeometry args={[0.08, 0.1, 0.35]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} /></mesh>
        ))}
        <mesh position={[-1.96, 0.55, 0]}><boxGeometry args={[0.06, 0.1, 1.2]} /><meshStandardMaterial color="#ff2a2a" emissive="#ff0000" emissiveIntensity={2.5} /></mesh>
        <Beam z={0.5} /><Beam z={-0.5} />
        <Wheel position={[1.2, 0.3, 0.85]} speed={speed} /><Wheel position={[1.2, 0.3, -0.85]} speed={speed} />
        <Wheel position={[-1.2, 0.3, 0.85]} speed={speed} /><Wheel position={[-1.2, 0.3, -0.85]} speed={speed} />
      </group>

      {/* turntable ring + reflective floor + sparkles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[2.9, 3.0, 96]} /><meshBasicMaterial color="#c9a36a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[9, 64]} />
        <MeshReflectorMaterial blur={[300, 80]} resolution={512} mixBlur={1} mixStrength={35} mirror={0.55} roughness={1} depthScale={1} minDepthThreshold={0.5} maxDepthThreshold={1.3} color="#dfe3ea" metalness={0.4} />
      </mesh>
      <Sparkles count={70} scale={[10, 3.5, 10]} position={[0, 1.6, 0]} size={3.2} speed={0.45} color="#c9a36a" />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={10} blur={2.6} far={3} />
    </>
  );
}

export default function Car3D({ progress, active = true }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} camera={{ position: [5.4, 2, 4.8], fov: 36 }} dpr={[1, 1.6]}>
      <color attach="background" args={['#eceff4']} />
      <fog attach="fog" args={['#eceff4', 9, 20]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} />
      <spotLight position={[-6, 6, -2]} intensity={60} angle={0.5} penumbra={1} color="#ffe9c4" />
      <Environment preset="city" />
      <Scene progress={progress} />
    </Canvas>
  );
}
