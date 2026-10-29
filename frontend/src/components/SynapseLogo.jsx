import React from 'react';

/**
 * SynapseLogo: Neural Metaphor Brand Emblem
 * Features interconnected synaptic axon pathways, glowing firing nodes,
 * and dynamic multi-channel data flow animation.
 */
export default function SynapseLogo({ size = 38, animated = true, glow = true }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: glow ? 'drop-shadow(0 4px 12px rgba(6, 182, 212, 0.45))' : 'none',
        }}
      >
        <defs>
          <linearGradient id="synapseAxonGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="45%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="centralNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Neural Wave Background Circle */}
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="url(#synapseAxonGrad)"
          opacity="0.14"
          className={animated ? 'synapse-pulse-bg' : ''}
        />

        {/* Interconnected Synaptic Pathways */}
        <g stroke="url(#synapseAxonGrad)" strokeWidth="2.4" strokeLinecap="round" opacity="0.85">
          <line x1="32" y1="12" x2="16" y2="24" />
          <line x1="32" y1="12" x2="48" y2="24" />
          <line x1="16" y1="24" x2="22" y2="48" />
          <line x1="48" y1="24" x2="42" y2="48" />
          <line x1="22" y1="48" x2="32" y2="32" />
          <line x1="42" y1="48" x2="32" y2="32" />
          <line x1="32" y1="12" x2="32" y2="32" />
          <line x1="16" y1="24" x2="32" y2="32" />
          <line x1="48" y1="24" x2="32" y2="32" />
          <line x1="22" y1="48" x2="42" y2="48" />
        </g>

        {/* Synaptic Nodes (Omnichannel endpoints) */}
        {/* Node 1: Top Core Hub */}
        <circle cx="32" cy="12" r="5" fill="#8b5cf6" />
        <circle cx="32" cy="12" r="2.2" fill="#ffffff" />

        {/* Node 2: POS Retail Branch (West) */}
        <circle cx="16" cy="24" r="4.5" fill="#06b6d4" />
        <circle cx="16" cy="24" r="1.8" fill="#ffffff" />

        {/* Node 3: E-Commerce Web Store (East) */}
        <circle cx="48" cy="24" r="4.5" fill="#0ea5e9" />
        <circle cx="48" cy="24" r="1.8" fill="#ffffff" />

        {/* Node 4: Warehouse Distribution (South West) */}
        <circle cx="22" cy="48" r="4.2" fill="#a855f7" />
        <circle cx="22" cy="48" r="1.6" fill="#ffffff" />

        {/* Node 5: Supply Chain Partner (South East) */}
        <circle cx="42" cy="48" r="4.2" fill="#ec4899" />
        <circle cx="42" cy="48" r="1.6" fill="#ffffff" />

        {/* Central Neural Synapse Core */}
        <circle cx="32" cy="32" r="9" fill="url(#centralNodeGlow)" className={animated ? 'synapse-core-pulse' : ''} />
        <circle cx="32" cy="32" r="5.5" fill="#06b6d4" />
        <circle cx="32" cy="32" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
