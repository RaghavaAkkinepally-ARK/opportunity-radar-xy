"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { SimulationResult } from "@/types";

interface PredictionEngineProps {
  simulation?: SimulationResult;
  loading?: boolean;
}

export function PredictionEngine({ simulation, loading }: PredictionEngineProps) {
  if (loading) {
    return (
      <div className="p-8 border rounded-2xl animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        <div className="h-32 bg-gray-100 dark:bg-gray-900 rounded"></div>
      </div>
    );
  }

  if (!simulation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 border rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-indigo-500" size={24} />
        <h2 className="text-2xl font-bold">Outcome Simulation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Success Probability</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-indigo-600">{(simulation.successProbability * 100).toFixed(0)}%</span>
              <span className="text-sm text-indigo-500 font-medium mb-2">Confidence Level: High</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${simulation.successProbability * 100}%` }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>

          <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-indigo-500/10">
            <p className="text-sm font-bold flex items-center gap-2 mb-2">
              <Clock size={16} className="text-indigo-500" /> Estimated Preparation
            </p>
            <p className="text-lg font-medium">{simulation.estimatedPrepTime}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Improvement Roadmap</p>
          <div className="space-y-3">
            {simulation.improvementSuggestions.map((suggestion, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white/50 dark:bg-green-500/5 rounded-xl border border-green-500/20"
              >
                <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{suggestion}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/20 mt-4">
            <p className="text-xs text-yellow-600 font-bold uppercase mb-1 flex items-center gap-1">
              <AlertCircle size={12} /> Coach's Note
            </p>
            <p className="text-sm opacity-80 italic">{simulation.outcomeDescription}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
