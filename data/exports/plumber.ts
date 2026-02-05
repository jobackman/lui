import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const plumber: AddonCategory = {
  id: "plumber",
  name: "Plumber",
  export: {
    name: "Plumber",
    description: "Miscellaneous UI improvements. Good quality stuff!",
    lastUpdated: "2026-02-05T21:01:15.036Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/plumber",
    images: [
      "https://media.forgecdn.net/attachments/986/816/lootuidemo.gif",
      "https://media.forgecdn.net/attachments/785/282/newtalkinghead2.gif",
      "https://media.forgecdn.net/attachments/1300/472/plumberlandingpage_8.jpg",
      "https://media.forgecdn.net/attachments/1300/474/plumberlandingpage_9.jpg",
    ],
    setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [tag.misc, tag.ui, tag.improvements]
  },
  category: category.misc,
};
