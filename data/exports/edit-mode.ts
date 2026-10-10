import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { editModeRetail } from './retail/edit-mode';
import { editModeForever } from './forever/edit-mode';

export const editMode: Addon = {
  id: "edit-mode",
  name: "Edit Mode",
  editions: {
    [edition.retail]: editModeRetail,
    [edition.forever]: editModeForever,
  },
};
