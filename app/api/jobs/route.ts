import { NextResponse, NextRequest } from "next/server";
import { mockOpportunities } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skills = searchParams.get('skills')?.split(',').map(s => s.trim().toLowerCase()) || [];
  const goals = searchParams.get('goals')?.split(',').map(s => s.trim().toLowerCase()) || [];
  
  // Simulating an external API fetch with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Intelligence Layer: Filter based on overlapping technical stack
  let filteredJobs = mockOpportunities;
  
  if (skills.length > 0 || goals.length > 0) {
    const techKeywords = [...new Set([...skills, ...goals])];
    
    filteredJobs = mockOpportunities.filter(job => {
      const jobContent = `${job.title} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();
      // Calculate relevance: how many user keywords appear in the job?
      const matchCount = techKeywords.filter(kw => jobContent.includes(kw)).length;
      return matchCount > 0;
    }).sort((a, b) => {
      const aContent = `${a.title} ${a.requirements.join(' ')}`.toLowerCase();
      const bContent = `${b.title} ${b.requirements.join(' ')}`.toLowerCase();
      const aMatch = techKeywords.filter(kw => aContent.includes(kw)).length;
      const bMatch = techKeywords.filter(kw => bContent.includes(kw)).length;
      return bMatch - aMatch;
    });

    // Fallback: If tech-specific jobs are too few, add highly relevant general tech roles
    if (filteredJobs.length < 4) {
      const ids = new Set(filteredJobs.map(j => j.id));
      const fallbacks = mockOpportunities.filter(j => !ids.has(j.id)).slice(0, 4 - filteredJobs.length);
      filteredJobs = [...filteredJobs, ...fallbacks];
    }
  }
  
  return NextResponse.json({
    jobs: filteredJobs,
    source: "Autonomous Aggregator v2 (Personalized)",
    timestamp: new Date().toISOString()
  });
}
