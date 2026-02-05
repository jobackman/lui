import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const dialogueUI: AddonCategory = {
  id: "dialogue-ui",
  name: "Dialogue UI",
  export: {
    name: "Dialogue UI",
    description: "Much better UI around NPC dialogues and quest givers",
    lastUpdated: "2026-02-05T21:11:29.933Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/dialogueui",
    images: [
      "https://media.forgecdn.net/attachments/829/473/wowscrnshot_032124_205644.jpg",
      "https://media.forgecdn.net/attachments/996/976/wowscrnshot_102224_213034.jpg",
      "https://media.forgecdn.net/attachments/1361/132/dialogueuisort.png",
      "https://media.forgecdn.net/attachments/838/440/addoncompartment.jpg",
      "https://i.imgur.com/F5SmpXx.png",
      "https://i.imgur.com/dvxOFeL.png",
    ],
    setupInstructions: `There is no easy way to import settings, but it has quite good defaults.
You may want to disable the camera movements in settings.

Take a look at the last 3 images on how to configure.
`,
    tags: [tag.quest, tag.ui, tag.misc]
  },
  category: category.misc,
};
