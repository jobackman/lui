import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const lcc: Addon = {
  id: "lcc",
  name: "LucyCursorCooldowns",
  export: {
    name: "LucyCursorCooldowns",
    description: "Shows failed-to-cast spells on the cursor",
    lastUpdated: "2026-04-19T19:36:06.617Z",
    downloadUrl: 'https://www.curseforge.com/wow/addons/lucycursorcooldowns',
    media: [
      { type: 'video', url: 'https://i.imgur.com/75b4hZq.mp4' },
      { type: 'image', url: 'https://media.wago.io/screenshots/ARfkAWuDZ/5faeb412ec71dd226ed70bf5.gif' },
      { type: 'image', url: 'https://i.imgur.com/eIGCoZ6.png' },
    ],
    tags: [category.core, tag.frames, tag.ui],
    setupInstructions: `Nothing required to setup really, just install and use!

Settings: /lcc
`
  },
};
