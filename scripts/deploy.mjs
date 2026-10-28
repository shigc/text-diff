import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** 极简 .env 解析：支持 KEY=VALUE、# 注释、成对引号，不引入额外依赖 */
function readEnvFile(file) {
  if (!existsSync(file)) return {};

  const values = {};
  for (const rawLine of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) values[key] = value;
  }
  return values;
}

const env = { ...readEnvFile(resolve(root, '.env')), ...process.env };
const distDir = resolve(root, 'dist');
const projectName = env.CF_PAGES_PROJECT?.trim() || 'text-diff';
const branch = env.CF_PAGES_BRANCH?.trim() || 'main';

if (!existsSync(distDir)) {
  console.error('[deploy] 未找到 dist/，请先运行 npm run build');
  process.exit(1);
}

const args = [
  'wrangler',
  'pages',
  'deploy',
  'dist',
  `--project-name=${projectName}`,
  `--branch=${branch}`,
];

console.log(`[deploy] 目标项目：${projectName}（分支 ${branch}）`);
console.log('[deploy] 提示：未配置 CLOUDFLARE_API_TOKEN 时，wrangler 会复用本地登录状态');

const result = spawnSync('npx', args, {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env,
});

process.exit(result.status ?? 1);
