import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** 跨平台地以 OBFUSCATE=1 执行生产构建（Windows 也能用） */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const result = spawnSync(npmCmd, ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, OBFUSCATE: '1' },
});

process.exit(result.status ?? 1);
