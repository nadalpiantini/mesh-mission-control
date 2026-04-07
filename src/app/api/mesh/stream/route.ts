import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any) => {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      // Send initial data
      try {
        const { stdout: dockerOutput } = await execAsync('docker ps --format "{{.Names}}\t{{.Status}}"');
        const services = parseDockerServices(dockerOutput);

        sendEvent({
          type: 'initial',
          services,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error in SSE:', error);
        sendEvent({
          type: 'error',
          error: 'Failed to fetch data',
        });
      }

      // Poll every 5 seconds for updates
      const interval = setInterval(async () => {
        try {
          const { stdout: dockerOutput } = await execAsync('docker ps --format "{{.Names}}\t{{.Status}}"');
          const services = parseDockerServices(dockerOutput);

          sendEvent({
            type: 'update',
            services,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error polling:', error);
        }
      }, 5000);

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

function parseDockerServices(output: string) {
  const lines = output.trim().split('\n').slice(1);
  return lines
    .filter(line => line.trim())
    .map(line => {
      const [name, status, ports] = line.split('\t');
      return {
        name: name.replace('sephirot-', '').toUpperCase(),
        status: status.includes('Up') ? 'active' : 'inactive',
        ports: ports || 'N/A',
      };
    });
}
