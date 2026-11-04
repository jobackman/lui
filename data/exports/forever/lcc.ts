import type { AddonConfiguration } from "../../../src/types/exports";
import { tag, category } from "../../../src/types/exports";

export const lccForever: AddonConfiguration = {
    name: "LucyCursorCooldowns",
    description: "Shows failed-to-cast spells on the cursor",
    lastUpdated: "2026-10-10T20:30:27.310Z",
    downloadUrl: 'https://www.curseforge.com/wow/addons/lucy-cursor-cooldowns',
    media: [
      { type: 'video', url: 'https://i.imgur.com/75b4hZq.mp4' },
      { type: 'image', url: 'https://media.wago.io/screenshots/ARfkAWuDZ/5faeb412ec71dd226ed70bf5.gif' },
      { type: 'image', url: 'https://i.imgur.com/eIGCoZ6.png' },
    ],
    tags: [category.core, tag.frames, tag.ui],
    setupInstructions: `1. Install LucyCursorCooldowns and log in.
2. Use the default settings; no import is needed. Run \`/lcc\` if you want to adjust them.`
};
