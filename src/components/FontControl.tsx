'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export function FontControl() {
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('mesh-font-size');
    if (saved) {
      setFontSize(parseInt(saved));
    }
  }, []);

  const changeFontSize = (direction: number) => {
    const newSize = fontSize + direction;
    setFontSize(newSize);
    localStorage.setItem('mesh-font-size', newSize.toString());

    const baseSize = 16;
    const newSizePx = baseSize + (newSize * 2);
    document.documentElement.style.setProperty('--font-size-base', `${newSizePx}px`);
  };

  return (
    <div className="flex items-center gap-2 bg-white border-2 border-border rounded-lg p-2 shadow-md">
      <span className="text-xs font-bold text-primary uppercase">
        Tamaño
      </span>
      <button
        onClick={() => changeFontSize(-1)}
        className="bg-secondary border-2 border-border rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-primary hover:bg-purple-50 hover:border-purple-600 hover:transition-all active:scale-95"
        aria-label="Reducir tamaño de fuente"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={() => changeFontSize(1)}
        className="bg-secondary border-2 border-border rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center font-bold text-primary hover:bg-purple-50 hover:border-purple-600 hover:transition-all active:scale-95"
        aria-label="Aumentar tamaño de fuente"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
