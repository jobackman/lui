import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text?: string;
  onCopy?: () => void;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function CopyButton({ text, onCopy, className, children, showIcon = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent card click events
    if (!text) return; // Don't copy if no text provided
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

  const defaultContent = copied ? "Copied!" : "Copy";
  const displayContent = children ? (copied ? "Copied!" : children) : defaultContent;

  return (
    <Button
      type="button"
      onClick={handleCopy}
      variant={copied ? "secondary" : "default"}
      size="sm"
      className={cn("transition-all", className)}
    >
      {showIcon && (
        copied ? (
          <Check className="h-4 w-4 mr-2" />
        ) : (
          <Copy className="h-4 w-4 mr-2" />
        )
      )}
      {displayContent}
    </Button>
  );
}
