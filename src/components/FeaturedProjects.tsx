import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Search, Eye, Mic, UserCheck, FileText, Hand, Boxes, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';

export const FeaturedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI/ML', 'Computer Vision', 'NLP', 'Hackathon'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'ai_voice':
        return <Mic className="w-5 h-5 text-sky-400" />;
      case 'face_recognition':
        return <UserCheck className="w-5 h-5 text-purple-400" />;
      case 'resume_analyzer':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'hand_tracking':
        return <Hand className="w-5 h-5 text-amber-400" />;
      case 'object_detection':
        return <Eye className="w-5 h-5 text-blue-400" />;
      case 'hackathon_3':
        return <Navigation className="w-5 h-5 text-rose-400" />;
      default:
        return <Boxes className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <motion.section id="projects" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🚀</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Open-source machine learning systems, computer vision tools, and algorithmic engines.
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search tech, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No projects matching your search criteria.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group flex flex-col justify-between p-6 bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-sky-500/5"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div>
                  {/* Top Bar: Icon + Category Badge + Link */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                      {getProjectIcon(project.id)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                        {project.category}
                      </span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Repo Name & Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-sky-500/90 mb-3">
                    {project.name}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags & Footer */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    id={`view-repo-btn-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
