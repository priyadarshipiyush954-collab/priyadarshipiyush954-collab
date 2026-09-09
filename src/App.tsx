import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SnakeContributionGame } from './components/SnakeContributionGame';
import { FeaturedProjects } from './components/FeaturedProjects';
import { TechStack } from './components/TechStack';
import { GitHubStats } from './components/GitHubStats';
import { AboutAndAchievements } from './components/AboutAndAchievements';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SnakeContributionGame />
          <FeaturedProjects />
          <TechStack />
          <GitHubStats />
          <AboutAndAchievements />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
