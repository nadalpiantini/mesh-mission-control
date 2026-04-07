# 🚀 SEPHIROT MESH - MISSION CONTROL

Dashboard full-stack en tiempo real para monitoreo del mesh Sephirot.

## 🎯 CARACTERÍSTICAS IMPLEMENTADAS

### **Frontend (Next.js 16 + React 19 + TypeScript)**
- ✅ App Router moderno
- ✅ Server-Sent Events (SSE) para updates en tiempo real
- ✅ Framer Motion para animaciones suaves
- ✅ Tailwind CSS + tema dark personalizado
- ✅ Lucide React (iconos SVG vectoriales)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Tipografía escalable con control de usuario

### **Backend (Next.js API Routes)**
- ✅ /api/mesh/status - Status general del mesh
- ✅ /api/mesh/stream - SSE stream para updates en tiempo real
- ✅ Integración con Docker CLI
- ✅ Integración con launchd
- ✅ Integración con crontab

### **Arquitectura**

Browser (localhost:3000)
  ↓
Next.js Frontend
  ↓
Dashboard Component
  ↓
SSE Connection ←→ API /mesh/stream
  ↓
API Routes
  ↓
System Commands (docker, launchctl, crontab)

## 🚀 USO

### **Inicio Rápido**

~/Dev/mesh-mission-control/start.sh

### **Acceso**
- URL: http://localhost:3000
- Auto-abre: El navegador se abre automáticamente
- Hot reload: Los cambios se reflejan automáticamente

## 🎛️ CONTROLES

### **Tamaño de Fuente**
- Botón A-: Reduce tamaño
- Botón A+: Aumenta tamaño
- Persistencia: localStorage
- Base: 16px

### **Actualización Automática**
- Intervalo: 5 segundos
- Tecnología: SSE
- Updates: Docker, launchd, cron

## 📊 MONITOREO

### **Docker Services**
- PostgreSQL (:5432)
- Redis (:6379)
- Qdrant (:6333)

### **Gateways**
- Consul
- OpenClaw Gateway
- SEPHIROT v2 (:28790)
- HQ Server

### **Squadrons Activos (8)**
- S10, Sujeto10, OpenClaw Masters, FeedClaw
- Haribote, Image Gen, Shield, FreeJack

## 🎨 DISEÑO

### **Sistema de Color**
--bg-primary: #0a0e27
--success: #00ff88
--error: #ff4757
--info: #2ed573
--purple: #a55eea

### **Tipografía Escalable**
Base: 16px
Rango: 12px - 48px
Control con botones A- / A+

### **Animaciones**
- Duración: 150-300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- GPU-accelerated (transform, opacity)

## 📂 ESTRUCTURA

~/Dev/mesh-mission-control/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── components/
│   │   └── ...
├── start.sh

## 🐛 TROUBLESHOOTING

Servidor no inicia:
  lsof -ti:3000
  pkill -f "next"

API returns 500:
  tail -f ~/.sephirot-logs/mesh-dashboard.log

## 📈 MEJORAS FUTURAS

Corto:
- Drag & drop
- Filtros
- Search
- Modals
- Export reports

Mediano:
- WebSocket bidireccional
- Historical data
- Command center
- Multi-machine monitoring

Largo:
- ML predictions
- Anomaly detection
- Auto-healing
- Mobile app
- Auth
- Custom dashboards

---

🌐 http://localhost:3000

⚡ Ejército completamente visible y monitoreado en tiempo real!
