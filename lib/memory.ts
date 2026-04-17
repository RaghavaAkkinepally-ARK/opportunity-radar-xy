"use client";

export interface UserHistory {
  clickedJobs: string[];
  appliedJobs: string[];
  ignoredJobs: string[];
  feedbackLoop: {
    preferenceScore: Record<string, number>; // Weights for tags/companies
    ignoreCount: number;
    applyCount: number;
  };
  lastUpdated: string;
}

const STORAGE_KEY = "xyz_agent_memory";

export const MemoryManager = {
  getHistory: (): UserHistory => {
    if (typeof window === "undefined") return { 
      clickedJobs: [], appliedJobs: [], ignoredJobs: [], 
      feedbackLoop: { preferenceScore: {}, ignoreCount: 0, applyCount: 0 },
      lastUpdated: new Date().toISOString() 
    };
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { 
      clickedJobs: [], appliedJobs: [], ignoredJobs: [], 
      feedbackLoop: { preferenceScore: {}, ignoreCount: 0, applyCount: 0 },
      lastUpdated: new Date().toISOString() 
    };
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      return { 
        clickedJobs: [], appliedJobs: [], ignoredJobs: [], 
        feedbackLoop: { preferenceScore: {}, ignoreCount: 0, applyCount: 0 },
        lastUpdated: new Date().toISOString() 
      };
    }
  },

  logAction: (action: 'click' | 'apply' | 'ignore', jobId: string, tags: string[] = []) => {
    if (typeof window === "undefined") return;
    const history = MemoryManager.getHistory();
    
    if (action === 'click') {
      if (!history.clickedJobs.includes(jobId)) history.clickedJobs.push(jobId);
    } else if (action === 'apply') {
      if (!history.appliedJobs.includes(jobId)) history.appliedJobs.push(jobId);
      history.feedbackLoop.applyCount++;
      // Boost preference for these tags
      tags.forEach(tag => {
        history.feedbackLoop.preferenceScore[tag] = (history.feedbackLoop.preferenceScore[tag] || 0) + 1;
      });
    } else if (action === 'ignore') {
      if (!history.ignoredJobs.includes(jobId)) history.ignoredJobs.push(jobId);
      history.feedbackLoop.ignoreCount++;
      // Slightly penalize tags for ignored jobs
      tags.forEach(tag => {
        history.feedbackLoop.preferenceScore[tag] = (history.feedbackLoop.preferenceScore[tag] || 0) - 0.5;
      });
    }
    
    history.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  },

  getStats: () => {
    const history = MemoryManager.getHistory();
    return {
      totalInteractions: history.clickedJobs.length + history.appliedJobs.length + history.ignoredJobs.length,
      conversionRate: history.clickedJobs.length > 0 ? (history.appliedJobs.length / history.clickedJobs.length) * 100 : 0,
      inactionRank: history.ignoredJobs.length > 5 ? "Cautious" : "Aggressive"
    };
  }
};
