import { useId } from 'react';
import { useEdition } from '@/contexts/edition-context';
import { editionLabels } from '@/lib/game-edition';
import { cn } from '@/lib/utils';
import { edition } from '@/types/exports';

/** Native radios provide keyboard navigation and an explicit selected state. */
export function EditionSwitcher() {
  const { gameEdition, setGameEdition } = useEdition();
  const name = useId();

  return (
    <fieldset className="inline-flex flex-wrap items-center gap-1 rounded-full bg-glass backdrop-blur-glass border-glass p-1">
      <legend className="sr-only">Game edition</legend>
      {Object.values(edition).map((value) => (
        <label key={value} className="relative cursor-pointer">
          <input
            className="peer sr-only"
            type="radio"
            name={name}
            value={value}
            checked={gameEdition === value}
            onChange={() => setGameEdition(value)}
          />
          <span className={cn(
            'flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky-200',
            gameEdition === value
              ? 'bg-foreground/12 text-foreground shadow-sm'
              : 'text-foreground/45 hover:bg-foreground/5 hover:text-foreground/80',
          )}>
            <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', gameEdition === value ? 'bg-sky-200' : 'bg-foreground/20')} />
            {editionLabels[value]}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
