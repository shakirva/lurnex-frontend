export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  logo: string;
  category: string;
  foodAccommodation?: string;
  gender?: string;
}

// In a real app, this would be stored in a database
let mockJobsData: Job[] = [
  {
    id: 1922330,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    posted: "2 days ago",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing web applications and ensuring great user experience. In this role, you will work closely with our design team to implement pixel-perfect UIs and collaborate with backend developers to integrate APIs. You'll also be involved in code reviews, mentoring junior developers, and contributing to our technical architecture decisions.",
    requirements: ["React", "TypeScript", "Next.js", "Tailwind CSS", "3+ years experience"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=face",
    category: "Development",
    foodAccommodation: "Provided",
    gender: "Male"
  },
  {
    id: 1922331,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$70,000 - $100,000",
    posted: "1 day ago",
    foodAccommodation: "Not Provided",
    description: "Join our design team to create beautiful and functional user interfaces. You'll work closely with developers and product managers to bring designs to life. This role involves conducting user research, creating wireframes and prototypes, and ensuring our products provide exceptional user experiences. You'll also collaborate with marketing teams on brand consistency and visual identity.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "2+ years experience"],
    logo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    category: "Design",
    gender: "Female"
  },
  {
    id: 1922332,
    title: "Digital Marketing Manager",
    company: "Growth Agency",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$60,000 - $90,000",
    posted: "3 days ago",
    description: "Lead our digital marketing efforts across multiple channels. Drive growth through strategic campaigns and data analysis. You'll be responsible for developing and executing comprehensive digital marketing strategies, managing social media presence, optimizing SEO/SEM campaigns, and analyzing performance metrics to drive continuous improvement.",
    requirements: ["Google Analytics", "Social Media", "SEO/SEM", "Email Marketing", "4+ years experience"],
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    category: "Marketing"
  },
  {
    id: 1922333,
    title: "Backend Developer",
    company: "DataTech Inc",
    location: "Austin, TX",
    type: "Remote",
    salary: "$85,000 - $130,000",
    posted: "1 week ago",
    description: "Build scalable backend systems and APIs. Work with modern technologies and cloud platforms. You'll be responsible for designing and implementing robust backend services, optimizing database performance, ensuring system security, and collaborating with frontend teams to deliver seamless user experiences.",
    requirements: ["Node.js", "Python", "AWS", "Database Design", "5+ years experience"],
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    category: "Development"
  },
  {
    id: 1922334,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$90,000 - $140,000",
    posted: "4 days ago",
    description: "Lead product strategy and development. Work with cross-functional teams to deliver exceptional products. You'll be responsible for defining product roadmaps, gathering and prioritizing requirements, coordinating with engineering and design teams, and ensuring successful product launches that meet business objectives.",
    requirements: ["Product Strategy", "Agile", "User Research", "Analytics", "3+ years experience"],
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    category: "Management"
  },
  {
    id: 1922335,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Denver, CO",
    type: "Hybrid",
    salary: "$95,000 - $135,000",
    posted: "5 days ago",
    description: "Manage infrastructure and deployment pipelines. Ensure system reliability and performance. You'll be responsible for automating deployment processes, monitoring system health, managing cloud infrastructure, and implementing CI/CD pipelines to support our development teams.",
    requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "4+ years experience"],
    logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face",
    category: "Development"
  }
];

export const mockJobs: Job[] = mockJobsData;

export const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Hybrid", "Contract"];
export const locations = ["All", "New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX", "Seattle, WA", "Denver, CO"];

// Simple state management for admin operations
let jobsState = [...mockJobsData];

export const getJobs = () => jobsState;
export const addJob = (job: Job) => {
  jobsState = [...jobsState, job];
  return jobsState;
};
export const updateJob = (id: number, job: Job) => {
  jobsState = jobsState.map(j => j.id === id ? job : j);
  return jobsState;
};
export const deleteJob = (id: number) => {
  jobsState = jobsState.filter(j => j.id !== id);
  return jobsState;
};
