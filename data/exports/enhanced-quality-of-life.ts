import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const eqol: Addon = {
  id: "eqol",
  name: "Enhanced QoL",
  export: {
    name: "[Experiment] Enhanced QoL",
    description: "A big collection of various quality of life things that disappeared with WeakAuras and other addons like Leatrix plus",
    exportString: `TBD`,
    lastUpdated: "2026-02-06T21:50:28.739Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/eqol",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1335/704/cleanshot-2025-09-25-at-07-19-14-png.png' },
    ],
    setupInstructions: `This addon does a a ton of different things that could replace a lot of different extra addons/WAs:

- UI Fading (would replace BlizzHudTweaks)
- Teleport UI for m+, portals and other teleport tools (WA)
- Hold to release (WA)
- Auto accept/turnin quests (Leatrix plus)
- Auto repair/sell junk (Leatrix plus)
- Auto combat logging in raids/mythic+ (WA)
- Pull timers (BigWigs/DBM)
- Auto "delete" confirmation (Leatrix plus)
- Group finder filters (GroupFinderFilter addon)
- Raider.IO/m+ rating on tooltips
- Smart healthpot/healthstone macro
- Smart food/water macro
`,
    tags: [category.misc, tag.hud, tag.quest, tag.mythic, tag.fade, tag.map],
  },
};
