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

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const addons = loadAllExports();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        // Don't trigger if typing in an input field
        if (
          e.target instanceof HTMLInputElement ||
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
            onSelect={() => handleSelect(() => navigate('/'))}
            className="cursor-pointer"
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Addons">
          {addons.map((addon) => (
            <CommandItem
              key={addon.id}
              value={`${addon.name} ${addon.export.tags?.join(' ') || ''}`}
              onSelect={() => handleSelect(() => navigate(`/a/${addon.id}`))}
              className="cursor-pointer"
            >
              <span className="font-medium">{addon.name}</span>
              {addon.export.description && (
                <span className="ml-2 text-xs text-muted-foreground truncate">
                  {addon.export.description}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
