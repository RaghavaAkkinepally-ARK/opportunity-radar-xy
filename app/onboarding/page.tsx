"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, Sparkles, Target, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    cgpa: "",
    goals: ""
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/dashboard");
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
            animate={{ width: `${(step / 3) * 100}%` }}
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
            className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
          >
            {step === 3 ? "Launch Agent" : "Continue"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
