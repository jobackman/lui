import type { Addon } from '../../src/types/exports';
import { tag, category } from '../../src/types/exports';

export const blizzHudTweaks: Addon = {
  id: 'blizz-hud-tweaks',
  name: 'BlizzHUDTweaks',
  export: {
    name: 'BlizzHUDTweaks',
    description: 'Fading of UI elements, in combat, mouseover, etc. (Retired in favor of EnhancedQOL)',
    exportString: `DZ1wtTnou4Fl7R9HoKeGs7B4qsBMbizRdTB3h8yz7ts0IrkJLmq2HX)2RU4Rb72esGu5PmDgFrs(7C05(rXPJZuh7ja)CFoMsSqrYRhIcGrKVcmoeCEeGC8CSVIgZGX3drJi9P35H4owo2JJ5JNPVuoMlGq0kNRpYXEeHXreF9WppC5cKZ1DQ8(P38O3FQJ9acYlecKZOEPRm8kRU85LE9amBPynVgDhOGrIRgijUsOypvmC(uu0CGFj(wi7txFNPRwkgKhLViBzlawddu(PuqwYHqph7ByWNdPEOWXlLRpldlxehHK3q(ADprFVsub5RLn55KjUaVyMpegIiGa4Ai5HI68fCaCdXdtcsVxmNNUy3WXHy(Q(uAya9bY3WWdGjZmZasI7vicAoeL4McXe3SNXmyoCUa3XV1mP9glQKOwI7Xnr3Qq49(Le(TIzUgnUowXZyzEpJxCKKx8VucCUNAZ1Wij0mxXgjuekb9sLu0WXCLsUz03XbIfFcvOntSpRpLWryIGgKXNQ)Z4TGt5TBCQbeFAmHlvS9QzRQUnX7zoKv8SzJ8PKQgEUetUfcumjMKljFlf7RI1PgnBz108kFYagdiCmk8zpADdNdf7wSX)VIv8qeMdAQK0GI4Jj7PoxF2AJZEb9bPPwHdfHW9qOCv3Kj(lakKVy9PwmlMUwfLNvMUUKRWe8DOL9dJfl2Z2Hw9PkwG3)bclC3dtJq(3MPYrVltOdYMJ4Xm1ZWK5L1nzWm6bpUeIWGyCMVh0(r0RasSX6Evbc2epRS(J0ZQlapHE8dKX6FRPARnKtOrXRQgWnYsT3ojryRqUqQEDvF5HI0ro08xtEr(J6Qv8vRoXDsv6Gh5rO0LrfnBlWZojKkLjcfSmwh8(gSa7hc2IVHrKaSpItnmlCcx5caI8nQWMsbwIReA5c3nr92jBBBfRFhCexHH33Nk8tDjdoNeiSNJibP7anx3sYXMm3pAW96kx9M4IYqQViucjSMsNAWChnjmXLknrkXuIR(wTUeWobfeiC2ppSVImZwY0X2oufJRWg8oyD2cnNDasH)(tmhnpnSdJ1H3At0XblBitPC4o16oocphtqHtOycx(n8pJNnJjervB(i(leg1TVCWqLFxHiPVAvV7pkE)Q(1Vo4k7YVvjv31KFMS8SSU7H3SmaXHHHi2Ic(qNtkVHFxKsQNw2QkvIMqginskyBgSE4jOOsjL3ydjqbJdFaK7PuQ8m9zP2DSkN0cRkv5QxJcS9QiJECLRo5LP0OrvPhmfXLup1kQ2xNx6MyVxGkL9Nj6QbkTDwUYzHNAWMkQWepTnu(8tAhcuNyWLpViowJ2gDAORMTn6bpYHiHF(xaZactyDKz61EmdrjUfyY8lgz9EE0sJbbfzYHGK6D7M70RCDm2UjQHKLxGPMZuUNHKP8kF1vITOeDyIa6quFeJRRUFligufIsCLyYS75Olq3juXCfimmydmMyc(oMi0(0ZGvGQXKq9jOAjS0QD0Rv0HR7sS)fxVxMLUTJWf6AWXFxKCwtLvOrWoPd9pa(GSj2KoTiqrAPWVeq3dgFXIZRRVcoTG6e)RB9uTz966PvBWNscqrRALTQ4xHLXCuR7W(uQ3JtzBWJ8kM0oRTK)XZmyEwjaQ)km90SK1ehMEIvMarmkbfkwmACKpCHgKMFh4RHvIBgWsCtHM5ZZENEYEx9Hx3a)jay(ry167y)dACIRpsOzHj3epxnFjU3JcJLzl8bHhblsFbpbLdjlCiIlto1mQqteGKpEMQ750F1wR0hMJTENGa4n48z2uoDreWwqddCU(JFCt2GudvSYEJ)kX9PPD6D8rN27tDov(3rI)D6XQ)(0jNP(VN4p5pCi6i0z96M4(5ucKnWL53G9KW(PUaQJKhjjbDlfjB6wfR6LSE5PZPz5ITjJaDBDzeORblNxnXBsAa9(0MbxmdI9HLif5U78H2I7oFWG5C13a)V1mMU7ngtoEYktXHn(HD7GDOJa049Wjn90MUZmn0hqhSwpQjtJDADMg7yW7Ae3zPWR0VIW69ivYqJXwYjjCm)UESUSZOuwDz2Hd3Q8HCCJLP244mQZEXljeJMpgK)UqmSkF(hByR0weQWRqTF3MOfQqm7hIySSGQlrPkLwN2ZXZPTKLhvhxOtS)5KGsN7LN1FA1k8u0Kd1jgTHPCV(FTh(7yig0zUTOskgRcCfAsC14jXDWkZvpEPYf3kkbCptU0JvpH4V16wpEp(B0GciVLAs37SIgDV560gHVPWlAvDRyoi3d)8Y5DWnqYDC(5d`,
    lastUpdated: "2026-02-15T19:55:19.674Z",
    downloadUrl: 'https://www.curseforge.com/wow/addons/blizzhudtweaks',
    media: [
      { type: 'video', url: 'https://i.imgur.com/HKE6iXR.mp4' },
    ],
    setupInstructions: `1. Run /bht
2. Go to BlizzHudTweaks -> Unfold the Profile Section -> Import
3. Pick a profile name, paste the profile string, and click import`,
    tags: [category.retired, tag.hud, tag.fade],
  },
};
