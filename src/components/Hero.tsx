import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Github, Linkedin, Mail, Check, Code2, Cpu, Award } from 'lucide-react';
import { profileData } from '../data';
import { PixelAvatar } from './PixelAvatar';
import { ParticleBackground } from './ParticleBackground';

const TYPING_LINES = [
  'CS Undergrad @ Manipal University Jaipur',
  'AI / ML Enthusiast 🧠',
  'Building with Python, TensorFlow, PyTorch',
  'Computer Vision | NLP | Voice AI',
  'Open to AI/ML Internships 🚀'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const Hero: React.FC = () => {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter effect matching the demo lab SVG in README
  useEffect(() => {
    const currentFullText = TYPING_LINES[lineIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setLineIdx((prev) => (prev + 1) % TYPING_LINES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, lineIdx]);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12">
      {/* Visual Header Wave from README */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-sky-900/40 shadow-2xl mb-8 bg-slate-900"
      >
        <img
          src="https://capsule-render.vercel.app/api?type=waving&color=0:6DD5FA,100:2980B9&height=180&section=header&text=Hi%20There!%20I'm%20Piyush%20%F0%9F%91%8B&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=35"
          alt="Hi There! I'm Piyush"
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Particle Background behind hero content */}
        <div className="absolute inset-0 -z-0 overflow-hidden rounded-3xl" style={{ minHeight: '500px' }}>
          <ParticleBackground />
        </div>

        <motion.div
          className="text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Pixel Avatar */}
          <motion.div variants={itemVariants} className="flex justify-center -mt-14 mb-4">
            <PixelAvatar className="animate-glow-pulse" />
          </motion.div>

          {/* Status pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>{profileData.status}</span>
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Piyush Priyadarshi
          </motion.h1>

          {/* Animated typing headline */}
          <motion.div
            variants={itemVariants}
            className="h-10 flex items-center justify-center font-mono text-base sm:text-xl font-medium text-sky-400 mb-6"
          >
            <span>{displayText}</span>
            <span className="inline-block w-2 h-5 ml-1 bg-sky-400 animate-pulse" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed mb-8"
          >
            Computer Science undergraduate at Manipal University Jaipur focusing on{' '}
            <strong className="text-slate-200 font-semibold">Artificial Intelligence & Machine Learning</strong>.
            Building real-world applications across Computer Vision, Voice AI, and Natural Language Processing.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <motion.a
              id="hero-explore-projects-btn"
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/25 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              id="hero-snake-btn"
              href="#snake-contribution-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>🐍 Play Snake Game</span>
            </motion.a>

            <motion.a
              id="hero-linkedin-btn"
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-sm font-semibold transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.button
              id="hero-email-btn"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-sm font-medium transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
              <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
            </motion.button>
          </motion.div>

          {/* Highlights ribbon */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left"
          >
            <motion.div
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm animate-float"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2 text-sky-400 mb-1 font-semibold text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Specialization</span>
              </div>
              <div className="text-white font-bold text-sm">Computer Vision & Voice AI</div>
              <div className="text-slate-400 text-xs mt-0.5">FaceNet, MediaPipe, Speech AI</div>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm animate-float-delay-1"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2 text-amber-400 mb-1 font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Hackathons</span>
              </div>
              <div className="text-white font-bold text-sm">Goldman Sachs Hackathon 2026</div>
              <div className="text-slate-400 text-xs mt-0.5">Multi-agent drone routing engine</div>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm animate-float-delay-2"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-1 font-semibold text-xs uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Core Stack</span>
              </div>
              <div className="text-white font-bold text-sm">Python, PyTorch & OpenCV</div>
              <div className="text-slate-400 text-xs mt-0.5">Plus TensorFlow, Flask, C, Solidity</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
