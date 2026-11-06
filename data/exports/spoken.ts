import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { spokenForever } from './forever/spoken';

export const spoken: Addon = {
  id: 'spoken',
  name: 'Spoken',
  editions: {
    [edition.forever]: spokenForever,
  },
};
