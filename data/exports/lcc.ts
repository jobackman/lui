import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const lcc: Addon = {
  id: "lcc",
  name: "LucyCursorCooldowns",
  export: {
    name: "LucyCursorCooldowns",
    description: "Shows failed-to-cast spells on the cursor",
    lastUpdated: "2026-02-06T00:09:40.069Z",
    downloadUrl: 'https://www.curseforge.com/wow/addons/lucycursorcooldowns',
    media: [
      { type: 'video', url: 'https://i.imgur.com/75b4hZq.mp4' },
      { type: 'image', url: 'https://media.wago.io/screenshots/ARfkAWuDZ/5faeb412ec71dd226ed70bf5.gif' },
      { type: 'image', url: 'https://i.imgur.com/eIGCoZ6.png' },
    ],
    tags: [category.misc, tag.frames, tag.ui],
    setupInstructions: `Nothing required to setup really, just install and use!

Settings: /lcc

Note: Because of api changes it only works out of combat 🥲
`
  },
};
