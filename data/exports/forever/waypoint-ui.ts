import type { AddonConfiguration } from "../../../src/types/exports";
import { tag, category } from "../../../src/types/exports";

export const waypointUiForever: AddonConfiguration = {
    name: "Waypoint UI",
    description: "Restyles the in-world waypoint markers in a nice looking way",
    lastUpdated: "2026-10-10T20:30:27.310Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/waypointui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1586/907/waypoint.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1586/904/pinpoint.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1586/908/way.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1586/911/customization.png' },
    ],
    setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [category.misc, tag.map, tag.ui]
};
