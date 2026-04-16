"use client";

import { AICoach } from "@/components/AICoach";
import { ChevronLeft, Sparkles, BrainCircuit, Rocket, Target, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoachPanelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-8">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold mb-8"
          >
            <ChevronLeft size={20} /> Back to Dashboard
          </button>

          <div className="space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2">
              <BrainCircuit className="text-blue-500" /> Strategies
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left p-4 bg-white dark:bg-gray-900 rounded-2xl border border-blue-500/20 shadow-sm flex items-center gap-3">
                <Rocket className="text-blue-500" size={18} />
                <span className="font-bold">Aggressive Growth</span>
              </button>
              <button className="w-full text-left p-4 bg-white dark:bg-gray-900 rounded-2xl border border-transparent hover:border-blue-500/20 flex items-center gap-3 transition-all">
                <Target className="text-gray-400" size={18} />
                <span className="font-bold">Balanced Prep</span>
              </button>
              <button className="w-full text-left p-4 bg-white dark:bg-gray-900 rounded-2xl border border-transparent hover:border-blue-500/20 flex items-center gap-3 transition-all">
                <Zap className="text-gray-400" size={18} />
                <span className="font-bold">Quick Apply</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl">
            <h3 className="font-black text-lg mb-2">Pro Tip</h3>
            <p className="text-sm text-blue-100 italic">"Asking about specific interview questions for React roles can yield a 20% higher preparation accuracy."</p>
          </div>
        </aside>

        {/* Main Coach Interface */}
        <div className="lg:col-span-3 space-y-8">
          <header className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">
                <Sparkles size={16} fill="currentColor" /> AI-Driven Career Strategist
              </div>
              <h1 className="text-5xl font-black italic tracking-tighter">THE COACH PANEL</h1>
            </div>
          </header>

          <AICoach />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-dashed rounded-3xl">
              <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-gray-400">Action Items</h4>
              <ul className="space-y-3">
                <li className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded border border-blue-500/50" />
                  <span className="text-sm font-medium">Refactor Redux logic in Portfolio</span>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded border border-blue-500/50" />
                  <span className="text-sm font-medium">Submit application to Future AI</span>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded border border-blue-500/50" />
                  <span className="text-sm font-medium">Schedule mock interview session</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-2 border-dashed rounded-3xl">
              <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-gray-400">Radar Insights</h4>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                  <p className="text-xs font-bold text-green-600 mb-1">Market Uptick</p>
                  <p className="text-sm font-medium">Frontend roles requiring Next.js increased by 12% today.</p>
                </div>
                <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10">
                  <p className="text-xs font-bold text-yellow-600 mb-1">Skill Gap</p>
                  <p className="text-sm font-medium">Consider learning GraphQL to unlock 30% more roles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
