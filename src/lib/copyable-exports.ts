import type { AddonConfiguration } from '@/types/exports';

export interface CopyableExport {
  name?: string;
  value: string;
}

/** Normalize single and named exports, excluding empty strings without altering their contents. */
export function getCopyableExports(exports: AddonConfiguration['exports']): CopyableExport[] {
  const entries = typeof exports === 'string' ? [{ value: exports }] : exports ?? [];
  return entries.filter((entry) => entry.value.trim().length > 0);
}
