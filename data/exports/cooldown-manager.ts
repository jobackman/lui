import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const cooldownManager: AddonCategory = {
  id: "cooldown-manager",
  name: "Cooldown Manager",
  export: {
    name: "Cooldown Manager - Class profiles",
    description: "Just use Luxthos class profiles for Cooldown Manager",
    lastUpdated: "2026-02-05T21:11:29.928Z",
    externalUrl: "https://www.luxthos.com/cooldown-manager-profiles-world-of-warcraft-midnight/",
    setupInstructions: `1. Copy the class / spec profile from Luxthos
  2. Run \`/cdm\` in-game to open Cooldown Manager settings
  3. Import with the string from Luxthos
  4. Reload the UI`,
    images: [
      "https://i.imgur.com/iJ8V5ei.jpeg",
      "https://i.imgur.com/zAPxKEV.jpeg",
      "https://i.imgur.com/NRuA5LZ.png",
    ],
    tags: [tag.cooldowns, tag.ui, tag.combat]
  },
  category: category.core,
};
