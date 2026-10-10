import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { waypointUiRetail } from './retail/waypoint-ui';

export const waypointUi: Addon = {
  id: "waypoint-ui",
  name: "Waypoint UI",
  editions: {
    [edition.retail]: waypointUiRetail,
  },
};
