import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { accountWideInterfaceSettingsRetail } from './retail/account-wide-interface-settings';

export const accountWideInterfaceSettings: Addon = {
  id: "account-wide-interface-settings",
  name: "Account Wide Interface Settings",
  editions: {
    [edition.retail]: accountWideInterfaceSettingsRetail,
  },
};
