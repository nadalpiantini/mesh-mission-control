'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, GitBranch, Clock, Zap, Database, Code2 } from 'lucide-react';
import { FontControl } from './FontControl';
import { StatCard } from './StatCard';
import { ServiceItem } from './ServiceItem';

interface MeshData {
  services: Array<{
    name: string;
    status: 'active' | 'inactive';
    ports: string;
  }>;
  cronJobs: Array<{
    schedule: string;
    command: string;
  }>;
}

export function Dashboard() {
  const [meshData, setMeshData] = useState<MeshData | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Fetch initial data
    fetch('/api/mesh/status')
      .then(res => res.json())
      .then(data => {
        setMeshData(data);
        setIsOnline(true);
      })
      .catch(err => {
        console.error('Error fetching mesh data:', err);
      });
  }, []);

  // SSE for real-time updates
  useEffect(() => {
    const eventSource = new EventSource('/api/mesh/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'initial' || data.type === 'update') {
        setMeshData({
          services: data.services,
          cronJobs: [],
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (!meshData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-2xl text-primary font-semibold animate-pulse">
          Loading mesh data...
        </div>
      </div>
    );
  }

  const stats = [
    { value: meshData.services.length, label: 'Services', color: 'info' as const },
    { value: meshData.cronJobs.length, label: 'Cron Jobs', color: 'purple' as const },
    { value: '8', label: 'Squadrons', color: 'success' as const },
    { value: '120+', label: 'Skills', color: 'warning' as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-purple-500 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🚀 SEPHIROT MESH - MISSION CONTROL
            </h1>
            <p className="text-lg text-primary font-semibold">
              Vamos a poner el ejército en marcha
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FontControl />
            <div className="flex items-center gap-2 bg-green-50 border-2 border-green-600 px-4 py-2 rounded-lg animate-pulse">
              <span className="w-3 h-3 rounded-full bg-green-600 shadow-lg" />
              <span className="font-bold text-green-700">ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Army Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-600 rounded-2xl p-8 text-center shadow-xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-400/10 to-transparent -translate-x-full animate-[shimmer_3s_linear_infinite]" />
          <h2 className="text-5xl font-extrabold text-green-700 mb-3 uppercase tracking-wider relative z-10">
            ⚡ EJÉRCITO EN MARCHA
          </h2>
          <p className="text-xl text-primary font-semibold relative z-10">
            Todos los sistemas están ONLINE y listos para desplegar
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-border rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3 pb-4 border-b-2 border-border">
            <span className="w-1 h-6 bg-blue-600 rounded" />
            🐳 DOCKER SERVICES
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {meshData.services.map((service, index) => (
              <ServiceItem
                key={index}
                name={service.name}
                status={service.status}
                details={service.ports}
              />
            ))}
          </div>
        </motion.div>

        {/* Cron Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-border rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-3 pb-4 border-b-2 border-border">
            <span className="w-1 h-6 bg-purple-600 rounded" />
            ⏰ CRON JOBS
          </h2>
          <div className="space-y-3 font-mono text-sm">
            {meshData.cronJobs.map((job, index) => (
              <div
                key={index}
                className="bg-secondary border-l-4 border-blue-600 rounded-lg p-4 flex gap-3 items-center shadow-lg"
              >
                <span className="text-blue-700 font-bold whitespace-nowrap">{job.schedule}</span>
                <span className="text-primary break-all font-mono">{job.command}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Squadrons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-2 border-border rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-3 pb-4 border-b-2 border-border">
            <span className="w-1 h-6 bg-green-600 rounded" />
            🛟 ACTIVE SQUADRONS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'S10', desc: 'Opportunity Hunting' },
              { name: 'Sujeto10', desc: 'AI Intelligence' },
              { name: 'OpenClaw Masters', desc: 'Content Gen V4' },
              { name: 'FeedClaw', desc: 'RSS → Telegram' },
              { name: 'Haribote', desc: 'Auto Content' },
              { name: 'Image Gen', desc: 'Image Generation' },
              { name: 'Shield', desc: 'Security' },
              { name: 'FreeJack', desc: 'Agent Hub' },
            ].map((squadron, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-secondary border-2 border-green-600 rounded-lg p-4 cursor-pointer hover:bg-green-50"
              >
                <div className="font-bold text-primary mb-2">{squadron.name}</div>
                <div className="text-sm text-foreground">{squadron.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border-2 border-border rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-amber-700 mb-6 flex items-center gap-3 pb-4 border-b-2 border-border">
            <span className="w-1 h-6 bg-amber-600 rounded" />
            🎯 AVAILABLE SKILLS
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              '/sephirot', '/oc', '/audit', '/hands', '/plan-feature',
              '/create-features', '/sc:document', '/sc:implement', '/sc:test',
              '/review-code', '/infra', '/intel', '/design', '/ui-styling',
              '/brand', '/animate', '/shazam',
            ].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -4 }}
                className="bg-gradient-to-br from-secondary to-white border-2 border-blue-500/50 rounded-lg p-3 text-center text-sm font-bold text-primary hover:border-blue-600 hover:bg-blue-50 cursor-pointer transition-all shadow-lg"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t-2 border-purple-500/30 rounded-2xl p-6 mt-8 text-center">
        <p className="text-sm text-primary mb-2 font-semibold">
          🔄 Real-time updates con Server-Sent Events
        </p>
        <p className="text-sm text-primary mb-2 font-semibold">
          📍 Máquina: M1ni (Sandbox + Development)
        </p>
        <p className="text-xs text-foreground font-mono">
          Última actualización: {new Date().toLocaleString('es-ES')}
        </p>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        :root {
          --font-size-base: 16px;
        }

        html {
          font-size: var(--font-size-base);
        }
      `}</style>
    </div>
  );
}
