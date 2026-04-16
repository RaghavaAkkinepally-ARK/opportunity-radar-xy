export interface UserProfile {
  name: string;
  skills: string[];
  cgpa: number;
  goals: string[];
  experience: Experience[];
  linkedinUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  type: 'Full-time' | 'Internship' | 'Project';
  postedAt: string;
  salary?: string;
  url: string;
}

export interface AnalysisResult {
  matchScore: number;
  acceptanceProbability: number;
  decision: 'Apply Now' | 'Prepare First' | 'Skip';
  reasoning: string;
  missingSkills: string[];
  metrics: DecisionMetrics;
}

export interface DecisionMetrics {
  regretScore: number;
  riskOfInaction: number;
  confidenceScore: number;
  timingScore: number;
  futureTrajectory: string;
}

export interface DailySprint {
  priorityActions: string[];
  quickWin: string;
  longTermMove: string;
}

export interface SimulationResult {
  successProbability: number;
  estimatedPrepTime: string;
  improvementSuggestions: string[];
  outcomeDescription: string;
}

export interface ApplicationContent {
  coverLetter: string;
  coldEmail: string;
  resumeSuggestions: string[];
}
