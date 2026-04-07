'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
}

export function StatCard({ value, label, color = 'success' }: StatCardProps) {
  const colorClasses = {
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-amber-700',
    info: 'text-blue-700',
    purple: 'text-purple-700',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-br from-secondary to-white border-2 border-border rounded-xl p-6 text-center cursor-pointer relative overflow-hidden group shadow-lg"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
      <div className={`text-5xl font-extrabold ${colorClasses[color as keyof typeof colorClasses]} mb-2 leading-none`}>
        {value}
      </div>
      <div className="text-sm font-bold text-primary uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
