import { AnalysisResult, SimulationResult, ApplicationContent, UserProfile, Opportunity, DailySprint } from "@/types";
import { calculateDecisionMetrics } from "./metrics";

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
  `,
  SIMULATION: `
    Simulate the outcome of the user applying for this role.
    User: {userProfile}
    Role: {opportunity}
    Output:
    - successProbability (0-1)
    - estimatedPrepTime (e.g. "2 weeks", "3 months")
    - improvementSuggestions (list)
    - outcomeDescription (what happens if they apply now)
  `,
  CONTENT_GEN: `
    Generate application content for:
    User: {userProfile}
    Role: {opportunity}
    Output:
    - coverLetter (string)
    - coldEmail (string)
    - resumeSuggestions (list)
  `
};

export async function analyzeOpportunity(profile: UserProfile, opportunity: Opportunity): Promise<AnalysisResult> {
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
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
  ) ? 1 : 0.5;

  const baseScore = (skillMatchRatio * 60) + (goalAlignment * 40);
  const score = Math.min(100, Math.max(0, Math.floor(baseScore + (Math.random() * 5))));
  
  const metrics = calculateDecisionMetrics(profile, opportunity, score);
  
  return {
    matchScore: score,
    acceptanceProbability: score / 100,
    decision: score > 75 ? "Apply Now" : (score > 50 ? "Prepare First" : "Skip"),
    reasoning: `${score}% match detected. ${goalAlignment === 1 ? "Strong alignment with your " + profile.goals[0] + " goal." : "General technical match."} ${metrics.regretScore > 80 ? "Critical yield loss if skipped." : ""}`,
    missingSkills: opportunity.requirements.filter(req => !matchingSkills.includes(req)).slice(0, 2),
    metrics
  };
}

export function rankOpportunities(profile: UserProfile, results: Record<string, AnalysisResult>): string[] {
  return Object.keys(results).sort((a, b) => {
    const scoreA = results[a].matchScore + results[a].metrics.regretScore;
    const scoreB = results[b].matchScore + results[b].metrics.regretScore;
    return scoreB - scoreA;
  });
}

export function generateDailySprints(profile: UserProfile, opportunities: Opportunity[], analyses: Record<string, AnalysisResult>): DailySprint {
  const topOpp = opportunities.find(o => analyses[o.id]?.decision === 'Apply Now') || opportunities[0];
  const primaryGoal = profile.goals[0] || "Career Growth";
  
  return {
    priorityActions: [
      `Execute application for ${topOpp.company} (${analyses[topOpp.id]?.matchScore}% alignment)`,
      `Close skill gap: Focus on ${topOpp.requirements.find(r => !profile.skills.includes(r)) || "Advanced System Design"}`,
      `Sync ${primaryGoal} roadmap with current market volatility`
    ],
    quickWin: `Optimize LinkedIn for "${primaryGoal}" keywords`,
    longTermMove: `Architect a trajectory toward ${primaryGoal} by Q4`
  };
}

export async function simulateOutcome(profile: UserProfile, opportunity: Opportunity): Promise<SimulationResult> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    successProbability: 0.75,
    estimatedPrepTime: "2 weeks",
    improvementSuggestions: ["Build a project using Tailwind CSS", "Practice Mock Interviews"],
    outcomeDescription: "You'll likely get past the initial screening but and reach the second round of interviews."
  };
}

export async function generateContent(profile: UserProfile, opportunity: Opportunity): Promise<ApplicationContent> {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    coverLetter: `Dear Hiring Manager at ${opportunity.company},\n\nI am excited to apply for the ${opportunity.title} position...`,
    coldEmail: `Hi ${opportunity.company} Team,\n\nI just applied for the ${opportunity.title} role and would love to...`,
    resumeSuggestions: ["Highlight your React experience", "Add a section on performance optimization"]
  };
}
