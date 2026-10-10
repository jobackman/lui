import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { cooldownManagerRetail } from './retail/cooldown-manager';

export const cooldownManager: Addon = {
  id: "cooldown-manager",
  name: "Cooldown Manager",
  editions: {
    [edition.retail]: cooldownManagerRetail,
  },
};
