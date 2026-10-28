declare module 'diff' {
  export interface Change {
    value: string;
    added?: boolean;
    removed?: boolean;
    count?: number;
  }

  export interface JsDiffOptions {
    ignoreCase?: boolean;
    ignoreWhitespace?: boolean;
    newlineIsToken?: boolean;
    stripTrailingCr?: boolean;
  }

  export function diffLines(oldStr: string, newStr: string, options?: JsDiffOptions): Change[];
  export function diffWords(oldStr: string, newStr: string, options?: JsDiffOptions): Change[];
  export function diffWordsWithSpace(
    oldStr: string,
    newStr: string,
    options?: JsDiffOptions,
  ): Change[];
  export function diffChars(oldStr: string, newStr: string, options?: JsDiffOptions): Change[];
}
