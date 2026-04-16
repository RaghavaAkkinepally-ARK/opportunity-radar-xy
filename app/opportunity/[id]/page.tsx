"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockOpportunities, mockUserProfile } from "@/lib/mockData";
import { PredictionEngine } from "@/components/PredictionEngine";
import { AnalysisResult, SimulationResult, ApplicationContent } from "@/types";
import { analyzeOpportunity, simulateOutcome, generateContent } from "@/lib/ai";
import { ChevronLeft, Share2, Printer, MapPin, Briefcase, DollarSign, Calendar, Sparkles, Wand2, FileText, Mail, CheckCircle, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { MemoryManager } from "@/lib/memory";
import { Zap, TrendingUp, AlertTriangle, Target } from "lucide-react";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const opportunity = mockOpportunities.find(o => o.id === id);

  if (!opportunity) return <div>Opportunity not found.</div>;

  const [simulation, setSimulation] = useState<SimulationResult | undefined>();
  const [analysis, setAnalysis] = useState<AnalysisResult | undefined>();
  const [content, setContent] = useState<ApplicationContent | undefined>();
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (!opportunity) return;
    async function loadData() {
      const res = await analyzeOpportunity(mockUserProfile, opportunity!);
      setAnalysis(res);
      setLoading(false);
    }
    loadData();
  }, [opportunity]);

  const handleSimulate = async () => {
    if (!opportunity) return;
    setSimulating(true);
    const res = await simulateOutcome(mockUserProfile, opportunity!);
    setSimulation(res);
    setSimulating(false);
  };

  const handleGenerate = async () => {
    if (!opportunity) return;
    setGenerating(true);
    const res = await generateContent(mockUserProfile, opportunity!);
    setContent(res);
    setGenerating(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!opportunity) return;
    const text = `Check out this 🚀 ${analysis?.matchScore}% match opportunity on OpportunityRadar X: ${opportunity.title} at ${opportunity.company}. View it here: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleLaunch = () => {
    if (!opportunity) return;
    MemoryManager.logAction('apply', opportunity.id as string);
    setLaunched(true);
    setTimeout(() => setLaunched(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8 pb-32">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8 font-bold"
        >
          <ChevronLeft size={20} /> Back to Radar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <header className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{opportunity.type}</span>
                    {analysis?.decision === 'Apply Now' && <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">High Probability</span>}
                  </div>
                  <h1 className="text-5xl font-black">{opportunity.title}</h1>
                  <p className="text-2xl text-gray-500 font-medium flex items-center gap-2">
                    <Briefcase className="text-blue-500" /> {opportunity.company}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleWhatsAppShare}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-green-500/10 hover:text-green-600 transition-colors"
                  >
                    <Share2 size={24}/>
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 transition-colors"
                  >
                    <Printer size={24}/>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 py-6 border-y">
                {opportunity.salary && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Base Range</p>
                      <p className="font-bold">{opportunity.salary}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Posted</p>
                    <p className="font-bold">{opportunity.postedAt}</p>
                  </div>
                </div>
              </div>
            </header>

            <section className="space-y-6">
              <h2 className="text-2xl font-black">Role Overview</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{opportunity.description}</p>
              <div className="space-y-4">
                <h3 className="font-black text-lg">Key Requirements</h3>
                <div className="grid grid-cols-2 gap-4">
                  {opportunity.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                      <CheckCircle className="text-blue-500" size={18} />
                      <span className="font-medium">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Simulations */}
            {simulating || simulation ? (
              <PredictionEngine simulation={simulation} loading={simulating} />
            ) : (
              <div className="p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center space-y-6 bg-blue-500/5 border-blue-500/20">
                <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Unsure about your chances?</h3>
                  <p className="text-gray-500 text-lg">Our AI can simulate the full recruitment process for you.</p>
                </div>
                <button 
                  onClick={handleSimulate}
                  className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95"
                >
                  <Wand2 size={24} /> Run "What If" Simulation
                </button>
              </div>
            )}
          </div>

          {/* Side Panel: Decision & Content */}
          <aside className="space-y-8">
            <div className="p-8 border rounded-3xl bg-white dark:bg-gray-900 shadow-xl sticky top-28 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Autonomous Decision</p>
                <div className={cn(
                  "text-3xl font-black",
                  analysis?.decision === 'Apply Now' ? "text-green-500" : (analysis?.decision === 'Prepare First' ? "text-yellow-500" : "text-red-500")
                )}>
                  {analysis?.decision || "Calculating..."}
                </div>
                
                {analysis?.metrics && (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-1"><TrendingUp size={14}/> Regret Score</span>
                      <span className={cn("font-black", analysis.metrics.regretScore > 70 ? "text-orange-500" : "")}>{analysis.metrics.regretScore}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-1"><AlertTriangle size={14}/> Inaction Risk</span>
                      <span className="font-black text-red-500">{analysis.metrics.riskOfInaction}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-1"><Zap size={14}/> Timing</span>
                      <span className="font-black text-blue-500">{analysis.metrics.timingScore}%</span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800 italic">
                  "{analysis?.reasoning}"
                </p>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800" />

              <div className="space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2">
                  <FileText className="text-blue-500" /> Generated Content
                </h3>
                {generating ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                  </div>
                ) : content ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-black/40 rounded-2xl relative group">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Cover Letter</p>
                      <p className="text-sm line-clamp-3 opacity-60 italic">"{content.coverLetter}"</p>
                      <button 
                         onClick={() => copyToClipboard(content.coverLetter, 'letter')}
                         className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copied === 'letter' ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-black/40 rounded-2xl relative group">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Cold Email</p>
                      <p className="text-sm line-clamp-2 opacity-60 italic">"{content.coldEmail}"</p>
                      <button 
                         onClick={() => copyToClipboard(content.coldEmail, 'email')}
                         className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copied === 'email' ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleGenerate}
                    className="w-full py-4 border-2 border-dashed rounded-2xl text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all"
                  >
                    + Generate Application Pack
                  </button>
                )}
              </div>

              <button 
                onClick={handleLaunch}
                disabled={launched}
                className={cn(
                  "w-full py-5 rounded-3xl text-xl font-extrabold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2",
                  launched ? "bg-green-600 text-white" : (
                    analysis?.decision === 'Apply Now' 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  )
                )}
              >
                {launched ? <><CheckCircle size={24} /> Applied via Agent</> : "Launch Formal Application"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
