import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: "2026-03-28T22:41:30.657Z",
    exportString: `SenseiClassResourceBar:1:nAvtSnXrB4yC)Nc44aUK)iBHcsPqOnPQGu5ay7yJTKn2S7AIOQsEN17yVJy9URMDmjoNQI6HEoOqes8teN5uesG4ecPQ(JQQMAsQupuar73hfkTvI2JTIoZU7Kek5qVSAY8(3ZZZ7774ezpPsLuwjRBcfynhBdaUTm0ZPfUgmfapEQpDNprhu7unWoTSnuiTTGUBtjTCkjfyt0iemW2ZfGH2e3U9mDMSiWgK0RmKfUnX8Y6a8jqEiDwus5aEsQaCdiHfRfSgbAivswkVTuANM6aYI1DSjLArSq2qCPkQfYFSm33eza55SKTSJfmbE8KftE0mYADiOANs1K9Xg65f9j1DWW1GrzfhlKHB8MaVtL02iLd2aIdqFSuwOPNgGnKsBb88q1I3EFDLIxB34zzF9(OSY5)WJRwT6(vvZodNuQWPiMDWqlabDAywmOj0DRLXOMmXssOwsm5s3eIAysg(wUoEicYXUOJb0DVv8GsRN7sLdDtkFDPCiddO9S(1JrlpTz4ysbnnCizxhKnzm1sLNDsKbX0pRdQ02UM0eiIPugppMAJawmL0XYWzsBV7710XHywg70aZeiTz56vAhlhC24GOX1JeVrK44iUdXfyHI8CtavqAU9XreJZnAYQb0OSZKqmd7pRMuMdq9uLuvlvStDKL14imRdZOwNcW6ejIJKmxzC7HxV0T8ionffXlboF68PlKrrt2NEFYRhFQixMWkqwhCtazMWXPDl7vdybJ6gRLhueDscRlQ1z15KXD5SLfCsludB90zoMAg5f19NawvaW5o8DU4fVzxD1v8gREuFLJU7IvdfcG0YJr2G4Cy8wSj4FJ5IMqGfXmyrPxAu6lq7BqA)0bOds3bDin6lPh0wP70KUl6aRzvAn9IOXBWauu6Bt3lD309q3eDZ09fn(uxjgDl4rLkJMcA5o4ABuLTaT5SXMa4llvqM0HzQw7RSbA3040EmPBDMk5l7VxstSn67qF3om(4pWhGC6RqF1vMHF2f((d4rVRWJxuZNk0xoGfVf91sq3OgD0a0N7W39sxsiKIJ4voUcJ61KMyyEzPBHgJ1Gdq8aDfGyn6wD7zDMJPJOXrpDmtMK4UnceZS)Cpr5ou91DaTmBiK98JJDQrhB)VNpf(pI63)F1AWPBH9vto4xlQPhIrRzzVZPWElKa0lMz88vkgkFDQd8yqUIRbGa904Q5mnr2tWNYJWev3(4D1jmrwWISHcg6lHpbK9QwllOzOA72d0gWEaT0PHywBx1PrdlOgxw7qwlf35OJ52)6ldRZS2W(lz(D6n5gJnprA)bszbgqj((kDe)beFLFFr93ME(COF0cLsLSWbUvo)LaFh8sONltYcQ5eQ83D2ZUqOk)lh6qAHQCN4XLyhx0hKbbE9OBweZLdSYJ5ZMBUl90N(uEmp6g34ESBd2EJYnEVyXKc3APbhfzyXvZWdp35e92F7o3LDQRnEaUl3wrrl0Lhn90le6YsQQ8B3K4nIB3tpIe9G5NFHWQ9Rx4c8CUfr5c)BUxlT0smugHh7do4bpc72UxXRbh8iHET8CZTqOx)81VoNw9i86R6RpHxp4Axla6rFdH1hpWacR)p)CeiNYYCu3)kTh2vZoROc)0vVkpnVPGtlV8Y(qK513SJDCKqo97vR(XSJ7s41d7TxrL(6ZF(BYdqp6WcR))eje6YxS9TlYXx6hZg2BGx(v4hpZzcuTOJiI9h8vlFRp(V(Brh87p5j51)(kLQuOAw5KhTi7HBL1jMV94hxliJrew)85N3FkHxV)4p7kWQBSJbNmlK9co7havy)gMDc3U5)NlvlxAImYvtxQqjzfT)5d`,
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
