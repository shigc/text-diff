import { state } from '../state';

type Side = 'left' | 'right';

export interface InputsDeps {
  /** 文本或对比选项变化后触发（已做防抖），需要重算差异 */
  onUpdate: () => void;
  /** 仅显示选项（如显示空白符号）变化后触发，无需重算差异 */
  onDisplayChange: () => void;
}

const DEBOUNCE_MS = 200;

export function setupInputs(deps: InputsDeps): void {
  const leftInput = byId<HTMLTextAreaElement>('left-input');
  const rightInput = byId<HTMLTextAreaElement>('right-input');
  const leftFile = byId<HTMLInputElement>('left-file');
  const rightFile = byId<HTMLInputElement>('right-file');
  const leftName = byId<HTMLElement>('left-name');
  const rightName = byId<HTMLElement>('right-name');
  const ignoreWs = byId<HTMLInputElement>('opt-ignore-whitespace');
  const ignoreCase = byId<HTMLInputElement>('opt-ignore-case');
  const showWs = byId<HTMLInputElement>('opt-show-whitespace');
  const compareBtn = byId<HTMLButtonElement>('btn-compare');

  let timer: number | undefined;
  const schedule = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = undefined;
      deps.onUpdate();
    }, DEBOUNCE_MS);
  };
  const flush = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    deps.onUpdate();
  };

  leftInput.addEventListener('input', () => {
    state.leftText = leftInput.value;
    schedule();
  });
  rightInput.addEventListener('input', () => {
    state.rightText = rightInput.value;
    schedule();
  });

  ignoreWs.addEventListener('change', () => {
    state.options.ignoreWhitespace = ignoreWs.checked;
    schedule();
  });
  ignoreCase.addEventListener('change', () => {
    state.options.ignoreCase = ignoreCase.checked;
    schedule();
  });

  showWs.addEventListener('change', () => {
    state.showWhitespace = showWs.checked;
    deps.onDisplayChange();
  });

  compareBtn.addEventListener('click', flush);

  const pick = (side: Side) => {
    (side === 'left' ? leftFile : rightFile).click();
  };
  document.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((btn) => {
    btn.addEventListener('click', () => pick(btn.dataset.pick as Side));
  });

  leftFile.addEventListener('change', () => {
    const f = leftFile.files?.[0];
    if (f) loadFile('left', f, leftInput, leftName, schedule);
    leftFile.value = '';
  });
  rightFile.addEventListener('change', () => {
    const f = rightFile.files?.[0];
    if (f) loadFile('right', f, rightInput, rightName, schedule);
    rightFile.value = '';
  });

  document.querySelectorAll<HTMLElement>('.editor').forEach((el) => {
    const side = el.dataset.side as Side;
    const input = side === 'left' ? leftInput : rightInput;
    const nameEl = side === 'left' ? leftName : rightName;

    el.addEventListener('dragover', (e) => {
      e.preventDefault();
      el.classList.add('editor--dragover');
    });
    el.addEventListener('dragleave', () => el.classList.remove('editor--dragover'));
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('editor--dragover');
      const f = e.dataTransfer?.files?.[0];
      if (f) loadFile(side, f, input, nameEl, schedule);
    });
  });
}

function loadFile(
  side: Side,
  file: File,
  input: HTMLTextAreaElement,
  nameEl: HTMLElement,
  schedule: () => void,
): void {
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result ?? '');
    if (side === 'left') {
      state.leftText = text;
      state.leftName = file.name;
    } else {
      state.rightText = text;
      state.rightName = file.name;
    }
    input.value = text;
    nameEl.textContent = file.name;
    schedule();
  };
  reader.readAsText(file);
}

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element #${id}`);
  return el as T;
}
