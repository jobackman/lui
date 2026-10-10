import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { baganatorRetail } from './retail/baganator';

export const baganator: Addon = {
  id: "baganator",
  name: "Baganator",
  editions: {
    [edition.retail]: baganatorRetail,
  },
};
