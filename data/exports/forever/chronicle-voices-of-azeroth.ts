import type { AddonConfiguration } from '../../../src/types/exports';
import { category, tag } from '../../../src/types/exports';

export const chronicleVoicesOfAzerothForever: AddonConfiguration = {
  name: 'Chronicle: Voices of Azeroth',
  description: 'Adds quest and NPC voiceovers, narrated story recaps, and a quest journal to WoW Forever.',
  lastUpdated: "2026-10-17T21:54:09.512Z",
  downloadUrl: 'https://www.curseforge.com/wow/addons/chronicle-voices-of-azeroth',
  media: [
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2003/774/1-quest-voice-and-subtitles-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2032/280/2_journal_storyline-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2032/281/3_characters-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2003/777/4-narrator-recap-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2032/282/4_map-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2003/778/5-new-in-forever-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2032/283/5_zone_overview-jpg.jpg' },
    { type: 'image', url: 'https://media.forgecdn.net/attachments/2032/284/6_options-jpg.jpg' },
  ],
  setupInstructions: `Install and play; no settings import is needed. The CurseForge app installs the required voice packs automatically.

If installing manually, also download [Voices of Kalimdor](https://www.curseforge.com/wow/addons/chronicle-voices-of-kalimdor), [Voices of the Eastern Kingdoms](https://www.curseforge.com/wow/addons/chronicle-voices-of-the-eastern-kingdoms), and [Books & Adventures](https://www.curseforge.com/wow/addons/chronicle-books-adventures). Extract all four addons into your AddOns folder.

Use /lore to open the journal. Do not install Chronicle: Story Journal alongside this addon.`,
  tags: [category.misc, tag.quest, tag.ui],
};
