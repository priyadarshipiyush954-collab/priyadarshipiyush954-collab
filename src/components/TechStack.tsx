import React from 'react';
import { techCategories } from '../data';
import { Layers, CheckCircle2 } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-12 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🛠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tech Stack & Tooling
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Languages, deep learning frameworks, and engineering tools powering my builds.
          </p>
        </div>

        {/* Skill Icons Visual Banner from README */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Quick Icon Overview</h3>
            <p className="text-xs text-slate-400">Official icons referenced in profile README</p>
          </div>
          <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
            <img
              src="https://skillicons.dev/icons?i=python,tensorflow,pytorch,opencv,flask,solidity,c,git,github,vscode"
              alt="Tech Stack Icons"
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Detailed Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
                  <Layers className="w-4 h-4" />
                  <span>{category.title}</span>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-200">{skill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
