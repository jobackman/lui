import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search exports..." }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        aria-label="Search exports by name or description"
      />
    </div>
  );
}
