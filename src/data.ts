import { ProfileInfo, Project } from './types';

export const profileData: ProfileInfo = {
  name: 'Piyush Priyadarshi',
  role: 'CS Undergraduate',
  university: 'Manipal University Jaipur',
  focus: 'Applied AI & Machine Learning for environmental monitoring',
  building: ['Climate AI', 'Satellite ML', 'Computer Vision', 'NLP'],
  stack: ['Python', 'PyTorch', 'TypeScript', 'React', 'FastAPI', 'Docker', 'TensorFlow', 'OpenCV', 'Flask', 'C', 'Solidity', 'Git', 'GitHub', 'VS Code'],
  status: 'Open to AI/ML & Software Engineering internships',
  email: 'priyadarshipiyush954@gmail.com',
  githubUser: 'priyadarshipiyush954-collab',
  githubUrl: 'https://github.com/priyadarshipiyush954-collab',
  linkedinUrl: 'https://www.linkedin.com/in/piyush-priyadarshi-540452349',
  instagramUrl: 'https://www.instagram.com/piyush_priyadarshi04/',
  selectedHighlights: [
    'Built CycloneSense, a live cyclone dashboard with satellite layers, track forecasts, and a validation-based uncertainty cone',
    'Held out five storms during North Indian Ocean validation; the model beats persistence at 7 of 8 leads, but not at +6 h',
    'Goldman Sachs India Hackathon 2026 participant',
    'Solved a multi-agent drone-routing problem with no-fly-zone avoidance and energy management',
    'Benchmarked gas overhead across ERC-721 / ERC-1155 security patterns'
  ],
  currentFocus: [
    'CycloneSense: live cyclone monitoring with satellite feeds and track / intensity forecasts',
    'North Indian Ocean track research with validation grouped by storm, not overlapping time windows',
    'Satellite-image wind estimation with clear input limits and research caveats',
    'Reliable model deployment with labelled fallbacks and measurable forecast uncertainty'
  ],
  funFact: "I'd rather ship a working prototype than polish a slide deck"
};

export const projectsData: Project[] = [
  {
    id: 'cyclonesense',
    name: 'CycloneSense',
    title: 'AI Cyclone Monitoring & Track Forecasting',
    description: 'Live storm feeds, satellite layers, and track / intensity forecasts in one dashboard. Research notes report storm-held-out validation; fallback forecasts are labelled, and the project is not an official warning system.',
    tags: ['Python', 'PyTorch', 'NASA GIBS', 'NOAA IBTrACS', 'React', 'FastAPI'],
    githubUrl: 'https://github.com/priyadarshipiyush954-collab/CycloneSense',
    liveUrl: 'https://cyclone-sense-2klx.vercel.app/',
    researchUrl: 'https://github.com/priyadarshipiyush954-collab/CycloneSense/blob/main/docs/MODEL.md',
    category: 'Climate AI',
    featured: true,
  },
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
    title: 'Languages & Frameworks',
    skills: [
      { name: 'Python', level: 'Primary', desc: 'AI/ML modeling, satellite-data pipelines, and inference' },
      { name: 'TypeScript', level: 'Application UI', desc: 'React dashboards and portfolio interfaces' },
      { name: 'PyTorch', level: 'Framework', desc: 'Sequence models and computer-vision experiments' },
      { name: 'OpenCV', level: 'Vision', desc: 'Image processing and real-time video' },
      { name: 'C & Solidity', level: 'Additional', desc: 'Algorithms, systems fundamentals, and contract benchmarking' },
    ]
  },
  {
    title: 'Cyclone Data & Evaluation',
    skills: [
      { name: 'NOAA IBTrACS', level: 'Best-track data', desc: 'Storm-level track and intensity labels' },
      { name: 'NASA GIBS', level: 'Satellite imagery', desc: 'MODIS imagery for cyclone research' },
      { name: 'GDACS + Open-Meteo', level: 'Live feeds', desc: 'Cyclone alerts and city weather conditions' },
      { name: 'Storm-level validation', level: 'Evaluation', desc: 'Held-out storms and persistence-baseline comparisons' },
    ]
  },
  {
    title: 'Web & Deployment',
    skills: [
      { name: 'React + TypeScript', level: 'Frontend', desc: 'Interactive portfolio and monitoring dashboards' },
      { name: 'FastAPI', level: 'Model API', desc: 'Python inference endpoints for wind and track estimates' },
      { name: 'Docker', level: 'Deployment', desc: 'Reproducible application and model services' },
      { name: 'Git & GitHub', level: 'Version Control', desc: 'Source control, CI, and collaborative workflows' },
      { name: 'VS Code', level: 'IDE', desc: 'Development and debugging environment' },
    ]
  }
];
