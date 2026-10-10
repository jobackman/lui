import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { warpdepleteRetail } from './retail/warpdeplete';

export const warpdeplete: Addon = {
  id: "warpdeplete",
  name: "Warp Deplete",
  editions: {
    [edition.retail]: warpdepleteRetail,
  },
};
