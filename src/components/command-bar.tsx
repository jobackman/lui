import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { loadAllExports } from '@/lib/loadExports';
import { useEdition } from '@/contexts/edition-context';
import { editionLabels, editionUrl } from '@/lib/game-edition';

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { gameEdition } = useEdition();
  const addons = loadAllExports(gameEdition);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        // Don't trigger if typing in an input field
        if (
          (e.target instanceof HTMLInputElement && !['radio', 'checkbox', 'button'].includes(e.target.type)) ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search addons and navigation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => handleSelect(() => navigate(editionUrl('/', gameEdition)))}
            className="cursor-pointer"
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading={`${editionLabels[gameEdition]} addons`}>
          {addons.map((addon) => (
            <CommandItem
              key={addon.id}
              value={`${addon.name} ${addon.configuration.tags?.join(' ') || ''}`}
              onSelect={() => handleSelect(() => navigate(editionUrl(`/a/${addon.id}`, gameEdition)))}
              className="cursor-pointer"
            >
              <span className="font-medium">{addon.name}</span>
              {addon.configuration.description && (
                <span className="ml-2 text-xs text-muted-foreground truncate">
                  {addon.configuration.description}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
