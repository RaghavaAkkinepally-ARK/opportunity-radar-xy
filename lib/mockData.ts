import { Opportunity, UserProfile } from "@/types";

export const mockUserProfile: UserProfile = {
  name: "Developer",
  skills: ["Python", "FastAPI", "PostgreSQL", "React", "AWS", "LLMs"],
  cgpa: 3.9,
  goals: ["Build AI-powered backend systems", "Master cloud-native architecture", "Lead technical teams"],
  experience: [
    {
      role: "Python Developer",
      company: "Innovate Labs",
      duration: "Jan 2024 - Present",
      description: "Architecting scalable data services and integrating generative AI models."
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
    salary: "80,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer"
  },
  {
    id: "2",
    title: "Python Backend Engineer",
    company: "DataStream",
    description: "Scale high-performance data pipelines using Python, FastAPI, and PostgreSQL.",
    requirements: ["Python", "FastAPI", "SQL", "Cloud Native"],
    type: "Full-time",
    postedAt: "5 hours ago",
    salary: "95,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=python%20backend"
  },
  {
    id: "3",
    title: "Software Engineering Intern",
    company: "Google",
    description: "Work on large-scale distributed systems and user-facing features.",
    requirements: ["Algorithms", "Data Structures", "C++", "Python"],
    type: "Internship",
    postedAt: "1 day ago",
    salary: "$45/hr",
    url: "https://www.linkedin.com/jobs/search/?keywords=google%20intern"
  },
  {
    id: "4",
    title: "Machine Learning Researcher",
    company: "Neuro-Sync",
    description: "Training large language models and optimizing inference speeds at scale.",
    requirements: ["Python", "PyTorch", "Transformers", "CUDA"],
    type: "Full-time",
    postedAt: "10 mins ago",
    salary: "140,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=machine%20learning"
  },
  {
    id: "5",
    title: "UI/UX Product Designer",
    company: "Canvas Design",
    description: "Create pixel-perfect designs and user flows for mobile and web apps.",
    requirements: ["Figma", "UI/UX Design", "Prototyping"],
    type: "Hybrid",
    postedAt: "6 hours ago",
    salary: "85,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=ui%20ux%20designer"
  },
  {
    id: "6",
    title: "Cloud Infrastructure Lead",
    company: "Velocity Cloud",
    description: "Orchestrate Kubernetes clusters and manage global AWS infrastructure.",
    requirements: ["AWS", "Kubernetes", "Terraform", "Go"],
    type: "Remote",
    postedAt: "4 hours ago",
    salary: "160,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=cloud%20infrastructure"
  },
  {
    id: "7",
    title: "Django Developer",
    company: "WebFlow Solutions",
    description: "Building robust e-commerce backends using the Django framework.",
    requirements: ["Python", "Django", "PostgreSQL", "Redis"],
    type: "Full-time",
    postedAt: "8 hours ago",
    salary: "90,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=django%20developer"
  },
  {
    id: "8",
    title: "AI Integrations Engineer",
    company: "Agent-X",
    description: "Integrating LLMs into automation workflows and enterprise legacy systems.",
    requirements: ["Python", "LangChain", "OpenAI API", "Vector DBs"],
    type: "Full-time",
    postedAt: "1 hour ago",
    salary: "110,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=ai%20engineer"
  },
  {
    id: "9",
    title: "Junior Data Analyst",
    company: "Insight Analytics",
    description: "Analyze market trends and visualize complex data sets for client reports.",
    requirements: ["Python", "Pandas", "Tableau", "Statistics"],
    type: "Full-time",
    postedAt: "12 hours ago",
    salary: "70,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=data%20analyst"
  },
  {
    id: "10",
    title: "DevOps Engineer",
    company: "Streamline Tech",
    description: "Automate CI/CD pipelines and ensure 99.99% uptime for global services.",
    requirements: ["Docker", "Jenkins", "Python", "Shell Scripting"],
    type: "Full-time",
    postedAt: "1 day ago",
    salary: "105,000",
    url: "https://www.linkedin.com/jobs/search/?keywords=devops%20engineer"
  }
];
