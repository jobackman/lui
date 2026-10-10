import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { eqolRetail } from './retail/eqol';
import { eqolForever } from './forever/eqol';

export const eqol: Addon = {
  id: 'eqol',
  name: 'EQoL',
  editions: {
    [edition.retail]: eqolRetail,
    [edition.forever]: eqolForever,
  },
};
