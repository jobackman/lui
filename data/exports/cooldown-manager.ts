import type { AddonCategory } from "../../src/types/exports";

export const cooldownManager: AddonCategory = {
  id: "cooldown-manager",
  name: "Cooldown Manager",
  export: {
    name: "Cooldown Manager Class Packs",
    description: "I havent configured any custom CDM packs for classes yet. It is probably best we stick to Luxthos packs for it. At least for now.",
    lastUpdated: "2026-01-28T08:20:00Z",
    externalUrl: "https://www.luxthos.com/cooldown-manager-profiles-world-of-warcraft-midnight/",
    setupInstructions: `1. Copy the class / spec profile from Luxthos
  2. Run \`/cdm\` in-game to open Cooldown Manager settings
  3. Import with the string from Luxthos
  4. Reload the UI`,
    tags: ["cooldown manager", "cdm", "cd", "cds", "wa", "weakaura", "luxthos"]
  }
};

export default cooldownManager;
