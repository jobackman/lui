import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Glass button variants using class-variance-authority
 * Provides consistent styling for all glass-effect buttons in the app
 */
export const glassButtonVariants = cva(
  // Base classes applied to all variants
  "transition-all motion-reduce:transition-none",
  {
    variants: {
      variant: {
        // Card buttons with hover-reveal animation
        card: cn(
          "glass-strong hover:bg-white/30 text-white",
          "duration-300 ease-out",
          "opacity-0 translate-y-2",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "focus-visible:opacity-100 focus-visible:translate-y-0",
          "motion-reduce:opacity-100 motion-reduce:translate-y-0",
          "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
        ),
        // Carousel navigation buttons
        carousel: "glass-strong hover:bg-white/30 text-white",
        // Action buttons on detail pages
        action: "glass hover:bg-white/20",
      },
    },
    defaultVariants: {
      variant: "action",
    },
  }
);

export type GlassButtonVariants = VariantProps<typeof glassButtonVariants>;
