import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { baganatorRetail } from './retail/baganator';
import { baganatorForever } from './forever/baganator';

export const baganator: Addon = {
  id: "baganator",
  name: "Baganator",
  editions: {
    [edition.retail]: baganatorRetail,
    [edition.forever]: baganatorForever,
  },
};
