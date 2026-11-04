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
    setupInstructions: `1. Install Baganator and its required dependency, [Syndicator](https://www.curseforge.com/wow/addons/syndicator). The CurseForge app installs Syndicator automatically; install it separately if installing manually.
2. Log in and open your bags. Use the default settings; no import is needed.`,
    tags: [category.misc, tag.ui]
};
