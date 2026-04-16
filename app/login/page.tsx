"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, ArrowRight, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsAuthenticating(true);
    
    // Simulate Radar Engine Authentication
    setTimeout(() => {
      const user = {
        name: formData.name,
        email: formData.email,
        isAuthenticated: true,
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem("opportunity_radar_user", JSON.stringify(user));
      router.push("/onboarding");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-2xl font-black italic tracking-tighter text-blue-600">
            <Sparkles className="fill-current" />
            OPPORTUNITY RADAR
          </div>
          <h1 className="text-4xl font-black tracking-tight">Access the Agent.</h1>
          <p className="text-gray-500">Enter your core identity to initialize the decision engine.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                required
                type="text"
                placeholder="Full Name" 
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-blue-500 rounded-2xl pl-12 pr-6 py-4 outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                required
                type="email"
                placeholder="Work Email" 
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-blue-500 rounded-2xl pl-12 pr-6 py-4 outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isAuthenticating}
            className={cn(
              "w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95",
              isAuthenticating && "opacity-80 pointer-events-none"
            )}
          >
            {isAuthenticating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Initialize Radar <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="pt-8 border-t dark:border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
          <ShieldCheck size={14} className="text-green-500" />
          End-to-End Encrypted Radar Sync
        </div>
      </motion.div>
    </div>
  );
}
