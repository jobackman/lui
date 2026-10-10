import type { AddonConfiguration } from "../../../src/types/exports";
import { tag, category } from "../../../src/types/exports";

export const accountWideInterfaceSettingsRetail: AddonConfiguration = {
    name: "Account Wide Interface Settings",
    description: "Makes your interface settings account wide instead of character specific. So you only have to set it up once!",
    lastUpdated: "2026-10-10T14:35:26.887Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/account-wide-ui",
    media: [
      { type: 'image', url: 'https://media.forgecdn.net/attachments/1432/435/accwideui1a.jpg' },
    ],
    // setupInstructions: `Just download and use it. There are some settings you could tweak but its defaults are good already`,
    tags: [category.misc, tag.ui]
};
