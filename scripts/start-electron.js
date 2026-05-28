import dotenv from 'dotenv';
import { spawn } from 'child_process';

dotenv.config({ quiet: true });

const PORT = process.env.VITE_DEV_PORT || 5173;

const waitOn = spawn('npx', ['wait-on', `tcp:${PORT}`], {
  stdio: 'inherit',
  shell: true,
});

waitOn.on('close', () => {
  const electron = spawn('electronmon', ['.'], {
    stdio: 'inherit',
    shell: true,
  });

  // keep process alive
  electron.on('close', (code) => {
    process.exit(code);
  });
});
