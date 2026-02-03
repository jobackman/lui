import type { AddonCategory } from "../../src/types/exports";

export const waypointUi: AddonCategory = {
  id: "waypoint-ui",
  name: "Waypoint UI",
  export: {
    name: "Waypoint UI",
    description: "Restyles the in-world waypoint markers in a nice looking way",
    lastUpdated: "2026-01-28T12:45:00Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/waypointui",
    images: [
      "https://picsum.photos/seed/waypoint1/800/600",
      "https://picsum.photos/seed/waypoint2/800/600"
    ],
    setupInstructions: `1. Download and use.
2. There are more settings, but its defaults are quite good already.`,
    tags: ["ui", "waypoint", "markers", "map", "pin"]
  }
};

export default waypointUi;
