import type { AddonConfiguration } from "../../../src/types/exports";
import { tag, category } from "../../../src/types/exports";

export const dialogueUIForever: AddonConfiguration = {
    name: "Dialogue UI",
    description: "Much better UI around NPC dialogues and quest givers",
    lastUpdated: "2026-10-10T20:30:27.310Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/dialogueui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/829/473/wowscrnshot_032124_205644.jpg' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/996/976/wowscrnshot_102224_213034.jpg' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1361/132/dialogueuisort.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/838/440/addoncompartment.jpg' },
      { type: 'image', url: 'https://i.imgur.com/F5SmpXx.png' },
      { type: 'image', url: 'https://i.imgur.com/dvxOFeL.png' },
    ],
    setupInstructions: `1. Install Dialogue UI and log in.
2. Use the default settings; no import is needed.
3. Optional: disable camera movement in the addon settings. See the last three screenshots on this page for the settings location and suggested adjustments.`,
    tags: [category.misc, tag.quest, tag.ui]
};
