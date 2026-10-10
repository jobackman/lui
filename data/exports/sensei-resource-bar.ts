import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { senseiResourceBarRetail } from './retail/sensei-resource-bar';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  editions: {
    [edition.retail]: senseiResourceBarRetail,
  },
};
