import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: "2026-02-25T20:35:26.181Z",
    exportString: `SenseiClassResourceBar:1:Tz12VnTvy8MLn2fU0whiJEJAGbBDaLbmbpWdqsBcPsj4GTdvmnP4JJpj2chBRJpLs6ttv8WEUOsfsCPI)eQqcepHqAAx000zH2jThgG6UWGX2Ky7XnXohBFsth9fRt857733VF)((ohNy7oD6uYkz9sQaR46yaqnKH(UtGQatdqJM(t3(Z1bvoBnK7eogk4g2qVTOmICArfyDR9HrahFpac6G96230DYcahqk)IqA6oyZBOdqN2Y3sNMLyoGVOkavdIP5AdRGHgIsYIJ5ioIBDDaEHQUoyPjW2woqKuj18JDYmlBAzazyk5i7AdtIgnvHuNiJSwtSvLZQAsF4a99J)8QUiyBCuwX12YWtOoW)SPCms7ImGOq23vABRPMcGmehXg47BvrOXE7inR2EczPp9)4SYJ9rNsTC5HvvZontuQWZJnBIG2aS15GzrG6qVnxezvNAwIC3sKAx6MqRAM4HUNNRVf2Y1PGRb0BpL8HIRv4IfJctCSQI5SmmGoZeupQS81MMXjfRPGdk75A5GpOQuXzM0YaBgG6aknCQioUf2umJVp1TTa2uN012WDsh)L9R76InlICRHOgK2mm)AexBxuwbqCbumHAXe0J5niZG5oYlnbuYsZRxgJOAUwDAnGgfDNeIOCF1Esrgb1tlPQkvOzvlB7rTq0omvAnZdRIfXUIYmNroG)xydE7CcFOcgGNWNIviVCPWYh0cEJ5c6b9TvOTEUJ9GRDT72rhDiuBLLOwlL9RaSHXBUYuZOE(AEDrlgxsPW0Uo1oO0pLTvnh9rYCs1mY3G9ckfQdWthn9UlHZhBbtiWgBgEsOhsCYRs6DasFK(jdq2gzqnY60d7BKDys2j5DA7SsBMDCHAuUhN8gK3KSFYhq2iztK3poPBIaPt0belADEOT3aT3jkAdAWeUdgWonuYYK8UxydcnIt5ejHjzZTDCDvJuKKBHSpYWnPkoy8o0ij7IS7wtSR(4DFHIQNwI610c0f51JKe5TsswVgJVmAtbI0JjzVAbIPtsxbQiGB93ra50OKlXAmrssoeJzK3ZKmuOTK7yp86xN3m5l1BT0BlyiIIX)NXIR0ggUzvGpnQsEgam0NXYPRB5moBilgvgbT5xUr41lZRh30YgwG2QOt1sOtdPxMmHn0KSULtzpjOHVy0nxmFGjwQ5md9(mf6DEyGEHmJowPcKdT6o8EnB5s7hfnh1KrII0Jdu4CD2XboiZM6K8HEjGoak(sNdIOTBv3A1SHAHE5g2yGVMqZBWQR5rVw4L(ahC4dX92Hw9H7(w7CFzdr)e5LsNk)HVxUGX9Ga8tQNltQ8Q54nRMccIrnRF7OhvlQz9Dx6sZtxUqqbct82X3epNNEN78OOC(SzN96V4fVGLZncrIFKM0vxCGFu0suCoc)XdEyhrB(KlFz(iYcHiS(dZczrvvTOqE6utnFui3xrH92nYRYVF1RYN1E8CZnF0fh3prcgqDYl3JpYroEuulU4IuUhRTC7Mh1VE7BZL1sZo788OgyawUjAzTu4U1T4u(R6Tx2UVDl7uwMZ6FoaJGOEw)9ZIQpEu)0nVjN1nNzMWkfF7Cn9NLl)jr7(nBBBhpstlT0smIVZWOc4XxFLRCxwU0DFsp9WcCiogFzWVFfwuFXw3khJFjzsMVSN2W4hV4fdDTy7JN73FMZWR)Z(N)vmk3FiWTITSIuP8LZkN6efOxXQ0gsF7PoL2QJnw715V(7oI29ZNBo2mJxxNeozwi9Rf0VLPq)CKtsVUz)jKYfLgpJC5rKYljRO9F)`,
    downloadUrl: 'https://www.curseforge.com/wow/addons/senseiclassresourcebar',
    externalUrl: 'https://www.luxthos.com/interface-addon-profiles/',
    setupInstructions: `1. Escape -> Interface -> Addons -> Sensei Resource Bar
2. Import the string from Luxthos
3. Expand 'Import/Export' section`,
    tags: [category.core, tag.resource, tag.cooldowns, tag.ui, tag.hud],
    media: [
      { type: 'image', url: 'https://i.imgur.com/O5z1z7M.png' },
    ],
  },
};
