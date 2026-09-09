import React, { useState } from 'react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

interface StatCardProps {
  title: string;
  url: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, url, className = '' }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div 
      variants={itemVariants}
      className={`bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(88,166,255,0.2)] ${className}`}
    >
      {error ? (
        <div className="text-slate-400 py-8 text-center flex flex-col items-center gap-2">
           <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          Failed to load {title}
        </div>
      ) : (
        <img 
          src={url} 
          alt={title}
          className="max-w-full h-auto"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
        />
      )}
    </motion.div>
  );
};

export const GitHubStats: React.FC = () => {
  return (
    <section id="github-stats" className="py-20 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl" role="img" aria-label="bar chart">📊</span> 
            GitHub Stats & Analytics
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A real-time overview of my open-source contributions and coding activity on GitHub.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          <StatCard 
            title="GitHub Trophies"
            url="https://github-profile-trophy.vercel.app/?username=priyadarshipiyush954-collab&theme=radical&no-frame=true&no-bg=true&margin_w=4"
            className="md:col-span-2 overflow-x-auto"
          />
          
          <StatCard 
            title="GitHub Stats"
            url="https://github-readme-stats.vercel.app/api?username=priyadarshipiyush954-collab&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&icon_color=79C0FF&text_color=C9D1D9"
          />

          <StatCard 
            title="Top Languages"
            url="https://github-readme-stats.vercel.app/api/top-langs/?username=priyadarshipiyush954-collab&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9"
          />

          <StatCard 
            title="Streak Stats"
            url="https://github-readme-streak-stats.herokuapp.com/?user=priyadarshipiyush954-collab&theme=tokyonight&hide_border=true&background=0D1117&ring=58A6FF&fire=FF9800&currStreakNum=58A6FF"
            className="md:col-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
};
