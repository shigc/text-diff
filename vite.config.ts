import { defineConfig, loadEnv, type Plugin } from 'vite';
import JavaScriptObfuscator from 'javascript-obfuscator';

/**
 * 生产构建可选开启 JS 混淆。
 * 默认关闭：开源项目保留可读产物，便于调试与安全审计；
 * 需要时在环境变量或 .env 中设置 OBFUSCATE=1。
 */
function obfuscatorPlugin(): Plugin {
  return {
    name: 'text-diff:obfuscator',
    apply: 'build',
    enforce: 'post',
    renderChunk(code) {
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        simplify: true,
        target: 'browser',
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['base64'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        splitStrings: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.25,
        deadCodeInjection: false,
        selfDefending: false,
        debugProtection: false,
        disableConsoleOutput: false,
        log: false,
      });
      return { code: result.getObfuscatedCode(), map: null };
    },
  };
}

export default defineConfig(({ mode }) => {
  // 只加载 OBFUSCATE 前缀，避免把部署凭据等其它变量带进构建上下文
  const env = loadEnv(mode, process.cwd(), 'OBFUSCATE');
  const obfuscate = (process.env.OBFUSCATE ?? env.OBFUSCATE ?? '0') === '1';

  return {
    base: './',
    plugins: obfuscate ? [obfuscatorPlugin()] : [],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
