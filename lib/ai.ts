import { AnalysisResult, SimulationResult, ApplicationContent, UserProfile, Opportunity } from "@/types";

export const AI_PROMPTS = {
  DECISION_ENGINE: `
    You are an expert career strategist. Analyze the following user profile and opportunity.
    User Profile: {userProfile}
    Opportunity: {opportunity}
    Output a structured JSON response with:
    - matchScore (0-100)
    - acceptanceProbability (0-1)
    - decision ("Apply Now", "Prepare First", "Skip")
    - reasoning (brief explanation)
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

// Simulation of AI results for the demo
export async function analyzeOpportunity(profile: UserProfile, opportunity: Opportunity): Promise<AnalysisResult> {
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Calculate matching skills
  const matchingSkills = opportunity.requirements.filter(req => 
    profile.skills.some(skill => skill.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(skill.toLowerCase()))
  );
  
  const skillMatchRatio = matchingSkills.length / Math.max(opportunity.requirements.length, 1);
  const matchedPoints = skillMatchRatio * 100;
  
  // Add some variance but base it on real data
  const score = Math.min(100, Math.max(0, Math.floor(matchedPoints + (Math.random() * 10 - 5))));
  
  return {
    matchScore: score,
    acceptanceProbability: score / 100,
    decision: score > 80 ? "Apply Now" : (score > 60 ? "Prepare First" : "Skip"),
    reasoning: `Matched ${matchingSkills.length} out of ${opportunity.requirements.length} core requirements. Your profile shows strength in ${matchingSkills.join(', ') || 'related areas'}.`,
    missingSkills: opportunity.requirements.filter(req => !matchingSkills.includes(req)).slice(0, 2)
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
