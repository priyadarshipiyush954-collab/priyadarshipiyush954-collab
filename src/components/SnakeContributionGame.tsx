import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Compass, Palette, Trophy, Sparkles, ExternalLink } from 'lucide-react';
import { GridPalette } from '../types';

interface Point {
  x: number;
  y: number;
}

const WEEKS = 32; // Responsive grid width
const DAYS = 7;   // Mon - Sun

const PALETTES: Record<GridPalette, {
  name: string;
  bg: string;
  gridBg: string;
  levels: string[];
  snakeHead: string;
  snakeBody: string;
  food: string;
}> = {
  standard: {
    name: 'GitHub Classic',
    bg: 'bg-slate-900',
    gridBg: 'bg-slate-950/70',
    levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    snakeHead: '#f0883e',
    snakeBody: '#ffa657',
    food: '#58a6ff'
  },
  emerald: {
    name: 'Emerald Matrix',
    bg: 'bg-emerald-950/40',
    gridBg: 'bg-emerald-950/80',
    levels: ['#062419', '#064e3b', '#047857', '#10b981', '#34d399'],
    snakeHead: '#f59e0b',
    snakeBody: '#fbbf24',
    food: '#38bdf8'
  },
  dark: {
    name: 'GitHub Dark Mode',
    bg: 'bg-zinc-900',
    gridBg: 'bg-zinc-950',
    levels: ['#18181b', '#27272a', '#3f3f46', '#71717a', '#a1a1aa'],
    snakeHead: '#ef4444',
    snakeBody: '#f87171',
    food: '#3b82f6'
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    bg: 'bg-purple-950/40',
    gridBg: 'bg-slate-950',
    levels: ['#1e1035', '#4a154b', '#7a1f6d', '#b82787', '#ec4899'],
    snakeHead: '#06b6d4',
    snakeBody: '#22d3ee',
    food: '#fbbf24'
  }
};

export const SnakeContributionGame: React.FC = () => {
  const [palette, setPalette] = useState<GridPalette>('standard');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAutoPilot, setIsAutoPilot] = useState<boolean>(true);
  const [score, setScore] = useState<number>(42);
  const [highScore, setHighScore] = useState<number>(128);
  const [viewMode, setViewMode] = useState<'interactive' | 'live-svg'>('interactive');

  // Grid levels: 2D array [WEEKS][DAYS] (0 to 4)
  const [grid, setGrid] = useState<number[][]>(() => {
    return Array.from({ length: WEEKS }, (_, w) =>
      Array.from({ length: DAYS }, (_, d) => {
        // Natural distribution of commits
        const rand = Math.random();
        if (rand > 0.82) return 3;
        if (rand > 0.65) return 2;
        if (rand > 0.45) return 1;
        if (rand > 0.35) return 4;
        return 0;
      })
    );
  });

  const [snake, setSnake] = useState<Point[]>([
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
  ]);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>({ x: 15, y: 4 });

  const currentTheme = PALETTES[palette];

  // Spawn food at a non-snake position
  const spawnFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * WEEKS),
        y: Math.floor(Math.random() * DAYS)
      };
      attempts++;
    } while (
      currentSnake.some(s => s.x === newFood.x && s.y === newFood.y) &&
      attempts < 50
    );
    return newFood;
  }, []);

  // Reset Game
  const resetGame = () => {
    const initialSnake = [
      { x: 5, y: 3 },
      { x: 4, y: 3 },
      { x: 3, y: 3 },
    ];
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setFood(spawnFood(initialSnake));
    setIsPlaying(true);
  };

  // Keyboard navigation for manual play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
        // prevent page scroll when playing
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }

      if (e.key === ' ' || e.code === 'Space') {
        setIsPlaying(p => !p);
        return;
      }

      if (isAutoPilot) {
        setIsAutoPilot(false); // Switch to manual control upon keypress
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isAutoPilot]);

  // Autopilot logic (AI pathfinding)
  const calculateAutoPilotDirection = useCallback((head: Point, target: Point, currentSnake: Point[]): Point => {
    const dx = target.x - head.x;
    const dy = target.y - head.y;

    const candidates: Point[] = [];
    if (Math.abs(dx) > Math.abs(dy)) {
      candidates.push({ x: dx > 0 ? 1 : -1, y: 0 });
      candidates.push({ x: 0, y: dy > 0 ? 1 : -1 });
      candidates.push({ x: 0, y: dy > 0 ? -1 : 1 });
      candidates.push({ x: dx > 0 ? -1 : 1, y: 0 });
    } else {
      candidates.push({ x: 0, y: dy > 0 ? 1 : -1 });
      candidates.push({ x: dx > 0 ? 1 : -1, y: 0 });
      candidates.push({ x: dx > 0 ? -1 : 1, y: 0 });
      candidates.push({ x: 0, y: dy > 0 ? -1 : 1 });
    }

    for (const cand of candidates) {
      const nextX = (head.x + cand.x + WEEKS) % WEEKS;
      const nextY = (head.y + cand.y + DAYS) % DAYS;

      // Avoid self-collision
      const hitsBody = currentSnake.some((segment, idx) => {
        if (idx === currentSnake.length - 1) return false; // tail moves
        return segment.x === nextX && segment.y === nextY;
      });

      if (!hitsBody) {
        return cand;
      }
    }

    return candidates[0] || { x: 1, y: 0 };
  }, []);

  // Main game tick
  useEffect(() => {
    if (!isPlaying || viewMode !== 'interactive') return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let currentDir = nextDirection;

        if (isAutoPilot) {
          currentDir = calculateAutoPilotDirection(head, food, prevSnake);
          setNextDirection(currentDir);
        }

        setDirection(currentDir);

        // Move head with toroidal wrap-around (classic snake grid)
        const newHead: Point = {
          x: (head.x + currentDir.x + WEEKS) % WEEKS,
          y: (head.y + currentDir.y + DAYS) % DAYS
        };

        // Check if snake ate food
        const ateFood = newHead.x === food.x && newHead.y === food.y;

        // Upgrade cell contribution level at snake head
        setGrid(prevGrid => {
          const nextGrid = prevGrid.map(row => [...row]);
          const curVal = nextGrid[newHead.x][newHead.y];
          nextGrid[newHead.x][newHead.y] = Math.min(4, curVal + 1);
          return nextGrid;
        });

        let updatedSnake: Point[];
        if (ateFood) {
          updatedSnake = [newHead, ...prevSnake];
          setScore(s => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setFood(spawnFood(updatedSnake));
        } else {
          updatedSnake = [newHead, ...prevSnake.slice(0, -1)];
        }

        return updatedSnake;
      });
    }, isAutoPilot ? 110 : 130);

    return () => clearInterval(interval);
  }, [isPlaying, isAutoPilot, food, nextDirection, spawnFood, highScore, calculateAutoPilotDirection, viewMode]);

  return (
    <div id="snake-contribution-section" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🐍</span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              GitHub Contribution Snake Activity
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
              workflow: Platane/snk@v3
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Simulating the daily GitHub Action contribution animation from <code className="text-slate-300 font-mono text-xs">.github/workflows/snake.yml</code>.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto">
          <button
            id="view-mode-interactive"
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'interactive'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Interactive Simulation
          </button>
          <button
            id="view-mode-live-svg"
            onClick={() => setViewMode('live-svg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'live-svg'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Workflow SVG
          </button>
        </div>
      </div>

      {viewMode === 'interactive' ? (
        <>
          {/* Controls bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <button
                id="play-pause-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                title={isPlaying ? 'Pause simulation' : 'Resume simulation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                id="reset-game-btn"
                onClick={resetGame}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
                title="Restart snake"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                id="autopilot-toggle-btn"
                onClick={() => setIsAutoPilot(!isAutoPilot)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                  isAutoPilot
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                }`}
                title="Toggle Autopilot / Manual controls"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isAutoPilot ? 'Autopilot: Active' : 'Manual Keys: Active'}</span>
              </button>
            </div>

            {/* Score & Palette */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 text-slate-400">
                  <span>Score:</span>
                  <span className="text-white font-bold">{score}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 font-bold">{highScore}</span>
                </div>
              </div>

              {/* Theme selection */}
              <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <select
                  id="palette-select"
                  value={palette}
                  onChange={(e) => setPalette(e.target.value as GridPalette)}
                  className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-sky-500"
                >
                  {Object.entries(PALETTES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid Canvas */}
          <div className="relative overflow-x-auto pb-2 scrollbar-thin">
            <div
              className={`p-4 rounded-xl border border-slate-800/80 ${currentTheme.gridBg} transition-colors min-w-[640px]`}
            >
              <div className="grid grid-flow-col gap-1.5 justify-between">
                {grid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => {
                      const isSnakeHead = snake[0]?.x === wIdx && snake[0]?.y === dIdx;
                      const isSnakeBody = snake.slice(1).some(s => s.x === wIdx && s.y === dIdx);
                      const isFood = food.x === wIdx && food.y === dIdx;

                      let cellColor = currentTheme.levels[level] || currentTheme.levels[0];
                      let customStyle: React.CSSProperties = { backgroundColor: cellColor };

                      if (isSnakeHead) {
                        customStyle = {
                          backgroundColor: currentTheme.snakeHead,
                          boxShadow: `0 0 8px ${currentTheme.snakeHead}`,
                          zIndex: 10,
                          transform: 'scale(1.15)',
                        };
                      } else if (isSnakeBody) {
                        customStyle = {
                          backgroundColor: currentTheme.snakeBody,
                          opacity: 0.9,
                        };
                      } else if (isFood) {
                        customStyle = {
                          backgroundColor: currentTheme.food,
                          boxShadow: `0 0 10px ${currentTheme.food}`,
                          animation: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        };
                      }

                      return (
                        <div
                          key={dIdx}
                          style={customStyle}
                          className="w-3.5 h-3.5 rounded-sm transition-all duration-75 relative"
                          title={`Week ${wIdx + 1}, Day ${dIdx + 1} (${level} commits)`}
                        >
                          {isFood && (
                            <span className="absolute inset-0 flex items-center justify-center text-[8px]">
                              ✦
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend and instructions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    {currentTheme.levels.map((lvlColor, idx) => (
                      <span
                        key={idx}
                        style={{ backgroundColor: lvlColor }}
                        className="w-3 h-3 rounded-xs inline-block"
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                  <span>Controls: Arrow keys / WASD to steer</span>
                  <span>•</span>
                  <span>Space to pause</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Live Raw SVG preview from GitHub output branch */
        <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800 text-center flex flex-col items-center">
          <p className="text-xs text-slate-400 mb-3 font-mono">
            Directly rendering generated asset from:
            <code className="text-sky-400 ml-1">
              https://raw.githubusercontent.com/priyadarshipiyush954-collab/priyadarshipiyush954-collab/output/github-contribution-grid-snake.svg
            </code>
          </p>
          <div className="max-w-full overflow-x-auto p-4 bg-slate-900 rounded-lg border border-slate-800">
            <img
              src="https://raw.githubusercontent.com/priyadarshipiyush954-collab/priyadarshipiyush954-collab/output/github-contribution-grid-snake.svg"
              alt="Contribution snake animation"
              className="max-h-64 object-contain mx-auto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If branch hasn't finished running yet on GitHub, display fallback note
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'text-xs text-slate-400 py-6';
                  fallbackDiv.innerText = 'SVG rendered via the daily schedule workflow. Switch back to Interactive Simulation above to play!';
                  parent.appendChild(fallbackDiv);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
