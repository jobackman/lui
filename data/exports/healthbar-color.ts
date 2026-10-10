import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { healthbarColorRetail } from './retail/healthbar-color';

export const healthbarColor: Addon = {
  id: "healthbar-color",
  name: "Healthbar Color",
  editions: {
    [edition.retail]: healthbarColorRetail,
  },
};
