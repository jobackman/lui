import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { detailsRetail } from './retail/details';

export const details: Addon = {
  id: 'details',
  name: 'Details',
  editions: {
    [edition.retail]: detailsRetail,
  },
};
