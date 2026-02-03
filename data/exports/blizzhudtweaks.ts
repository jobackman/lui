import type { AddonCategory } from "../../src/types/exports";

export const blizzhudtweaks: AddonCategory = {
  id: "blizzhudtweaks",
  name: "BlizzHUD Tweaks",
  export: {
    name: "BlizzHudTweaks",
    description: "Addon that helps fade out a lot of the UI we dont want to display all the time, making for a more minimalistic HUD experience.",
    externalUrl: "https://github.com/Stanzilla/BlizzHUDTweaks",
    lastUpdated: "2026-01-27T14:00:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/blizzhud-tweaks",
    images: [
      "https://picsum.photos/seed/blizzhud1/800/600",
      "https://picsum.photos/seed/blizzhud2/800/600"
    ],
    setupInstructions: `TBD: Not sure there is an easy way to export settings from this addon.`,
    tags: ["ui", "blizzard", "tweaks", "minimal", "fade"]
  }
};

export default blizzhudtweaks;
