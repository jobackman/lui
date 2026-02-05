import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const waypointUi: AddonCategory = {
  id: "waypoint-ui",
  name: "Waypoint UI",
  export: {
    name: "Waypoint UI",
    description: "Restyles the in-world waypoint markers in a nice looking way",
    lastUpdated: "2026-02-05T22:32:58.471Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/waypointui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1365/397/slide1.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1365/398/slide2.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1365/399/slide3.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1365/400/slide4.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1398/615/trackguidepin-png.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1418/835/tomtomwaypoint-jpg.jpg' },
    ],
    setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [tag.map, tag.misc, tag.ui]
  },
  category: category.misc,
};
