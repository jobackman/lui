import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const waypointUi: AddonCategory = {
  id: "waypoint-ui",
  name: "Waypoint UI",
  export: {
    name: "Waypoint UI",
    description: "Restyles the in-world waypoint markers in a nice looking way",
    lastUpdated: "2026-02-05T21:01:15.036Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/waypointui",
    images: [
      "https://media.forgecdn.net/attachments/1365/397/slide1.png",
      "https://media.forgecdn.net/attachments/1365/398/slide2.png",
      "https://media.forgecdn.net/attachments/1365/399/slide3.png",
      "https://media.forgecdn.net/attachments/1365/400/slide4.png",
      "https://media.forgecdn.net/attachments/1398/615/trackguidepin-png.png",
      "https://media.forgecdn.net/attachments/1418/835/tomtomwaypoint-jpg.jpg"
    ],
    setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [tag.waypoint, tag.markers, tag.map, tag.pin, tag.misc]
  },
  category: category.misc,
};
