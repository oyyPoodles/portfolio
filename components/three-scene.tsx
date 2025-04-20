"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import THREE with no SSR
const THREE = dynamic(() => import("three"), { ssr: false })

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set isClient to true when component mounts (client-side only)
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run this effect on the client side
    if (!isClient || !containerRef.current) return

    // Import THREE dynamically
    import("three").then((THREE) => {
      // Scene setup
      const scene = new THREE.Scene()

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 2000

      const posArray = new Float32Array(particlesCount * 3)
      const colorsArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i++) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 10

        // Colors - purple to pink gradient
        if (i % 3 === 0) {
          colorsArray[i] = Math.random() * 0.5 + 0.3 // R: 0.3-0.8
          colorsArray[i + 1] = Math.random() * 0.3 // G: 0-0.3
          colorsArray[i + 2] = Math.random() * 0.5 + 0.5 // B: 0.5-1.0
        }
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

      // Material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })

      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      // Mouse movement effect
      let mouseX = 0
      let mouseY = 0

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      }

      window.addEventListener("mousemove", handleMouseMove)

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)

        particlesMesh.rotation.x += 0.0005
        particlesMesh.rotation.y += 0.0005

        // Follow mouse with slight delay
        particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.05
        particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.05

        renderer.render(scene, camera)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("mousemove", handleMouseMove)
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        particlesGeometry.dispose()
        particlesMaterial.dispose()
      }
    })
  }, [isClient])

  return <div ref={containerRef} className="absolute inset-0" />
}
