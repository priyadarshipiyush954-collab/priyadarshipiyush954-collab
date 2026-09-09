export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  category: 'AI/ML' | 'Computer Vision' | 'NLP' | 'Blockchain' | 'Hackathon';
  featured?: boolean;
  stars?: number;
  forks?: number;
}

export interface ProfileInfo {
  name: string;
  role: string;
  university: string;
  focus: string;
  building: string[];
  stack: string[];
  status: string;
  email: string;
  githubUser: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  hackathonHighlights: string[];
  currentFocus: string[];
  funFact: string;
}

export type GridPalette = 'standard' | 'dark' | 'emerald' | 'cyberpunk';
