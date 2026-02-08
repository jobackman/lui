import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: "2026-02-08T15:17:25.507Z",
    exportString: `SenseiClassResourceBar:1:TvvZVnXXB44U97gGKnGHKqswGcIacuHkbh4ay7yJJKnRz31ervL8oR3XEhX6Dwn7ycjN(POEONdkeHeOgXFcribItiKQ6hQQAQBsL6HFTO0pOqPTs0ESv0z2pcjn5I9SZ88(((888(o7M6azZMrtVGFADyDSNnGmLgma3MuhMfqgl7ho8ZSa1VutcUTNToDkxO)o0ZPLvrh2cDekb4f4diqp6mnWEuD00Wr08Xip6XnuROfuh4cL87nWbpzzGhitqfipZEuNvcAHXuNkeCtcmiW0FehKnmRlA6Pbe7nWLQiZBzbixafGS4uqPiiqXaqAcPCI4cRtH2kQAkJ7PKd3Ycq9hquYceqZw8QbTRGNes4cYaEfQZIcQQ2M6I8Ge1QgLg)C5xruEbfv90WUW0KXYuoZzZRz2HaDbu0LHveQYkRQHHA5ouu9lz4W)XJtEPzffZG)uG5TO8kuatAbOZeR193PbY1DmeHtte2RtjydQcfROHA6qTCGI)g9znWe4ACznDSlYE2jr2uNYyBO)q6t5vxzce1rjFqapTiGlxSyxB8K8EGClqWLY4zNftSHKWuqoMsf0vGUzfY1xUa)3G3VG24V35nQv7Oggf0cZ(h0T8usYxj1mHIq4pRkzU)1c6V9keulEVqjPzOWns)EAhat2id1fe4mRq6zCrn9SYL)Cg51EGpoajKCOaoC1aOYMLkLkXWugVHsrKTn0RZl6gJ5hyUOde4sDIgi7NjXEz2Rme7vzVgBy2iS30K1TvuCST6W6JT91mYMd7IjfKbsYwsYnLKjsSDY2fRF2aSDZgI96cLZuy7XFO1o)vXfmfKKJ7yaXmsvKd7Td9j2Ez7JTFh2bwZ9L1jg2G7Gnk7qD4UtoUPeewFh22y9SQpU(7xXYP)vLZBygQi2wIfdR30mzZnYy2GJUoszYjvFBYOb7GocgjOalTJ)oOqchW)LgkVWvpuNgGaoQQ(2akmWKxYzAH8MqmSKIZn)bBSP3R2Ov7pGWuNWb5clZBgC8QKla5xBA7cDyDVsg3jbtfOeFRwOxojx0kCeEnzlLCZuYKuHQ4DwFVCWr9hzZztf(1nEEXEzp2Xp67gAF7KeFJSdDTa27XoEOdkMc6d6b4ur9YqcFeWa3SPl0mYM7ElcJNBZIUWbDML)6iD(7)OaRY5hB8QLfnVWRaB0hSoBj1SzkDIhumCooeqqARI5ZuYOyeYIN(BU21wORU6sUzXt)RN6uMILKINUJSScF5IHslkW7kT1KyUv0PIy(45M7JE(ZFUiMNCV79q(UHGisIdFyp9eIJhclAzsgw8fz4Xx)63pUQ)(3998vD9wNqa5R11nJH8KPNEHyilzyi2DlrvHJQV(ss0JMF(fIR2VDZBkY52skx8ZculT0sCwMse7Jo5jpdF3Exf1qdDMyulp3CleJ6xU7DfYQVeuF(adKG6r35oruxANjN(0DV7Kt)PWCezNAAcwp4QTh(wZoBsf(XBFBrA2tIMwE5LdPih1xo8WNjwt)rTA)p(Y9LG6X93FsL(IBCJ7lcWsA0Kt)50Pt8LpDx7kjhFwymV0HJqfwHF4QxnY1KossS))q3k80N(3)tsh8BV4ff1FfD1QLQvqlZzlZFBR(MeZxD(ZBgLXujN(jZpF4uIOE)5F1v0P(9Co4KfGaAB(NI15FfWlTFVIpYxRI6e51QLtTKQMU5)(`,
    downloadUrl: 'https://www.curseforge.com/wow/addons/senseiclassresourcebar',
    externalUrl: 'https://www.luxthos.com/interface-addon-profiles/',
    setupInstructions: `1. Escape -> Interface -> Addons -> Sensei Resource Bar
2. Import the string from Luxthos
3. Expand 'Import/Export' section`,
    tags: [category.core, tag.resource, tag.cooldowns, tag.ui, tag.hud],
    media: [
      { type: 'image', url: 'https://i.imgur.com/aEQC6IZ.png' },
    ],
  },
};
