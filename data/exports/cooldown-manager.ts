import type { AddonCategory } from "../../src/types/exports";

export const cooldownManager: AddonCategory = {
  id: "cooldown-manager",
  name: "Cooldown Manager",
  export: {
    name: "Raid Cooldown Tracker",
    description: "Track personal and raid cooldowns with customizable alerts and visual indicators",
    exportString: `!CDM:4!Uv4A1rW46OaPRmgW3nuuW4B0otPc2trPZtrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrPB0otrP`,
    lastUpdated: "2026-01-28T08:20:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/cooldown-manager",
    images: [
      "https://picsum.photos/seed/cooldown1/800/600",
      "https://picsum.photos/seed/cooldown2/800/600",
      "https://picsum.photos/seed/cooldown3/800/600"
    ],
    setupInstructions: `1. Install Cooldown Manager from CurseForge
2. Type \`/cdm\` in-game to open addon settings
3. Go to 'Import/Export' tab
4. Paste the export string in the import field
5. Click 'Import' to load the configuration
6. Customize alerts and positioning as needed
7. Share with raid team for synchronized tracking`,
    tags: ["cooldowns", "ui", "tracking", "raid", "alerts"]
  }
};

export default cooldownManager;
