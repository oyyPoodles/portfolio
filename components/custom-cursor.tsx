"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

export default function CustomCursor({ mousePosition }: CustomCursorProps) {
  const [cursorVariant, setCursorVariant] = useState("default")
  const [internalMousePosition, setInternalMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleMouseMove = (e: MouseEvent) => {
      setInternalMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleMouseDown = () => setCursorVariant("click")
    const handleMouseUp = () => setCursorVariant("default")

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const handleLinkHover = () => setCursorVariant("hover")
    const handleLinkLeave = () => setCursorVariant("default")

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: internalMousePosition.x - 16,
      y: internalMousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: internalMousePosition.x - 24,
      y: internalMousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(147, 51, 234, 0.6)",
      mixBlendMode: "difference" as const,
    },
    click: {
      x: internalMousePosition.x - 16,
      y: internalMousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(147, 51, 234, 0.8)",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}
