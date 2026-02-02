import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  className?: string;
}

export function CopyButton({ text, onCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click events
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers or permission denied
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy text:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? "secondary" : "default"}
      size="sm"
      className={cn("transition-all", className)}
    >
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
