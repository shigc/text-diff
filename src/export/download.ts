export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** 文件名时间戳：YYYYMMDD-HHmmss */
export function fileStamp(d: Date): string {
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}-${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(content: string, mime: string, filename: string): void {
  downloadBlob(new Blob([content], { type: mime }), filename);
}
