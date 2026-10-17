import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { chronicleVoicesOfAzerothForever } from './forever/chronicle-voices-of-azeroth';

export const chronicleVoicesOfAzeroth: Addon = {
  id: 'chronicle-voices-of-azeroth',
  name: 'Chronicle: Voices of Azeroth',
  editions: {
    [edition.forever]: chronicleVoicesOfAzerothForever,
  },
};
