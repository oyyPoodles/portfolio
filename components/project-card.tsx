"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

export default function ProjectCard({ title, description, image, tags, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-purple-500/20 bg-black/50 backdrop-blur-sm h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <CardContent className="p-6 flex-grow">
          <p className="text-white/70 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-purple-500/50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white gap-2"
            asChild
          >
            <Link href={link} target="_blank">
              <Github className="h-4 w-4" /> View Project <ArrowUpRight className="h-3 w-3 ml-auto" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
