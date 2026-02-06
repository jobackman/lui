import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const dialogueUI: Addon = {
  id: "dialogue-ui",
  name: "Dialogue UI",
  export: {
    name: "Dialogue UI",
    description: "Much better UI around NPC dialogues and quest givers",
    lastUpdated: "2026-02-06T01:42:28.420Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/dialogueui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/829/473/wowscrnshot_032124_205644.jpg' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/996/976/wowscrnshot_102224_213034.jpg' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1361/132/dialogueuisort.png' },
      { type: 'image', url: 'https://media.forgecdn.net/attachments/838/440/addoncompartment.jpg' },
      { type: 'image', url: 'https://i.imgur.com/F5SmpXx.png' },
      { type: 'image', url: 'https://i.imgur.com/dvxOFeL.png' },
    ],
    setupInstructions: `There is no easy way to import settings, but it has quite good defaults.
You may want to disable the camera movements in settings.

Take a look at the last 3 images on how to configure.
`,
    tags: [category.misc, tag.quest, tag.ui]
  },
};
