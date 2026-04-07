#!/bin/bash
# MESH MISSION CONTROL - START SCRIPT
# Starts the Next.js development server for the mesh dashboard

cd ~/Dev/mesh-mission-control

echo "🚀 Starting SEPHIROT MESH - MISSION CONTROL..."
echo "📍 Location: http://localhost:3000"
echo ""
echo "📊 Features:"
echo "  - Real-time Docker service monitoring"
echo "  - Server-Sent Events for live updates"
echo "  - Adjustable font size"
echo "  - Interactive animations"
echo "  - Responsive design (mobile/tablet/desktop)"
echo ""
echo "✨ Dashboard will open automatically in your browser..."
echo ""

# Start dev server
npm run dev

# The server will run on http://localhost:3000
# Press Ctrl+C to stop
