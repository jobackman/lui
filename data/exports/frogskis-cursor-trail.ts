import type { AddonCategory } from "../../src/types/exports";
import { tag, category } from "../../src/types/exports";

export const frogskisCursorTrail: AddonCategory = {
  id: "frogskis-cursor-trail",
  name: "Frogskis Cursor Trail",
  export: {
    name: "Frogskis Cursor Trail",
    description: "Adds a nice trail to your cursor to make it more visible",
    lastUpdated: "2026-02-05T21:01:15.036Z",
    downloadUrl: "https://www.curseforge.com/wow/addons/plumber",
    exportString: `FCTP@2@AiYyMSojNkY2OyIvMyAIP0YuFz09OnI2NCA2eCc1KTM0UyUoADUnOzc0MG4KLyAgLTBTJSYIDB06NjI6PTAdCBIXH2YDeyxoZCIjPjE8NzJpdGpmAn0gISIsIDAAJzIuJAcsJTMPdHdvMjMqLCI4PCckaXRkIVsiNzwoYn12fTA9IiM4IBY4Vi8gNSQwPX8yJyYmejcqMzlHNHtpYHN_bnZuMCwtOzAtYA92bWFoc39ud248JScnICsOD3Z4ODk5KjYvODZ-cXp2ZCJXPjchIjoGLDYgJ34jNSIse1UqLCN9OSMjNT1oAi0kLT4uD3d4Nz8zIDc0ZG5ybWRpb21RMzEnPy0jIz8wIX5wbyEwIlYvMCAxMSwne2doIC44KiokAHtzemZsY3JoZ2pvcW8mMDpdMzFlYGJ_bnZ5Y3giOykwI0A1MzE1O3JwaGBoIC44KiokAXtzemBnY3JoYmBvcW8mMDtQJzc7ICsmLShoNSItJyBkM1wnITg1HCAvJDQnDy47LmIwUyowMWs8IC4pICF0fGRpb3oCfSY6MT0jJwo6PCh8MiQzJVd9IDs8MDowcmhjb3F6cGt6A30gOzwwOjB_aGNvcXh1ZDVdKiwhImpycmplf3J6PCA2MVoyO2lia3QtIDMgJjUNeG9tRzUmFzw-PDEFOj8sM2kjPjpBI3gkOD48JyU6Ji01aXM`,
    images: [
      "https://media.forgecdn.net/attachments/1495/40/logo2.png",
      "https://media.forgecdn.net/attachments/1495/6/options2.png",
    ],
    setupInstructions: `1. Escape -> Interface -> Addons -> Frogskis Cursor Trail
2. Paste the export string into the import box
3. Success!`,
    tags: [tag.misc, tag.cursor, tag.trail, tag.visibility]
  },
  category: category.misc,
};
