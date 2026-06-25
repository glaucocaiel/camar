import React from "react";

interface ScientificLogoProps {
  className?: string;
}

export default function ScientificLogo({ className = "h-12 w-12" }: ScientificLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={`${className} select-none`}
      aria-label="Scientific Logo"
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#5b509f" />
          <stop offset="50%" stopColor="#3b3378" />
          <stop offset="100%" stopColor="#1e1845" />
        </radialGradient>

        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#b5bdc4" />
          <stop offset="50%" stopColor="#7a858f" />
          <stop offset="75%" stopColor="#555f69" />
          <stop offset="100%" stopColor="#2c3238" />
        </linearGradient>

        <linearGradient id="metalHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>

        <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe082" />
          <stop offset="50%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#b77a00" />
        </linearGradient>

        <radialGradient id="nodeGradTeal" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4fd1c5" />
          <stop offset="60%" stopColor="#2c7a7b" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>

        <radialGradient id="nodeGradPurple" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d6bcfa" />
          <stop offset="60%" stopColor="#6b46c1" />
          <stop offset="100%" stopColor="#322659" />
        </radialGradient>

        <radialGradient id="nodeGradBlue" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#63b3ed" />
          <stop offset="60%" stopColor="#2b6cb0" />
          <stop offset="100%" stopColor="#1a365d" />
        </radialGradient>

        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#a0aec0" />
          <stop offset="100%" stopColor="#2d3748" />
        </radialGradient>

        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.35" />
        </filter>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* BACKGROUND GRAPHICS: CONNECTING RODS (TUBES) */}
      <g stroke="url(#metalGrad)" strokeWidth="11" strokeLinecap="round" filter="url(#dropShadow)">
        {/* Rod to Top-Left Node */}
        <line x1="250" y1="250" x2="160" y2="120" />
        {/* Rod to Middle-Left Node */}
        <line x1="250" y1="250" x2="100" y2="240" />
        {/* Rod to Bottom-Left Node */}
        <line x1="250" y1="250" x2="210" y2="390" />
        {/* Rod to Top-Right Node */}
        <line x1="250" y1="250" x2="410" y2="120" />
        {/* Rod to Bottom-Right Node */}
        <line x1="250" y1="250" x2="410" y2="410" />
      </g>

      {/* HIGHLIGHT LAYER ON RODS FOR 3D SHININESS */}
      <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="248" y1="248" x2="158" y2="118" />
        <line x1="248" y1="248" x2="98" y2="238" />
        <line x1="248" y1="248" x2="208" y2="388" />
        <line x1="248" y1="248" x2="408" y2="118" />
        <line x1="248" y1="248" x2="408" y2="408" />
      </g>

      {/* FLOATING METALLIC RINGS (Behind nodes) */}
      <g stroke="url(#metalGrad)" strokeWidth="8" fill="none" opacity="0.8">
        <circle cx="115" cy="110" r="14" />
        <circle cx="50" cy="265" r="20" />
        <circle cx="205" cy="290" r="22" />
        <circle cx="430" cy="165" r="18" />
        <circle cx="345" cy="395" r="14" />
      </g>

      {/* HIGHLIGHTS FOR RINGS */}
      <g stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.4">
        <path d="M 105 105 A 14 14 0 0 1 125 115" />
        <path d="M 36 257 A 20 20 0 0 1 64 273" />
        <path d="M 190 280 A 22 22 0 0 1 220 300" />
        <path d="M 418 157 A 18 18 0 0 1 442 173" />
      </g>

      {/* FLOATING ELEMENTS IN THE NEGATIVE SPACE */}
      {/* 1. Light Bulb (Left Middle) */}
      <g transform="translate(145, 175) scale(0.7)" filter="url(#dropShadow)">
        <path d="M 15 10 A 15 15 0 1 1 45 10 C 45 18 40 22 37 26 L 37 32 L 23 32 L 23 26 C 20 22 15 18 15 10 Z" fill="#ffffff" stroke="#718096" strokeWidth="2" />
        {/* Filament */}
        <path d="M 27 24 L 27 15 L 30 11 L 33 15 L 33 24" fill="none" stroke="#ffb300" strokeWidth="2" strokeLinecap="round" />
        {/* Base */}
        <rect x="25" y="32" width="10" height="4" rx="1" fill="#cbd5e0" stroke="#718096" strokeWidth="1.5" />
        <rect x="26" y="36" width="8" height="4" rx="1" fill="#9ca3af" stroke="#718096" strokeWidth="1.5" />
      </g>

      {/* 2. Globe (Top Middle) */}
      <g transform="translate(305, 105) scale(0.85)" filter="url(#dropShadow)">
        <circle cx="20" cy="20" r="20" fill="url(#nodeGradBlue)" />
        {/* Grid lines */}
        <ellipse cx="20" cy="20" rx="20" ry="8" fill="none" stroke="#63b3ed" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="20" cy="20" rx="8" ry="20" fill="none" stroke="#63b3ed" strokeWidth="1.5" opacity="0.6" />
        <line x1="0" y1="20" x2="40" y2="20" stroke="#63b3ed" strokeWidth="1.5" opacity="0.6" />
        <line x1="20" y1="0" x2="20" y2="40" stroke="#63b3ed" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* 3. Magnifying Glass (Right Middle-Top) */}
      <g transform="translate(355, 215) scale(0.95)" filter="url(#dropShadow)">
        <line x1="18" y1="18" x2="38" y2="38" stroke="url(#metalGrad)" strokeWidth="6" strokeLinecap="round" />
        <line x1="18" y1="18" x2="38" y2="38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="12" cy="12" r="10" fill="none" stroke="url(#metalGrad)" strokeWidth="4" />
        <circle cx="12" cy="12" r="10" fill="#e0f2fe" opacity="0.4" />
        <circle cx="12" cy="12" r="8" fill="none" stroke="#fff" strokeWidth="1" opacity="0.7" />
      </g>

      {/* 4. Volleyball / Sphere (Right Middle-Bottom) */}
      <g transform="translate(375, 290) scale(1)" filter="url(#dropShadow)">
        <circle cx="25" cy="25" r="24" fill="url(#sphereGrad)" />
        {/* Curving sports ball seams */}
        <path d="M 7 13 C 15 13, 23 18, 25 25" fill="none" stroke="#4a5568" strokeWidth="1.5" opacity="0.6" />
        <path d="M 25 25 C 27 33, 35 38, 43 37" fill="none" stroke="#4a5568" strokeWidth="1.5" opacity="0.6" />
        <path d="M 13 37 C 18 31, 28 31, 33 37" fill="none" stroke="#4a5568" strokeWidth="1.5" opacity="0.6" />
        <path d="M 37 13 C 31 18, 31 28, 37 33" fill="none" stroke="#4a5568" strokeWidth="1.5" opacity="0.6" />
        <path d="M 13 13 C 18 19, 18 29, 13 35" fill="none" stroke="#4a5568" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* 5. Floating dotted spheres */}
      <circle cx="445" cy="270" r="10" fill="url(#sphereGrad)" />
      <circle cx="445" cy="270" r="10" fill="none" stroke="#1a202c" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

      {/* OUTER NODES (CIRCULAR CONTENT AREAS) */}
      {/* A. Top-Left Node (Gears) */}
      <g filter="url(#dropShadow)">
        <circle cx="160" cy="110" r="28" fill="url(#nodeGradTeal)" />
        {/* Double Gears inside */}
        <g transform="translate(145, 95) scale(0.9)" fill="url(#goldGrad)">
          {/* Gear 1 */}
          <circle cx="12" cy="12" r="6" />
          <path d="M 12 2 L 12 4 M 12 20 L 12 22 M 2 12 L 4 12 M 20 12 L 22 12 M 5 5 L 6.5 6.5 M 17.5 17.5 L 19 19 M 5 19 L 6.5 17.5 M 17.5 6.5 L 19 5" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#1d4ed8" />
          {/* Gear 2 */}
          <g transform="translate(12, 12)">
            <circle cx="10" cy="10" r="4" />
            <path d="M 10 3 L 10 5 M 10 15 L 10 17 M 3 10 L 5 10 M 15 10 L 17 10 M 5 5 L 6.5 6.5 M 13.5 13.5 L 15 15 M 5 15 L 6.5 13.5 M 13.5 5 L 15 3.5" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="2" fill="#1d4ed8" />
          </g>
        </g>
      </g>

      {/* B. Middle-Left Node (Chemical Bond/Gears) */}
      <g filter="url(#dropShadow)">
        <circle cx="70" cy="245" r="34" fill="url(#nodeGradPurple)" />
        <g transform="translate(48, 222) scale(1.1)" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Hexagonal molecular connections */}
          <polygon points="20,5 35,13 35,29 20,37 5,29 5,13" />
          <line x1="20" y1="5" x2="20" y2="15" />
          <line x1="35" y1="29" x2="26" y2="24" />
          <line x1="5" y1="29" x2="14" y2="24" />
          <circle cx="20" cy="5" r="3" fill="url(#goldGrad)" />
          <circle cx="35" cy="13" r="3" fill="url(#goldGrad)" />
          <circle cx="35" cy="29" r="3" fill="url(#goldGrad)" />
          <circle cx="20" cy="37" r="3" fill="url(#goldGrad)" />
          <circle cx="5" cy="29" r="3" fill="url(#goldGrad)" />
          <circle cx="5" cy="13" r="3" fill="url(#goldGrad)" />
        </g>
      </g>

      {/* C. Bottom-Left Node (Open Book) */}
      <g filter="url(#dropShadow)">
        <circle cx="210" cy="390" r="32" fill="url(#nodeGradTeal)" />
        <g transform="translate(188, 368) scale(1.1)" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Open Book */}
          <path d="M 4 32 C 10 27, 20 27, 20 32 C 20 27, 30 27, 36 32 L 36 8 C 30 3, 20 3, 20 8 C 20 3, 10 3, 4 8 Z" fill="#2d3748" fillOpacity="0.4" />
          <line x1="20" y1="8" x2="20" y2="32" />
          {/* Book details/lines */}
          <path d="M 8 13 L 16 13 M 8 18 L 16 18 M 8 23 L 16 23 M 24 13 L 32 13 M 24 18 L 32 18 M 24 23 L 32 23" strokeWidth="1.5" opacity="0.8" />
        </g>
      </g>

      {/* D. Top-Right Node (DNA Strand) */}
      <g filter="url(#dropShadow)">
        <circle cx="410" cy="110" r="38" fill="url(#nodeGradBlue)" />
        {/* DNA helix representation */}
        <g transform="translate(385, 83) scale(1.3)" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round">
          {/* Strand 1 (Sine wave) */}
          <path d="M 5 12 Q 10 0, 18 12 T 31 12" />
          {/* Strand 2 (Cosine wave) */}
          <path d="M 5 12 Q 10 24, 18 12 T 31 12" opacity="0.8" />
          {/* Interconnecting rungs */}
          <line x1="9" y1="7" x2="9" y2="17" strokeWidth="1.5" />
          <line x1="14" y1="10" x2="14" y2="14" strokeWidth="1.5" />
          <line x1="18" y1="12" x2="18" y2="12" strokeWidth="1.5" />
          <line x1="22" y1="14" x2="22" y2="10" strokeWidth="1.5" />
          <line x1="27" y1="17" x2="27" y2="7" strokeWidth="1.5" />
          {/* Spheres on endpoints of waves */}
          <circle cx="5" cy="12" r="2.5" fill="url(#goldGrad)" stroke="none" />
          <circle cx="18" cy="12" r="2.5" fill="url(#goldGrad)" stroke="none" />
          <circle cx="31" cy="12" r="2.5" fill="url(#goldGrad)" stroke="none" />
        </g>
      </g>

      {/* E. Bottom-Right Node (Justice Scale) */}
      <g filter="url(#dropShadow)">
        <circle cx="410" cy="410" r="36" fill="url(#nodeGradPurple)" />
        <g transform="translate(385, 385) scale(1.2)" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Law scale representation */}
          <line x1="20" y1="6" x2="20" y2="34" strokeWidth="3" /> {/* pillar */}
          <line x1="8" y1="34" x2="32" y2="34" strokeWidth="3" /> {/* base */}
          <line x1="6" y1="11" x2="34" y2="11" strokeWidth="3" /> {/* crossbar */}
          <circle cx="20" cy="6" r="2" fill="url(#goldGrad)" />
          {/* Left Pan */}
          <path d="M 6 11 L 11 22 L 1 22 Z" fill="#2d3748" fillOpacity="0.4" />
          {/* Right Pan */}
          <path d="M 34 11 L 39 22 L 29 22 Z" fill="#2d3748" fillOpacity="0.4" />
        </g>
      </g>

      {/* CENTER NODE (Main chemistry beaker / flask area) */}
      <g filter="url(#dropShadow)">
        <circle cx="250" cy="250" r="66" fill="url(#centerGrad)" stroke="#3e3875" strokeWidth="3" />

        {/* 3D Glass Highlights around center circle rim */}
        <circle cx="250" cy="250" r="64" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.15" />

        {/* METALLIC STAND (3 legs) under flask */}
        <g stroke="url(#metalGrad)" strokeWidth="4.5" strokeLinecap="round" filter="url(#dropShadow)">
          {/* Table stand ring */}
          <line x1="220" y1="270" x2="280" y2="270" />
          {/* Legs */}
          <line x1="225" y1="270" x2="215" y2="315" />
          <line x1="250" y1="270" x2="250" y2="318" />
          <line x1="275" y1="270" x2="285" y2="315" />
        </g>
        <g stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5">
          <line x1="220" y1="268" x2="280" y2="268" />
          <line x1="223" y1="270" x2="214" y2="315" />
          <line x1="249" y1="270" x2="249" y2="318" />
          <line x1="273" y1="270" x2="283" y2="315" />
        </g>

        {/* CHEMISTRY FLASK / ERLEYMEYER BEAKER */}
        <g transform="translate(0, 0)">
          {/* Glass body filled with blue chemical liquid */}
          <path
            d="M 238 220 
               L 220 262 
               A 4 4 0 0 0 224 267 
               L 276 267 
               A 4 4 0 0 0 280 262 
               L 262 220 
               Z"
            fill="url(#flaskGrad)"
          />

          {/* Liquid content wave effect */}
          <path
            d="M 233 232 
               Q 241 230, 250 232 
               T 267 232 
               L 276 262 
               A 2 2 0 0 1 274 265 
               L 226 265 
               A 2 2 0 0 1 224 262 
               Z"
            fill="#0ea5e9"
            opacity="0.5"
          />

          {/* Bubbles in liquid */}
          <circle cx="232" cy="254" r="2" fill="#ffffff" opacity="0.7" />
          <circle cx="242" cy="245" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="250" cy="258" r="2.5" fill="#ffffff" opacity="0.6" />
          <circle cx="258" cy="242" r="1" fill="#ffffff" opacity="0.9" />
          <circle cx="264" cy="252" r="2" fill="#ffffff" opacity="0.7" />

          {/* Glowing liquid glow (SVG Filter effect simulated) */}
          <ellipse cx="250" cy="256" rx="18" ry="8" fill="#38bdf8" opacity="0.3" filter="url(#glow)" />

          {/* Erlenmeyer Glass Outline */}
          <path
            d="M 244 198 
               L 256 198 
               L 256 215 
               L 282 263 
               A 8 8 0 0 1 275 272 
               L 225 272 
               A 8 8 0 0 1 218 263 
               L 244 215 
               Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Lip of beaker */}
          <rect x="240" y="194" width="20" height="4" rx="2" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />

          {/* Highlight reflections on Glass */}
          <path
            d="M 224 261 L 241 226"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 271 264 A 4 4 0 0 0 274 261"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </g>
    </svg>
  );
}
