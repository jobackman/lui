import type { ReactElement } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyButton, type CopyButtonProps } from '@/components/copy-button';
import { getCopyableExports } from '@/lib/copyable-exports';
import type { AddonConfiguration } from '@/types/exports';

interface ExportCopyButtonsProps {
  exports: AddonConfiguration['exports'];
  size?: CopyButtonProps['size'];
  showIcon?: boolean;
  singleLabel?: string;
  compact?: boolean;
}

/** Shared copy actions for both shorthand strings and named exports. */
export function ExportCopyButtons({
  exports,
  size,
  showIcon = false,
  singleLabel = 'Copy',
  compact = false,
}: ExportCopyButtonsProps): ReactElement {
  const entries = getCopyableExports(exports);

  if (compact && entries.length > 1) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            type="button"
            size={size ?? 'sm'}
            aria-label="Choose export to copy"
            onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
          >
            Copy <ChevronDown className="size-3.5" aria-hidden="true" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            collisionPadding={12}
            className="z-50 min-w-48 max-w-[calc(100vw-24px)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-xl border-glass bg-[var(--glass-btn-primary-bg)] backdrop-blur-glass p-1.5 text-white shadow-[var(--glass-btn-shine),0_8px_24px_oklch(0_0_0/25%)]"
            onClick={(event) => event.stopPropagation()}
          >
            <DropdownMenu.Label className="px-3 py-2 text-[10px] font-medium uppercase tracking-widest text-white/60">
              Copy export
            </DropdownMenu.Label>
            {entries.map((entry, index) => (
              <DropdownMenu.Item key={`${index}:${entry.name ?? ''}`} asChild onSelect={(event) => event.preventDefault()}>
                <CopyButton
                  text={entry.value}
                  variant="ghost"
                  showIcon
                  className="h-auto min-h-9 w-full justify-start rounded-lg px-3 py-2 whitespace-normal text-left data-[highlighted]:bg-white/10"
                >
                  {entry.name ?? `Export ${index + 1}`}
                </CopyButton>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  return (
    <>
      {entries.map((entry, index) => (
        <CopyButton key={`${index}:${entry.name ?? ''}`} text={entry.value} size={size} showIcon={showIcon}>
          {entry.name && !compact ? `Copy ${entry.name}` : singleLabel}
        </CopyButton>
      ))}
    </>
  );
}
