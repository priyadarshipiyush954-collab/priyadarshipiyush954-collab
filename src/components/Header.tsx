import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Mail, Check, Terminal } from 'lucide-react';
import { profileData } from '../data';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-white group-hover:text-sky-400 transition-colors">
              {profileData.name}
            </div>
            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              {profileData.role} @ Manipal
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          <a href="#snake-contribution-section" className="hover:text-sky-400 transition-colors">Snake Activity</a>
          <a href="#tech-stack" className="hover:text-sky-400 transition-colors">Tech Stack</a>
          <a href="#about" className="hover:text-sky-400 transition-colors">About & Hackathons</a>
        </nav>

        {/* Social Action Links */}
        <div className="flex items-center gap-2">
          <a
            id="nav-github-link"
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="nav-linkedin-link"
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800/80 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            id="nav-instagram-link"
            href={profileData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-slate-800/80 transition-colors"
            title="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            id="nav-copy-email-btn"
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all ml-1"
            title="Copy Email to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Contact'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
