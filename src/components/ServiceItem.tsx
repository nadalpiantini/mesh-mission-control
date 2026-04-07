'use client';

import { motion } from 'framer-motion';

interface ServiceItemProps {
  name: string;
  status: 'active' | 'inactive' | 'warning';
  details: string;
}

export function ServiceItem({ name, status, details }: ServiceItemProps) {
  const statusConfig = {
    active: { color: 'bg-green-600', shadow: 'shadow-green-600', text: 'text-green-700' },
    inactive: { color: 'bg-red-600', shadow: 'shadow-red-600', text: 'text-red-700' },
    warning: { color: 'bg-amber-600', shadow: 'shadow-amber-600', text: 'text-amber-700' },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="bg-white border-2 border-border rounded-lg p-4 flex justify-between items-center hover:border-green-600 hover:bg-green-50 cursor-pointer shadow-md"
    >
      <span className="font-bold text-primary text-lg">{name}</span>
      <div className="flex items-center gap-2 text-sm font-bold">
        <span className={`w-3 h-3 rounded-full ${config.color} ${config.shadow} shadow-lg animate-pulse`} />
        <span className="text-foreground">{details}</span>
      </div>
    </motion.div>
  );
}
