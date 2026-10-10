import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { cooldownManagerCenteredRetail } from './retail/cooldown-manager-centered';

export const cooldownManagerCentered: Addon = {
  id: "cooldown-manager-centered",
  name: "Cooldown Manager Centered",
  editions: {
    [edition.retail]: cooldownManagerCenteredRetail,
  },
};
