import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Get Docker containers status
    const { stdout: dockerOutput } = await execAsync('docker ps --format "{{.Names}}\t{{.Status}}\t{{.Ports}}"');

    // Get launchd services
    const { stdout: launchdOutput } = await execAsync('launchctl list');

    // Get cron jobs
    const { stdout: cronOutput } = await execAsync('crontab -l').catch(() => ({ stdout: '' }));

    // Parse data
    const services = parseDockerServices(dockerOutput);
    const launchdServices = parseLaunchdServices(launchdOutput);
    const cronJobs = parseCronJobs(cronOutput);

    return NextResponse.json({
      services,
      launchdServices,
      cronJobs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching mesh status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mesh status' },
      { status: 500 }
    );
  }
}

function parseDockerServices(output: string) {
  const lines = output.trim().split('\n').slice(1); // Skip header
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

function parseLaunchdServices(output: string) {
  const lines = output.trim().split('\n');
  const meshServices = lines
    .filter(line => line.includes('openclaw') || line.includes('sephirot'))
    .map(line => {
      const [pid, status, label] = line.split('\t');
      return {
        label: label.trim(),
        pid: parseInt(pid) || null,
        status: status === '0' ? 'active' : status === '127' ? 'disabled' : 'unknown',
      };
    });

  return meshServices;
}

function parseCronJobs(output: string) {
  const lines = output.trim().split('\n');
  return lines
    .filter(line => !line.startsWith('#') && line.trim())
    .map(line => {
      const [schedule, ...commandParts] = line.split(' ');
      return {
        schedule,
        command: commandParts.join(' '),
      };
    });
}
