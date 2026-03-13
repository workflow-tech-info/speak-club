"use client";

import React, { useEffect, useRef } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    // Drops: one for each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Random starting positions above the screen
    }

    const draw = () => {
      // Semi-transparent black rectangle to create the trailing effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Intensity of green
        const alpha = Math.random() * 0.5 + 0.2;
        ctx.fillStyle = `rgba(0, 255, 156, ${alpha})`;
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it crosses middle or bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y position
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 FPS

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-initialize columns on resize
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
