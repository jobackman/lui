import type { AddonConfiguration } from "../../../src/types/exports";
import { tag, category } from "../../../src/types/exports";

export const baganatorForever: AddonConfiguration = {
    name: "Baganator",
    description: "The better Adibags-like bag addon",
    lastUpdated: "2026-10-17T22:15:36.409Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/baganator",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1053/565/header-2024-12-30-categories.webp' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1053/566/header-2024-12-30-single.webp' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1082/780/transfer.webp' },
    ],
    setupInstructions: `Download and use the default settings. Requires [Syndicator](https://www.curseforge.com/wow/addons/syndicator), which is installed automatically by the CurseForge client. If installing manually, install Syndicator too.`,
    tags: [category.misc, tag.ui]
};
