import type { AddonCategory } from '../../src/types/exports';

export const senseiResourceBar: AddonCategory = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: '2026-01-27T09:15:00Z',
    downloadUrl: 'https://www.curseforge.com/wow/addons/senseiclassresourcebar',
    externalUrl: 'https://www.luxthos.com/interface-addon-profiles/',
    setupInstructions: `1. Escape -> Interface -> Addons -> Sensei Resource Bar
2. Import the string from Luxthos
3. Expand 'Import/Export' section`,
    tags: ['resource', 'bar', 'mana', 'combo', 'shards', 'points', 'energy', 'rage', 'fury', 'tracking'],
    images: ['https://i.imgur.com/aEQC6IZ.png'],
  },
};
