import React from 'react';
import { motion } from 'motion/react';
import { profileData } from '../data';
import { Trophy, Compass, MessageSquare, Zap, Terminal, Sparkles, Check } from 'lucide-react';

export const AboutAndAchievements: React.FC = () => {
  return (
    <section id="about" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: YAML-style About Me Terminal Card */}
          <motion.div 
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">👋</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">About Me</h2>
            </div>

            <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl font-mono text-xs overflow-x-auto relative">
              {/* Terminal top bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-500 text-[11px]">profile.yaml</span>
                </div>
                <span className="text-slate-600 text-[10px]">UTF-8</span>
              </div>

              {/* YAML Content */}
              <div className="space-y-2 text-slate-300">
                <div className="text-sky-400 font-semibold"># Profile Specification</div>
                <div>
                  <span className="text-rose-400">name:</span>{' '}
                  <span className="text-emerald-300">"{profileData.name}"</span>
                </div>
                <div>
                  <span className="text-rose-400">role:</span>{' '}
                  <span className="text-slate-200">{profileData.role} @ {profileData.university}</span>
                </div>
                <div>
                  <span className="text-rose-400">focus:</span>{' '}
                  <span className="text-sky-300">{profileData.focus}</span>
                </div>
                <div>
                  <span className="text-rose-400">building:</span>{' '}
                  <span className="text-amber-300">
                    [{profileData.building.join(', ')}]
                  </span>
                </div>
                <div>
                  <span className="text-rose-400">stack:</span>{' '}
                  <span className="text-purple-300">
                    [{profileData.stack.slice(0, 6).join(', ')}, ...]
                  </span>
                </div>
                <div>
                  <span className="text-rose-400">status:</span>{' '}
                  <span className="text-emerald-400 font-semibold">"{profileData.status}"</span>
                </div>
                <div>
                  <span className="text-rose-400">location:</span>{' '}
                  <span className="text-slate-300">"Jaipur, India"</span>
                </div>
              </div>

              {/* Hackathon callout */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-slate-400">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Trophy className="w-4 h-4" />
                  <span>Key Hackathon Initiatives</span>
                </div>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  {profileData.hackathonHighlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Currently, Fun Fact & Engagement */}
          <motion.div 
            className="flex flex-col h-full justify-between gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🎯</span>
                <h2 className="text-2xl font-bold text-white tracking-tight">Currently Building & Exploring</h2>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                {profileData.currentFocus.map((focus, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-md bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-sky-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {focus}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun Fact & Ask Me About */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Fun Fact</span>
                </div>
                <p className="text-xs text-slate-300 italic">
                  "{profileData.funFact}"
                </p>
              </motion.div>

              <motion.div 
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Me About</span>
                </div>
                <p className="text-xs text-slate-300">
                  Computer Vision, NLP, Voice AI, or Python / TensorFlow / PyTorch architectures.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
