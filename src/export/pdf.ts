import { state } from '../state';
import { buildReportHtml } from './report';

/**
 * 通过打印功能导出 PDF：把报告写入隐藏 iframe 后调用 print()，
 * 由浏览器「另存为 PDF」完成导出。
 * 这样无需引入 PDF 库，且中文由浏览器原生字体渲染，不会乱码。
 */
export function exportPdf(): boolean {
  const result = state.result;
  if (!result) return false;

  const html = buildReportHtml(result, new Date());

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = win?.document;
  if (!win || !doc) {
    iframe.remove();
    return false;
  }

  let removed = false;
  const cleanup = () => {
    if (removed) return;
    removed = true;
    iframe.remove();
  };
  win.onafterprint = cleanup;

  doc.open();
  doc.write(html);
  doc.close();

  // 等 iframe 完成布局后再唤起打印对话框；并设置兜底清理
  window.setTimeout(() => {
    try {
      win.focus();
      win.print();
    } catch {
      cleanup();
      return;
    }
    window.setTimeout(cleanup, 60000);
  }, 250);

  return true;
}
