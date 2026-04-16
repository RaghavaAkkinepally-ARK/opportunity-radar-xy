import { Opportunity, UserProfile } from "@/types";

export const mockUserProfile: UserProfile = {
  name: "Jane Doe",
  skills: ["React", "TypeScript", "Next.js", "Python", "Problem Solving", "UI/UX Design"],
  cgpa: 3.8,
  goals: ["Become a Senior Frontend Engineer", "Contribute to Open Source", "Build Scalable Apps"],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "TechCorp",
      duration: "June 2023 - Aug 2023",
      description: "Developed and maintained several React components for the core product."
    }
  ]
};

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Junior Frontend Developer",
    company: "Future AI",
    description: "Build next-generation interfaces for AI-driven products using React and Tailwind.",
    requirements: ["React", "TypeScript", "Tailwind CSS", "1+ years experience"],
    type: "Full-time",
    postedAt: "2 hours ago",
    salary: "80000"
  },
  {
    id: "2",
    title: "Software Engineering Intern",
    company: "Google",
    description: "Work on large-scale distributed systems and user-facing features.",
    requirements: ["Algorithms", "Data Structures", "Python/Java", "Enrolled in Degree"],
    type: "Internship",
    postedAt: "1 day ago",
    salary: "45/hr"
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Startup Co",
    description: "Design beautiful and functional user experiences for a fast-growing startup.",
    requirements: ["Figma", "UI/UX Design", "Component Library", "Fast Learner"],
    type: "Full-time",
    postedAt: "3 days ago",
    salary: "75000"
  }
];
