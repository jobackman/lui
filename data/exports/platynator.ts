import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { platynatorRetail } from './retail/platynator';
import { platynatorForever } from './forever/platynator';

export const platynator: Addon = {
  id: "platynator",
  name: "Platynator",
  editions: {
    [edition.retail]: platynatorRetail,
    [edition.forever]: platynatorForever,
  },
};
