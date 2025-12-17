"use client";
import { useRouter } from "next/navigation";
import { Particles } from "../../../components/ui/particles";
import { useData } from "../../../context/form.context";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  Mail,
  Phone,
  Calendar,
  Users,
  Trophy,
  Rocket,
} from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export default function ThankYouPage() {
  const router = useRouter();
  const { formData } = useData();
  const [confetti, setConfetti] = useState(true);
  const hasSubmitted = useRef(false); // Prevent double submission

  useEffect(() => {
    // Redirect back if formData is missing
    if (!formData?.day) {
      router.push("/");
      return;
    }

    // Submit data to Google Sheets only once
    const submitToSheet = async () => {
      // Prevent duplicate submissions
      if (hasSubmitted.current) {
        console.log("Already submitted, skipping duplicate call");
        return;
      }

      hasSubmitted.current = true;

      try {
        console.log("Submitting to Google Sheets...");
        const response = await fetch("/api/sheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok || result.status === "error") {
          console.error("Failed to save to Google Sheets:", result.message);
          hasSubmitted.current = false; // Allow retry on error
        } else {
          console.log("✅ Successfully saved to Google Sheets");
        }
      } catch (error) {
        console.error("Error submitting to sheet:", error);
        hasSubmitted.current = false; // Allow retry on error
      }
    };

    submitToSheet();

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [formData, router]);

  // Render nothing or a loader while redirecting
  if (!formData?.day) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: [
                  "#06b6d4",
                  "#8b5cf6",
                  "#3b82f6",
                  "#10b981",
                  "#f59e0b",
                  "#ef4444",
                ][Math.floor(Math.random() * 6)],
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-full blur-2xl"
              />
              <CheckCircle
                className="w-24 h-24 text-green-400 relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-black/60 to-gray-900/40 border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Glow Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 pointer-events-none" />

            <div className="relative space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4"
                >
                  <Sparkles className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium tracking-wide uppercase">
                    Registration Successful
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`${orbitron.className} text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent`}
                >
                  Thank You!
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                >
                  Thank you for registering with{" "}
                  <span className="text-cyan-400 font-semibold">
                    PLINTH 2026
                  </span>
                  !
                  <br />
                  Our team will contact you soon with further details.
                </motion.p>
              </div>

              {/* Registration Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Team Lead */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Team Lead
                      </p>
                      <p className="text-white font-semibold">
                        {formData.members[0]?.name}
                      </p>
                    </div>
                  </div>

                  {/* Day Pass */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/10">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Day Pass
                      </p>
                      <p className="text-white font-semibold">{formData.day}</p>
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/10">
                      <Rocket className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Team Size
                      </p>
                      <p className="text-white font-semibold">
                        {formData.members.length} Members
                      </p>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/10">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/10">
                      <Trophy className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Events
                      </p>
                      <p className="text-white font-semibold">
                        {formData.selectedEvents?.length || 0} Selected
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/30 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  What's Next?
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>Our team will review your registration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>
                      You'll receive a confirmation email within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>
                      Payment details and instructions will be shared via email
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Support Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20"
              >
                <p className="text-gray-300 text-sm">
                  Need help? Contact{" "}
                  <span className="font-semibold text-white">
                    Kaustubh Sharma
                  </span>{" "}
                  at{" "}
                  <a
                    href="tel:7976533487"
                    className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    7976533487
                  </a>
                </p>
              </motion.div>

              {/* Back to Home Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="text-center pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Back to Home</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 text-sm">
              Powered by{" "}
              <span className="text-cyan-400 font-semibold">PLINTH 2026</span> •
              Interstellar Event Management
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}