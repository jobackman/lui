import type { AddonCategory } from "../../src/types/exports";

export const waypointUi: AddonCategory = {
  id: "waypoint-ui",
  name: "Waypoint UI",
  export: {
    name: "Complete UI Overhaul",
    description: "Full interface replacement with modern design and integrated addon suite",
    externalUrl: "https://www.wowinterface.com/downloads/info25456-WaypointUI.html",
    lastUpdated: "2026-01-28T12:45:00Z",
    downloadUrl: "https://www.wowinterface.com/downloads/info25456-WaypointUI.html",
    images: [
      "https://picsum.photos/seed/waypoint1/800/600",
      "https://picsum.photos/seed/waypoint2/800/600"
    ],
    setupInstructions: `1. Download Waypoint UI from WoWInterface
2. Extract all addon folders to your WoW AddOns directory
3. Launch World of Warcraft
4. Follow the in-game setup wizard on first login
5. Visit the external link for detailed customization guides
6. Use \`/waypoint\` to access settings and profiles`,
    tags: ["ui", "complete-overhaul", "suite", "modern", "interface"]
  }
};

export default waypointUi;
