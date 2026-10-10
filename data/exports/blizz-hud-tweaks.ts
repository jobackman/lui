import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { blizzHudTweaksRetail } from './retail/blizz-hud-tweaks';

export const blizzHudTweaks: Addon = {
  id: 'blizz-hud-tweaks',
  name: 'BlizzHUDTweaks',
  editions: {
    [edition.retail]: blizzHudTweaksRetail,
  },
};
