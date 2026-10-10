import type { ReactElement } from 'react';
import { CopyButton, type CopyButtonProps } from '@/components/copy-button';
import { getCopyableExports } from '@/lib/copyable-exports';
import type { AddonConfiguration } from '@/types/exports';

interface ExportCopyButtonsProps {
  exports: AddonConfiguration['exports'];
  size?: CopyButtonProps['size'];
  showIcon?: boolean;
  singleLabel?: string;
}

/** Shared copy actions for both shorthand strings and named exports. */
export function ExportCopyButtons({
  exports,
  size,
  showIcon = false,
  singleLabel = 'Copy',
}: ExportCopyButtonsProps): ReactElement {
  return (
    <>
      {getCopyableExports(exports).map((entry, index) => (
        <CopyButton key={`${index}:${entry.name ?? ''}`} text={entry.value} size={size} showIcon={showIcon}>
          {entry.name ? `Copy ${entry.name}` : singleLabel}
        </CopyButton>
      ))}
    </>
  );
}
