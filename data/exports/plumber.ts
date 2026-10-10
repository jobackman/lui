import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { plumberRetail } from './retail/plumber';

export const plumber: Addon = {
  id: "plumber",
  name: "Plumber",
  editions: {
    [edition.retail]: plumberRetail,
  },
};
