import type { AddonConfiguration } from '../../../src/types/exports';
import { category, tag } from '../../../src/types/exports';

export const spokenForever: AddonConfiguration = {
  name: 'Spoken',
  description: 'Adds AI voiceovers for quests and NPC dialogue, zone lore, books, and boss stories to WoW Forever.',
  lastUpdated: "2026-11-06T15:35:48.795Z",
  downloadUrl: 'https://www.curseforge.com/wow/addons/spoken-english',
  externalUrl: 'https://spoken.quest',
  setupInstructions: `1. Install [Spoken: English](https://www.curseforge.com/wow/addons/spoken-english) through your addon manager to get Spoken and all English voice packs.
2. If installing manually, install [Spoken](https://www.curseforge.com/wow/addons/spoken) plus [Quest Audio: All](https://www.curseforge.com/wow/addons/spoken-quests-audio-all), [Places and Bosses Audio](https://www.curseforge.com/wow/addons/spoken-audio-places), and [Readables Audio](https://www.curseforge.com/wow/addons/spoken-audio-readables). Spoken needs the voice packs to play audio.
3. Log in; no profile import is needed. Open settings with \`/sp settings\` and browse Azeroth's Compendium with \`/sp compendium\`.
4. Use \`/sp\` to stop or replay a line, \`/sp skip\` to skip it, or \`/sp stopall\` to clear the queue.`,
  tags: [category.misc, tag.quest, tag.ui],
};
