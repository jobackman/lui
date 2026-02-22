import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const senseiResourceBar: Addon = {
  id: 'sensei-resource-bar',
  name: 'Sensei Resource Bar',
  export: {
    name: 'Sensei Resource Bar',
    description: "Adds the power, resource and mana bars that we're used to, just like the old WeakAura packs",
    lastUpdated: "2026-02-22T13:46:47.153Z",
    exportString: `SenseiClassResourceBar:1:nA1sVnXvuy76w6dEKKXGl5fzak0McekqfSGfu7eBCKSzmZmMiQQKN745ApxX4zgDNBi4SQkIfDDqHiKa1i(jeHeiwHqQQpuv1TMKk1fTGsFqHsBLODzRO378WXPKfDJ1nZ978D(oFNZzMeFVzYKwwjNBkfyvhBdaUPm0ZzsCvygaESmF0oFQoO65QJDM02qH00c6UnLrLZiQaBGoabdS9CbyOnXThptNPkcSbP9kbzHBtmVUoaFgKhsNfLyEGNOkaxhsyXAbRsGgIsYIJBloQtdDazXAo2ePjjwiBiwQSAHXpv2vmrgqoNs2YowWu4Xsxm9jZkR1IGQEovt2p2qpVepTMdg2HgLvCSqgUcnaENlTTrghSbehO(UZyHMEAa2qCulGNhQQqZ9hldp3Uc5y)69b5Kh)9pTALkJOQMBgErPcVaXSfgAbiOZdZHbnGUBTeg1GzwIrULiZU0nHO6MKHVRRJhIGCSl6yaD3xzpO46bxSuimXXRjMhzyaTN1pFSYYtBgUMuqtdhs21bztoSQuPzNczqm9zDqLM2vfNarmfZ65XCBeWI5Kowgotz7TIxdhhIzjStDmZG0ML7xJ6y5GZjasiGJlupUGEC3H4gCKJ8CtaLrAU9XveRMR3GLdOrjNPGyM2xRNuIlq9msQQsfBvdzzngcZ6WSsRvbynIiXruM7mY(6)IBYD3t6bviaYKEmUc0LdJ2Obn)NyUOUFFBvzRN)e3FOHEVyXIjuF1J42hL9QcSGjAT6uZyUEAUDZswujLMW66m7Gj)0wO626JM9uQzLVo)bmj0aqMjC6Dpcxi(IMqGfXmytOxAc6ls7BqA)0bOds3bDin6g0d6B0Dzs3n9n6yxPdZoHqDM2tqFf6Rs3dDV0nt3c9Ttq7Hkq7cFiXsOlaTChSZorjlqtEHBta8THYit6BEXnj0mbtt0KM0T2X66AgPOP2g9a0rAXQy)X7aJKEq670EIDTR39huu92UOEjn)6I(YHLe91sr3OgxVCzZLFVM09R5xmDr72Vk812aX8fNgtCjxNjsAQH5kJ(wM0H)F1mD3gbIzC8FvS4QTHrAvd4Xqv21aqGECvotdK9e8HS4SYWVn)8nc3(4E9eMilyrwRInvlHpdK9YKjTGM0nSsARPan9edFZf3h4flZCML9(mf278ia9IzhB8YfPhzTD49B2UbFqC4CulUikXwhy05yVRdDyUn1f9DDtcTbm(LopeZA3Qo1RBb1c8YnTzFFnPM7q1w3vV28L5qhEKJe5TdV2L7(x)yFEdr)KfKYKUWrVBE)XDFaEP0ZNnDb18biZFIwccIHnRF94hxJFK1c)MlF5fyhx0pbbbEReBjkMhF7B)GWy(K5M7JF2ZEgpMRhWu0uaT7UJi(bHhXjIy43)(7hl8YhDLRCNWSUyadB8OCilPQQfc5Xtp9cHqUNIc)PBokl)21U2Dcr9W5NFHWzT7LmjNOUIs3dp2XIMixAPLyApEhX2teQF5w3kQSwEU5wic1GdYJnzBRLr3nVzKK)I(6JF7R32oLLJu9p5ZHpQNmWaCu9hH6hVXnIuDRzNnitj2zun9hvQ8HH3(v7yhr7plV8YCHV7au(64lV6vVdpw2TpQ3E5aBVd(5()9lWr9zBF7rC8ZPsX9L91bh)WLUuGRf)arX(TN9Sr5)j)9)igg7357wXxrrQCHk5KtFYISxXQ0btF9PpT2AXgVZ88N)vSWB)05NNpZ429PGtLdY(Ab7BzkSphzNYTh()esLsstKvUYOsfKKv0(3`,
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
