"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download, Github, Linkedin, Twitter, Mail, ChevronDown, Brain, Code, Database, Server, Cpu } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import CustomCursor from "@/components/custom-cursor"
import dynamic from "next/dynamic"
const ThreeScene = dynamic(() => import("@/components/three-scene"), { ssr: false })
import ProjectCard from "@/components/project-card"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const aboutOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0])
  const techOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0])
  const projectsOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [0, 1, 0])
  const contactOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])

  // Track mouse position for custom cursor
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Update active section based on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("hero")
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection("about")
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection("tech")
      } else if (scrollPosition < windowHeight * 3.5) {
        setActiveSection("projects")
      } else {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Resume download function
  const downloadResume = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "My resume.pdf" // Path to the resume file
    link.download = "Ujjwal-Chaudhary-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadCV = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "/cv-ujjwal-chaudhary.pdf" // Path to the CV file
    link.download = "Ujjwal-Chaudhary-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor mousePosition={mousePosition} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            UJJWAL<span className="text-purple-500">.</span>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["hero", "about", "tech", "projects", "contact"].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={cn(
                  "text-sm uppercase tracking-wider hover:text-purple-400 transition-colors",
                  activeSection === section ? "text-purple-500" : "text-white/70",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.a>
            ))}
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              onClick={downloadResume}
            >
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
            <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={downloadCV}>
              <Download className="mr-2 h-4 w-4" /> CV
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>
        <motion.div className="container mx-auto px-4 z-10 text-center" style={{ y: heroTextY, opacity: heroOpacity }}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            UJJWAL CHAUDHARY
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl mb-8 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI/ML Engineer & Researcher
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm border-purple-500/50">
              Machine Learning
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-blue-500/50">
              Deep Learning
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-cyan-500/50">
              Space Technology
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-green-500/50">
              Artificial Intelligence
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-yellow-500/50">
              Data Science
            </Badge>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <a href="#about" className="text-white/50 hover:text-white">
            <ChevronDown className="h-8 w-8" />
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="min-h-screen flex items-center py-20 bg-gradient-to-b from-black to-purple-950/20"
        style={{ opacity: aboutOpacity }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About <span className="text-purple-500">Me</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-purple-500/50 relative">
                <Image
                  src="/mypic.png?height=600&width=600"
                  alt="Ujjwal Chaudhary"
                  width={600}
                  height={600}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-black p-4 rounded-xl border border-purple-500/50">
                <Brain className="h-12 w-12 text-purple-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">AI/ML Engineer | Researcher | Technical Innovator</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                I'm Ujjwal Chaudhary, a passionate AI/ML Engineer with expertise in developing cutting-edge solutions
                that leverage artificial intelligence and machine learning technologies. With a strong foundation in
                computer science and a deep understanding of advanced algorithms, I specialize in creating intelligent
                systems that solve complex problems.
              </p>
              <p className="text-white/80 mb-8 leading-relaxed">
                My journey in the field of AI has led me to work on diverse projects ranging from computer vision
                applications to natural language processing systems. I'm constantly exploring new technologies and
                methodologies to push the boundaries of what's possible in the realm of artificial intelligence.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-white/70">1+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-white/70">10+ Projects Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-white/70">Research Publications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-white/70">Technical Speaker</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech"
        className="min-h-screen flex items-center py-20 bg-gradient-to-b from-purple-950/20 to-black"
        style={{ opacity: techOpacity }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tech <span className="text-purple-500">Stack</span>
          </motion.h2>

          <Tabs defaultValue="ml" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12">
              <TabsTrigger value="ml" className="data-[state=active]:bg-purple-600">
                <Brain className="h-4 w-4 mr-2" /> AI/ML
              </TabsTrigger>
              <TabsTrigger value="languages" className="data-[state=active]:bg-purple-600">
                <Code className="h-4 w-4 mr-2" /> Languages
              </TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-purple-600">
                <Database className="h-4 w-4 mr-2" /> Data
              </TabsTrigger>
              <TabsTrigger value="cloud" className="data-[state=active]:bg-purple-600">
                <Server className="h-4 w-4 mr-2" /> Cloud
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600">
                <Cpu className="h-4 w-4 mr-2" /> Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ml" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "TensorFlow", level: 95 },
                  { name: "PyTorch", level: 90 },
                  { name: "Scikit-Learn", level: 95 },
                  { name: "Keras", level: 90 },
                  { name: "OpenCV", level: 85 },
                  { name: "NLTK", level: 80 },
                  { name: "Hugging Face", level: 85 },
                  { name: "SpaCy", level: 75 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-6 hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <h3 className="text-lg font-medium mb-3">{tech.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{tech.level}%</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="languages" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Python", level: 95 },
                  { name: "C", level: 75 },
                  { name: "JavaScript", level: 70 },
                  { name: "Java", level: 70 },
                  { name: "C++", level: 70 },
                  { name: "SQL", level: 90 },
                  { name: "PHP", level: 65 },
                  { name: "#", level: 60 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-6 hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <h3 className="text-lg font-medium mb-3">{tech.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{tech.level}%</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Pandas", level: 95 },
                  { name: "NumPy", level: 95 },
                  { name: "MySQL", level: 85 },
                  { name: "Plotly", level: 80 },
                  { name: "Keras", level: 75 },
                  { name: "Seaborn", level: 80 },
                  { name: "SciPy", level: 80 },
                  { name: "Matplotlib", level: 90 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-6 hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <h3 className="text-lg font-medium mb-3">{tech.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{tech.level}%</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cloud" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "AWS", level: 50 },
                  { name: "Google Cloud", level: 80 },
                  { name: "Azure", level: 40 },
                  { name: "MLflow", level: 50 },
                  { name: "Kubeflow", level: 30 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-6 hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <h3 className="text-lg font-medium mb-3">{tech.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-2.5 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{tech.level}%</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Git", level: 90 },
                  { name: "Jupyter", level: 95 },
                  { name: "VS Code", level: 90 },
                  { name: "PyCharm", level: 85 },
                  { name: "Bash", level: 85 },
                  { name: "Colab", level: 85 },
                  { name: "Gemini", level: 85 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-6 hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                  >
                    <h3 className="text-lg font-medium mb-3">{tech.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-2.5 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{tech.level}%</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="min-h-screen flex items-center py-20"
        style={{ opacity: projectsOpacity }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured <span className="text-purple-500">Projects</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="NurtureX - AI Powered Chatbot for Lead Automation"
              description="An AI-powered chatbot that automates lead generation and nurturing using natural language processing and machine learning."
              image="/chatbot.jpg?height=300&width=400"
              tags={["Node.js", "Express.js", "NLP", "Machine Learning", "Chatbot", "Lead Automation", "CRM", "Multilingual Support"]}
              link="https://github.com/oyyPoodles/Nurture-X---AI-powered-Chatbot-for-Lead-Automation"
            />

            <ProjectCard
              title="Bayesian Decision Theory for Fraud Detection in Credit Card Transactions"
              description="A credit card fraud detection system that leverages Bayesian Decision Theory to classify transactions with probabilistic accuracy."
              image="/fraud.jpg?height=300&width=400"
              tags={["Bayesian Decision Theory", "Pattern Classification", "Credit Card Fraud", "Python"]}
              link="https://github.com/oyyPoodles/Bayesian-Decision-Theory---Fraud-Detection"
            />

            <ProjectCard
              title="To-Do List Application"
              description="A task management Android app built using Java and Android Studio, designed to create, update, and organize daily tasks efficiently."
              image="/to do.jpeg?height=300&width=400"
              tags={["Java", "Android Studio", "Mobile App"]}
              link="https://github.com/oyyPoodles/to-do-list"
            />

            <ProjectCard
              title="K-Means Clustering for Iris Dataset"
              description="An unsupervised learning project applying K-Means clustering to group Iris flower species based on their morphological features."
              image="/k.jpg?height=300&width=400"
              tags={["K-Means", "Clustering", "Unsupervised Learning", "Iris Dataset"]}
              link="https://github.com/oyyPoodles/K-Means-Clustering-of-IRIS-Dataset"
            />

            <ProjectCard
              title="Event Management System"
              description="A full-stack web application to streamline event planning, registration, and management using PHP and MySQL."
              image="/event.jpg?height=300&width=400"
              tags={["PHP", "MySQL", "Web App", "Event Management"]}
              link="https://github.com/oyyPoodles/Event-Management-System"
            />

            <ProjectCard
              title="Conversational AI Assistant"
              description="End-to-end conversational AI system with natural language understanding and generation capabilities."
              image="/CAA.png?height=300&width=400"
              tags={["NLU", "NLG", "Dialogue Systems"]}
              link="https://github.com/oyyPoodles/Conversational-AI-Assistant"
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              asChild
            >
              <Link href="https://github.com/oyyPoodles" target="_blank">
                <Github className="mr-2 h-4 w-4" /> View All Projects on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="min-h-screen flex items-center py-20 bg-gradient-to-b from-black to-purple-950/30"
        style={{ opacity: contactOpacity }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In <span className="text-purple-500">Touch</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out to me through any of the platforms below.
              </p>

              <div className="space-y-6">
                <Link
                  href="mailto:chaudharyujjwal111@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-white/70">chaudharyujjwal111@gmail.com</p>
                  </div>
                </Link>

                <Link
                  href="https://linkedin.com/in/ujjwal-chaudhary"
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Linkedin className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-white/70">linkedin.com/in/ujjwal-chaudhary</p>
                  </div>
                </Link>

                <Link
                  href="https://x.com/U__Chaudhary"
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Twitter className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Twitter</h4>
                    <p className="text-white/70">@ujjwal_ai</p>
                  </div>
                </Link>

                <Link
                  href="https://github.com/oyyPoodles"
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-purple-900/20 transition-colors border border-purple-500/20 hover:border-purple-500/50"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Github className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-white/70">github.com/ujjwal-chaudhary</p>
                  </div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-purple-500/20"
            >
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="text-xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            UJJWAL CHAUDHARY<span className="text-purple-500">.</span>
          </motion.div>
          <p className="text-white/60 mb-6">AI/ML Engineer | Researcher | Technical Innovator</p>
          <div className="flex justify-center space-x-6 mb-8">
            <Link
              href="https://github.com/ujjwal-chaudhary"
              target="_blank"
              className="text-white/60 hover:text-purple-500"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/ujjwal-chaudhary"
              target="_blank"
              className="text-white/60 hover:text-purple-500"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/U__Chaudhary" target="_blank" className="text-white/60 hover:text-purple-500">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="mailto:chaudharyujjwal111@gmail.com" className="text-white/60 hover:text-purple-500">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              onClick={downloadResume}
            >
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
            <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={downloadCV}>
              <Download className="mr-2 h-4 w-4" /> CV
            </Button>
          </div>
          <p className="text-white/40 text-sm mt-8">
            © {new Date().getFullYear()} Ujjwal Chaudhary. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
