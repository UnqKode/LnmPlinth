"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";
import { useData } from "../../../context/form.context";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Rocket, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  School, 
  X,
  Plus,
  ArrowLeft,
  Check,
  Sparkles,
  Satellite,
  User,
  Trophy,
  Download,
  Zap
} from "lucide-react";
import { Particles } from "../../../components/ui/particles";
import { Meteors } from "../../../components/ui/meteors";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export default function Page() {
  const router = useRouter();
  const [day, setDay] = useState("");
  const [members, setMembers] = useState([
    { name: "", college: "", contact: "", email: "" },
  ]);
  const { setFormData } = useData();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventInput, setEventInput] = useState("");
  const [referral, setReferral] = useState("");
  const [comments, setComments] = useState("");
  const [needsAccommodation, setNeedsAccommodation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codes] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  const addMember = () => {
    setMembers([...members, { name: "", college: "", contact: "", email: "" }]);
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      setMembers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleEventInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEvent();
    }
  };

  const addEvent = () => {
    const trimmedEvent = eventInput.trim();
    if (trimmedEvent && !selectedEvents.includes(trimmedEvent)) {
      setSelectedEvents([...selectedEvents, trimmedEvent]);
      setEventInput("");
      toast.success(`🎯 Event "${trimmedEvent}" added!`);
    } else if (selectedEvents.includes(trimmedEvent)) {
      toast.error("This event is already added!");
    }
  };

  const removeEvent = (eventToRemove) => {
    setSelectedEvents(selectedEvents.filter(event => event !== eventToRemove));
    toast.success("Event removed!");
  };

  const downloadBrochure = () => {
    // Replace this URL with your actual brochure URL
    const brochureUrl = "/brochure.pdf"; // Update with actual path
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'Plinth_2026_Event_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("📥 Downloading brochure...");
  };

  const validatedFinalData = (data) => {
    if (!data.day) {
      toast.error("🚀 Please select a day pass before proceeding.");
      return false;
    }

    if (!data.members || data.members.length === 0) {
      toast.error("👥 Please add at least one team member.");
      return false;
    }

    for (let i = 0; i < data.members.length; i++) {
      const member = data.members[i];
      const missingFields = [];

      if (!member.name) missingFields.push("Name");
      if (!member.college) missingFields.push("College");
      if (!member.contact) missingFields.push("Contact Number");
      if (!member.email) missingFields.push("Email");

      if (missingFields.length > 0) {
        toast.error(
          `⚠️ Member ${i + 1} missing: ${missingFields.join(", ")}`
        );
        return false;
      }

      if (!/^(?:\+91)?\d{10}$/.test(member.contact)) {
        toast.error(`📞 Invalid contact number for Member ${i + 1}`);
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
        toast.error(`📧 Invalid email format for Member ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      day,
      members,
      teamSize: members.length.toString(),
      selectedEvents,
      referral,
      comments,
      needsAccommodation: day === "All" ? false : needsAccommodation,
      totalAmount: "0",
    };

    if (!validatedFinalData(finalData)) {
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFormData(finalData);

    
    toast.success("🚀 Registration successful! Launching to confirmation...");
    router.push("/confirmRegistration");
  };

  const backPage = () => {
    router.back();
  };

  const steps = [
    { number: 1, title: "Day Pass", icon: Calendar },
    { number: 2, title: "Team Details", icon: Users },
    { number: 3, title: "Review & Launch", icon: Rocket },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
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
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className={`text-center mb-8 ${orbitron.className}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <Satellite className="w-8 h-8 text-cyan-400" />
              <Sparkles className="w-6 h-6 text-purple-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              PLINTH 2026
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl"
            >
              Mission Registration
            </motion.p>
          </div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="flex items-center gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      activeStep >= step.number
                        ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400"
                        : "bg-black/50 border-gray-700"
                    } transition-all duration-300`}
                  >
                    <step.icon className={`w-5 h-5 ${
                      activeStep >= step.number ? "text-cyan-400" : "text-gray-500"
                    }`} />
                    {activeStep > step.number && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ${
                      activeStep > step.number ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gray-700"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-black/60 to-gray-900/40 border border-gray-800/50 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10"
          >
            {/* Glow Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative space-y-8">
              {/* Day Pass Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Mission Duration</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "DAY1", label: "Day 1", desc: "Launch Day - 23rd Jan", color: "from-cyan-500/20 to-blue-500/20" },
                    { value: "DAY2", label: "Day 2", desc: "Orbit Phase - 24th Jan", color: "from-blue-500/20 to-purple-500/20" },
                    { value: "DAY3", label: "Day 3", desc: "Nebula Night - 25th Jan", color: "from-purple-500/20 to-pink-500/20" },
                    { value: "All", label: "Full Mission", desc: "Complete Journey - All Days", color: "from-yellow-500/20 to-orange-500/20" },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setDay(option.value);
                        setActiveStep(2);
                      }}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                        day === option.value
                          ? "border-cyan-400 bg-gradient-to-br from-cyan-500/10 to-blue-500/5"
                          : "border-gray-700 bg-black/30 hover:border-gray-600"
                      }`}
                    >
                      <div className={`absolute -inset-1 bg-gradient-to-br ${option.color} opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-md pointer-events-none`} />
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full mb-3 ${
                          day === option.value ? "bg-cyan-400 animate-pulse" : "bg-gray-600"
                        }`} />
                        <h3 className="text-lg font-semibold text-white mb-2">{option.label}</h3>
                        <p className="text-sm text-gray-400">{option.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <AnimatePresence>
                {day && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Accommodation Option */}
                    {day !== "All" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={needsAccommodation}
                              onChange={(e) => setNeedsAccommodation(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                              needsAccommodation
                                ? "bg-gradient-to-br from-cyan-500 to-blue-500 border-transparent"
                                : "border-gray-600 bg-black/30"
                            }`}>
                              {needsAccommodation && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          <span className="text-gray-300">
                            🏕️ I need accommodation for the night
                          </span>
                        </label>
                      </motion.div>
                    )}

                    {/* Events Section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="space-y-4 mb-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/10">
                            <Trophy className="w-5 h-5 text-purple-400" />
                          </div>
                          <h2 className="text-xl font-semibold text-white">Event Selection</h2>
                        </div>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={downloadBrochure}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm font-medium">Download Brochure</span>
                        </motion.button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={eventInput}
                            onChange={(e) => setEventInput(e.target.value)}
                            onKeyPress={handleEventInputKeyPress}
                            placeholder="Type event name and press Enter..."
                            className="flex-1 bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none transition-colors"
                          />
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addEvent}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </motion.button>
                        </div>

                        {/* Selected Events Display */}
                        {selectedEvents.length > 0 && (
                          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                            <AnimatePresence>
                              {selectedEvents.map((event, index) => (
                                <motion.div
                                  key={event}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white"
                                >
                                  <Zap className="w-3 h-3 text-purple-400" />
                                  <span className="text-sm font-medium">{event}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeEvent(event)}
                                    className="ml-1 w-5 h-5 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center text-red-400 transition-all duration-200"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" />
                          Press Enter or click Add to include events
                        </p>
                      </div>
                    </motion.div>

                    {/* Team Members */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/10">
                            <Users className="w-5 h-5 text-blue-400" />
                          </div>
                          <h2 className="text-xl font-semibold text-white">Crew Members</h2>
                        </div>
                        <span className="text-sm text-gray-500 px-3 py-1 rounded-full bg-gray-900/50">
                          {members.length} astronaut{members.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <AnimatePresence>
                          {members.map((member, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative group"
                            >
                              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              
                              <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 border border-gray-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                                      <span className="text-sm font-semibold text-cyan-400">{index + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Astronaut {index + 1}</h3>
                                  </div>
                                  
                                  {members.length > 1 && (
                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => removeMember(index)}
                                      className="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 transition-colors"
                                    >
                                      <X className="w-4 h-4" />
                                    </motion.button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                      <User className="w-4 h-4" />
                                      Full Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={member.name}
                                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                      placeholder="Neil Armstrong"
                                      required
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                      <School className="w-4 h-4" />
                                      College *
                                    </label>
                                    <input
                                      type="text"
                                      value={member.college}
                                      onChange={(e) => handleMemberChange(index, "college", e.target.value)}
                                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                      placeholder="Space University"
                                      required
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                      <Phone className="w-4 h-4" />
                                      Contact Number *
                                    </label>
                                    <input
                                      type="tel"
                                      value={member.contact}
                                      onChange={(e) => handleMemberChange(index, "contact", e.target.value)}
                                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                      placeholder="+91 98765 43210"
                                      required
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                      <Mail className="w-4 h-4" />
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      value={member.email}
                                      onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                                      className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                      placeholder="astronaut@space.com"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={addMember}
                          className="w-full border-2 border-dashed border-gray-700 hover:border-cyan-500/50 rounded-2xl py-5 text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 group-hover:from-cyan-500/20 group-hover:to-blue-500/10 transition-colors">
                            <Plus className="w-5 h-5" />
                          </div>
                          <span className="text-lg">Add Crew Member</span>
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-4 pt-8"
                    >
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={backPage}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-300"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Mission Control
                      </motion.button>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-100 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                        
                        <div className="relative bg-black rounded-2xl px-8 py-4 m-0.5 flex items-center justify-center gap-3">
                          {loading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                              <span className="text-lg font-semibold text-cyan-400">Launching...</span>
                            </div>
                          ) : (
                            <>
                              <Rocket className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
                              <span className="text-lg font-semibold text-white">
                                Initiate Launch Sequence
                              </span>
                            </>
                          )}
                        </div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 text-sm">
              Powered by{" "}
              <span className="text-cyan-400 font-semibold">PLINTH 2026</span>{" "}
              • Interstellar Event Management
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}