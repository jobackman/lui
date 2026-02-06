import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const warpdeplete: Addon = {
  id: "warpdeplete",
  name: "Warp Deplete",
  export: {
    name: "Warp Deplete",
    description: "Better Mythic+ info during a run. Adds keystone automatically etc.",
    lastUpdated: "2026-02-06T01:42:28.424Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/warpdeplete",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/349/457/wow_2021-03-21_04-28-29.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/349/458/wow_2021-03-21_04-25-35.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/349/597/wow_2021-03-21_15-55-49.png' },
    ],
    setupInstructions: `Just download and use`,
    tags: [category.misc, tag.mythic]
  },
};
