"use client";

import { motion } from "framer-motion";
import { Opportunity } from "@/types";
import { cn } from "@/lib/utils";
import { TrendingUp, MapPin, Briefcase } from "lucide-react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        "p-6 border rounded-2xl cursor-pointer transition-all hover:shadow-lg",
        getStatusColor()
      )}
    >
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

      <div className="flex flex-wrap gap-2">
        {opportunity.requirements.slice(0, 3).map((req, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            {req}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
