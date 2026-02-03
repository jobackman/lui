import type { AddonCategory } from "../../src/types/exports";

export const platynator: AddonCategory = {
  id: "platynator",
  name: "Platynator",
  export: {
    name: "Main Plates",
    description: "Default nameplate configuration with threat colors and debuff tracking",
    exportString: `!WA:2!Pv1Y8nT13LXKOjdT0kqtT0Y7kqMZ9KqMWqMY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7`,
    lastUpdated: "2026-01-26T16:20:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/plater-nameplates",
    images: [
      "https://picsum.photos/seed/plater1/800/600",
      "https://picsum.photos/seed/plater2/800/600"
    ],
    setupInstructions: `1. Install Plater Nameplates from CurseForge
2. Type \`/plater\` in-game to open settings
3. Go to 'Profiles' tab
4. Click 'Import' and paste the export string
5. Click 'Okay' to apply the configuration`,
    tags: ["nameplates", "ui", "pvp", "threat", "debuffs"]
  }
};

export default platynator;
