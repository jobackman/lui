import type { AddonCategory } from "../../src/types/exports";

export const blizzhudtweaks: AddonCategory = {
  id: "blizzhudtweaks",
  name: "BlizzHUD Tweaks",
  export: {
    name: "Minimal HUD Adjustments",
    description: "Subtle improvements to default Blizzard UI elements without full replacement",
    externalUrl: "https://github.com/Stanzilla/BlizzHUDTweaks",
    lastUpdated: "2026-01-27T14:00:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/blizzhud-tweaks",
    images: [
      "https://picsum.photos/seed/blizzhud1/800/600",
      "https://picsum.photos/seed/blizzhud2/800/600"
    ],
    setupInstructions: `1. Visit the GitHub repository via the external link
2. Download the latest release from CurseForge
3. Install to your WoW AddOns folder
4. Type \`/blizzhud\` in-game to configure
5. Enable specific tweaks you want to use
6. Check GitHub readme for advanced configuration options`,
    tags: ["ui", "blizzard", "tweaks", "minimal", "hud"]
  }
};

export default blizzhudtweaks;
