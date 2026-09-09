import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../data';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="mt-16 border-t border-slate-800 bg-slate-950">
      {/* Capsule Footer Wave from README */}
      <div className="w-full max-w-5xl mx-auto overflow-hidden opacity-90">
        <img
          src="https://capsule-render.vercel.app/api?type=waving&color=0:2980B9,100:6DD5FA&height=90&section=footer"
          alt="Footer Wave"
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="text-sm font-bold text-white">
              {profileData.name}
            </div>
            <p className="text-xs text-slate-400">
              CS Undergraduate @ Manipal University Jaipur · AI & Machine Learning
            </p>

            {/* Profile Views Badge from README */}
            <div className="pt-2">
              <img
                src="https://komarev.com/ghpvc/?username=priyadarshipiyush954-collab&color=2980b9&style=for-the-badge&label=PROFILE+VIEWS"
                alt="Profile Views Counter"
                className="h-6 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors block"
                title="GitHub Profile"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-colors block"
                title="LinkedIn Profile"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={profileData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-slate-700 transition-colors block"
                title="Instagram Profile"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`mailto:${profileData.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors block"
                title="Email Me"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Scroll to Top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
