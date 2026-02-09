"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Wifi } from "lucide-react";

interface IDCardProps {
  name: string;
  type: string; // e.g. "AI Agent", "Human"
  serial: string;
  soulText: string;
  themeColor: string; // hex color e.g. "#00d2ff"
  imageUrl?: string; // Optional image URL
  className?: string;
}

export function IDCard({
  name,
  type,
  serial,
  soulText,
  themeColor = "#00d2ff",
  imageUrl,
  className,
}: IDCardProps) {
  // Generate a dynamic gradient based on the theme color
  const gradientStyle = {
    background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
    borderColor: themeColor,
    boxShadow: `0 0 20px ${themeColor}4d, inset 0 0 2px rgba(255, 255, 255, 0.1)`,
  } as React.CSSProperties;

  const textGlowStyle = {
    textShadow: `0 0 5px ${themeColor}80`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative w-[500px] h-[300px] rounded-2xl overflow-hidden p-6 flex border border-opacity-30 select-none",
        className
      )}
      style={gradientStyle}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${themeColor} 2px, transparent 3px)`
           }}
      />
      
      {/* Hologram Blur Circle */}
      <div 
        className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: themeColor }}
      />

      {/* Left: Photo Area */}
      <div className="relative w-[130px] h-[160px] bg-black/50 border-2 rounded-lg mr-6 flex justify-center items-center overflow-hidden shadow-lg"
           style={{ borderColor: themeColor, boxShadow: `0 0 10px ${themeColor}4d` }}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl animate-pulse">🦆</span>
        )}
        
        {/* Scan Line Animation */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/50 shadow-[0_0_10px_#fff] animate-scan" />
      </div>

      {/* Right: Info Area */}
      <div className="flex-1 flex flex-col justify-between z-10 relative">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-2">
          <div>
            <div className="font-orbitron text-sm tracking-widest font-bold" style={{ color: themeColor }}>
              OPENCLAW AGENT ID
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
              REPUBLIC OF DIGITAL
            </div>
          </div>
          {/* Chip Graphic */}
          <div className="w-10 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center relative overflow-hidden shadow-inner">
             <div className="absolute inset-y-1/2 w-full h-[1px] bg-black/20" />
             <div className="absolute inset-x-1/2 h-full w-[1px] bg-black/20" />
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <div className="text-[10px] text-gray-500 uppercase mb-0.5">NAME</div>
          <div className="text-2xl font-bold text-white tracking-tight" style={textGlowStyle}>
            {name}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
           <div>
             <div className="text-[10px] text-gray-500 uppercase">SERIAL (UUID)</div>
             <div className="text-xs font-mono text-gray-300 truncate font-semibold">
               {serial}
             </div>
           </div>
           <div>
             <div className="text-[10px] text-gray-500 uppercase">CLASS</div>
             <div className="text-xs font-mono text-gray-300 font-semibold uppercase">
               {type}
             </div>
           </div>
        </div>

        {/* Soul Text (Quote) */}
        <div className="bg-black/20 p-2 rounded text-[10px] text-gray-400 italic border-l-2" style={{ borderColor: themeColor }}>
          "{soulText}"
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-end pt-2">
          {/* Barcode Mockup */}
          <div className="h-6 w-24 bg-white/10 flex items-center justify-center">
             <div className="w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzj-//8PEDIzIMuAdQDmAvwA7h8H0dkE19cAAAAASUVORK5CYII=')] opacity-50" />
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: themeColor }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColor }}></span>
            </span>
            <div className="text-[10px] font-bold tracking-wider" style={{ color: themeColor }}>
              ONLINE
            </div>
          </div>
        </div>
      </div>
      
      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s infinite linear;
        }
        .font-orbitron {
          font-family: 'Courier New', Courier, monospace; /* Fallback until font loaded */
        }
      `}</style>
    </div>
  );
}
