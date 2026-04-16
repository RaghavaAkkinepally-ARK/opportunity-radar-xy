import { Opportunity, UserProfile, DecisionMetrics } from "@/types";

export function calculateDecisionMetrics(profile: UserProfile, opportunity: Opportunity, matchScore: number): DecisionMetrics {
  // Regret Score: High match + High brand/salary = High potential regret if skipped
  const brandPrestige = opportunity.company.toLowerCase().includes('google') || opportunity.company.toLowerCase().includes('apple') ? 90 : 50;
  const matchHeuristic = matchScore;
  const regretScore = Math.floor((matchHeuristic * 0.6) + (brandPrestige * 0.4));

  // Risk of Inaction: How much better is this than "staying put"?
  // Higher match score usually means higher risk of missing out on a growth leap
  const riskOfInaction = Math.floor(matchScore * 0.85);

  // Confidence Score: Data quality check
  const hasSalary = opportunity.salary ? 1 : 0;
  const hasDetailedDesc = opportunity.description.length > 100 ? 1 : 0;
  const confidenceScore = Math.floor((matchScore * 0.7) + (hasSalary * 15) + (hasDetailedDesc * 15));

  // Timing Score: Market window simulation
  const isFresh = opportunity.postedAt.includes('hour') || opportunity.postedAt.includes('minute') ? 95 : 60;
  const timingScore = isFresh;

  // Future Trajectory: Predictive mapping
  const roleType = opportunity.title.toLowerCase();
  let futureTrajectory = "Linear progression in Engineering.";
  if (roleType.includes('lead') || roleType.includes('senior')) {
    futureTrajectory = "Fast-track to Director/VP roles within 24 months.";
  } else if (roleType.includes('architect')) {
    futureTrajectory = "Pivots towards Principal Engineering and Technical Strategy.";
  } else if (roleType.includes('ai') || roleType.includes('data')) {
    futureTrajectory = "High-growth path in the intelligence economy.";
  }

  return {
    regretScore,
    riskOfInaction,
    confidenceScore,
    timingScore,
    futureTrajectory
  };
}
