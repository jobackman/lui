import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { dialogueUIRetail } from './retail/dialogue-ui';
import { dialogueUIForever } from './forever/dialogue-ui';

export const dialogueUI: Addon = {
  id: "dialogue-ui",
  name: "Dialogue UI",
  editions: {
    [edition.retail]: dialogueUIRetail,
    [edition.forever]: dialogueUIForever,
  },
};
