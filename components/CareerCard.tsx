"use client";

import { motion } from "framer-motion";
import { Opportunity } from "@/types";
import { cn } from "@/lib/utils";
import { TrendingUp, MapPin, Briefcase, Eye, MousePointer2, CheckCircle2 } from "lucide-react";
import { MemoryManager } from "@/lib/memory";

interface CareerCardProps {
  opportunity: Opportunity;
  matchScore: number;
  probability: number;
  decision: 'Apply Now' | 'Prepare First' | 'Skip';
  onClick?: () => void;
}

export function CareerCard({ opportunity, matchScore, probability, decision, onClick }: CareerCardProps) {
  const getStatusColor = () => {
    if (decision === 'Apply Now') return "border-green-500/50 bg-green-500/5";
    if (decision === 'Prepare First') return "border-yellow-500/50 bg-yellow-500/5";
    return "border-red-500/50 bg-red-500/5";
  };

  const getStatusText = () => {
    if (decision === 'Apply Now') return "text-green-500";
    if (decision === 'Prepare First') return "text-yellow-500";
    return "text-red-500";
  };

  const history = MemoryManager.getHistory();
  const isClicked = history.clickedJobs.includes(opportunity.id);
  const isApplied = history.appliedJobs.includes(opportunity.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => {
        MemoryManager.logAction('click', opportunity.id);
        onClick?.();
      }}
      className={cn(
        "p-6 border rounded-2xl cursor-pointer transition-all hover:shadow-lg relative",
        getStatusColor(),
        isApplied && "border-green-500/50 bg-green-500/5",
        isClicked && !isApplied && "border-blue-500/50"
      )}
    >
      {(isClicked || isApplied) && (
        <div className="absolute top-4 right-4 flex gap-1">
          {isApplied ? (
            <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
              <CheckCircle2 size={10} /> APPLIED
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              <Eye size={10} /> VIEWED
            </span>
          )}
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{opportunity.title}</h3>
          <p className="text-gray-500 flex items-center gap-1">
            <Briefcase size={16} /> {opportunity.company}
          </p>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-sm font-semibold", getStatusText(), "bg-current/10")}>
          {decision}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
          <p className="text-sm text-gray-500">Match Score</p>
          <p className="text-2xl font-bold">{matchScore}%</p>
        </div>
        <div className="flex-1 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
          <p className="text-sm text-gray-500">Probability</p>
          <p className="text-2xl font-bold">{(probability * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {opportunity.requirements.slice(0, 3).map((req, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-medium">
            {req}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            MemoryManager.logAction('apply', opportunity.id, opportunity.requirements);
            window.open(opportunity.url, '_blank');
          }}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/10"
        >
          Apply <TrendingUp size={16} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            MemoryManager.logAction('ignore', opportunity.id, opportunity.requirements);
            onClick?.();
          }}
          className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
        >
          Strategy & Feedback
        </button>
      </div>
    </motion.div>
  );
}
