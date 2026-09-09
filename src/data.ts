import { ProfileInfo, Project } from './types';

export const profileData: ProfileInfo = {
  name: 'Piyush Priyadarshi',
  role: 'CS Undergraduate',
  university: 'Manipal University Jaipur',
  focus: 'Artificial Intelligence & Machine Learning',
  building: ['Computer Vision', 'NLP', 'Voice AI'],
  stack: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Flask', 'C', 'Solidity', 'Git', 'GitHub', 'VS Code'],
  status: 'Open to AI/ML & Software Engineering internships',
  email: 'priyadarshipiyush954@gmail.com',
  githubUser: 'priyadarshipiyush954-collab',
  githubUrl: 'https://github.com/priyadarshipiyush954-collab',
  linkedinUrl: 'https://www.linkedin.com/in/piyush-priyadarshi-540452349',
  instagramUrl: 'https://www.instagram.com/piyush_priyadarshi04/',
  hackathonHighlights: [
    'Goldman Sachs India Hackathon 2026 finalist / participant',
    'Solved a multi-agent drone-routing problem (NFZ avoidance, dynamic energy management, parallel dispatch)',
    'Conducted gas-overhead benchmarking across Solidity contract security patterns (ERC-721 / ERC-1155)'
  ],
  currentFocus: [
    'AI-based resume analyzer & matcher with job descriptions',
    'AI/ML air-quality downscaling & environmental forecasting system',
    'Career-guidance platform for underserved students',
    'Algorithmic problem-solving & system-design for competitive programming'
  ],
  funFact: "I'd rather ship a working prototype than polish a slide deck"
};

export const projectsData: Project[] = [
  {
    id: 'ai_voice',
    name: 'ai_voice',
    title: 'Voice-Based AI Assistant',
    description: 'Real-time conversational voice assistant with speech recognition, natural language comprehension, and responsive speech output.',
    tags: ['Python', 'SpeechRecognition', 'NLP', 'Voice AI', 'pyttsx3'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/ai_voice',
    category: 'AI/ML',
    featured: true,
  },
  {
    id: 'face_recognition',
    name: 'face_recognition',
    title: 'ML Face Recognition & Attendance System',
    description: 'Computer vision biometric attendance platform utilizing deep Convolutional Neural Networks and FaceNet embeddings for accurate real-time facial identification.',
    tags: ['Python', 'OpenCV', 'FaceNet', 'CNN', 'Deep Learning'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/face_recognition',
    category: 'Computer Vision',
    featured: true,
  },
  {
    id: 'resume_analyzer',
    name: 'hackhathon — Resume Analyzer',
    title: 'AI Resume Scanner & Matcher',
    description: 'Intelligent resume analysis platform that parses applicant resumes and scores contextual match alignment against target job descriptions using NLP embeddings.',
    tags: ['Python', 'Flask', 'NLP', 'TF-IDF / Embeddings', 'Document AI'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/hackhathon',
    category: 'NLP',
    featured: true,
  },
  {
    id: 'hand_tracking',
    name: 'HandTrackingProject',
    title: 'Real-Time Hand Tracking & Gesture Control',
    description: 'High-fps 21-landmark hand gesture recognition pipeline built with OpenCV and MediaPipe, mapping spatial hand coordinates to real-time interactive controls.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Gesture AI', 'Real-Time'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/HandTrackingProject',
    category: 'Computer Vision',
    featured: true,
  },
  {
    id: 'object_detection',
    name: 'object-detection-2',
    title: 'Object Detection & Tracking Pipeline',
    description: 'Deep learning pipeline for multi-class object localization, bounding box regression, and real-time tracking across multi-camera feeds.',
    tags: ['Python', 'PyTorch', 'YOLO / SSD', 'Computer Vision'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/object-detection-2',
    category: 'Computer Vision',
    featured: false,
  },
  {
    id: 'hackathon_3',
    name: 'HACKHATHON3.0',
    title: 'Autonomous Drone Routing Engine',
    description: 'Multi-agent algorithmic routing system addressing no-fly zone (NFZ) avoidance, parallel fleet coordination, and battery energy optimization constraints.',
    tags: ['Python', 'Algorithms', 'A* Search', 'Fleet Optimization'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/HACKHATHON3.0',
    category: 'Hackathon',
    featured: false,
  }
];

export const techCategories = [
  {
    title: 'Core Languages',
    skills: [
      { name: 'Python', level: 'Primary', desc: 'AI/ML scripting, PyTorch, OpenCV, Flask' },
      { name: 'C', level: 'Proficient', desc: 'Low-level systems, data structures & algorithms' },
      { name: 'Solidity', level: 'Specialized', desc: 'Smart contracts, ERC-721/1155 security & gas optimization' },
    ]
  },
  {
    title: 'AI, ML & Deep Learning',
    skills: [
      { name: 'TensorFlow', level: 'Framework', desc: 'Neural network training & deployment' },
      { name: 'PyTorch', level: 'Framework', desc: 'Custom architectures & computer vision models' },
      { name: 'OpenCV', level: 'Vision', desc: 'Image processing, feature extraction, real-time video' },
      { name: 'NLP & Voice AI', level: 'Domain', desc: 'Speech recognition, contextual embeddings, text processing' }
    ]
  },
  {
    title: 'Web & Tooling',
    skills: [
      { name: 'Flask', level: 'Backend', desc: 'Microservice APIs & ML inference serving' },
      { name: 'Git & GitHub', level: 'Version Control', desc: 'CI/CD workflows, collaborative repository management' },
      { name: 'VS Code', level: 'IDE', desc: 'Primary development & debugging environment' }
    ]
  }
];
