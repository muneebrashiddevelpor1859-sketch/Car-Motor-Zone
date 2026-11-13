'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';

const steel = { color: '#cfd3da', metalness: 1, roughness: 0.15 };
const dark = { color: '#16181d', metalness: 0.6, roughness: 0.45 };
const gold = { color: '#b58a4a', metalness: 1, roughness: 0.22 };

function Rim() {
  const r = useRef();
  useFrame((_, dt) => (r.current.rotation.z -= dt * 0.8));
  return (
    <group ref={r}>
      <mesh><torusGeometry args={[1.05, 0.4, 24, 72]} /><meshStandardMaterial {...dark} roughness={0.8} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.82, 0.82, 0.5, 64, 1, true]} /><meshStandardMaterial {...steel} side={2} /></mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 6]} position={[0, 0, 0]}>
          <mesh position={[0.45, 0, 0]}><boxGeometry args={[0.8, 0.16, 0.12]} /><meshStandardMaterial {...steel} /></mesh>
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.2, 32]} /><meshStandardMaterial {...gold} /></mesh>
    </group>
  );
}

function Disc() {
  const r = useRef();
  useFrame((_, dt) => (r.current.rotation.z += dt * 1.1));
  return (
    <group>
      <group ref={r}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.1, 1.1, 0.14, 72]} /><meshStandardMaterial {...steel} roughness={0.3} /></mesh>
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 14;
          return <mesh key={i} position={[Math.cos(a) * 0.78, Math.sin(a) * 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.07, 0.2, 16]} /><meshStandardMaterial {...dark} /></mesh>;
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.38, 0.38, 0.3, 40]} /><meshStandardMaterial {...steel} /></mesh>
      </group>
      <mesh position={[0, 0.95, 0]}><boxGeometry args={[0.9, 0.55, 0.4]} /><meshStandardMaterial {...gold} /></mesh>
    </group>
  );
}

function Gear({ teeth = 14, radius = 0.85, speed = 1, position = [0, 0, 0] }) {
  const r = useRef();
  useFrame((_, dt) => (r.current.rotation.z += dt * speed));
  return (
    <group ref={r} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[radius, radius, 0.3, 48]} /><meshStandardMaterial {...gold} /></mesh>
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i * Math.PI * 2) / teeth;
        return <mesh key={i} position={[Math.cos(a) * (radius + 0.08), Math.sin(a) * (radius + 0.08), 0]} rotation={[0, 0, a]}><boxGeometry args={[0.22, 0.2, 0.3]} /><meshStandardMaterial {...gold} /></mesh>;
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.25, 0.25, 0.36, 24]} /><meshStandardMaterial {...dark} /></mesh>
    </group>
  );
}

function Engine() {
  return (
    <group>
      <Gear teeth={14} radius={0.85} speed={0.9} position={[-0.75, 0, 0]} />
      <Gear teeth={10} radius={0.58} speed={-1.29} position={[0.98, 0.38, 0]} />
    </group>
  );
}

const parts = [<Rim key="rim" />, <Disc key="disc" />, <Engine key="eng" />];

function Scene({ active, progress }) {
  const refs = [useRef(), useRef(), useRef()];
  const root = useRef();
  useFrame((state, dt) => {
    refs.forEach((r, i) => {
      const t = i === active ? 1 : 0;
      const tx = (i - active) * 4.2;
      const s = r.current.scale.x + ((t ? 1.25 : 0.55) - r.current.scale.x) * Math.min(1, dt * 5);
      r.current.scale.setScalar(s);
      r.current.position.x += (tx - r.current.position.x) * Math.min(1, dt * 5);
    });
    root.current.rotation.y += ((state.pointer.x * 0.5 + progress.current * 1.6) - root.current.rotation.y) * 0.06;
    root.current.rotation.x += ((-state.pointer.y * 0.25) - root.current.rotation.x) * 0.06;
  });
  return (
    <group ref={root}>
      {parts.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
          <group ref={refs[i]} position={[(i - active) * 4.2, 0, 0]}>{p}</group>
        </Float>
      ))}
    </group>
  );
}

export default function Parts3D({ active, progress, running }) {
  return (
    <Canvas frameloop={running ? 'always' : 'never'} camera={{ position: [0, 0.6, 6.5], fov: 40 }} dpr={[1, 1.25]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#ffd9a0" />
      <Environment preset="city" />
      <Scene active={active} progress={progress} />
      <ContactShadows position={[0, -1.7, 0]} opacity={0.35} scale={14} blur={2.8} far={4} />
    </Canvas>
  );
}
