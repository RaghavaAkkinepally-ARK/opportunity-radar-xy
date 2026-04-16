"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerCard } from "@/components/CareerCard";
import { AICoach } from "@/components/AICoach";
import { mockOpportunities, mockUserProfile } from "@/lib/mockData";
import { AnalysisResult, Opportunity } from "@/types";
import { analyzeOpportunity } from "@/lib/ai";
import { useRouter } from "next/navigation";
import { Search, Bell, Settings, LayoutDashboard, BrainCircuit, Sparkles } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Record<string, AnalysisResult>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReadiness, setShowReadiness] = useState(false);

  useEffect(() => {
    async function loadAnalyses() {
      const results: Record<string, AnalysisResult> = {};
      for (const opp of mockOpportunities) {
        results[opp.id] = await analyzeOpportunity(mockUserProfile, opp);
      }
      setAnalyses(results);
      setLoading(false);
    }
    loadAnalyses();
  }, []);

  const filteredOpportunities = mockOpportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 border-r flex flex-col items-center py-8 space-y-8 bg-white/50 dark:bg-black/20 backdrop-blur-xl z-50">
        <div className="p-2 bg-blue-600 rounded-xl mb-4">
          <Sparkles className="text-white" size={24} />
        </div>
        <button className="p-3 text-blue-600 bg-blue-500/10 rounded-xl"><LayoutDashboard size={24} /></button>
        <button className="p-3 text-gray-400 hover:text-blue-500 rounded-xl transition-colors"><BrainCircuit size={24} /></button>
        <button className="p-3 text-gray-400 hover:text-blue-500 rounded-xl transition-colors mt-auto"><Settings size={24} /></button>
      </aside>

      <main className="pl-20">
        {/* Header */}
        <header className="h-20 border-b flex items-center justify-between px-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm sticky top-0 z-40">
          <h1 className="text-2xl font-black">OPPORTUNITY RADAR X</h1>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                placeholder="Search potential careers..." 
                className="bg-gray-100 dark:bg-gray-900 border-none rounded-2xl pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white dark:border-gray-800"></div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-12">
          {/* Top Section */}
          <section>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Personalized High-Yield Opportunities.</h2>
                <p className="text-gray-500 text-lg">AI-vetted matches based on your latest profile updates.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp) => (
                <CareerCard
                  key={opp.id}
                  opportunity={opp}
                  matchScore={analyses[opp.id]?.matchScore || 0}
                  probability={analyses[opp.id]?.acceptanceProbability || 0}
                  decision={analyses[opp.id]?.decision || 'Skip'}
                  onClick={() => router.push(`/opportunity/${opp.id}`)}
                />
              ))}
              {filteredOpportunities.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl text-gray-500">
                  No matches found for "{searchQuery}". Try a different focus.
                </div>
              )}
            </div>
          </section>

          {/* Coach & Growth Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 border rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4">Your Career Readiness: Optimal.</h3>
                  <p className="text-blue-100 text-lg mb-6 max-w-md">Our prediction engine indicates a 85% success rate for Frontend roles this quarter. Keep building.</p>
                  <button 
                    onClick={() => setShowReadiness(true)}
                    className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    View Readiness Report
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent translate-x-1/2 -rotate-12 group-hover:translate-x-1/3 transition-transform"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900 border-none transition-transform hover:scale-[1.02]">
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-2">Growth Target</p>
                  <h4 className="text-xl font-bold">Micro-frontend Architecture</h4>
                  <p className="text-gray-500 text-sm mt-2">Required for High-Probability roles at Enterprise startups.</p>
                </div>
                <div className="p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900 border-none transition-transform hover:scale-[1.02]">
                  <p className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-2">Daily Sprint</p>
                  <h4 className="text-xl font-bold">Fix Performance Lag</h4>
                  <p className="text-gray-500 text-sm mt-2">Improve lighthouse scores on your Portfolio Project.</p>
                </div>
              </div>
            </div>

            <div className="sticky top-28 h-fit">
              <AICoach />
            </div>
          </div>
        </div>
      </main>

      {/* Readiness Modal */}
      <AnimatePresence>
        {showReadiness && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReadiness(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-6"
            >
              <h2 className="text-3xl font-black">Readiness Report</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/5 rounded-2xl">
                  <p className="text-sm font-bold text-blue-500 uppercase mb-2">Skill Strength</p>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[90%]" />
                  </div>
                </div>
                <div className="p-4 bg-purple-500/5 rounded-2xl">
                  <p className="text-sm font-bold text-purple-500 uppercase mb-2">Project Impact</p>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[75%]" />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 italic">"Your profile is in the top 5% for Frontend Engineering roles in the APAC region. Recommended next step: AWS Certification."</p>
              <button 
                onClick={() => setShowReadiness(false)}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl"
              >
                Close Report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
