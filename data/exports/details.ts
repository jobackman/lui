import type { AddonCategory } from "../../src/types/exports";

export const details: AddonCategory = {
  id: "details",
  name: "Details",
  export: {
    name: "Lucy's DPS Tracker",
    description: "Damage meter configuration optimized for raid DPS tracking",
    exportString: `!WA:2!Sv1Y8nT13LXKOjdT0kqtT0Y7kqMZ9KqMWqMY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7kqjY7`,
    lastUpdated: "2026-01-25T14:30:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/details",
    images: [
      "https://picsum.photos/seed/details1/800/600",
      "https://picsum.photos/seed/details2/800/600",
      "https://picsum.photos/seed/details3/800/600"
    ],
    setupInstructions: `1. Install Details addon from CurseForge
2. Type \`/details\` in-game to open settings
3. Click 'Import Profile' button
4. Paste the export string and click OK
5. Reload UI to apply changes`,
    tags: ["damage-meter", "ui", "pve", "tracking", "raid"]
  }
};

export default details;
