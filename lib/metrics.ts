import { Opportunity, UserProfile, DecisionMetrics } from "@/types";

export function calculateDecisionMetrics(profile: UserProfile, opportunity: Opportunity, matchScore: number): DecisionMetrics {
  // Regret Score: High match + High brand/salary = High potential regret if skipped
  const brandKeywords = ['google', 'apple', 'meta', 'amazon', 'microsoft', 'netflix', 'stripe', 'openai'];
  const brandPrestige = brandKeywords.some(bk => opportunity.company.toLowerCase().includes(bk)) ? 95 : 50;
  
  const regretScore = Math.floor((matchScore * 0.5) + (brandPrestige * 0.5));

  // Risk of Inaction: How much better is this than "staying put"?
  // This calculates the opportunity cost of not taking the leap.
  const riskOfInaction = Math.floor(matchScore * 0.85 + (regretScore * 0.15));

  // Confidence Score: Data quality check + relevance
  const hasSalary = opportunity.salary && opportunity.salary !== "Market Rate" ? 1 : 0;
  const hasDetailedDesc = opportunity.description.length > 200 ? 1 : 0;
  const confidenceScore = Math.floor((matchScore * 0.6) + (hasSalary * 20) + (hasDetailedDesc * 20));

  // Timing Score: Market window simulation
  const isFresh = opportunity.postedAt.includes('hour') || opportunity.postedAt.includes('minute') ? 98 : 65;
  const timingScore = isFresh;

  // Future Trajectory: Predictive mapping based on skills and role
  const roleType = opportunity.title.toLowerCase();
  const desc = opportunity.description.toLowerCase();
  
  let futureTrajectory = "Linear progression in Engineering.";
  if (roleType.includes('lead') || roleType.includes('senior') || roleType.includes('staff')) {
    futureTrajectory = "Fast-track to Management or Staff Engineering within 18-24 months.";
  } else if (roleType.includes('architect')) {
    futureTrajectory = "Critical pivot towards Technical Strategy and System Design architecture.";
  } else if (roleType.includes('ai') || roleType.includes('data') || desc.includes('llm') || desc.includes('ml')) {
    futureTrajectory = "High-growth path in the emerging Intelligence Economy.";
  } else if (roleType.includes('product') || roleType.includes('designer')) {
    futureTrajectory = "Progression towards Design Lead and Product Management roles.";
  }

  return {
    regretScore,
    riskOfInaction,
    confidenceScore,
    timingScore,
    futureTrajectory
  };
}
