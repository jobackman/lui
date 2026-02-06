import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search exports..." }: SearchBarProps) {
  // Detect platform for keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutKey = isMac ? '⌘' : 'Ctrl';

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/80 pointer-events-none drop-shadow-sm" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 sm:pr-32 rounded-full h-12 text-base"
          aria-label="Search exports by name or description"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="absolute right-4 sm:right-24 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-foreground/10 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-foreground/80" />
          </Button>
        )}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 pointer-events-none">
          <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-background/50 border border-border rounded shadow-sm">
            {shortcutKey}
          </kbd>
          <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-background/50 border border-border rounded shadow-sm">
            K
          </kbd>
        </div>
      </div>
    </div>
  );
}
