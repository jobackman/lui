import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { eqolFramesRetail } from './retail/eqol-unitframes';

export const eqolFrames: Addon = {
  id: 'eqol-unitframes',
  name: 'EQoL Unitframes',
  editions: {
    [edition.retail]: eqolFramesRetail,
  },
};
