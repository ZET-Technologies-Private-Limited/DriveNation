'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { RotateCcw, Maximize2, Info } from 'lucide-react'

interface CarViewer3DProps {
  carName: string
  carColor?: string
}

// 3D Car Model Component - Creates a stylized car shape
function StylizedCar({ color = '#E8E8E8' }) {
  const groupRef = useRef<THREE.Group>(null)
  const autoRotate = useRef(true)

  useFrame(() => {
    if (groupRef.current && autoRotate.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {/* Car Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 1.2, 4.8]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          emissive={0x222222}
        />
      </mesh>

      {/* Car Roof/Top */}
      <mesh position={[0, 1.6, -0.2]}>
        <boxGeometry args={[1.8, 0.8, 2.4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.1}
          emissive={0x222222}
        />
      </mesh>

      {/* Front Windshield */}
      <mesh position={[0, 1.4, -1.8]}>
        <boxGeometry args={[1.9, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.4}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* Rear Windshield */}
      <mesh position={[0, 1.4, 1.6]}>
        <boxGeometry args={[1.9, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.4}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* Wheels */}
      {[-0.9, 0.9].map((xPos) =>
        [-1.2, 1.2].map((zPos) => (
          <group key={`wheel-${xPos}-${zPos}`} position={[xPos, 0.45, zPos]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Wheel rim */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))
      )}

      {/* Headlights */}
      {[-0.7, 0.7].map((xPos) => (
        <mesh key={`light-${xPos}`} position={[xPos, 0.9, -2.4]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            emissive={0xffff00}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Side Mirror */}
      <mesh position={[-1.1, 1.2, 0.8]}>
        <boxGeometry args={[0.2, 0.3, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[1.1, 1.2, 0.8]}>
        <boxGeometry args={[0.2, 0.3, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Fallback Loading Component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Loading 3D Model...</p>
      </div>
    </div>
  )
}

export default function CarViewer3D({ carName, carColor = '#1f2937' }: CarViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleReset = () => {
    if (containerRef.current?.querySelector('canvas')) {
      // This would be handled by OrbitControls reset
      window.location.reload()
    }
  }

  return (
    <div className="w-full space-y-4">
      <div
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg overflow-hidden h-96 border border-gray-700"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
            {/* Lighting */}
            <ambientLight intensity={0.6} color="#ffffff" />
            <directionalLight
              position={[10, 15, 10]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <directionalLight position={[-10, 8, -5]} intensity={0.4} color="#87ceeb" />
            <pointLight position={[5, 5, -5]} intensity={0.4} color="#ffaaff" />

            {/* Environment */}
            <Environment preset="studio" background />

            {/* Camera */}
            <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />

            {/* Car Model */}
            <StylizedCar color={carColor} />

            {/* Ground Plane */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial
                color="#2a2a2a"
                metalness={0.4}
                roughness={0.6}
              />
            </mesh>

            {/* Orbit Controls */}
            <OrbitControls
              autoRotate
              autoRotateSpeed={2}
              enableZoom={true}
              enablePan={true}
              minDistance={8}
              maxDistance={20}
            />
          </Canvas>
        </Suspense>

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur text-sm">
          <p className="font-semibold">{carName}</p>
          <p className="text-xs text-gray-300">Drag to rotate • Scroll to zoom</p>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handleReset}
            className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all"
            aria-label="Reset view"
            title="Reset camera position"
          >
            <RotateCcw size={20} />
          </button>
          <button
            className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all"
            aria-label="Fullscreen"
            title="Enter fullscreen"
            onClick={() => containerRef.current?.requestFullscreen()}
          >
            <Maximize2 size={20} />
          </button>
        </div>

        {/* Help Tooltip */}
        <div className="absolute bottom-4 left-4 group">
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-2 rounded-full transition-all">
            <Info size={20} />
          </button>
          <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 bg-gray-900 text-white text-xs p-2 rounded whitespace-nowrap">
            Interactive 3D viewer
          </div>
        </div>
      </div>

      {/* Features Info */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">3D Viewer Features</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>✓ Drag mouse to rotate the car 360°</li>
          <li>✓ Scroll to zoom in and out</li>
          <li>✓ Auto-rotation with smooth lighting</li>
          <li>✓ Professional studio environment</li>
        </ul>
      </div>
    </div>
  )
}
