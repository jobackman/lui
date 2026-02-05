import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const warpdeplete: AddonCategory = {
  id: "warpdeplete",
  name: "Warp Deplete",
  export: {
    name: "Warp Deplete",
    description: "Better Mythic+ info during a run. Adds keystone automatically etc.",
    lastUpdated: "2026-02-04T11:25:17.882Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/warpdeplete",
    images: [
      "https://media.forgecdn.net/attachments/349/457/wow_2021-03-21_04-28-29.png",
      "https://media.forgecdn.net/attachments/349/458/wow_2021-03-21_04-25-35.png",
      "https://media.forgecdn.net/attachments/349/597/wow_2021-03-21_15-55-49.png",

    ],
    setupInstructions: `Just download and use`,
    tags: [tag['m+'], tag['mythic+'], tag.dungeon, tag.misc]
  },
  category: category.misc,
};
