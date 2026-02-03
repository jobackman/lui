import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Glass button variants using class-variance-authority
 * Provides consistent styling for all glass-effect buttons in the app
 * Usage: className={cn(glassButtonVariants({ glass: "card" }), "additional-classes")}
 */
export const glassButtonVariants = cva(
  // Base classes - empty as we want full control per variant
  "",
  {
    variants: {
      glass: {
        // Card buttons with hover-reveal animation for bento grid cards
        card: cn(
          "glass-strong hover:bg-white/30 text-white",
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          "opacity-0 translate-y-2",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "focus-visible:opacity-100 focus-visible:translate-y-0",
          "motion-reduce:opacity-100 motion-reduce:translate-y-0",
          "[@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
        ),
        // Carousel navigation buttons with strong glass effect
        carousel: cn(
          "glass-strong hover:bg-white/30 text-white",
          "transition-all motion-reduce:transition-none"
        ),
        // Action buttons on detail pages with subtle glass effect
        action: cn(
          "glass hover:bg-white/20",
          "transition-all motion-reduce:transition-none"
        ),
      },
    },
  }
);

export type GlassButtonVariants = VariantProps<typeof glassButtonVariants>;
