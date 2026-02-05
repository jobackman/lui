import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const baganator: AddonCategory = {
  id: "baganator",
  name: "Baganator",
  export: {
    name: "Baganator",
    description: "The better Adibags-like bag addon",
    lastUpdated: "2026-02-05T21:11:29.921Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/baganator",
    images: [
      "https://media.forgecdn.net/attachments/974/124/categories-2024-09-23-default.webp",
      // "https://media.forgecdn.net/attachments/974/1/currency-panel-2024-09-23.webp",
      // "https://media.forgecdn.net/attachments/1082/780/transfer.webp",
    ],
    // setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [tag.misc, tag.ui]
  },
  category: category.misc,
};
