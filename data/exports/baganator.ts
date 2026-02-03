import type { AddonCategory } from "../../src/types/exports";

export const baganator: AddonCategory = {
  id: "baganator",
  name: "Baganator",
  export: {
    name: "Unified Bag Layout",
    description: "Clean and efficient bag organization with search, sorting, and guild bank integration",
    exportString: `!BAG:3!Tv3Z0qV35NZMQlfV2mtvV3A9nsOb1sqOYsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqOA9nsqO`,
    lastUpdated: "2026-01-26T18:30:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/baganator",
    images: [
      "https://picsum.photos/seed/baganator1/800/600",
      "https://picsum.photos/seed/baganator2/800/600",
      "https://picsum.photos/seed/baganator3/800/600",
      "https://picsum.photos/seed/baganator4/800/600"
    ],
    setupInstructions: `1. Install Baganator addon from CurseForge
2. Type \`/baganator\` in-game to open settings
3. Navigate to 'Profiles' section
4. Click 'Import Profile' button
5. Paste the export string and confirm
6. Customize categories and sorting rules as desired`,
    tags: ["inventory", "bags", "ui", "organization", "search"]
  }
};

export default baganator;
