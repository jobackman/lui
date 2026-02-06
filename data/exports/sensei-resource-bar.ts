import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: "2026-02-06T00:09:40.074Z",
    downloadUrl: 'https://www.curseforge.com/wow/addons/senseiclassresourcebar',
    externalUrl: 'https://www.luxthos.com/interface-addon-profiles/',
    setupInstructions: `1. Escape -> Interface -> Addons -> Sensei Resource Bar
2. Import the string from Luxthos
3. Expand 'Import/Export' section`,
    tags: [category.core, tag.resource, tag.cooldowns, tag.ui, tag.hud],
    media: [
      { type: 'image', url: 'https://i.imgur.com/aEQC6IZ.png' },
    ],
  },
};
