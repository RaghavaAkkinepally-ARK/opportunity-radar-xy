"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, Sparkles, Target, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    cgpa: "",
    goals: "",
    linkedinUrl: ""
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Load existing session info from login
      const existing = localStorage.getItem("opportunity_radar_user");
      const baseUser = existing ? JSON.parse(existing) : {};

      // Merged profile to persist to local storage
      const userProfile = {
        ...baseUser,
        name: profile.name || baseUser.name,
        email: profile.email || baseUser.email,
        skills: profile.skills.split(",").map(s => s.trim()),
        goals: profile.goals.split("\n").filter(g => g.trim()),
        experience: [] 
      };
      
      localStorage.setItem("opportunity_radar_user", JSON.stringify(userProfile));
      router.push("/dashboard");
    }
  };

  const simulateLinkedInConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      if (!profile.linkedinUrl) {
        setProfile({ ...profile, linkedinUrl: "https://linkedin.com/in/demo-user" });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 text-2xl font-black italic tracking-tighter">
            <Sparkles className="text-blue-500 fill-current" />
            OPPORTUNITY RADAR X
          </div>
        </div>

        <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="absolute h-full bg-blue-500 rounded-full"
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
                  <Briefcase className="text-blue-500" /> Welcome aboard.
                </h1>
                <p className="text-gray-500">First, tell us who you are and what you're building.</p>
              </div>
              <div className="space-y-4">
                <input 
                  placeholder="Your Full Name" 
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                />
                <textarea 
                  placeholder="Your Top Skills (comma separated)" 
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.skills}
                  onChange={e => setProfile({...profile, skills: e.target.value})}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
                  <GraduationCap className="text-blue-500" /> Academic context.
                </h1>
                <p className="text-gray-500">Let's refine your profile with academic metrics.</p>
              </div>
              <div className="space-y-4">
                <input 
                  type="number"
                  placeholder="Current CGPA" 
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.cgpa}
                  onChange={e => setProfile({...profile, cgpa: e.target.value})}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
                  <Briefcase className="text-[#0077B5]" /> Professional Network.
                </h1>
                <p className="text-gray-500">Connect LinkedIn to sync your experience and network strength.</p>
              </div>
              <div className="space-y-6">
                <div 
                  className={cn(
                    "p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all",
                    isConnected ? "bg-green-500/5 border-green-500/50" : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800"
                  )}
                >
                  {isConnected ? (
                    <>
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-xl text-green-600">LinkedIn Connected</p>
                        <p className="text-gray-500 text-sm">Profile data successfully synced.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-[#0077B5] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 rotate-3">
                        <Briefcase size={32} />
                      </div>
                      <button 
                        onClick={simulateLinkedInConnect}
                        disabled={isConnecting}
                        className={cn(
                          "bg-[#0077B5] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#006396] transition-all flex items-center gap-2",
                          isConnecting && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isConnecting ? "Syncing..." : "Connect LinkedIn"}
                      </button>
                    </>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-gray-800"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-black px-4 text-gray-500 font-bold">Or enter URL manually</span></div>
                </div>

                <input 
                  placeholder="linkedin.com/in/yourprofile" 
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.linkedinUrl}
                  onChange={e => setProfile({...profile, linkedinUrl: e.target.value})}
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
                  <Target className="text-blue-500" /> Defining goals.
                </h1>
                <p className="text-gray-500">What are you aiming for in the next 12 months?</p>
              </div>
              <div className="space-y-4">
                <textarea 
                  placeholder="Your Career Goals" 
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={profile.goals}
                  onChange={e => setProfile({...profile, goals: e.target.value})}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <button 
            onClick={() => setStep(Math.max(1, step - 1))}
            className={cn("text-gray-400 font-bold px-6", step === 1 && "invisible")}
          >
            Back
          </button>
          <button 
            onClick={nextStep}
            className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-blue-500/20"
          >
            {step === 4 ? "Launch Agent" : "Continue"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
