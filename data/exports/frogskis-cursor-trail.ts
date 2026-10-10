import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { frogskisCursorTrailRetail } from './retail/frogskis-cursor-trail';

export const frogskisCursorTrail: Addon = {
  id: "frogskis-cursor-trail",
  name: "Frogskis Cursor Trail",
  editions: {
    [edition.retail]: frogskisCursorTrailRetail,
  },
};
