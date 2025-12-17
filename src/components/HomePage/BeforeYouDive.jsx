"use client";

import React from "react";
import {
  Shield,
  Clock,
  Tent,
  Users,
  Sparkles,
} from "lucide-react";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  display: "swap",
});

const contentData = [
  {
    icon: Clock,
    text: "Pronite extends until 1 AM for everyone.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Shield,
    text: "Stay on campus for safety instead of late travel.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Tent,
    text: "Free accommodation with every ProNite pass.",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: Users,
    text: "Team available 24/7. Let's make Plinth safe!",
    gradient: "from-purple-400 to-pink-500",
  },
];

export default function BeforeYouDive() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#09051422] py-20 px-6 sm:px-10">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/[0.03] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/[0.03] blur-3xl rounded-full pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">
              Safety First
            </span>
          </div>

          <h2
            className={`${orbitron.className} text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight`}
          >
            Before You{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Dive
            </span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Essential information to ensure a safe, smooth, and unforgettable
            Plinth experience.
          </p>
        </div>

        {/* Cards */}
        <ul className="space-y-4">
          {contentData.map((item, idx) => (
            <li
              key={idx}
              className="group animate-slide-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/20 group-hover:bg-white/[0.05]">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-gray-300 text-lg leading-relaxed pt-2 group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}