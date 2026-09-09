const fs = require('fs');
const path = require('path');

const avatarB64 = fs.readFileSync(path.join(__dirname, 'assets/avatar.jpg')).toString('base64');
const dataUri = `data:image/jpeg;base64,${avatarB64}`;

// 1. Dedicated Animated Avatar SVG (260 x 260)
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" width="280" height="280">
  <defs>
    <!-- Avatar Clip Path -->
    <clipPath id="avatar-clip">
      <circle cx="140" cy="140" r="76" />
    </clipPath>

    <!-- Gradients -->
    <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="50%" stop-color="#4facfe" />
      <stop offset="100%" stop-color="#00c6ff" />
    </linearGradient>

    <linearGradient id="ring-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38ef7d" />
      <stop offset="100%" stop-color="#11998e" />
    </linearGradient>

    <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#4facfe" stop-opacity="0" />
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="pulse-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <style>
      @keyframes rotateClockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes rotateCounter {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes breathGlow {
        0%, 100% { opacity: 0.35; transform: scale(0.97); }
        50% { opacity: 0.75; transform: scale(1.03); }
      }
      @keyframes pingDot {
        0%, 100% { r: 5; opacity: 1; }
        50% { r: 8; opacity: 0.5; }
      }
      @keyframes floatEffect {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }

      .center-origin {
        transform-origin: 140px 140px;
      }
      .spin-slow {
        animation: rotateClockwise 14s linear infinite;
      }
      .spin-reverse {
        animation: rotateCounter 10s linear infinite;
      }
      .spin-fast {
        animation: rotateClockwise 6s linear infinite;
      }
      .breathe {
        animation: breathGlow 4s ease-in-out infinite;
      }
      .floating {
        animation: floatEffect 5s ease-in-out infinite;
      }
      .pulse-indicator {
        animation: pingDot 2s ease-in-out infinite;
      }
    </style>
  </defs>

  <!-- Ambient Pulsing Glow Circle -->
  <circle cx="140" cy="140" r="92" fill="url(#glow-grad)" filter="url(#pulse-blur)" class="center-origin breathe" />

  <!-- Outer Dash Segment Ring 1 (Clockwise) -->
  <circle cx="140" cy="140" r="108" fill="none" stroke="#2980b9" stroke-width="1.5" stroke-dasharray="8 12 24 12" stroke-opacity="0.6" class="center-origin spin-slow" />

  <!-- Outer Tech Accents Ring 2 (Counter Clockwise) -->
  <circle cx="140" cy="140" r="98" fill="none" stroke="url(#ring-grad-1)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="35 55 15 40 60 25" filter="url(#neon-glow)" class="center-origin spin-reverse" />

  <!-- Orbiting Node Dot -->
  <g class="center-origin spin-fast">
    <circle cx="140" cy="38" r="4.5" fill="#00f2fe" filter="url(#neon-glow)" />
    <circle cx="140" cy="242" r="3" fill="#38ef7d" filter="url(#neon-glow)" />
  </g>

  <!-- Target Corner Reticles -->
  <path d="M 40,70 L 40,40 L 70,40" fill="none" stroke="#00c6ff" stroke-width="2" stroke-linecap="round" opacity="0.7" />
  <path d="M 240,70 L 240,40 L 210,40" fill="none" stroke="#00c6ff" stroke-width="2" stroke-linecap="round" opacity="0.7" />
  <path d="M 40,210 L 40,240 L 70,240" fill="none" stroke="#00c6ff" stroke-width="2" stroke-linecap="round" opacity="0.7" />
  <path d="M 240,210 L 240,240 L 210,240" fill="none" stroke="#00c6ff" stroke-width="2" stroke-linecap="round" opacity="0.7" />

  <!-- Inner Solid Border Ring -->
  <circle cx="140" cy="140" r="82" fill="#0f172a" stroke="#1e293b" stroke-width="4" />
  <circle cx="140" cy="140" r="79" fill="none" stroke="url(#ring-grad-1)" stroke-width="2.5" />

  <!-- The Avatar Image (Clipped) -->
  <g class="center-origin floating">
    <image href="${dataUri}" x="64" y="64" width="152" height="152" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- High-tech Status Pill Badge at Bottom Center -->
  <g transform="translate(70, 222)">
    <rect x="0" y="0" width="140" height="26" rx="13" fill="#090d16" stroke="#00f2fe" stroke-width="1.2" filter="url(#neon-glow)" opacity="0.95" />
    <!-- Glowing green online beacon -->
    <circle cx="20" cy="13" r="5" fill="#34d399" class="center-origin pulse-indicator" />
    <circle cx="20" cy="13" r="3" fill="#10b981" />
    <text x="34" y="17" fill="#e2e8f0" font-family="'Fira Code', ui-monospace, monospace" font-size="10" font-weight="600" letter-spacing="0.5">OPEN TO WORK</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'assets/animated-avatar.svg'), avatarSvg);
console.log('Created assets/animated-avatar.svg successfully!');
