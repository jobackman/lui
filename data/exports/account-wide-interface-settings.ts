import type { Addon } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const accountWideInterfaceSettings: Addon = {
  id: "account-wide-interface-settings",
  name: "Account Wide Interface Settings",
  export: {
    name: "Account Wide Interface Settings",
    description: "Makes your interface settings account wide instead of character specific. So you only have to set it up once!",
    lastUpdated: "2026-02-06T00:09:40.053Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/account-wide-ui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1432/435/accwideui1a.jpg' },
    ],
    // setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [category.misc, tag.ui]
  },
};
