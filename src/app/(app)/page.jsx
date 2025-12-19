"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Meteors } from "../../components/ui/meteors";
import { Particles } from "../../components/ui/particles";
import RegisterButton from "../../components/RegisterButton";
import { Orbitron } from "next/font/google";
import { Phone, Users, FileText, Star, Clock, Home, Shield, Ticket } from "lucide-react";
import BeforYouDive from "../../components/HomePage/BeforeYouDive";
import HomeLast from "../../components/HomePage/HomeLast";
import HeroAdditions from "../../components/HomePage/first";


const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  display: "swap",
});

// Enhanced animations
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floatAnimation = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const shimmerEffect = {
  hidden: { backgroundPosition: "-200% center" },
  visible: {
    backgroundPosition: "200% center",
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity
    }
  }
};

const glowPulse = {
  pulse: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.5)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

export default function Page() {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.3]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-100 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Particles />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <Meteors number={20} />

      {/* Enhanced Glow Effects */}
      <motion.div
        style={{
          y: glowY,
          opacity: glowOpacity,
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[120vh] blur-[120px] z-[1]"
      >
        <div className="w-full h-full bg-gradient-to-b from-cyan-500/20 via-purple-500/15 to-transparent" />
      </motion.div>

      {/* Enhanced Grid Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent)] z-[2]"
      />

      {/* Main Content */}
      <div className="relative z-10  ">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center z-100 h-screen flex flex-col justify-center items-center"
        >
          <motion.div
            variants={floatAnimation}
            animate="float"
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-cyan-500/30 rounded-full blur-lg"
              />
              <motion.h1
                className={`${orbitron.className} relative text-6xl sm:text-7xl md:text-9xl font-black mb-6`}
                variants={shimmerEffect}
                initial="hidden"
                animate="visible"
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #a5b4fc 25%, #ffffff 50%, #a5b4fc 75%, #ffffff 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PLINTH
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <motion.p
            className="text-lg sm:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
            variants={fadeUp}
            custom={0.3}
          >
            Where{" "}
            <span className="text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              innovation ignites excitement
            </span>
            . Dive into a universe of cutting-edge technology, boundless creativity, and unforgettable experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mt-12"
          >
            <HeroAdditions />
            <RegisterButton />
          </motion.div>
        </motion.section>

        <BeforYouDive />
        <HomeLast fadeUp={fadeUp} glowPulse={glowPulse} />


      </div>
    </div>
  );
}