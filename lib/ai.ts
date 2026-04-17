import { AnalysisResult, SimulationResult, ApplicationContent, UserProfile, Opportunity, DailySprint } from "@/types";
import { calculateDecisionMetrics } from "./metrics";
import { UserHistory } from "./memory";

export const AI_PROMPTS = {
  DECISION_ENGINE: `
    You are an expert career strategist. Analyze the following user profile and opportunity.
    Consider history: {history}
    User Profile: {userProfile}
    Opportunity: {opportunity}
    
    Output a structured JSON response with:
    - matchScore (0-100)
    - acceptanceProbability (0-1)
    - decision ("Apply Now", "Prepare First", "Skip")
    - reasoning (concise, actionable, personalized)
    - missingSkills (list of skills needed)
    - microOptimizations (list of 2-3 small things to improve for this role)
  `
};

export async function analyzeOpportunity(
  profile: UserProfile, 
  opportunity: Opportunity, 
  history?: UserHistory
): Promise<AnalysisResult> {
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Calculate matching skills using fuzzy intersection
  const matchingSkills = opportunity.requirements.filter(req => 
    profile.skills.some(skill => 
      skill.toLowerCase().includes(req.toLowerCase()) || 
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  // Scoring logic: Skill Match (60%) + Goal Alignment (40%)
  const skillMatchRatio = matchingSkills.length / Math.max(opportunity.requirements.length, 1);
  const goalAlignment = profile.goals.some(goal => 
    opportunity.title.toLowerCase().includes(goal.toLowerCase()) || 
    opportunity.description.toLowerCase().includes(goal.toLowerCase())
  ) ? 1 : 0.6;

  // History Multiplier: If they've applied to similar roles, boost confidence
  const historicalBias = history?.appliedJobs.length ? 1.05 : 1.0;

  const baseScore = ((skillMatchRatio * 60) + (goalAlignment * 40)) * historicalBias;
  const score = Math.min(100, Math.max(0, Math.floor(baseScore + (Math.random() * 3))));
  
  const metrics = calculateDecisionMetrics(profile, opportunity, score);
  
  // Intelligence Logic: Reasoning based on metrics
  let reasoning = `${score}% technical alignment detected. `;
  if (metrics.regretScore > 85) reasoning += `Critical yield loss (Regret: ${metrics.regretScore}) if this role is ignored. `;
  if (metrics.timingScore > 90) reasoning += `High priority window: Role is fresh. `;
  if (goalAlignment === 1) reasoning += `Perfectly fits your goal: ${profile.goals[0]}. `;

  return {
    matchScore: score,
    acceptanceProbability: Math.min(0.99, (score / 100) * 1.1), // Adjusted for market variance
    decision: score > 80 ? "Apply Now" : (score > 60 ? "Prepare First" : "Skip"),
    reasoning: reasoning.trim(),
    missingSkills: opportunity.requirements.filter(req => !matchingSkills.includes(req)).slice(0, 3),
    metrics
  };
}

export function rankOpportunities(profile: UserProfile, results: Record<string, AnalysisResult>): string[] {
  return Object.keys(results).sort((a, b) => {
    // Rank by Weighted Score: 40% Match + 30% Regret + 20% Inaction Risk + 10% Timing
    const rankA = (results[a].matchScore * 0.4) + (results[a].metrics.regretScore * 0.3) + (results[a].metrics.riskOfInaction * 0.2) + (results[a].metrics.timingScore * 0.1);
    const rankB = (results[b].matchScore * 0.4) + (results[b].metrics.regretScore * 0.3) + (results[b].metrics.riskOfInaction * 0.2) + (results[b].metrics.timingScore * 0.1);
    return rankB - rankA;
  });
}

export function generateDailySprints(profile: UserProfile, opportunities: Opportunity[], analyses: Record<string, AnalysisResult>): DailySprint {
  const topOpp = opportunities.find(o => analyses[o.id]?.decision === 'Apply Now') || opportunities[0];
  const highRegretOpp = opportunities.find(o => (analyses[o.id]?.metrics.regretScore || 0) > 80);
  
  const actions = [
    `Complete application for ${topOpp.company} - ${analyses[topOpp.id]?.matchScore || 70}% match score.`,
    `Review requirements for ${topOpp.title}: Focus on ${topOpp.requirements[0] || 'Technical Stack'}`,
    `Connect with someone at ${topOpp.company} to increase acceptance probability.`
  ];

  if (highRegretOpp && highRegretOpp.id !== topOpp.id) {
    actions[1] = `Analyze high-regret role at ${highRegretOpp.company} (Regret: ${analyses[highRegretOpp.id]?.metrics.regretScore})`;
  }

  return {
    priorityActions: actions,
    quickWin: `Optimize LinkedIn profile for "${profile.skills.slice(0, 2).join(' & ')}" based on current market signals.`,
    longTermMove: `Construct a roadmap to bridge the ${analyses[topOpp.id]?.missingSkills[0] || 'Advanced Architecture'} skill gap by next quarter.`
  };
}

export async function simulateOutcome(profile: UserProfile, opportunity: Opportunity): Promise<SimulationResult> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const rand = Math.random();
  
  return {
    successProbability: 0.6 + (rand * 0.3),
    estimatedPrepTime: rand > 0.5 ? "1 week" : "3 weeks",
    improvementSuggestions: [
      `Deep dive into ${opportunity.requirements[0] || 'System Design'} principles.`,
      "Synthesize your previous project experience with this role's unique challenges."
    ],
    outcomeDescription: rand > 0.4 ? "High likelihood of progressing to the technical interview stage." : "Strong profile match, but expect deep scrutiny on your architectural decisions."
  };
}

export async function generateContent(profile: UserProfile, opportunity: Opportunity): Promise<ApplicationContent> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    coverLetter: `Dear Hiring Manager at ${opportunity.company},\n\nAs a specialist in ${profile.skills[0]} and ${profile.skills[1]}, I was immediately drawn to the ${opportunity.title} role. My experience building scalable solutions aligns perfectly with your requirements for ${opportunity.requirements.slice(0, 2).join(', ')}...`,
    coldEmail: `Hi ${opportunity.company} Team,\n\nI've been following your work in the industry and noticed the ${opportunity.title} opening. Given my background in ${profile.skills[0]}, I believe I can contribute immediately...`,
    resumeSuggestions: [
      `Quantify your impact using ${profile.skills[0]} in your current/past roles.`,
      `Highlight specific projects where you resolved challenges related to ${opportunity.requirements[0]}.`
    ]
  };
}
