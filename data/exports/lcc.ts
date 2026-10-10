import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { lccRetail } from './retail/lcc';

export const lcc: Addon = {
  id: "lcc",
  name: "LucyCursorCooldowns",
  editions: {
    [edition.retail]: lccRetail,
  },
};
