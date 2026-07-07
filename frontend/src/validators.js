const ALLOWED_FASCE = new Set(["budget", "medio", "alto"]);

const CPU_SHORT = [
  "i9 14900K", "i9 14900KF", "i9 14900KS", "i9 14900", "i9 14900F", "i9 14900T",
  "i7 14700K", "i7 14700KF", "i7 14700", "i7 14700F", "i7 14700T",
  "i5 14600K", "i5 14600KF", "i5 14600", "i5 14500", "i5 14400", "i5 14400F", "i5 14500T",
  "i3 14100", "i3 14100F",
  "i9 13900K", "i9 13900KF", "i9 13900KS", "i9 13900", "i9 13900F", "i9 13900T",
  "i7 13700K", "i7 13700KF", "i7 13700", "i7 13700F", "i7 13700T",
  "i5 13600K", "i5 13600KF", "i5 13600", "i5 13500", "i5 13400", "i5 13400F", "i5 13490F",
  "i3 13100", "i3 13100F",
  "i9 12900K", "i9 12900KF", "i9 12900KS", "i9 12900", "i9 12900F", "i9 12900T",
  "i7 12700K", "i7 12700KF", "i7 12700", "i7 12700F", "i7 12700T",
  "i5 12600K", "i5 12600KF", "i5 12600", "i5 12500", "i5 12400", "i5 12400F", "i5 12490F",
  "i3 12100", "i3 12100F",
  "i9 11900K", "i9 11900KF", "i9 11900", "i9 11900F", "i9 11900T",
  "i7 11700K", "i7 11700KF", "i7 11700", "i7 11700F", "i7 11700T",
  "i5 11600K", "i5 11600KF", "i5 11600", "i5 11600T", "i5 11500", "i5 11500T", "i5 11400", "i5 11400F", "i5 11400T",
  "i3 11300", "i3 11300T", "i3 11100", "i3 11100T",
  "i9 10900K", "i9 10900KF", "i9 10900", "i9 10900F", "i9 10900T",
  "i7 10700K", "i7 10700KF", "i7 10700", "i7 10700F", "i7 10700T",
  "i5 10600K", "i5 10600KF", "i5 10600", "i5 10600T", "i5 10500", "i5 10500T", "i5 10400", "i5 10400F", "i5 10400T",
  "i3 10300", "i3 10300T", "i3 10100", "i3 10100F", "i3 10100T",
  "i9 9900K", "i9 9900KF", "i9 9900KS", "i9 9900", "i9 9900T",
  "i7 9700K", "i7 9700KF", "i7 9700", "i7 9700F", "i7 9700T",
  "i5 9600K", "i5 9600KF", "i5 9600", "i5 9600T", "i5 9500", "i5 9500F", "i5 9500T", "i5 9400", "i5 9400F", "i5 9400T",
  "i3 9350K", "i3 9350KF", "i3 9300", "i3 9300T", "i3 9100", "i3 9100F", "i3 9100T",
  "i7 8700K", "i7 8700", "i7 8700T",
  "i5 8600K", "i5 8600", "i5 8600T", "i5 8500", "i5 8500T", "i5 8400", "i5 8400T",
  "i3 8350K", "i3 8300", "i3 8300T", "i3 8100", "i3 8100T",
  "i7 7700K", "i7 7700", "i7 7700T",
  "i5 7600K", "i5 7600", "i5 7600T", "i5 7500", "i5 7500T", "i5 7400", "i5 7400T",
  "i3 7350K", "i3 7320", "i3 7300", "i3 7300T", "i3 7100", "i3 7100T",
  "Pentium G4620", "Pentium G4600", "Pentium G4560",
  "Celeron G3950", "Celeron G3930",
  "i7 6700K", "i7 6700", "i7 6700T",
  "i5 6600K", "i5 6600", "i5 6600T", "i5 6500", "i5 6500T", "i5 6400", "i5 6400T",
  "i3 6320", "i3 6300", "i3 6300T", "i3 6100", "i3 6100T",
  "Pentium G4520", "Pentium G4500", "Pentium G4400",
  "Celeron G3920", "Celeron G3900",
  "i7 5775C", "i7 5775R", "i5 5675C", "i5 5675R",
  "i7 4790K", "i7 4790", "i7 4790S", "i7 4790T", "i7 4770K", "i7 4770", "i7 4770S", "i7 4770T",
  "i5 4690K", "i5 4690", "i5 4690S", "i5 4690T", "i5 4670K", "i5 4670", "i5 4670S", "i5 4670T",
  "i5 4590", "i5 4590S", "i5 4590T", "i5 4570", "i5 4570S", "i5 4570T",
  "i5 4460", "i5 4460S", "i5 4440", "i5 4440S", "i5 4430", "i5 4430S",
  "i3 4370", "i3 4360", "i3 4350", "i3 4340", "i3 4330", "i3 4170", "i3 4160", "i3 4150", "i3 4130",
  "Pentium G3470", "Pentium G3460", "Pentium G3450", "Pentium G3440", "Pentium G3430",
  "Pentium G3260", "Pentium G3258", "Pentium G3250", "Pentium G3240", "Pentium G3220",
  "Celeron G1850", "Celeron G1840", "Celeron G1830", "Celeron G1820",
  "i7 3770K", "i7 3770", "i7 3770S", "i7 3770T",
  "i5 3570K", "i5 3570", "i5 3570S", "i5 3570T",
  "i5 3470", "i5 3470S", "i5 3470T", "i5 3450", "i5 3450S",
  "i5 3350P", "i5 3340", "i5 3340S", "i5 3330", "i5 3330S",
  "i3 3250", "i3 3240", "i3 3225", "i3 3220", "i3 3210",
  "Pentium G2140", "Pentium G2130", "Pentium G2120", "Pentium G2030", "Pentium G2020", "Pentium G2010",
  "Celeron G1620", "Celeron G1610",
  "i7 2700K", "i7 2600K", "i7 2600", "i7 2600S",
  "i5 2550K", "i5 2500K", "i5 2500", "i5 2500S", "i5 2400", "i5 2400S", "i5 2320", "i5 2310", "i5 2300",
  "i3 2120", "i3 2100",
  "Pentium G870", "Pentium G860", "Pentium G850", "Pentium G840", "Pentium G630", "Pentium G620",
  "Celeron G550", "Celeron G540", "Celeron G530",
  "i7 980X", "i7 980", "i7 970", "i7 960", "i7 950", "i7 940", "i7 930", "i7 920",
  "i5 760", "i5 750", "i5 680", "i5 670", "i5 661", "i5 660", "i5 655K", "i5 650",
  "i3 560", "i3 550", "i3 540", "i3 530",
  "Pentium G6960", "Pentium G6950",
  "Core 2 Extreme QX9770", "Core 2 Extreme QX9650",
  "Core 2 Quad Q9650", "Core 2 Quad Q9550", "Core 2 Quad Q9450", "Core 2 Quad Q9400",
  "Core 2 Quad Q9300", "Core 2 Quad Q8400", "Core 2 Quad Q8300", "Core 2 Quad Q8200",
  "Core 2 Quad Q6700", "Core 2 Quad Q6600",
  "Core 2 Duo E8600", "Core 2 Duo E8500", "Core 2 Duo E8400", "Core 2 Duo E8300",
  "Core 2 Duo E8200", "Core 2 Duo E7600", "Core 2 Duo E7500", "Core 2 Duo E7400",
  "Core 2 Duo E6850", "Core 2 Duo E6750", "Core 2 Duo E6700", "Core 2 Duo E6600", "Core 2 Duo E6550",
  "Core 2 Duo E6420", "Core 2 Duo E6400", "Core 2 Duo E6320", "Core 2 Duo E6300",
  "Core 2 Duo E4600", "Core 2 Duo E4500", "Core 2 Duo E4400", "Core 2 Duo E4300",
  "Pentium E6800", "Pentium E6700", "Pentium E6600", "Pentium E6500",
  "Pentium E5800", "Pentium E5700", "Pentium E5500", "Pentium E5400", "Pentium E5300", "Pentium E5200",
  "Pentium Dual Core E2220", "Pentium Dual Core E2200", "Pentium Dual Core E2180", "Pentium Dual Core E2160", "Pentium Dual Core E2140",
  "Celeron E3500", "Celeron E3400", "Celeron E3300", "Celeron E3200",
  "Celeron E1600", "Celeron E1500", "Celeron E1400", "Celeron E1200",
  "Celeron 450", "Celeron 440", "Celeron 430", "Celeron 420",
  "Pentium D 960", "Pentium D 950", "Pentium D 945", "Pentium D 940", "Pentium D 930", "Pentium D 925", "Pentium D 920",
  "Pentium D 840", "Pentium D 830", "Pentium D 820", "Pentium D 805",
  "Pentium 4 670", "Pentium 4 660", "Pentium 4 650", "Pentium 4 640", "Pentium 4 630",
  "Pentium 4 570J", "Pentium 4 560", "Pentium 4 550", "Pentium 4 540", "Pentium 4 530", "Pentium 4 520",
  "Pentium 4 3.4GHz", "Pentium 4 3.2GHz", "Pentium 4 3.0GHz", "Pentium 4 2.8GHz",
  "Pentium III 1.4GHz", "Pentium III 1.0GHz", "Pentium III 800MHz",
  "Athlon 64 X2 6400+", "Athlon 64 X2 6000+", "Athlon 64 X2 5600+", "Athlon 64 X2 5200+", "Athlon 64 X2 5000+", "Athlon 64 X2 4800+", "Athlon 64 X2 4400+", "Athlon 64 X2 4200+", "Athlon 64 X2 3800+",
  "Athlon 64 FX-62", "Athlon 64 FX-60", "Athlon 64 FX-57", "Athlon 64 FX-55", "Athlon 64 FX-53",
  "Athlon 64 4000+", "Athlon 64 3800+", "Athlon 64 3500+", "Athlon 64 3200+", "Athlon 64 3000+",
  "Athlon XP 3200+", "Athlon XP 3000+", "Athlon XP 2800+", "Athlon XP 2600+", "Athlon XP 2500+", "Athlon XP 2400+", "Athlon XP 2200+", "Athlon XP 2000+", "Athlon XP 1800+", "Athlon XP 1700+", "Athlon XP 1600+",
  "Athlon Thunderbird 1.4GHz", "Athlon Thunderbird 1.2GHz", "Athlon Thunderbird 1.0GHz",
  "Athlon 1000", "Athlon 950", "Athlon 900", "Athlon 850", "Athlon 800", "Athlon 750", "Athlon 700", "Athlon 650", "Athlon 600", "Athlon 500",
  "Duron 1800", "Duron 1600", "Duron 1400", "Duron 1300", "Duron 1200", "Duron 1100", "Duron 1000", "Duron 950", "Duron 900", "Duron 850", "Duron 800", "Duron 750", "Duron 700", "Duron 650", "Duron 600",
  "Sempron 3000+", "Sempron 2800+", "Sempron 2600+", "Sempron 2500+", "Sempron 2400+", "Sempron 2300+", "Sempron 2200+",
  "Phenom II X6 1100T", "Phenom II X6 1090T", "Phenom II X6 1075T", "Phenom II X6 1055T", "Phenom II X6 1045T", "Phenom II X6 1035T",
  "Phenom II X4 980", "Phenom II X4 975", "Phenom II X4 970", "Phenom II X4 965", "Phenom II X4 955", "Phenom II X4 945", "Phenom II X4 940", "Phenom II X4 925", "Phenom II X4 910", "Phenom II X4 840", "Phenom II X4 830",
  "Phenom II X3 740", "Phenom II X3 720", "Phenom II X3 710",
  "Phenom II X2 570", "Phenom II X2 565", "Phenom II X2 560", "Phenom II X2 555", "Phenom II X2 550", "Phenom II X2 545",
  "Phenom X4 9950", "Phenom X4 9850", "Phenom X4 9750", "Phenom X4 9650", "Phenom X4 9550", "Phenom X4 9500",
  "Phenom X3 8750", "Phenom X3 8650", "Phenom X3 8450",
  "Athlon II X4 650", "Athlon II X4 645", "Athlon II X4 640", "Athlon II X4 635", "Athlon II X4 630", "Athlon II X4 620",
  "Athlon II X3 460", "Athlon II X3 455", "Athlon II X3 450", "Athlon II X3 445", "Athlon II X3 440", "Athlon II X3 435", "Athlon II X3 425",
  "Athlon II X2 280", "Athlon II X2 270", "Athlon II X2 265", "Athlon II X2 260", "Athlon II X2 255", "Athlon II X2 250", "Athlon II X2 245", "Athlon II X2 240",
  "Ultra 9 285K", "Ultra 7 265K", "Ultra 5 245K",
  "Ultra 9 275K", "Ultra 7 265KF", "Ultra 5 245KF",
  "Ultra 9 288V", "Ultra 7 268V", "Ultra 7 266V", "Ultra 7 258V", "Ultra 5 238V", "Ultra 5 236V", "Ultra 5 228V", "Ultra 5 226V",
  "Ultra 9 285H", "Ultra 7 265H", "Ultra 7 255H", "Ultra 5 235H", "Ultra 5 225H",
  "Ultra 7 265U", "Ultra 7 255U", "Ultra 5 235U", "Ultra 5 225U", "Ultra 3 205U",
  "Ultra 3 205",
  "Ultra 5 225", "Ultra 5 225F", "Ultra 5 225T", "Ultra 5 230F",
  "Ultra 5 235", "Ultra 5 235T",
  "Ultra 5 245", "Ultra 5 245T",
  "Ultra 7 265", "Ultra 7 265F", "Ultra 7 265T",
  "Ultra 9 285", "Ultra 9 285T",
  "i9 14900HX", "i7 14700HX", "i7 14650HX", "i5 14500HX", "i5 14450HX",
  "i9 13980HX", "i9 13950HX", "i9 13900HX", "i7 13850HX", "i7 13700HX", "i7 13650HX", "i5 13600HX", "i5 13500HX", "i5 13450HX",
  "i9 12950HX", "i9 12900HX", "i7 12850HX", "i7 12800HX", "i7 12650HX", "i5 12600HX", "i5 12450HX",
  "i9 14900H", "i7 14700H", "i7 14650H", "i5 14500H", "i5 14450H", "i5 14400H",
  "i9 13900H", "i9 13905H", "i7 13800H", "i7 13700H", "i7 13620H", "i5 13600H", "i5 13500H", "i5 13420H",
  "i9 12900H", "i9 12900HK", "i7 12800H", "i7 12700H", "i7 12650H", "i5 12600H", "i5 12500H", "i5 12450H",
  "i7 1370P", "i7 1360P", "i5 1350P", "i5 1340P",
  "i7 1280P", "i7 1270P", "i7 1260P", "i5 1250P", "i5 1240P", "i3 1220P",
  "i7 1265U", "i7 1255U", "i5 1245U", "i5 1235U", "i3 1215U",
  "i7 1365U", "i7 1355U", "i5 1345U", "i5 1335U", "i5 1334U", "i3 1315U",
  "R9 9950X", "R9 9950X3D", "R9 9900X", "R9 9900X3D", "R7 9800X3D", "R7 9700X", "R5 9600X",
  "R9 7950X", "R9 7950X3D", "R9 7900X", "R9 7900", "R9 7900X3D",
  "R7 7800X3D", "R7 7700X", "R7 7700",
  "R5 7600X", "R5 7600", "R5 7500F", "R5 8400F",
  "R9 5950X", "R9 5900X", "R9 5900",
  "R7 5800X3D", "R7 5800X", "R7 5700X", "R7 5700X3D", "R7 5700",
  "R5 5600X", "R5 5600", "R5 5500", "R3 5300G", "R3 5100",
  "R7 5700G", "R5 5600G", "R5 5500GT",
  "R7 4700G", "R5 4600G", "R3 4300G",
  "R9 3950X", "R7 3800X", "R7 3800XT", "R5 3600X", "R5 3600XT", "R5 3600",
  "R7 2700X", "R7 2700", "R5 2600X", "R5 2600",
  "R7 1800X", "R7 1700X", "R7 1700", "R5 1600X", "R5 1600", "R5 1600AF",
  "R7 8700G", "R5 8600G", "R5 8500G", "R3 8300G",
  "R9 7945HX", "R9 7945HX3D", "R9 7845HX", "R7 7745HX", "R5 7645HX",
  "R9 7940HX", "R7 7840HX", "R5 7640HX",
  "R9 7940HS", "R7 7840HS", "R5 7640HS",
  "R9 8945HS", "R7 8845HS", "R5 8645HS",
  "R9 7940H", "R7 7840H", "R5 7640H",
  "R7 7735HS", "R5 7535HS", "R3 7335U",
  "R7 7735U", "R5 7535U", "R3 7330U",
  "R7 7730U", "R5 7530U", "R3 7320U",
  "R9 6900HX", "R9 6900HS", "R7 6800H", "R7 6800HS", "R5 6600H", "R5 6600HS",
  "R9 5980HX", "R9 5900HX", "R7 5800H", "R7 5800HS", "R5 5600H", "R5 5600HS",
  "R9 4900H", "R9 4900HS", "R7 4800H", "R7 4800HS", "R5 4600H", "R5 4600HS",
  "Threadripper 7980X", "Threadripper 7970X", "Threadripper 7960X",
  "Threadripper 5975WX", "Threadripper 5965WX",
  "Threadripper 3970X", "Threadripper 3990X",
  "EPYC 9654", "EPYC 9554", "EPYC 9454", "EPYC 9354", "EPYC 9254", "EPYC 9124",
  "EPYC 9755", "EPYC 9655", "EPYC 9565",
  "i5 12500H",
  "R7 8700F",
  "R9 9900X3D",
  "R9 9950X3D",
  "Xeon w9-3495X", "Xeon w7-3465X", "Xeon w7-3455", "Xeon w7-3445", "Xeon w5-3435X", "Xeon w5-3425",
  "Xeon w7-2495X", "Xeon w5-2465X", "Xeon w5-2455X", "Xeon w3-2435",
  "Xeon Platinum 8490H", "Xeon Gold 6430", "Xeon Silver 4410Y",
  "Xeon W5-3425", "Xeon W5-3435X", "Xeon W7-3445", "Xeon W7-3455", "Xeon W7-3465X", "Xeon W9-3475X",
];
const CPU_DB = [
  "Intel Core i9-14900K", "Intel Core i9-14900KF", "Intel Core i9-14900KS", "Intel Core i9-14900", "Intel Core i9-14900F", "Intel Core i9-14900T",
  "Intel Core i9-13900K", "Intel Core i9-13900KF", "Intel Core i9-13900KS", "Intel Core i9-13900", "Intel Core i9-13900F", "Intel Core i9-13900T",
  "Intel Core i9-12900K", "Intel Core i9-12900KF", "Intel Core i9-12900KS", "Intel Core i9-12900", "Intel Core i9-12900F", "Intel Core i9-12900T",
  "Intel Core i9-11900K", "Intel Core i9-11900KF", "Intel Core i9-11900", "Intel Core i9-11900F", "Intel Core i9-11900T",
  "Intel Core i9-10900K", "Intel Core i9-10900KF", "Intel Core i9-10900", "Intel Core i9-10900F", "Intel Core i9-10900T",
  "Intel Core i9-9900K", "Intel Core i9-9900KF", "Intel Core i9-9900KS", "Intel Core i9-9900", "Intel Core i9-9900T",
  "Intel Core i7-14700K", "Intel Core i7-14700KF", "Intel Core i7-14700", "Intel Core i7-14700F", "Intel Core i7-14700T",
  "Intel Core i7-13700K", "Intel Core i7-13700KF", "Intel Core i7-13700", "Intel Core i7-13700F", "Intel Core i7-13700T",
  "Intel Core i7-12700K", "Intel Core i7-12700KF", "Intel Core i7-12700", "Intel Core i7-12700F", "Intel Core i7-12700T",
  "Intel Core i7-11700K", "Intel Core i7-11700KF", "Intel Core i7-11700", "Intel Core i7-11700F", "Intel Core i7-11700T",
  "Intel Core i7-10700K", "Intel Core i7-10700KF", "Intel Core i7-10700", "Intel Core i7-10700F", "Intel Core i7-10700T",
  "Intel Core i7-9700K", "Intel Core i7-9700KF", "Intel Core i7-9700", "Intel Core i7-9700F", "Intel Core i7-9700T",
  "Intel Core i7-8700K", "Intel Core i7-8700", "Intel Core i7-8700T",
  "Intel Core i7-7700K", "Intel Core i7-7700", "Intel Core i7-7700T",
  "Intel Core i7-6700K", "Intel Core i7-6700", "Intel Core i7-6700T",
  "Intel Core i7-5775C", "Intel Core i7-5775R",
  "Intel Core i7-4790K", "Intel Core i7-4790", "Intel Core i7-4790S", "Intel Core i7-4790T", "Intel Core i7-4770K", "Intel Core i7-4770", "Intel Core i7-4770S", "Intel Core i7-4770T",
  "Intel Core i7-3770K", "Intel Core i7-3770", "Intel Core i7-3770S", "Intel Core i7-3770T",
  "Intel Core i7-2700K", "Intel Core i7-2600K", "Intel Core i7-2600", "Intel Core i7-2600S",
  "Intel Core i7-980X", "Intel Core i7-980", "Intel Core i7-970", "Intel Core i7-960", "Intel Core i7-950", "Intel Core i7-940", "Intel Core i7-930", "Intel Core i7-920",
  "Intel Core i5-14600K", "Intel Core i5-14600KF", "Intel Core i5-14600", "Intel Core i5-14500", "Intel Core i5-14400", "Intel Core i5-14400F", "Intel Core i5-14500T",
  "Intel Core i5-13600K", "Intel Core i5-13600KF", "Intel Core i5-13600",
  "Intel Core i5-13500", "Intel Core i5-13400", "Intel Core i5-13400F", "Intel Core i5-13490F",
  "Intel Core i5-12600K", "Intel Core i5-12600KF", "Intel Core i5-12600", "Intel Core i5-12500",
  "Intel Core i5-12400", "Intel Core i5-12400F", "Intel Core i5-12490F",
  "Intel Core i5-14400", "Intel Core i5-14400F",
  "Intel Core i5-11600K", "Intel Core i5-11600KF", "Intel Core i5-11600", "Intel Core i5-11600T", "Intel Core i5-11500", "Intel Core i5-11500T", "Intel Core i5-11400", "Intel Core i5-11400F", "Intel Core i5-11400T",
  "Intel Core i5-10600K", "Intel Core i5-10600KF", "Intel Core i5-10600", "Intel Core i5-10600T", "Intel Core i5-10500", "Intel Core i5-10500T", "Intel Core i5-10400", "Intel Core i5-10400F", "Intel Core i5-10400T",
  "Intel Core i5-9600K", "Intel Core i5-9600KF", "Intel Core i5-9600", "Intel Core i5-9600T", "Intel Core i5-9500", "Intel Core i5-9500F", "Intel Core i5-9500T", "Intel Core i5-9400", "Intel Core i5-9400F", "Intel Core i5-9400T",
  "Intel Core i5-8600K", "Intel Core i5-8600", "Intel Core i5-8600T", "Intel Core i5-8500", "Intel Core i5-8500T", "Intel Core i5-8400", "Intel Core i5-8400T",
  "Intel Core i5-7600K", "Intel Core i5-7600", "Intel Core i5-7600T", "Intel Core i5-7500", "Intel Core i5-7500T", "Intel Core i5-7400", "Intel Core i5-7400T",
  "Intel Core i5-6600K", "Intel Core i5-6600", "Intel Core i5-6600T", "Intel Core i5-6500", "Intel Core i5-6500T", "Intel Core i5-6400", "Intel Core i5-6400T",
  "Intel Core i5-5675C", "Intel Core i5-5675R",
  "Intel Core i5-4690K", "Intel Core i5-4690", "Intel Core i5-4690S", "Intel Core i5-4690T", "Intel Core i5-4670K", "Intel Core i5-4670", "Intel Core i5-4670S", "Intel Core i5-4670T",
  "Intel Core i5-4590", "Intel Core i5-4590S", "Intel Core i5-4590T", "Intel Core i5-4570", "Intel Core i5-4570S", "Intel Core i5-4570T",
  "Intel Core i5-4460", "Intel Core i5-4460S", "Intel Core i5-4440", "Intel Core i5-4440S", "Intel Core i5-4430", "Intel Core i5-4430S",
  "Intel Core i5-3570K", "Intel Core i5-3570", "Intel Core i5-3570S", "Intel Core i5-3570T",
  "Intel Core i5-3470", "Intel Core i5-3470S", "Intel Core i5-3470T", "Intel Core i5-3450", "Intel Core i5-3450S",
  "Intel Core i5-3350P", "Intel Core i5-3340", "Intel Core i5-3340S", "Intel Core i5-3330", "Intel Core i5-3330S",
  "Intel Core i5-2550K", "Intel Core i5-2500K", "Intel Core i5-2500", "Intel Core i5-2500S", "Intel Core i5-2400", "Intel Core i5-2400S", "Intel Core i5-2320", "Intel Core i5-2310", "Intel Core i5-2300",
  "Intel Core i5-760", "Intel Core i5-750", "Intel Core i5-680", "Intel Core i5-670", "Intel Core i5-661", "Intel Core i5-660", "Intel Core i5-655K", "Intel Core i5-650",
  "Intel Core i3-14100", "Intel Core i3-14100F",
  "Intel Core i3-13100", "Intel Core i3-13100F",
  "Intel Core i3-12100", "Intel Core i3-12100F",
  "Intel Core i3-11300", "Intel Core i3-11300T", "Intel Core i3-11100", "Intel Core i3-11100T", "Intel Core i3-11100F",
  "Intel Core i3-10300", "Intel Core i3-10300T", "Intel Core i3-10100", "Intel Core i3-10100F", "Intel Core i3-10100T",
  "Intel Core i3-9350K", "Intel Core i3-9350KF", "Intel Core i3-9300", "Intel Core i3-9300T", "Intel Core i3-9100", "Intel Core i3-9100F", "Intel Core i3-9100T",
  "Intel Core i3-8350K", "Intel Core i3-8300", "Intel Core i3-8300T", "Intel Core i3-8100", "Intel Core i3-8100T",
  "Intel Core i3-7350K", "Intel Core i3-7320", "Intel Core i3-7300", "Intel Core i3-7300T", "Intel Core i3-7100", "Intel Core i3-7100T",
  "Intel Core i3-6320", "Intel Core i3-6300", "Intel Core i3-6300T", "Intel Core i3-6100", "Intel Core i3-6100T",
  "Intel Core i3-4370", "Intel Core i3-4360", "Intel Core i3-4350", "Intel Core i3-4340", "Intel Core i3-4330", "Intel Core i3-4170", "Intel Core i3-4160", "Intel Core i3-4150", "Intel Core i3-4130",
  "Intel Core i3-3250", "Intel Core i3-3240", "Intel Core i3-3225", "Intel Core i3-3220", "Intel Core i3-3210",
  "Intel Core i3-2120", "Intel Core i3-2100",
  "Intel Core i3-560", "Intel Core i3-550", "Intel Core i3-540", "Intel Core i3-530",
  "Intel Pentium G4620", "Intel Pentium G4600", "Intel Pentium G4560",
  "Intel Pentium G4520", "Intel Pentium G4500", "Intel Pentium G4400",
  "Intel Pentium G3470", "Intel Pentium G3460", "Intel Pentium G3450", "Intel Pentium G3440", "Intel Pentium G3430",
  "Intel Pentium G3260", "Intel Pentium G3258", "Intel Pentium G3250", "Intel Pentium G3240", "Intel Pentium G3220",
  "Intel Pentium G2140", "Intel Pentium G2130", "Intel Pentium G2120", "Intel Pentium G2030", "Intel Pentium G2020", "Intel Pentium G2010",
  "Intel Pentium G870", "Intel Pentium G860", "Intel Pentium G850", "Intel Pentium G840", "Intel Pentium G630", "Intel Pentium G620",
  "Intel Pentium G6960", "Intel Pentium G6950",
  "Intel Pentium E6800", "Intel Pentium E6700", "Intel Pentium E6600", "Intel Pentium E6500",
  "Intel Pentium E5800", "Intel Pentium E5700", "Intel Pentium E5500", "Intel Pentium E5400", "Intel Pentium E5300", "Intel Pentium E5200",
  "Intel Pentium Dual Core E2220", "Intel Pentium Dual Core E2200", "Intel Pentium Dual Core E2180", "Intel Pentium Dual Core E2160", "Intel Pentium Dual Core E2140",
  "Intel Pentium D 960", "Intel Pentium D 950", "Intel Pentium D 945", "Intel Pentium D 940", "Intel Pentium D 930", "Intel Pentium D 925", "Intel Pentium D 920",
  "Intel Pentium D 840", "Intel Pentium D 830", "Intel Pentium D 820", "Intel Pentium D 805",
  "Intel Pentium 4 670", "Intel Pentium 4 660", "Intel Pentium 4 650", "Intel Pentium 4 640", "Intel Pentium 4 630",
  "Intel Pentium 4 570J", "Intel Pentium 4 560", "Intel Pentium 4 550", "Intel Pentium 4 540", "Intel Pentium 4 530", "Intel Pentium 4 520",
  "Intel Pentium 4 3.4GHz", "Intel Pentium 4 3.2GHz", "Intel Pentium 4 3.0GHz", "Intel Pentium 4 2.8GHz",
  "Intel Pentium III 1.4GHz", "Intel Pentium III 1.0GHz", "Intel Pentium III 800MHz",
  "Intel Celeron G3950", "Intel Celeron G3930",
  "Intel Celeron G3920", "Intel Celeron G3900",
  "Intel Celeron G1850", "Intel Celeron G1840", "Intel Celeron G1830", "Intel Celeron G1820",
  "Intel Celeron G1620", "Intel Celeron G1610",
  "Intel Celeron G550", "Intel Celeron G540", "Intel Celeron G530",
  "Intel Celeron E3500", "Intel Celeron E3400", "Intel Celeron E3300", "Intel Celeron E3200",
  "Intel Celeron E1600", "Intel Celeron E1500", "Intel Celeron E1400", "Intel Celeron E1200",
  "Intel Celeron 450", "Intel Celeron 440", "Intel Celeron 430", "Intel Celeron 420",
  "Intel Core 2 Extreme QX9770", "Intel Core 2 Extreme QX9650",
  "Intel Core 2 Quad Q9650", "Intel Core 2 Quad Q9550", "Intel Core 2 Quad Q9450", "Intel Core 2 Quad Q9400",
  "Intel Core 2 Quad Q9300", "Intel Core 2 Quad Q8400", "Intel Core 2 Quad Q8300", "Intel Core 2 Quad Q8200",
  "Intel Core 2 Quad Q6700", "Intel Core 2 Quad Q6600",
  "Intel Core 2 Duo E8600", "Intel Core 2 Duo E8500", "Intel Core 2 Duo E8400", "Intel Core 2 Duo E8300",
  "Intel Core 2 Duo E8200", "Intel Core 2 Duo E7600", "Intel Core 2 Duo E7500", "Intel Core 2 Duo E7400",
  "Intel Core 2 Duo E6850", "Intel Core 2 Duo E6750", "Intel Core 2 Duo E6700", "Intel Core 2 Duo E6600", "Intel Core 2 Duo E6550",
  "Intel Core 2 Duo E6420", "Intel Core 2 Duo E6400", "Intel Core 2 Duo E6320", "Intel Core 2 Duo E6300",
  "Intel Core 2 Duo E4600", "Intel Core 2 Duo E4500", "Intel Core 2 Duo E4400", "Intel Core 2 Duo E4300",
  "Intel Core Ultra 9 285K", "Intel Core Ultra 9 275K",
  "Intel Core Ultra 7 265K", "Intel Core Ultra 7 265KF",
  "Intel Core Ultra 5 245K", "Intel Core Ultra 5 245KF",
  "Intel Core Ultra 5 225H", "Intel Core Ultra 7 258V",
  "Intel Core Ultra 9 288V",
  "Intel Core Ultra 5 226V", "Intel Core Ultra 7 268V", "Intel Core Ultra 9 298V",
  "Intel Core Ultra 7 266V", "Intel Core Ultra 5 238V", "Intel Core Ultra 5 236V", "Intel Core Ultra 5 228V",
  "Intel Core Ultra 9 285H", "Intel Core Ultra 7 265H", "Intel Core Ultra 7 255H", "Intel Core Ultra 5 235H",
  "Intel Core Ultra 7 265U", "Intel Core Ultra 7 255U", "Intel Core Ultra 5 235U", "Intel Core Ultra 5 225U", "Intel Core Ultra 3 205U",
  "Intel Core i9-14901E", "Intel Core i7-14701E",
  "Intel Core i5-12450H", "Intel Core i7-12700H", "Intel Core i9-12900H",
  "Intel Core i5-13450HX", "Intel Core i7-13650HX", "Intel Core i9-13950HX",
  "Intel Core i5-14450HX", "Intel Core i7-14650HX", "Intel Core i9-14950HX",
  "Intel Core i5-11500", "Intel Core i7-11700",
  "Intel Core i9-14900HX", "Intel Core i7-14700HX", "Intel Core i7-14650HX", "Intel Core i5-14500HX", "Intel Core i5-14450HX",
  "Intel Core i9-13980HX", "Intel Core i9-13900HX", "Intel Core i7-13850HX", "Intel Core i7-13700HX", "Intel Core i5-13600HX", "Intel Core i5-13500HX",
  "Intel Core i9-12950HX", "Intel Core i9-12900HX", "Intel Core i7-12850HX", "Intel Core i7-12800HX", "Intel Core i7-12650HX", "Intel Core i5-12600HX", "Intel Core i5-12450HX",
  "Intel Core i9-14900H", "Intel Core i7-14700H", "Intel Core i7-14650H", "Intel Core i5-14500H", "Intel Core i5-14450H", "Intel Core i5-14400H",
  "Intel Core i9-13900H", "Intel Core i9-13905H", "Intel Core i7-13800H", "Intel Core i7-13700H", "Intel Core i7-13620H", "Intel Core i5-13600H", "Intel Core i5-13500H", "Intel Core i5-13420H",
  "Intel Core i9-12900HK", "Intel Core i7-12800H", "Intel Core i7-12650H", "Intel Core i5-12600H", "Intel Core i5-12500H",
  "Intel Core i7-1370P", "Intel Core i7-1360P", "Intel Core i5-1350P", "Intel Core i5-1340P",
  "Intel Core i7-1280P", "Intel Core i7-1270P", "Intel Core i7-1260P", "Intel Core i5-1250P", "Intel Core i5-1240P", "Intel Core i3-1220P",
  "Intel Core i7-1265U", "Intel Core i7-1255U", "Intel Core i5-1245U", "Intel Core i5-1235U", "Intel Core i3-1215U",
  "Intel Core i7-1365U", "Intel Core i7-1355U", "Intel Core i5-1345U", "Intel Core i5-1335U", "Intel Core i5-1334U", "Intel Core i3-1315U",
  "AMD Ryzen 9 9950X", "AMD Ryzen 9 9900X", "AMD Ryzen 7 9800X3D",
  "AMD Ryzen 7 9700X", "AMD Ryzen 5 9600X",
  "AMD Ryzen 9 9955X3D", "AMD Ryzen 9 9925X",
  "AMD Ryzen 9 7950X", "AMD Ryzen 9 7950X3D", "AMD Ryzen 9 7900X",
  "AMD Ryzen 9 7900", "AMD Ryzen 7 7800X3D", "AMD Ryzen 7 7700X",
  "AMD Ryzen 7 7700", "AMD Ryzen 5 7600X", "AMD Ryzen 5 7600",
  "AMD Ryzen 5 7500F", "AMD Ryzen 5 8400F",
  "AMD Ryzen 9 7900X3D",
  "AMD Ryzen 9 5950X", "AMD Ryzen 9 5900X", "AMD Ryzen 9 5900",
  "AMD Ryzen 7 5800X3D", "AMD Ryzen 7 5800X", "AMD Ryzen 7 5700X", "AMD Ryzen 7 5700X3D", "AMD Ryzen 7 5700",
  "AMD Ryzen 5 5600X", "AMD Ryzen 5 5600", "AMD Ryzen 5 5500", "AMD Ryzen 5 5500GT",
  "AMD Ryzen 3 5300G", "AMD Ryzen 3 5100",
  "AMD Ryzen 7 5700G", "AMD Ryzen 5 5600G",
  "AMD Ryzen 7 4700G", "AMD Ryzen 5 4600G", "AMD Ryzen 3 4300G",
  "AMD Ryzen 9 3950X", "AMD Ryzen 7 3800X", "AMD Ryzen 7 3800XT", "AMD Ryzen 5 3600X", "AMD Ryzen 5 3600XT", "AMD Ryzen 5 3600",
  "AMD Ryzen 7 2700X", "AMD Ryzen 7 2700", "AMD Ryzen 5 2600X", "AMD Ryzen 5 2600",
  "AMD Ryzen 7 1800X", "AMD Ryzen 7 1700X", "AMD Ryzen 7 1700", "AMD Ryzen 5 1600X", "AMD Ryzen 5 1600", "AMD Ryzen 5 1600AF",
  "AMD Ryzen 7 8700G", "AMD Ryzen 5 8600G", "AMD Ryzen 5 8500G",
  "AMD Ryzen 3 8300G",
  "AMD Ryzen 9 7945HX", "AMD Ryzen 9 7945HX3D", "AMD Ryzen 9 7845HX", "AMD Ryzen 7 7745HX", "AMD Ryzen 5 7645HX",
  "AMD Ryzen 9 7940HX", "AMD Ryzen 7 7840HX", "AMD Ryzen 5 7640HX",
  "AMD Ryzen 9 7940HS", "AMD Ryzen 7 7840HS", "AMD Ryzen 5 7640HS",
  "AMD Ryzen 9 8945HS", "AMD Ryzen 7 8845HS", "AMD Ryzen 5 8645HS",
  "AMD Ryzen 9 7940H", "AMD Ryzen 7 7840H", "AMD Ryzen 5 7640H",
  "AMD Ryzen 7 7735HS", "AMD Ryzen 5 7535HS", "AMD Ryzen 3 7335U",
  "AMD Ryzen 7 7735U", "AMD Ryzen 5 7535U", "AMD Ryzen 3 7330U",
  "AMD Ryzen 7 7730U", "AMD Ryzen 5 7530U", "AMD Ryzen 3 7320U",
  "AMD Ryzen 9 6900HX", "AMD Ryzen 9 6900HS", "AMD Ryzen 7 6800H", "AMD Ryzen 7 6800HS", "AMD Ryzen 5 6600H", "AMD Ryzen 5 6600HS",
  "AMD Ryzen 9 5980HX", "AMD Ryzen 9 5900HX", "AMD Ryzen 7 5800H", "AMD Ryzen 7 5800HS", "AMD Ryzen 5 5600H", "AMD Ryzen 5 5600HS",
  "AMD Ryzen 9 4900H", "AMD Ryzen 9 4900HS", "AMD Ryzen 7 4800H", "AMD Ryzen 7 4800HS", "AMD Ryzen 5 4600H", "AMD Ryzen 5 4600HS",
  "AMD Phenom II X6 1100T", "AMD Phenom II X6 1090T", "AMD Phenom II X6 1075T", "AMD Phenom II X6 1055T", "AMD Phenom II X6 1045T", "AMD Phenom II X6 1035T",
  "AMD Phenom II X4 980", "AMD Phenom II X4 975", "AMD Phenom II X4 970", "AMD Phenom II X4 965", "AMD Phenom II X4 955", "AMD Phenom II X4 945", "AMD Phenom II X4 940", "AMD Phenom II X4 925", "AMD Phenom II X4 910", "AMD Phenom II X4 840", "AMD Phenom II X4 830",
  "AMD Phenom II X3 740", "AMD Phenom II X3 720", "AMD Phenom II X3 710",
  "AMD Phenom II X2 570", "AMD Phenom II X2 565", "AMD Phenom II X2 560", "AMD Phenom II X2 555", "AMD Phenom II X2 550", "AMD Phenom II X2 545",
  "AMD Phenom X4 9950", "AMD Phenom X4 9850", "AMD Phenom X4 9750", "AMD Phenom X4 9650", "AMD Phenom X4 9550", "AMD Phenom X4 9500",
  "AMD Phenom X3 8750", "AMD Phenom X3 8650", "AMD Phenom X3 8450",
  "AMD Athlon II X4 650", "AMD Athlon II X4 645", "AMD Athlon II X4 640", "AMD Athlon II X4 635", "AMD Athlon II X4 630", "AMD Athlon II X4 620",
  "AMD Athlon II X3 460", "AMD Athlon II X3 455", "AMD Athlon II X3 450", "AMD Athlon II X3 445", "AMD Athlon II X3 440", "AMD Athlon II X3 435", "AMD Athlon II X3 425",
  "AMD Athlon II X2 280", "AMD Athlon II X2 270", "AMD Athlon II X2 265", "AMD Athlon II X2 260", "AMD Athlon II X2 255", "AMD Athlon II X2 250", "AMD Athlon II X2 245", "AMD Athlon II X2 240",
  "AMD Athlon 64 X2 6400+", "AMD Athlon 64 X2 6000+", "AMD Athlon 64 X2 5600+", "AMD Athlon 64 X2 5200+", "AMD Athlon 64 X2 5000+", "AMD Athlon 64 X2 4800+", "AMD Athlon 64 X2 4400+", "AMD Athlon 64 X2 4200+", "AMD Athlon 64 X2 3800+",
  "AMD Athlon 64 FX-62", "AMD Athlon 64 FX-60", "AMD Athlon 64 FX-57", "AMD Athlon 64 FX-55", "AMD Athlon 64 FX-53",
  "AMD Athlon 64 4000+", "AMD Athlon 64 3800+", "AMD Athlon 64 3500+", "AMD Athlon 64 3200+", "AMD Athlon 64 3000+",
  "AMD Athlon XP 3200+", "AMD Athlon XP 3000+", "AMD Athlon XP 2800+", "AMD Athlon XP 2600+", "AMD Athlon XP 2500+", "AMD Athlon XP 2400+", "AMD Athlon XP 2200+", "AMD Athlon XP 2000+", "AMD Athlon XP 1800+", "AMD Athlon XP 1700+", "AMD Athlon XP 1600+",
  "AMD Athlon Thunderbird 1.4GHz", "AMD Athlon Thunderbird 1.2GHz", "AMD Athlon Thunderbird 1.0GHz",
  "AMD Athlon 1000", "AMD Athlon 950", "AMD Athlon 900", "AMD Athlon 850", "AMD Athlon 800", "AMD Athlon 750", "AMD Athlon 700", "AMD Athlon 650", "AMD Athlon 600", "AMD Athlon 500",
  "AMD Duron 1800", "AMD Duron 1600", "AMD Duron 1400", "AMD Duron 1300", "AMD Duron 1200", "AMD Duron 1100", "AMD Duron 1000", "AMD Duron 950", "AMD Duron 900", "AMD Duron 850", "AMD Duron 800", "AMD Duron 750", "AMD Duron 700", "AMD Duron 650", "AMD Duron 600",
  "AMD Sempron 3000+", "AMD Sempron 2800+", "AMD Sempron 2600+", "AMD Sempron 2500+", "AMD Sempron 2400+", "AMD Sempron 2300+", "AMD Sempron 2200+",
  "AMD Threadripper 7980X", "AMD Threadripper 7960X", "AMD Threadripper 7970X",
  "AMD Threadripper 7975WX", "AMD Threadripper 7955WX",
  "AMD Threadripper 5975WX", "AMD Threadripper 5965WX",
  "AMD Threadripper 3970X", "AMD Threadripper 3990X",
  "AMD EPYC 9654", "AMD EPYC 9554", "AMD EPYC 9454", "AMD EPYC 9354", "AMD EPYC 9254", "AMD EPYC 9124",
  "AMD EPYC 9755", "AMD EPYC 9655", "AMD EPYC 9565",
  "AMD EPYC 7713", "AMD EPYC 7513",
  "Intel Xeon w9-3495X", "Intel Xeon w7-3465X", "Intel Xeon w7-3455", "Intel Xeon w7-3445", "Intel Xeon w5-3435X", "Intel Xeon w5-3425",
  "Intel Xeon w7-2495X", "Intel Xeon w5-2465X", "Intel Xeon w5-2455X", "Intel Xeon w3-2435",
  "Intel Xeon Platinum 8490H", "Intel Xeon Gold 6430", "Intel Xeon Silver 4410Y",
  "Intel Xeon E-2488", "Intel Xeon E-2356G",
  "AMD Ryzen 7 8700F",
  "AMD Ryzen 9 9900X3D",
  "AMD Ryzen 9 9950X3D",
  "Intel Core i5-12500H",
  "Intel Core Ultra 3 205",
  "Intel Core Ultra 5 225",
  "Intel Core Ultra 5 225F",
  "Intel Core Ultra 5 225T",
  "Intel Core Ultra 5 230F",
  "Intel Core Ultra 5 235",
  "Intel Core Ultra 5 235T",
  "Intel Core Ultra 5 245",
  "Intel Core Ultra 5 245T",
  "Intel Core Ultra 7 265",
  "Intel Core Ultra 7 265F",
  "Intel Core Ultra 7 265T",
  "Intel Core Ultra 9 285",
  "Intel Core Ultra 9 285T",
  "Intel Xeon W5-3425",
  "Intel Xeon W5-3435X",
  "Intel Xeon W7-3445",
  "Intel Xeon W7-3455",
  "Intel Xeon W7-3465X",
  "Intel Xeon W9-3475X",
  ...CPU_SHORT,
];
const GPU_SHORT = [
  "RTX 5090", "RTX 5090D", "RTX 5080", "RTX 5080D", "RTX 5070 Ti 16GB", "RTX 5070 Ti", "RTX 5070", "RTX 5060 Ti 16GB", "RTX 5060 Ti 8GB", "RTX 5060 Ti", "RTX 5060", "RTX 5050", "RTX 4090",
  "RTX 4080 Super", "RTX 4080", "RTX 4070 Ti Super", "RTX 4070 Ti SUPER", "RTX 4070 Ti", "RTX 4070 Super", "RTX 4070", "RTX 4060 Ti 16GB", "RTX 4060 Ti 8GB", "RTX 4060 Ti",
  "RTX 4060", "RTX 3090 Ti", "RTX 3090", "RTX 3080 Ti", "RTX 3080", "RTX 3080 12GB", "RTX 3070 Ti", "RTX 3070 Ti 16GB", "RTX 3070", "RTX 3060 Ti", "RTX 3060 Ti GDDR6X", "RTX 3060 12GB", "RTX 3060 8GB", "RTX 3060",
  "RTX 3050", "RTX 2080 Ti", "RTX 2080 SUPER", "RTX 2080", "RTX 2070 Super", "RTX 2070", "RTX 2060 Super", "RTX 2060 12GB", "RTX 2060 SUPER", "RTX 2060",
  "GTX 1660 Ti", "GTX 1660 Super", "GTX 1660", "GTX 1650 Ti", "GTX 1650 Super", "GTX 1650 GDDR6", "GTX 1650", "GTX 1630",
  "GTX 1080 Ti", "GTX 1080", "GTX 1070 Ti", "GTX 1070", "GTX 1060 6GB", "GTX 1060 3GB", "GTX 1050 Ti", "GTX 1050",
  "GT 1030 DDR5", "GT 1030 DDR4", "GT 1030", "GT 710",
  "TITAN RTX", "TITAN V", "TITAN Xp", "TITAN X Pascal",
  "Quadro RTX 8000", "Quadro RTX 6000", "Quadro RTX 4000",
  "RTX 6000 Ada", "RTX 5000 Ada", "RTX 4500 Ada", "RTX 4000 Ada", "RTX 2000 Ada",
  "RTX A6000", "RTX A5500", "RTX A5000", "RTX A4500", "RTX A4000", "RTX A2000", "RTX A1000",
  "RX 9070 XT", "RX 9070", "RX 9060 XT", "RX 9040", "RX 7900 XTX", "RX 7900 XT", "RX 7900 GRE",
  "RX 7800 XT", "RX 7700 XT", "RX 7600 XT", "RX 7600", "RX 6950 XT", "RX 6900 XT", "RX 6800 XT", "RX 6800", "RX 6750 XT",
  "RX 6700 XT", "RX 6700", "RX 6650 XT", "RX 6600 XT", "RX 6600", "RX 6500 XT", "RX 6400", "RX 5700 XT", "RX 5600 XT",
  "RX 5500 XT", "RX 580", "RX 570", "RX 480", "PRO W7900", "PRO W7800", "PRO W7600", "PRO W5700",
  "A770 16GB", "A750", "A580", "A380", "A310", "B580", "B570", "B770", "B750",
  "RTX 4090D", "RTX 4010",
  "GTX 1050 Mobile", "GTX 1050 Ti Mobile", "GTX 1050 Max-Q", "GTX 1050 Ti Max-Q", "GTX 1050 Mobile 3GB",
  "GTX 1060 Mobile", "GTX 1060 Max-Q", "GTX 1070 Mobile", "GTX 1070 Max-Q", "GTX 1080 Mobile", "GTX 1080 Max-Q",
  "GTX 1650 Mobile", "GTX 1650 Max-Q", "GTX 1650 Ti Mobile", "GTX 1650 Ti Max-Q", "GTX 1660 Ti Mobile", "GTX 1660 Ti Max-Q",
  "RTX 2050 Mobile", "RTX 2050 Max-Q", "RTX 2060 Mobile", "RTX 2060 Max-Q", "RTX 2060 SUPER Mobile",
  "RTX 2070 Mobile", "RTX 2070 Max-Q", "RTX 2070 SUPER Mobile", "RTX 2070 SUPER Max-Q",
  "RTX 2080 Mobile", "RTX 2080 Max-Q", "RTX 2080 SUPER Mobile", "RTX 2080 SUPER Max-Q",
  "RTX 3050 Mobile", "RTX 3050 Max-Q", "RTX 3050 Ti Mobile", "RTX 3050 Ti Max-Q",
  "RTX 3060 Mobile", "RTX 3060 Max-Q", "RTX 3070 Mobile", "RTX 3070 Max-Q", "RTX 3070 Ti Mobile", "RTX 3070 Ti Max-Q",
  "RTX 3080 Mobile", "RTX 3080 Max-Q", "RTX 3080 Ti Mobile", "RTX 3080 Ti Max-Q",
  "RTX 4050 Mobile", "RTX 4050 Max-Q", "RTX 4060 Mobile", "RTX 4060 Max-Q",
  "RTX 4070 Mobile", "RTX 4070 Max-Q", "RTX 4080 Mobile", "RTX 4080 Max-Q",
  "RTX 4090 Mobile", "RTX 4090 Max-Q",
  "RTX 5050 Mobile", "RTX 5060 Mobile", "RTX 5070 Mobile", "RTX 5070 Ti Mobile", "RTX 5080 Mobile", "RTX 5090 Mobile",
  "TITAN X Pascal", "TITAN Xp", "TITAN V CEO Edition",
  "Quadro P400", "Quadro P600", "Quadro P620", "Quadro P1000", "Quadro P2000", "Quadro P2200", "Quadro P4000", "Quadro P5000", "Quadro P6000",
  "Quadro P3200 Mobile", "Quadro P4200 Mobile", "Quadro P5200 Mobile",
  "Quadro RTX 5000",
  "Quadro RTX 3000 Mobile", "Quadro RTX 4000 Mobile", "Quadro RTX 5000 Mobile", "Quadro RTX 6000 Mobile",
  "Quadro T1000 Mobile", "Quadro T2000 Mobile",
  "RTX A400", "RTX A500", "RTX A1000", "RTX A2000", "RTX A2000 12GB",
  "RTX A4000", "RTX A4500", "RTX A5500",
  "RTX A2000 Mobile", "RTX A3000 Mobile", "RTX A4000 Mobile", "RTX A4500 Mobile", "RTX A5000 Mobile", "RTX A5500 Mobile",
  "RX 460", "RX 470", "RX 550", "RX 560", "RX 590", "RX 5700",
  "RX Vega 56", "RX Vega 64", "RX Vega 64 Liquid Cooling",
  "RX 6750 GRE 10GB", "RX 6750 GRE 12GB", "RX 7700",
  "RX 9060", "RX 9060 XT 16GB", "RX 9060 XT 8GB", "RX 9070 GRE", "RX 9070 GRE 16GB",
  "RX 5500M", "RX 5600M", "RX 5700M",
  "RX 6600M", "RX 6600S", "RX 6650M", "RX 6650M XT", "RX 6700M", "RX 6700S",
  "RX 6800M", "RX 6800S", "RX 6850M XT",
  "RX 6450M", "RX 6500M", "RX 6550M", "RX 6550S",
  "RX 7600M", "RX 7600M XT", "RX 7600S", "RX 7700S", "RX 7800M", "RX 7900M",
  "Pro W5500", "PRO W6600", "PRO W6800", "PRO W6300", "PRO W6400", "PRO W7500", "PRO W7700", "PRO W7800 48GB", "PRO W7900D",
  "Pro WX 3200", "Pro WX 4100", "Pro WX 5100", "Pro WX 7100", "Pro WX 8200", "Pro WX 9100",
  "Pro Vega 56", "Pro Vega 64", "Pro VII", "PRO V620", "PRO V710",
  "Instinct MI25", "Instinct MI50", "Instinct MI60", "Instinct MI100", "Instinct MI210", "Instinct MI250", "Instinct MI250X",
  "Instinct MI300", "Instinct MI300X", "Instinct MI325X",
  "A770", "Pro A40", "Pro A50", "Pro A60", "Pro B50", "Pro B60",
  "A350M", "A370M", "A380M", "A530M", "A550M", "A570M", "A730M", "A770M",
  "Pro A30M", "Pro A60M",
  "Iris Xe MAX Graphics",
  "GTX 1050 3GB", "GTX 1060 6GB GP104", "GTX 1060 5GB", "GTX 1650 GDDR6",
  "RTX 2070", "RTX 2080", "RTX 2080 SUPER", "RTX 2060 12GB",
  "RTX 3060 12GB", "RTX 3060 8GB", "RTX 3060 Ti GDDR6X",
  "RTX 3050 8GB", "RTX 3050 6GB", "RTX 3050 4GB",
  "RTX 4060 Ti 16GB", "RTX 4060 Ti 8GB", "RTX 4070 GDDR6",
  "RTX 5060 Ti 16GB", "RTX 5060 Ti 8GB", "RTX 5090D",
  "Radeon X1900 XT", "Radeon X1800 XT", "Radeon X1650 XT", "Radeon X1600 XT", "Radeon X850 XT PE", "Radeon X800 XT", "Radeon X700 XT",
  "Radeon 9800 XT", "Radeon 9800 PRO", "Radeon 9700 PRO", "Radeon 9600 XT", "Radeon 9500 PRO",
  "Radeon 9200", "Radeon 9000", "Radeon 8500", "Radeon 7500", "Radeon 7200", "Radeon 7000",
  "Radeon DDR", "Radeon SDR", "Radeon LE", "Radeon VE",
  "Radeon X850 PRO", "Radeon X800 PRO", "Radeon X800 GT", "Radeon X700 PRO",
  "Radeon X600 XT", "Radeon X600 PRO", "Radeon X300",
  "AIW Radeon X1900", "AIW Radeon 9800 PRO", "AIW Radeon 9700 PRO", "AIW Radeon 8500",
  "Radeon Xpress 200", "Radeon Xpress 1150",
  "GeForce 7950 GX2", "GeForce 7900 GTX", "GeForce 7900 GT", "GeForce 7800 GTX", "GeForce 7800 GT",
  "GeForce 7600 GT", "GeForce 7600 GS", "GeForce 7300 GT",
  "GeForce 6800 Ultra", "GeForce 6800 GT", "GeForce 6800", "GeForce 6600 GT", "GeForce 6600",
  "GeForce FX 5950 Ultra", "GeForce FX 5900 Ultra", "GeForce FX 5900", "GeForce FX 5700 Ultra", "GeForce FX 5700", "GeForce FX 5600", "GeForce FX 5500", "GeForce FX 5200",
  "GeForce 4 Ti 4600", "GeForce 4 Ti 4400", "GeForce 4 Ti 4200", "GeForce 4 MX 440", "GeForce 4 MX 420",
  "GeForce 3 Ti 500", "GeForce 3 Ti 200", "GeForce 3",
  "GeForce 2 GTS", "GeForce 2 MX 400", "GeForce 2 MX 200", "GeForce 2 Ultra", "GeForce 2 Pro",
  "GeForce 256 DDR", "GeForce 256 SDR",
  "RIVA TNT2 Ultra", "RIVA TNT2", "RIVA TNT2 M64", "RIVA TNT", "RIVA 128",
  "GeForce 6150", "GeForce 6100",
  "Voodoo5 5500", "Voodoo4 4500", "Voodoo3 3500", "Voodoo3 3000", "Voodoo3 2000",
  "Voodoo2", "Voodoo Graphics", "Voodoo Rush",
  "Velocity 200", "Velocity 100",
  "PowerVR Kyro II", "PowerVR Kyro", "PowerVR PCX2", "PowerVR PCX1",
  "Matrox Millennium G400 MAX", "Matrox Millennium G200", "Matrox Parhelia-512", "Matrox Mystique",
  "S3 Savage 2000", "S3 Savage4", "S3 Trio3D", "S3 Virge DX", "S3 Virge GX2", "S3 Virge",
  "XGI Volari V8", "XGI Volari Duo V8",
  "Intel i740",
  "Number Nine Revolution IV",
  "Rendition Verite V2200", "Rendition Verite V2100", "Rendition Verite V1000",
  "Trident Blade 3D", "Trident 3DImage 9850",
  "SIS Xabre 400", "SIS Xabre 200",
  "SIS Mirage 3", "SIS Mirage 2",
  "Intel GMA 950", "Intel GMA 900", "Intel GMA X4500", "Intel GMA X3100",
  "NVIDIA nForce 680i", "NVIDIA nForce 780i",
  "Radeon X1300", "Radeon X1050", "Radeon X600", "Radeon X550", "Radeon X300 SE",
  "GeForce 8400 GS", "GeForce 8500 GT", "GeForce 8600 GT", "GeForce 8600 GTS", "GeForce 8800 GTX", "GeForce 8800 GTS", "GeForce 8800 GT", "GeForce 8800 Ultra",
  "GeForce 9400 GT", "GeForce 9500 GT", "GeForce 9600 GT", "GeForce 9600 GSO", "GeForce 9800 GTX", "GeForce 9800 GX2",
  "GeForce GT 210", "GeForce GT 220", "GeForce GT 240",
  "GeForce GT 430", "GeForce GT 440", "GeForce GTS 450",
  "GeForce GTX 460", "GeForce GTX 470", "GeForce GTX 480",
  "GeForce GT 610", "GeForce GT 620", "GeForce GT 630",
  "Radeon HD 2400 XT", "Radeon HD 2600 XT", "Radeon HD 2900 XT",
  "Radeon HD 3450", "Radeon HD 3650", "Radeon HD 3850", "Radeon HD 3870",
  "Radeon HD 4350", "Radeon HD 4550", "Radeon HD 4650", "Radeon HD 4670", "Radeon HD 4770", "Radeon HD 4850", "Radeon HD 4870", "Radeon HD 4890",
  "Radeon HD 5450", "Radeon HD 5550", "Radeon HD 5670", "Radeon HD 5750", "Radeon HD 5770", "Radeon HD 5850", "Radeon HD 5870", "Radeon HD 5970",
  "Radeon HD 6450", "Radeon HD 6570", "Radeon HD 6670", "Radeon HD 6770", "Radeon HD 6850", "Radeon HD 6870", "Radeon HD 6950", "Radeon HD 6970", "Radeon HD 6990",
  "Radeon HD 7750", "Radeon HD 7770", "Radeon HD 7850", "Radeon HD 7870", "Radeon HD 7950", "Radeon HD 7970",
  "R7 240", "R7 250", "R7 260X", "R9 270X", "R9 280X", "R9 290", "R9 290X", "R9 295X2",
  "R9 Fury", "R9 Fury X", "R9 Nano",
  "R7 360", "R7 370", "R9 380", "R9 390", "R9 390X",
  "RX 460", "RX 470", "RX 480",
  "FireGL V8650", "FireGL V8600", "FireGL V7700", "FireGL V7600", "FireGL V5600", "FireGL V3600",
  "FireGL X3", "FireGL X2", "FireGL Z1",
  "FirePro W9100", "FirePro W8100", "FirePro W7100", "FirePro W5100", "FirePro W4100", "FirePro W2100",
  "FirePro W7000", "FirePro W5000", "FirePro V7900", "FirePro V5900", "FirePro V4900", "FirePro V3900",
  "FirePro M6100", "FirePro M5100",
  "Quadro FX 5800", "Quadro FX 4800", "Quadro FX 3800", "Quadro FX 1800", "Quadro FX 580", "Quadro FX 380",
  "Quadro FX 5600", "Quadro FX 4600", "Quadro FX 3500", "Quadro FX 3450", "Quadro FX 3400",
  "Quadro FX 5500", "Quadro FX 4500", "Quadro FX 4000", "Quadro FX 3000", "Quadro FX 2000", "Quadro FX 1000",
  "Quadro NVS 450", "Quadro NVS 295", "Quadro NVS 290",
  "Tesla K80", "Tesla K40", "Tesla K20X", "Tesla M40", "Tesla M60", "Tesla P100", "Tesla V100", "Tesla T4",
  "GeForce GTX 280", "GeForce GTX 260", "GeForce GTS 250",
  "GeForce 9800 GT", "GeForce 9600 GT",
  "GeForce 210", "GeForce 310", "GeForce 405",
];
const GPU_DB = [
  "NVIDIA GeForce RTX 5090", "NVIDIA GeForce RTX 5090D", "NVIDIA GeForce RTX 5080", "NVIDIA GeForce RTX 5080D",
  "NVIDIA GeForce RTX 5070 Ti 16GB", "NVIDIA GeForce RTX 5070 Ti",
  "NVIDIA GeForce RTX 5070", "NVIDIA GeForce RTX 5060 Ti 16GB", "NVIDIA GeForce RTX 5060 Ti 8GB", "NVIDIA GeForce RTX 5060 Ti",
  "NVIDIA GeForce RTX 5060", "NVIDIA GeForce RTX 5050",
  "NVIDIA GeForce RTX 4090", "NVIDIA GeForce RTX 4090D", "NVIDIA GeForce RTX 4080 Super", "NVIDIA GeForce RTX 4080",
  "NVIDIA GeForce RTX 4070 Ti Super", "NVIDIA GeForce RTX 4070 Ti SUPER", "NVIDIA GeForce RTX 4070 Ti",
  "NVIDIA GeForce RTX 4070 Super", "NVIDIA GeForce RTX 4070",
  "NVIDIA GeForce RTX 4060 Ti 16GB", "NVIDIA GeForce RTX 4060 Ti 8GB", "NVIDIA GeForce RTX 4060 Ti", "NVIDIA GeForce RTX 4060",
  "NVIDIA GeForce RTX 3090 Ti", "NVIDIA GeForce RTX 3090",
  "NVIDIA GeForce RTX 3080 Ti", "NVIDIA GeForce RTX 3080", "NVIDIA GeForce RTX 3080 12GB",
  "NVIDIA GeForce RTX 3070 Ti", "NVIDIA GeForce RTX 3070 Ti 16GB", "NVIDIA GeForce RTX 3070",
  "NVIDIA GeForce RTX 3060 Ti", "NVIDIA GeForce RTX 3060 Ti GDDR6X",
  "NVIDIA GeForce RTX 3060 12GB", "NVIDIA GeForce RTX 3060 8GB", "NVIDIA GeForce RTX 3060",
  "NVIDIA GeForce RTX 3050",
  "NVIDIA GeForce RTX 2080 Ti", "NVIDIA GeForce RTX 2080 SUPER", "NVIDIA GeForce RTX 2080",
  "NVIDIA GeForce RTX 2070 Super", "NVIDIA GeForce RTX 2070",
  "NVIDIA GeForce RTX 2060 Super", "NVIDIA GeForce RTX 2060 12GB", "NVIDIA GeForce RTX 2060 SUPER", "NVIDIA GeForce RTX 2060",
  "NVIDIA GeForce GTX 1660 Ti", "NVIDIA GeForce GTX 1660 Super", "NVIDIA GeForce GTX 1660",
  "NVIDIA GeForce GTX 1650 Ti", "NVIDIA GeForce GTX 1650 Super", "NVIDIA GeForce GTX 1650 GDDR6", "NVIDIA GeForce GTX 1650", "NVIDIA GeForce GTX 1630",
  "NVIDIA GeForce GTX 1080 Ti", "NVIDIA GeForce GTX 1080",
  "NVIDIA GeForce GTX 1070 Ti", "NVIDIA GeForce GTX 1070",
  "NVIDIA GeForce GTX 1060 6GB", "NVIDIA GeForce GTX 1060 3GB",
  "NVIDIA GeForce GTX 1050 Ti", "NVIDIA GeForce GTX 1050",
  "NVIDIA GeForce GT 1030 DDR5", "NVIDIA GeForce GT 1030 DDR4", "NVIDIA GeForce GT 1030", "NVIDIA GeForce GT 710",
  "NVIDIA TITAN RTX", "NVIDIA TITAN V", "NVIDIA TITAN Xp", "NVIDIA TITAN X Pascal", "NVIDIA TITAN V CEO Edition",
  "NVIDIA Quadro RTX 8000", "NVIDIA Quadro RTX 6000", "NVIDIA Quadro RTX 4000", "NVIDIA Quadro RTX 5000",
  "NVIDIA RTX 6000 Ada", "NVIDIA RTX 5000 Ada", "NVIDIA RTX 4500 Ada", "NVIDIA RTX 4000 Ada", "NVIDIA RTX 2000 Ada",
  "NVIDIA RTX A6000", "NVIDIA RTX A5500", "NVIDIA RTX A5000", "NVIDIA RTX A4500", "NVIDIA RTX A4000", "NVIDIA RTX A2000", "NVIDIA RTX A1000",
  "NVIDIA Quadro P400", "NVIDIA Quadro P600", "NVIDIA Quadro P620", "NVIDIA Quadro P1000", "NVIDIA Quadro P2000", "NVIDIA Quadro P2200",
  "NVIDIA Quadro P4000", "NVIDIA Quadro P5000", "NVIDIA Quadro P6000",
  "NVIDIA Quadro P3200 Mobile", "NVIDIA Quadro P4200 Mobile", "NVIDIA Quadro P5200 Mobile",
  "NVIDIA Quadro RTX 3000 Mobile", "NVIDIA Quadro RTX 4000 Mobile", "NVIDIA Quadro RTX 5000 Mobile", "NVIDIA Quadro RTX 6000 Mobile",
  "NVIDIA Quadro T1000 Mobile", "NVIDIA Quadro T2000 Mobile",
  "NVIDIA RTX A400", "NVIDIA RTX A500",
  "NVIDIA RTX A2000 12GB",
  "NVIDIA RTX A2000 Mobile", "NVIDIA RTX A3000 Mobile", "NVIDIA RTX A4000 Mobile", "NVIDIA RTX A4500 Mobile", "NVIDIA RTX A5000 Mobile", "NVIDIA RTX A5500 Mobile",
  "NVIDIA Quadro FX 5800", "NVIDIA Quadro FX 4800", "NVIDIA Quadro FX 3800", "NVIDIA Quadro FX 1800", "NVIDIA Quadro FX 580", "NVIDIA Quadro FX 380",
  "NVIDIA Quadro FX 5600", "NVIDIA Quadro FX 4600", "NVIDIA Quadro FX 3500", "NVIDIA Quadro FX 3450", "NVIDIA Quadro FX 3400",
  "NVIDIA Quadro FX 5500", "NVIDIA Quadro FX 4500", "NVIDIA Quadro FX 4000", "NVIDIA Quadro FX 3000", "NVIDIA Quadro FX 2000", "NVIDIA Quadro FX 1000",
  "NVIDIA Quadro NVS 450", "NVIDIA Quadro NVS 295", "NVIDIA Quadro NVS 290",
  "NVIDIA Tesla K80", "NVIDIA Tesla K40", "NVIDIA Tesla K20X", "NVIDIA Tesla M40", "NVIDIA Tesla M60", "NVIDIA Tesla P100", "NVIDIA Tesla V100", "NVIDIA Tesla T4",
  "AMD Radeon RX 9070 XT", "AMD Radeon RX 9070", "AMD Radeon RX 9060 XT", "AMD Radeon RX 9040",
  "AMD Radeon RX 7900 XTX", "AMD Radeon RX 7900 XT", "AMD Radeon RX 7900 GRE",
  "AMD Radeon RX 7800 XT", "AMD Radeon RX 7700 XT",
  "AMD Radeon RX 7600 XT", "AMD Radeon RX 7600",
  "AMD Radeon RX 6950 XT", "AMD Radeon RX 6900 XT",
  "AMD Radeon RX 6800 XT", "AMD Radeon RX 6800",
  "AMD Radeon RX 6750 XT", "AMD Radeon RX 6700 XT", "AMD Radeon RX 6700",
  "AMD Radeon RX 6650 XT", "AMD Radeon RX 6600 XT", "AMD Radeon RX 6600",
  "AMD Radeon RX 6500 XT", "AMD Radeon RX 6400",
  "AMD Radeon RX 5700 XT", "AMD Radeon RX 5600 XT", "AMD Radeon RX 5500 XT",
  "AMD Radeon RX 580", "AMD Radeon RX 570", "AMD Radeon RX 480",
  "AMD Radeon PRO W7900", "AMD Radeon PRO W7800", "AMD Radeon PRO W7600", "AMD Radeon PRO W5700",
  "Intel Arc A770 16GB", "Intel Arc A750", "Intel Arc A580", "Intel Arc A380", "Intel Arc A310",
  "Intel Arc B580", "Intel Arc B570", "Intel Arc B770", "Intel Arc B750",
  "NVIDIA GeForce GT 1030",
  "NVIDIA GeForce GTX 1050 3GB",
  "NVIDIA GeForce GTX 1060 6GB GP104", "NVIDIA GeForce GTX 1060 5GB",
  "NVIDIA GeForce GTX 1650 GDDR6",
  "NVIDIA GeForce RTX 2070", "NVIDIA GeForce RTX 2080", "NVIDIA GeForce RTX 2080 SUPER",
  "NVIDIA GeForce RTX 2060 12GB",
  "NVIDIA GeForce RTX 3060 12GB", "NVIDIA GeForce RTX 3060 8GB",
  "NVIDIA GeForce RTX 3060 Ti GDDR6X",
  "NVIDIA GeForce RTX 3050 8GB", "NVIDIA GeForce RTX 3050 6GB", "NVIDIA GeForce RTX 3050 4GB",
  "NVIDIA GeForce RTX 4060 Ti 16GB", "NVIDIA GeForce RTX 4060 Ti 8GB",
  "NVIDIA GeForce RTX 4070 GDDR6",
  "NVIDIA GeForce RTX 5060 Ti 16GB", "NVIDIA GeForce RTX 5060 Ti 8GB",
  "NVIDIA GeForce RTX 5090D", "NVIDIA GeForce RTX 4010",
  "NVIDIA GeForce GTX 1050 Mobile", "NVIDIA GeForce GTX 1050 Ti Mobile",
  "NVIDIA GeForce GTX 1050 Max-Q", "NVIDIA GeForce GTX 1050 Ti Max-Q",
  "NVIDIA GeForce GTX 1050 Mobile 3GB",
  "NVIDIA GeForce GTX 1060 Mobile", "NVIDIA GeForce GTX 1060 Max-Q",
  "NVIDIA GeForce GTX 1070 Mobile", "NVIDIA GeForce GTX 1070 Max-Q",
  "NVIDIA GeForce GTX 1080 Mobile", "NVIDIA GeForce GTX 1080 Max-Q",
  "NVIDIA GeForce GTX 1650 Mobile", "NVIDIA GeForce GTX 1650 Max-Q",
  "NVIDIA GeForce GTX 1650 Ti Mobile", "NVIDIA GeForce GTX 1650 Ti Max-Q",
  "NVIDIA GeForce GTX 1660 Ti Mobile", "NVIDIA GeForce GTX 1660 Ti Max-Q",
  "NVIDIA GeForce RTX 2050 Mobile", "NVIDIA GeForce RTX 2050 Max-Q",
  "NVIDIA GeForce RTX 2060 Mobile", "NVIDIA GeForce RTX 2060 Max-Q",
  "NVIDIA GeForce RTX 2060 SUPER Mobile",
  "NVIDIA GeForce RTX 2070 Mobile", "NVIDIA GeForce RTX 2070 Max-Q",
  "NVIDIA GeForce RTX 2070 SUPER Mobile", "NVIDIA GeForce RTX 2070 SUPER Max-Q",
  "NVIDIA GeForce RTX 2080 Mobile", "NVIDIA GeForce RTX 2080 Max-Q",
  "NVIDIA GeForce RTX 2080 SUPER Mobile", "NVIDIA GeForce RTX 2080 SUPER Max-Q",
  "NVIDIA GeForce RTX 3050 Mobile", "NVIDIA GeForce RTX 3050 Max-Q",
  "NVIDIA GeForce RTX 3050 Ti Mobile", "NVIDIA GeForce RTX 3050 Ti Max-Q",
  "NVIDIA GeForce RTX 3060 Mobile", "NVIDIA GeForce RTX 3060 Max-Q",
  "NVIDIA GeForce RTX 3070 Mobile", "NVIDIA GeForce RTX 3070 Max-Q",
  "NVIDIA GeForce RTX 3070 Ti Mobile", "NVIDIA GeForce RTX 3070 Ti Max-Q",
  "NVIDIA GeForce RTX 3080 Mobile", "NVIDIA GeForce RTX 3080 Max-Q",
  "NVIDIA GeForce RTX 3080 Ti Mobile", "NVIDIA GeForce RTX 3080 Ti Max-Q",
  "NVIDIA GeForce RTX 4050 Mobile", "NVIDIA GeForce RTX 4050 Max-Q",
  "NVIDIA GeForce RTX 4060 Mobile", "NVIDIA GeForce RTX 4060 Max-Q",
  "NVIDIA GeForce RTX 4070 Mobile", "NVIDIA GeForce RTX 4070 Max-Q",
  "NVIDIA GeForce RTX 4080 Mobile", "NVIDIA GeForce RTX 4080 Max-Q",
  "NVIDIA GeForce RTX 4090 Mobile", "NVIDIA GeForce RTX 4090 Max-Q",
  "NVIDIA GeForce RTX 5050 Mobile", "NVIDIA GeForce RTX 5060 Mobile",
  "NVIDIA GeForce RTX 5070 Mobile", "NVIDIA GeForce RTX 5070 Ti Mobile",
  "NVIDIA GeForce RTX 5080 Mobile", "NVIDIA GeForce RTX 5090 Mobile",
  "AMD Radeon RX 460", "AMD Radeon RX 470", "AMD Radeon RX 550", "AMD Radeon RX 560", "AMD Radeon RX 590",
  "AMD Radeon RX 5700",
  "AMD Radeon RX Vega 56", "AMD Radeon RX Vega 64", "AMD Radeon RX Vega 64 Liquid Cooling",
  "AMD Radeon RX 6750 GRE 10GB", "AMD Radeon RX 6750 GRE 12GB",
  "AMD Radeon RX 7700",
  "AMD Radeon RX 9060", "AMD Radeon RX 9060 XT 16GB", "AMD Radeon RX 9060 XT 8GB",
  "AMD Radeon RX 9070 GRE", "AMD Radeon RX 9070 GRE 16GB",
  "AMD Radeon RX 5500M", "AMD Radeon RX 5600M", "AMD Radeon RX 5700M",
  "AMD Radeon RX 6600M", "AMD Radeon RX 6600S", "AMD Radeon RX 6650M", "AMD Radeon RX 6650M XT",
  "AMD Radeon RX 6700M", "AMD Radeon RX 6700S",
  "AMD Radeon RX 6800M", "AMD Radeon RX 6800S", "AMD Radeon RX 6850M XT",
  "AMD Radeon RX 6450M", "AMD Radeon RX 6500M", "AMD Radeon RX 6550M", "AMD Radeon RX 6550S",
  "AMD Radeon RX 7600M", "AMD Radeon RX 7600M XT", "AMD Radeon RX 7600S", "AMD Radeon RX 7700S",
  "AMD Radeon RX 7800M", "AMD Radeon RX 7900M",
  "AMD Radeon Pro W5500", "AMD Radeon PRO W6600", "AMD Radeon PRO W6800",
  "AMD Radeon PRO W6300", "AMD Radeon PRO W6400", "AMD Radeon PRO W7500", "AMD Radeon PRO W7700",
  "AMD Radeon PRO W7800 48GB", "AMD Radeon PRO W7900D",
  "AMD Radeon Pro WX 3200", "AMD Radeon Pro WX 4100", "AMD Radeon Pro WX 5100",
  "AMD Radeon Pro WX 7100", "AMD Radeon Pro WX 8200", "AMD Radeon Pro WX 9100",
  "AMD Radeon Pro Vega 56", "AMD Radeon Pro Vega 64", "AMD Radeon Pro VII",
  "AMD Radeon PRO V620", "AMD Radeon PRO V710",
  "AMD Radeon Instinct MI25", "AMD Radeon Instinct MI50", "AMD Radeon Instinct MI60",
  "AMD Radeon Instinct MI100", "AMD Radeon Instinct MI210",
  "AMD Radeon Instinct MI250", "AMD Radeon Instinct MI250X",
  "AMD Radeon Instinct MI300", "AMD Radeon Instinct MI300X", "AMD Radeon Instinct MI325X",
  "Intel Arc A770",
  "Intel Arc Pro A40", "Intel Arc Pro A50", "Intel Arc Pro A60", "Intel Arc Pro B50", "Intel Arc Pro B60",
  "Intel Arc A350M", "Intel Arc A370M", "Intel Arc A380M",
  "Intel Arc A530M", "Intel Arc A550M", "Intel Arc A570M",
  "Intel Arc A730M", "Intel Arc A770M",
  "Intel Arc Pro A30M", "Intel Arc Pro A60M",
  "Intel Iris Xe MAX Graphics",
  "ATI Radeon X1900 XT", "ATI Radeon X1800 XT", "ATI Radeon X1650 XT", "ATI Radeon X1600 XT", "ATI Radeon X850 XT PE", "ATI Radeon X800 XT", "ATI Radeon X700 XT",
  "ATI Radeon 9800 XT", "ATI Radeon 9800 PRO", "ATI Radeon 9700 PRO", "ATI Radeon 9600 XT", "ATI Radeon 9500 PRO",
  "ATI Radeon 9200", "ATI Radeon 9000", "ATI Radeon 8500", "ATI Radeon 7500", "ATI Radeon 7200", "ATI Radeon 7000",
  "ATI Radeon DDR", "ATI Radeon SDR", "ATI Radeon LE", "ATI Radeon VE",
  "ATI Radeon X850 PRO", "ATI Radeon X800 PRO", "ATI Radeon X800 GT", "ATI Radeon X700 PRO",
  "ATI Radeon X600 XT", "ATI Radeon X600 PRO", "ATI Radeon X300",
  "ATI All-In-Wonder Radeon X1900", "ATI All-In-Wonder Radeon 9800 PRO", "ATI All-In-Wonder Radeon 9700 PRO", "ATI All-In-Wonder Radeon 8500",
  "ATI Radeon Xpress 200", "ATI Radeon Xpress 1150",
  "ATI Radeon X1300", "ATI Radeon X1050", "ATI Radeon X600", "ATI Radeon X550", "ATI Radeon X300 SE",
  "NVIDIA GeForce 7950 GX2", "NVIDIA GeForce 7900 GTX", "NVIDIA GeForce 7900 GT", "NVIDIA GeForce 7800 GTX", "NVIDIA GeForce 7800 GT",
  "NVIDIA GeForce 7600 GT", "NVIDIA GeForce 7600 GS", "NVIDIA GeForce 7300 GT",
  "NVIDIA GeForce 6800 Ultra", "NVIDIA GeForce 6800 GT", "NVIDIA GeForce 6800", "NVIDIA GeForce 6600 GT", "NVIDIA GeForce 6600",
  "NVIDIA GeForce FX 5950 Ultra", "NVIDIA GeForce FX 5900 Ultra", "NVIDIA GeForce FX 5900", "NVIDIA GeForce FX 5700 Ultra", "NVIDIA GeForce FX 5700", "NVIDIA GeForce FX 5600", "NVIDIA GeForce FX 5500", "NVIDIA GeForce FX 5200",
  "NVIDIA GeForce 4 Ti 4600", "NVIDIA GeForce 4 Ti 4400", "NVIDIA GeForce 4 Ti 4200", "NVIDIA GeForce 4 MX 440", "NVIDIA GeForce 4 MX 420",
  "NVIDIA GeForce 3 Ti 500", "NVIDIA GeForce 3 Ti 200", "NVIDIA GeForce 3",
  "NVIDIA GeForce 2 GTS", "NVIDIA GeForce 2 MX 400", "NVIDIA GeForce 2 MX 200", "NVIDIA GeForce 2 Ultra", "NVIDIA GeForce 2 Pro",
  "NVIDIA GeForce 256 DDR", "NVIDIA GeForce 256 SDR",
  "NVIDIA RIVA TNT2 Ultra", "NVIDIA RIVA TNT2", "NVIDIA RIVA TNT2 M64", "NVIDIA RIVA TNT", "NVIDIA RIVA 128",
  "NVIDIA GeForce 6150", "NVIDIA GeForce 6100",
  "NVIDIA GeForce 8400 GS", "NVIDIA GeForce 8500 GT", "NVIDIA GeForce 8600 GT", "NVIDIA GeForce 8600 GTS", "NVIDIA GeForce 8800 GTX", "NVIDIA GeForce 8800 GTS", "NVIDIA GeForce 8800 GT", "NVIDIA GeForce 8800 Ultra",
  "NVIDIA GeForce 9400 GT", "NVIDIA GeForce 9500 GT", "NVIDIA GeForce 9600 GT", "NVIDIA GeForce 9600 GSO", "NVIDIA GeForce 9800 GTX", "NVIDIA GeForce 9800 GX2",
  "NVIDIA GeForce GT 210", "NVIDIA GeForce GT 220", "NVIDIA GeForce GT 240",
  "NVIDIA GeForce GT 430", "NVIDIA GeForce GT 440", "NVIDIA GeForce GTS 450",
  "NVIDIA GeForce GTX 460", "NVIDIA GeForce GTX 470", "NVIDIA GeForce GTX 480",
  "NVIDIA GeForce GT 610", "NVIDIA GeForce GT 620", "NVIDIA GeForce GT 630",
  "NVIDIA GeForce GTX 280", "NVIDIA GeForce GTX 260", "NVIDIA GeForce GTS 250",
  "NVIDIA GeForce 9800 GT", "NVIDIA GeForce 9600 GT",
  "NVIDIA GeForce 210", "NVIDIA GeForce 310", "NVIDIA GeForce 405",
  "3dfx Voodoo5 5500", "3dfx Voodoo4 4500", "3dfx Voodoo3 3500", "3dfx Voodoo3 3000", "3dfx Voodoo3 2000",
  "3dfx Voodoo2", "3dfx Voodoo Graphics", "3dfx Voodoo Rush",
  "3dfx Velocity 200", "3dfx Velocity 100",
  "PowerVR Kyro II", "PowerVR Kyro", "PowerVR PCX2", "PowerVR PCX1",
  "Matrox Millennium G400 MAX", "Matrox Millennium G200", "Matrox Parhelia-512", "Matrox Mystique",
  "S3 Savage 2000", "S3 Savage4", "S3 Trio3D", "S3 Virge DX", "S3 Virge GX2", "S3 Virge",
  "XGI Volari V8", "XGI Volari Duo V8",
  "Intel i740",
  "Number Nine Revolution IV",
  "Rendition Verite V2200", "Rendition Verite V2100", "Rendition Verite V1000",
  "Trident Blade 3D", "Trident 3DImage 9850",
  "SIS Xabre 400", "SIS Xabre 200",
  "SIS Mirage 3", "SIS Mirage 2",
  "Intel GMA 950", "Intel GMA 900", "Intel GMA X4500", "Intel GMA X3100",
  "NVIDIA nForce 680i", "NVIDIA nForce 780i",
  "ATI Radeon HD 2400 XT", "ATI Radeon HD 2600 XT", "ATI Radeon HD 2900 XT",
  "ATI Radeon HD 3450", "ATI Radeon HD 3650", "ATI Radeon HD 3850", "ATI Radeon HD 3870",
  "ATI Radeon HD 4350", "ATI Radeon HD 4550", "ATI Radeon HD 4650", "ATI Radeon HD 4670", "ATI Radeon HD 4770", "ATI Radeon HD 4850", "ATI Radeon HD 4870", "ATI Radeon HD 4890",
  "ATI Radeon HD 5450", "ATI Radeon HD 5550", "ATI Radeon HD 5670", "ATI Radeon HD 5750", "ATI Radeon HD 5770", "ATI Radeon HD 5850", "ATI Radeon HD 5870", "ATI Radeon HD 5970",
  "ATI Radeon HD 6450", "ATI Radeon HD 6570", "ATI Radeon HD 6670", "ATI Radeon HD 6770", "ATI Radeon HD 6850", "ATI Radeon HD 6870", "ATI Radeon HD 6950", "ATI Radeon HD 6970", "ATI Radeon HD 6990",
  "AMD Radeon HD 7750", "AMD Radeon HD 7770", "AMD Radeon HD 7850", "AMD Radeon HD 7870", "AMD Radeon HD 7950", "AMD Radeon HD 7970",
  "AMD Radeon R7 240", "AMD Radeon R7 250", "AMD Radeon R7 260X", "AMD Radeon R9 270X", "AMD Radeon R9 280X", "AMD Radeon R9 290", "AMD Radeon R9 290X", "AMD Radeon R9 295X2",
  "AMD Radeon R9 Fury", "AMD Radeon R9 Fury X", "AMD Radeon R9 Nano",
  "AMD Radeon R7 360", "AMD Radeon R7 370", "AMD Radeon R9 380", "AMD Radeon R9 390", "AMD Radeon R9 390X",
  "ATI FireGL V8650", "ATI FireGL V8600", "ATI FireGL V7700", "ATI FireGL V7600", "ATI FireGL V5600", "ATI FireGL V3600",
  "ATI FireGL X3", "ATI FireGL X2", "ATI FireGL Z1",
  "AMD FirePro W9100", "AMD FirePro W8100", "AMD FirePro W7100", "AMD FirePro W5100", "AMD FirePro W4100", "AMD FirePro W2100",
  "AMD FirePro W7000", "AMD FirePro W5000", "AMD FirePro V7900", "AMD FirePro V5900", "AMD FirePro V4900", "AMD FirePro V3900",
  "AMD FirePro M6100", "AMD FirePro M5100",
  ...GPU_SHORT,
];
const RAM_DB = [
  "Corsair Vengeance DDR5 32GB 5600MHz", "Corsair Vengeance DDR5 32GB 6000MHz",
  "Corsair Vengeance DDR5 64GB 6000MHz", "Corsair Vengeance DDR5 16GB 5200MHz",
  "Corsair Vengeance DDR5 48GB 6400MHz", "Corsair Vengeance DDR5 96GB 6400MHz",
  "Corsair Vengeance DDR4 32GB 3200MHz", "Corsair Vengeance DDR4 16GB 3200MHz",
  "Corsair Vengeance DDR4 64GB 3200MHz",
  "Corsair Dominator Platinum DDR5 32GB 6000MHz",
  "Corsair Dominator Platinum DDR5 64GB 6400MHz",
  "Corsair Dominator Titanium DDR5 32GB 7200MHz",
  "Corsair Dominator Titanium DDR5 48GB 8000MHz",
  "G.Skill Trident Z5 DDR5 32GB 6000MHz", "G.Skill Trident Z5 DDR5 64GB 6000MHz",
  "G.Skill Trident Z5 DDR5 32GB 7200MHz", "G.Skill Trident Z5 DDR5 48GB 8000MHz",
  "G.Skill Trident Z5 Neo DDR5 32GB 6000MHz",
  "G.Skill Trident Z5 Royal DDR5 32GB 8000MHz",
  "G.Skill Trident Z RGB DDR4 32GB 3200MHz",
  "G.Skill Ripjaws V DDR4 32GB 3200MHz", "G.Skill Ripjaws V DDR4 16GB 3200MHz",
  "G.Skill Ripjaws S5 DDR5 32GB 6000MHz",
  "G.Skill Flare X5 DDR5 32GB 6000MHz", "G.Skill Flare X5 DDR5 64GB 6000MHz",
  "Kingston Fury Beast DDR5 32GB 5600MHz", "Kingston Fury Beast DDR5 32GB 6000MHz",
  "Kingston Fury Beast DDR5 64GB 5600MHz",
  "Kingston Fury Beast DDR4 32GB 3200MHz",
  "Kingston Fury Renegade DDR4 32GB 3600MHz",
  "Kingston Fury Renegade DDR5 32GB 7200MHz",
  "Kingston FURY Impact DDR5 32GB 5600MHz",
  "TeamGroup T-Force Delta DDR5 32GB 6000MHz",
  "TeamGroup T-Force Delta DDR5 64GB 6000MHz",
  "TeamGroup T-Force Delta DDR5 32GB 7200MHz",
  "TeamGroup T-Force Vulcan DDR5 32GB 5600MHz",
  "TeamGroup T-Force Vulcan DDR4 32GB 3200MHz",
  "TeamGroup T-Force Xtreem DDR5 32GB 8000MHz",
  "Crucial Pro DDR5 32GB 5600MHz", "Crucial Pro DDR5 64GB 5600MHz",
  "Crucial Pro DDR5 96GB 5600MHz",
  "Crucial Pro DDR5 32GB 6000MHz",
  "Crucial Ballistix DDR4 32GB 3200MHz",
  "Crucial Ballistix DDR5 32GB 6000MHz",
  "ADATA XPG Lancer DDR5 32GB 6000MHz", "ADATA XPG Lancer DDR5 64GB 6000MHz",
  "ADATA XPG Lancer Blade DDR5 32GB 6000MHz",
  "ADATA XPG Spectrix D50 DDR4 32GB 3200MHz",
  "ADATA XPG Spectrix D35G DDR4 32GB 3600MHz",
  "Patriot Viper Elite DDR5 32GB 6000MHz",
  "Patriot Viper Elite DDR5 64GB 5600MHz",
  "Patriot Viper Steel DDR4 32GB 3200MHz",
  "Patriot Viper Venom DDR5 32GB 6000MHz",
  "Patriot Viper Xtreme DDR5 32GB 7200MHz",
  "Lexar THOR DDR5 32GB 6000MHz", "Lexar ARES DDR5 32GB 6400MHz",
  "Mushkin Redline DDR5 32GB 6000MHz",
  "Corsair Vengeance DDR5 32GB 6400MHz", "Corsair Vengeance DDR5 64GB 6400MHz",
  "Corsair Vengeance DDR5 96GB 6400MHz",
  "Corsair Dominator Titanium DDR5 64GB 8000MHz",
  "G.Skill Trident Z5 Royal Neo DDR5 32GB 6000MHz",
  "G.Skill Trident Z5 Royal Neo DDR5 64GB 6000MHz",
  "G.Skill Trident Z5 Royal Neo DDR5 96GB 6400MHz",
  "G.Skill Ripjaws M5 RGB DDR5 32GB 6000MHz",
  "Kingston Fury Beast DDR5 48GB 6000MHz", "Kingston Fury Beast DDR5 96GB 6800MHz",
  "Kingston Fury Renegade DDR5 48GB 7200MHz",
  "TeamGroup T-Force Delta RGB DDR5 32GB 6800MHz",
  "TeamGroup T-Force Delta RGB DDR5 64GB 6800MHz",
  "TeamGroup T-Force Xtreem DDR5 48GB 8200MHz",
  "Crucial Pro DDR5 64GB 6000MHz", "Crucial Pro DDR5 96GB 5600MHz",
  "Crucial Pro DDR5 128GB 5600MHz",
  "ADATA XPG Lancer Blade DDR5 32GB 6400MHz", "ADATA XPG Lancer Blade DDR5 64GB 6400MHz",
  "Patriot Viper Xtreme 5 DDR5 32GB 7600MHz",
  "Patriot Viper Xtreme 5 DDR5 48GB 8000MHz",
  "Lexar THOR DDR5 64GB 6000MHz", "Lexar ARES DDR5 32GB 6400MHz",
  "Lexar Ares RGB DDR5 32GB 6000MHz",
  "Silicon Power XPOWER Zenith DDR5 32GB 6000MHz",
  "Silicon Power XPOWER Turbine DDR5 32GB 6000MHz",
  "OLOy Blade DDR5 32GB 6000MHz",
  "OLOy WarHawk DDR5 32GB 6000MHz",
  "V-Color Manta XFinity DDR5 32GB 6000MHz",
  "T-Create Expert DDR5 32GB 6000MHz",
  "T-Create Classic DDR5 32GB 6000MHz",
  "Netac Shadow DDR5 32GB 6000MHz",
  "GeIL Orion V DDR5 32GB 6000MHz",
];

const MOTHERBOARD_DB = [
  "ASUS ROG Crosshair X670E Hero", "ASUS ROG Crosshair X870E Hero",
  "ASUS ROG Crosshair X670E Extreme", "ASUS ROG Crosshair X670E Gene",
  "ASUS ROG Strix Z790-E Gaming", "ASUS ROG Strix B650-A Gaming",
  "ASUS ROG Strix B760-F Gaming", "ASUS ROG Strix Z690-A Gaming",
  "ASUS ROG Strix X670E-E Gaming", "ASUS ROG Strix X870E-E Gaming",
  "ASUS ROG Strix Z890-F Gaming",
  "ASUS TUF Gaming Z790-Plus", "ASUS TUF Gaming B760-Plus",
  "ASUS TUF Gaming B650-Plus", "ASUS TUF Gaming X670E-Plus",
  "ASUS TUF Gaming Z890-Plus",
  "ASUS Prime Z790-P", "ASUS Prime B760-PLUS", "ASUS Prime B650-PLUS",
  "ASUS Prime Z890-P", "ASUS Prime B860-PLUS",
  "ASUS ProArt Z790 Creator", "ASUS ProArt B650 Creator",
  "ASUS ProArt X670E Creator", "ASUS ProArt Z890 Creator",
  "MSI MPG Z790 Carbon WiFi", "MSI MPG B650 Carbon WiFi",
  "MSI MPG Z690 Edge WiFi", "MSI MPG Z890 Carbon WiFi",
  "MSI MPG X670E Carbon WiFi",
  "MSI MAG Z790 Tomahawk WiFi", "MSI MAG Z890 Tomahawk WiFi",
  "MSI MAG B650 Tomahawk WiFi", "MSI MAG B760 Tomahawk WiFi",
  "MSI Pro Z790-P", "MSI Pro B760-P", "MSI Pro B650-P",
  "MSI PRO B650M-A WiFi",
  "MSI MEG Z790 Godlike", "MSI MEG X670E Godlike",
  "MSI MEG Z890 Ace",
  "Gigabyte Z790 Aorus Master", "Gigabyte Z790 Aorus Elite AX",
  "Gigabyte B650 Aorus Pro AX", "Gigabyte B760 Aorus Elite AX",
  "Gigabyte X670E Aorus Master", "Gigabyte X870E Aorus Master",
  "Gigabyte Z890 Aorus Master", "Gigabyte Z890 Aorus Elite AX",
  "Gigabyte Z690 Aorus Elite AX",
  "Gigabyte B650E Aorus Stealth ICE",
  "Gigabyte B860 Aorus Elite AX",
  "ASRock Z790 Taichi", "ASRock X670E Taichi", "ASRock B650E Taichi",
  "ASRock Z890 Taichi", "ASRock X870E Taichi",
  "ASRock B650 Pro RS", "ASRock Z790 Pro RS", "ASRock B760 Pro RS",
  "ASRock Z890 Pro RS",
  "ASRock B650M-HDV/M.2",
  "ASRock B660M Pro RS",
  "ASRock X670E Steel Legend", "ASRock B650E Steel Legend",
  "ASRock X870E Nova WiFi",
  "NZXT N7 Z790", "NZXT N7 B650E",
  "NZXT N7 Z890",
  "ASUS ROG Maximus Z890 Hero", "ASUS ROG Maximus Z890 Extreme", "ASUS ROG Maximus Z890 Apex",
  "ASUS ROG Strix Z890-A Gaming", "ASUS ROG Strix Z890-I Gaming",
  "ASUS TUF Gaming Z890-Plus WiFi", "ASUS TUF Gaming B860-Plus WiFi",
  "ASUS Prime Z890-P WiFi", "ASUS Prime B860-PLUS", "ASUS Prime H810-PLUS",
  "ASUS ProArt Z890 Creator WiFi",
  "ASUS ROG Crosshair X870E Hero", "ASUS ROG Crosshair X870E Extreme",
  "ASUS ROG Strix X870E-E Gaming", "ASUS ROG Strix X870E-A Gaming", "ASUS ROG Strix X870-I Gaming",
  "ASUS TUF Gaming X870E-Plus WiFi", "ASUS TUF Gaming B850-Plus WiFi",
  "ASUS Prime X870-P", "ASUS Prime B850-PLUS", "ASUS Prime B840-PLUS",
  "ASUS ROG Maximus Z790 Hero", "ASUS ROG Maximus Z790 Extreme", "ASUS ROG Maximus Z790 Apex",
  "ASUS ROG Strix Z790-A Gaming", "ASUS ROG Strix Z790-I Gaming", "ASUS ROG Strix Z790-H Gaming",
  "ASUS ROG Strix B760-A Gaming", "ASUS ROG Strix B760-I Gaming",
  "ASUS TUF Gaming Z790-Pro WiFi", "ASUS TUF Gaming B760M-Plus WiFi",
  "ASUS Prime Z790-A WiFi", "ASUS Prime Z790M-Plus", "ASUS Prime B760M-A",
  "ASUS ROG Crosshair X670E Hero", "ASUS ROG Crosshair X670E Gene",
  "ASUS ROG Strix X670E-F Gaming", "ASUS ROG Strix X670E-I Gaming",
  "ASUS ROG Strix B650E-E Gaming", "ASUS ROG Strix B650E-I Gaming",
  "ASUS TUF Gaming B650M-Plus WiFi", "ASUS TUF Gaming A620M-Plus WiFi",
  "ASUS Prime X670E-Pro WiFi", "ASUS Prime B650M-A WiFi",
  "ASUS ROG Strix B650-A Gaming WiFi", "ASUS ROG Strix B650E-F Gaming WiFi",
  "ASUS TUF Gaming B650-Plus WiFi", "ASUS TUF Gaming B650M-Plus WiFi", "ASUS TUF Gaming B650M-E WiFi",
  "ASUS Prime B650-Plus", "ASUS Prime B650M-A WiFi", "ASUS Prime B650M-A", "ASUS Prime B650M-K",
  "ASUS ProArt B650-Creator",
  "ASUS TUF Gaming A620M-Plus WiFi", "ASUS TUF Gaming A620M-Plus",
  "ASUS Prime A620M-A", "ASUS Prime A620M-K", "ASUS Prime A620M-E",
  "ASUS ROG Crosshair X670E Hero", "ASUS ROG Crosshair X670E Extreme", "ASUS ROG Crosshair X670E Gene",
  "ASUS ROG Strix X670E-E Gaming WiFi", "ASUS ROG Strix X670E-F Gaming WiFi", "ASUS ROG Strix X670E-A Gaming WiFi",
  "ASUS ROG Strix X670E-I Gaming WiFi",
  "ASUS TUF Gaming X670E-Plus WiFi", "ASUS TUF Gaming X670E-Plus",
  "ASUS Prime X670E-Pro WiFi", "ASUS Prime X670-P WiFi", "ASUS Prime X670-P",
  "ASUS ProArt X670E-Creator WiFi",
  "ASUS Prime B840-PLUS", "ASUS Prime B840M-A",
  "ASUS ROG Maximus XIII Hero", "ASUS ROG Maximus XIII Extreme",
  "ASUS ROG Strix Z590-E Gaming", "ASUS ROG Strix Z590-A Gaming", "ASUS ROG Strix Z590-I Gaming",
  "ASUS TUF Gaming Z590-Plus WiFi", "ASUS TUF Gaming B560-Plus WiFi", "ASUS TUF Gaming H570-Pro",
  "ASUS Prime Z590-A", "ASUS Prime Z590-P", "ASUS Prime B560-Plus", "ASUS Prime H510M-E",
  "ASUS ROG Maximus XII Hero", "ASUS ROG Maximus XII Extreme",
  "ASUS ROG Strix Z490-E Gaming", "ASUS ROG Strix Z490-A Gaming", "ASUS ROG Strix Z490-I Gaming",
  "ASUS TUF Gaming Z490-Plus WiFi", "ASUS TUF Gaming B460-Plus",
  "ASUS Prime Z490-A", "ASUS Prime Z490-P", "ASUS Prime B460-Plus", "ASUS Prime H410M-E",
  "ASUS ROG Crosshair VIII Hero", "ASUS ROG Crosshair VIII Dark Hero", "ASUS ROG Crosshair VIII Extreme",
  "ASUS ROG Crosshair VII Hero", "ASUS ROG Crosshair VI Hero",
  "ASUS ROG Strix X570-E Gaming", "ASUS ROG Strix X570-F Gaming", "ASUS ROG Strix X570-I Gaming",
  "ASUS ROG Strix B550-E Gaming", "ASUS ROG Strix B550-F Gaming", "ASUS ROG Strix B550-A Gaming", "ASUS ROG Strix B550-I Gaming",
  "ASUS ROG Strix B450-F Gaming", "ASUS ROG Strix B450-I Gaming",
  "ASUS TUF Gaming X570-Plus WiFi", "ASUS TUF Gaming B550-Plus", "ASUS TUF Gaming B550M-Plus WiFi",
  "ASUS TUF Gaming B450-Plus", "ASUS TUF Gaming B450M-Plus",
  "ASUS Prime X570-Pro", "ASUS Prime X570-P",
  "ASUS Prime B550-Plus", "ASUS Prime B550M-A WiFi",
  "ASUS Prime B450-Plus", "ASUS Prime B450M-A",
  "ASUS Prime A320M-K",
  "ASUS ROG Maximus XI Hero", "ASUS ROG Maximus XI Extreme", "ASUS ROG Maximus XI Gene",
  "ASUS ROG Strix Z390-E Gaming", "ASUS ROG Strix Z390-F Gaming", "ASUS ROG Strix Z390-I Gaming",
  "ASUS ROG Strix Z370-E Gaming", "ASUS ROG Strix Z370-F Gaming", "ASUS ROG Strix Z370-I Gaming",
  "ASUS TUF Z390-Plus Gaming", "ASUS TUF Z370-Plus Gaming",
  "ASUS Prime Z390-A", "ASUS Prime Z390-P", "ASUS Prime Z370-A", "ASUS Prime Z370-P",
  "ASUS ROG Strix B360-F Gaming", "ASUS ROG Strix B360-I Gaming",
  "ASUS TUF B360-Plus Gaming", "ASUS TUF H370-Pro Gaming",
  "ASUS Prime B360-Plus", "ASUS Prime H370-Plus", "ASUS Prime H310-Plus",
  "ASUS ROG Maximus IX Hero", "ASUS ROG Maximus IX Extreme", "ASUS ROG Maximus IX Formula",
  "ASUS ROG Strix Z270-E Gaming", "ASUS ROG Strix Z270-F Gaming", "ASUS ROG Strix Z270-I Gaming",
  "ASUS TUF Z270 Mark 1", "ASUS TUF Z270 Mark 2",
  "ASUS Prime Z270-A", "ASUS Prime Z270-P",
  "ASUS ROG Strix B250-F Gaming", "ASUS Prime B250-Plus",
  "ASUS ROG Maximus VIII Hero", "ASUS ROG Maximus VIII Extreme", "ASUS ROG Maximus VIII Formula",
  "ASUS ROG Maximus VIII Ranger", "ASUS ROG Maximus VIII Gene",
  "ASUS Z170-A", "ASUS Z170-PRO", "ASUS Z170-P",
  "ASUS ROG Strix Z170-E Gaming",
  "ASUS B150-PRO", "ASUS H170-PRO",
  "ASUS ROG Maximus VII Hero", "ASUS ROG Maximus VII Extreme", "ASUS ROG Maximus VII Formula",
  "ASUS ROG Maximus VII Ranger", "ASUS ROG Maximus VII Gene",
  "ASUS Z97-A", "ASUS Z97-PRO", "ASUS Z97-P",
  "ASUS B85-PRO GAMER", "ASUS H97-PRO",
  "ASUS ROG Maximus VI Hero", "ASUS ROG Maximus VI Extreme", "ASUS ROG Maximus VI Formula",
  "ASUS ROG Maximus VI Gene",
  "ASUS Z87-A", "ASUS Z87-PRO", "ASUS Z87-PLUS",
  "ASUS B85-PLUS", "ASUS H87-PLUS",
  "ASUS ROG Maximus V Extreme", "ASUS ROG Maximus V Formula", "ASUS ROG Maximus V Gene",
  "ASUS P8Z77-V", "ASUS P8Z77-V PRO", "ASUS P8Z77-V DELUXE", "ASUS P8Z77-V LX",
  "ASUS P8Z68-V", "ASUS P8Z68-V PRO", "ASUS P8Z68-V GEN3",
  "ASUS P8B75-V", "ASUS P8H77-V",
  "ASUS Rampage III Extreme", "ASUS Rampage III Formula", "ASUS Rampage III Gene",
  "ASUS P6X58D Premium", "ASUS P6X58D-E", "ASUS P6T", "ASUS P6T Deluxe",
  "ASUS Rampage Extreme", "ASUS Rampage Formula",
  "ASUS P5Q Deluxe", "ASUS P5Q Pro", "ASUS P5Q-E",
  "ASUS P5K Deluxe", "ASUS P5K Premium", "ASUS P5K-E",
  "ASUS P5E", "ASUS P5E Deluxe", "ASUS P5E3 Premium",
  "MSI MEG Z890 Godlike", "MSI MEG Z890 Ace", "MSI MEG Z890 Unify-X",
  "MSI MPG Z890 Carbon WiFi", "MSI MPG Z890 Edge Ti WiFi",
  "MSI MAG Z890 Tomahawk WiFi", "MSI MAG B860 Tomahawk WiFi",
  "MSI PRO Z890-A WiFi", "MSI PRO Z890-P WiFi", "MSI PRO B860-P WiFi",
  "MSI MEG X870E Godlike", "MSI MPG X870E Carbon WiFi",
  "MSI MAG X870E Tomahawk WiFi", "MSI MAG B850 Tomahawk WiFi",
  "MSI PRO X870-P WiFi", "MSI PRO B850-P WiFi",
  "MSI MEG Z790 Godlike", "MSI MEG Z790 Ace",
  "MSI MPG Z790 Carbon WiFi", "MSI MPG Z790 Edge WiFi",
  "MSI MAG Z790 Tomahawk WiFi", "MSI MAG Z790 Tomahawk Max WiFi",
  "MSI MAG B760 Tomahawk WiFi", "MSI MAG B760M Mortar WiFi",
  "MSI PRO Z790-A WiFi", "MSI PRO Z790-P WiFi",
  "MSI PRO B760-P WiFi", "MSI PRO B760M-A WiFi",
  "MSI MEG X670E Godlike", "MSI MEG X670E Ace",
  "MSI MPG X670E Carbon WiFi", "MSI MPG B650 Carbon WiFi",
  "MSI MAG X670E Tomahawk WiFi", "MSI MAG B650 Tomahawk WiFi", "MSI MAG B650M Mortar WiFi",
  "MSI PRO X670-P WiFi", "MSI PRO B650-P WiFi", "MSI PRO B650M-A WiFi",
  "MSI MPG B650 Carbon WiFi", "MSI MPG B650 Edge WiFi",
  "MSI MAG B650 Tomahawk WiFi", "MSI MAG B650M Mortar WiFi", "MSI MAG B650M Bazooka",
  "MSI PRO B650-P WiFi", "MSI PRO B650M-A WiFi", "MSI PRO B650M-P", "MSI PRO B650M-B",
  "MSI PRO A620M-E", "MSI PRO A620M-C",
  "MSI PRO B840-P WiFi", "MSI PRO B840M-A WiFi",
  "MSI MEG Z590 Godlike", "MSI MEG Z590 Ace",
  "MSI MPG Z590 Gaming Carbon WiFi", "MSI MPG Z590 Gaming Edge WiFi",
  "MSI MAG Z590 Tomahawk WiFi", "MSI MAG B560 Tomahawk WiFi",
  "MSI PRO Z590-A", "MSI PRO B560-A",
  "MSI MEG Z490 Godlike", "MSI MEG Z490 Ace",
  "MSI MPG Z490 Gaming Carbon WiFi", "MSI MPG Z490 Gaming Edge WiFi",
  "MSI MAG Z490 Tomahawk", "MSI MAG B460 Tomahawk",
  "MSI PRO Z490-A", "MSI PRO B460-A",
  "MSI MEG X570 Godlike", "MSI MEG X570 Ace",
  "MSI MPG X570 Gaming Pro Carbon WiFi", "MSI MPG X570 Gaming Edge WiFi",
  "MSI MAG X570 Tomahawk WiFi", "MSI MAG B550 Tomahawk", "MSI MAG B550M Mortar",
  "MSI MPG B550 Gaming Carbon WiFi", "MSI MPG B550 Gaming Edge WiFi",
  "MSI PRO X570-A", "MSI PRO B550-A",
  "MSI B450 Tomahawk", "MSI B450 Tomahawk Max", "MSI B450M Mortar", "MSI B450M Mortar Max",
  "MSI B450 Gaming Plus", "MSI B450-A Pro",
  "MSI X470 Gaming Pro Carbon", "MSI X470 Gaming Plus",
  "MSI MEG Z390 Godlike", "MSI MEG Z390 Ace",
  "MSI MPG Z390 Gaming Pro Carbon", "MSI MPG Z390 Gaming Edge",
  "MSI MAG Z390 Tomahawk", "MSI MAG B360 Tomahawk",
  "MSI PRO Z390-A", "MSI PRO B360-A",
  "MSI Z270 Gaming M7", "MSI Z270 Gaming Pro Carbon",
  "MSI Z170A Gaming M7", "MSI Z170A Gaming M5", "MSI Z170A Gaming Pro Carbon",
  "MSI Z97 Gaming 5", "MSI Z97 Gaming 3", "MSI Z97 PC Mate",
  "MSI Z87-GD65 Gaming", "MSI Z87-G45 Gaming",
  "MSI Z77A-GD65", "MSI Z77A-GD55", "MSI Z77A-G45",
  "MSI P67A-GD65", "MSI P67A-GD55",
  "MSI X58A-GD65", "MSI X58 Pro-E",
  "MSI P45 Platinum", "MSI P45 Neo3", "MSI P35 Neo2",
  "MSI 990FXA-GD80", "MSI 990FXA-GD65",
  "MSI 890FXA-GD70", "MSI 890FXA-GD65",
  "MSI K9A2 Platinum", "MSI K9N SLI Platinum",
  "MSI K8N Neo4 Platinum", "MSI K8N Diamond",
  "MSI K8N Neo2 Platinum",
  "MSI K7N2 Delta-ILSR", "MSI K7N2 Delta2",
  "Gigabyte Z890 Aorus Xtreme", "Gigabyte Z890 Aorus Master", "Gigabyte Z890 Aorus Elite X",
  "Gigabyte Z890 Aorus Pro", "Gigabyte Z890 Aorus Elite AX",
  "Gigabyte B860 Aorus Elite AX", "Gigabyte B860M Aorus Elite",
  "Gigabyte X870E Aorus Xtreme", "Gigabyte X870E Aorus Master", "Gigabyte X870E Aorus Elite X",
  "Gigabyte B850 Aorus Elite AX", "Gigabyte B850M Aorus Elite",
  "Gigabyte Z790 Aorus Xtreme", "Gigabyte Z790 Aorus Master", "Gigabyte Z790 Aorus Elite X",
  "Gigabyte Z790 Aorus Pro X", "Gigabyte Z790 Aorus Elite AX",
  "Gigabyte B760 Aorus Master", "Gigabyte B760 Aorus Elite X", "Gigabyte B760M Aorus Elite",
  "Gigabyte Z690 Aorus Xtreme", "Gigabyte Z690 Aorus Master", "Gigabyte Z690 Aorus Elite",
  "Gigabyte Z690 Aorus Pro", "Gigabyte Z690 Gaming X",
  "Gigabyte X670E Aorus Xtreme", "Gigabyte X670E Aorus Master", "Gigabyte X670E Aorus Elite AX",
  "Gigabyte B650E Aorus Master", "Gigabyte B650 Aorus Elite AX V2",
  "Gigabyte B650M Aorus Elite", "Gigabyte B650 Gaming X AX",
  "Gigabyte A620M Gaming X", "Gigabyte A620I AX",
  "Gigabyte X670 Aorus Elite AX", "Gigabyte X670 Gaming X AX",
  "Gigabyte X670E Aorus Pro X",
  "Gigabyte B650 Aorus Elite AX", "Gigabyte B650 Aorus Elite", "Gigabyte B650 Aorus Pro AX",
  "Gigabyte B650E Aorus Master", "Gigabyte B650E Aorus Elite AX", "Gigabyte B650E Aorus Stealth ICE",
  "Gigabyte B650M Aorus Elite AX", "Gigabyte B650M Aorus Elite", "Gigabyte B650M DS3H",
  "Gigabyte B650 Gaming X AX", "Gigabyte B650 Gaming X",
  "Gigabyte A620M Gaming X", "Gigabyte A620M Gaming X AX", "Gigabyte A620M DS3H", "Gigabyte A620M H",
  "Gigabyte A620I AX",
  "Gigabyte B840 Aorus Elite AX", "Gigabyte B840M Aorus Elite",
  "Gigabyte Z590 Aorus Xtreme", "Gigabyte Z590 Aorus Master", "Gigabyte Z590 Aorus Elite",
  "Gigabyte Z590 Aorus Pro AX", "Gigabyte Z590 Vision G",
  "Gigabyte B560 Aorus Pro AX", "Gigabyte B560M Aorus Elite",
  "Gigabyte H510M H",
  "Gigabyte Z490 Aorus Xtreme", "Gigabyte Z490 Aorus Master", "Gigabyte Z490 Aorus Elite",
  "Gigabyte Z490 Vision G", "Gigabyte B460 Aorus Pro",
  "Gigabyte X570 Aorus Xtreme", "Gigabyte X570 Aorus Master", "Gigabyte X570 Aorus Elite",
  "Gigabyte X570 Aorus Pro", "Gigabyte X570 Gaming X",
  "Gigabyte B550 Aorus Master", "Gigabyte B550 Aorus Pro", "Gigabyte B550 Aorus Elite",
  "Gigabyte B550 Gaming X", "Gigabyte B550M Aorus Elite", "Gigabyte B550M DS3H",
  "Gigabyte B450 Aorus Elite", "Gigabyte B450 Aorus Pro", "Gigabyte B450 Gaming X",
  "Gigabyte B450M DS3H", "Gigabyte A520M DS3H",
  "Gigabyte X470 Aorus Gaming 7", "Gigabyte X470 Aorus Ultra Gaming",
  "Gigabyte X370 Aorus Gaming K7", "Gigabyte X370 Gaming 5",
  "Gigabyte Z390 Aorus Xtreme", "Gigabyte Z390 Aorus Master", "Gigabyte Z390 Aorus Elite",
  "Gigabyte Z390 Aorus Pro", "Gigabyte Z390 Gaming X",
  "Gigabyte Z370 Aorus Gaming 7", "Gigabyte Z370 Aorus Gaming 5",
  "Gigabyte B360 Aorus Gaming 3", "Gigabyte H370 Aorus Gaming 3",
  "Gigabyte Z270X-Gaming 7", "Gigabyte Z270X-Gaming 5",
  "Gigabyte Z170X-Gaming 7", "Gigabyte Z170X-Gaming 5", "Gigabyte Z170X-Gaming G1",
  "Gigabyte Z97X-Gaming G1", "Gigabyte Z97X-Gaming 7", "Gigabyte Z97X-Gaming 5",
  "Gigabyte Z87X-UD5H", "Gigabyte Z87X-UD3H",
  "Gigabyte Z77X-UP7", "Gigabyte Z77X-UD5H", "Gigabyte Z77X-D3H",
  "Gigabyte P67A-UD7", "Gigabyte P67A-UD5",
  "Gigabyte X58A-UD7", "Gigabyte X58A-UD5", "Gigabyte X58A-UD3R",
  "Gigabyte EP45-UD3P", "Gigabyte EP45-DS3R", "Gigabyte EP35-DS3R",
  "Gigabyte GA-990FXA-UD7", "Gigabyte GA-990FXA-UD5", "Gigabyte GA-990FXA-UD3",
  "Gigabyte GA-990XA-UD3", "Gigabyte GA-970A-UD3",
  "Gigabyte GA-890FXA-UD7", "Gigabyte GA-890FXA-UD5",
  "Gigabyte GA-MA790FX-DQ6", "Gigabyte GA-MA790XT-UD4P",
  "Gigabyte GA-K8NXP-SLI", "Gigabyte GA-K8N Ultra-9",
  "Gigabyte GA-K8NSNXP-939",
  "Gigabyte GA-7N400 Pro2", "Gigabyte GA-7NNXP",
  "ASRock Z890 Taichi", "ASRock Z890 Taichi OCF", "ASRock Z890 Nova WiFi",
  "ASRock Z890 Steel Legend WiFi", "ASRock Z890 Pro RS",
  "ASRock B860 Steel Legend WiFi", "ASRock B860 Pro RS",
  "ASRock X870E Taichi", "ASRock X870E Taichi Lite", "ASRock X870E Nova WiFi",
  "ASRock X870 Steel Legend WiFi", "ASRock X870 Pro RS WiFi",
  "ASRock B850 Steel Legend WiFi", "ASRock B850 Pro RS",
  "ASRock Z790 Taichi", "ASRock Z790 Taichi Carrara",
  "ASRock Z790 Steel Legend WiFi", "ASRock Z790 Pro RS",
  "ASRock B760 Steel Legend WiFi", "ASRock B760 Pro RS",
  "ASRock Z690 Taichi", "ASRock Z690 Steel Legend",
  "ASRock X670E Taichi", "ASRock X670E Taichi Carrara",
  "ASRock X670E Steel Legend", "ASRock X670E Pro RS",
  "ASRock B650E Taichi", "ASRock B650 Steel Legend WiFi", "ASRock B650 Pro RS",
  "ASRock B650M Pro RS", "ASRock B650M-HDV/M.2",
  "ASRock A620M Pro RS", "ASRock A620I Lightning WiFi",
  "ASRock X670E Taichi", "ASRock X670E Taichi Carrara",
  "ASRock X670E Steel Legend", "ASRock X670E Pro RS", "ASRock X670E PG Lightning",
  "ASRock X670E PG-ITX WiFi",
  "ASRock B650E Taichi", "ASRock B650E Taichi Lite", "ASRock B650E Steel Legend WiFi",
  "ASRock B650 Steel Legend WiFi", "ASRock B650 Pro RS", "ASRock B650M Pro RS WiFi",
  "ASRock B650M Pro RS", "ASRock B650M-HDV/M.2", "ASRock B650M PG Riptide",
  "ASRock B650I Lightning WiFi", "ASRock B650E PG-ITX WiFi",
  "ASRock A620M Pro RS WiFi", "ASRock A620M Pro RS", "ASRock A620M-HDV/M.2", "ASRock A620M-HDV/M.2+",
  "ASRock A620I Lightning WiFi",
  "ASRock B840 Steel Legend WiFi", "ASRock B840 Pro RS",
  "ASRock Z590 Taichi", "ASRock Z590 Steel Legend", "ASRock Z590 Pro4",
  "ASRock B560 Steel Legend", "ASRock B560 Pro4",
  "ASRock H570 Steel Legend", "ASRock H510M-HDV",
  "ASRock Z490 Taichi", "ASRock Z490 Steel Legend", "ASRock Z490 Pro4",
  "ASRock B460 Steel Legend", "ASRock B460 Pro4",
  "ASRock X570 Taichi", "ASRock X570 Phantom Gaming X", "ASRock X570 Steel Legend",
  "ASRock X570 Pro4", "ASRock X570 Phantom Gaming 4",
  "ASRock B550 Taichi", "ASRock B550 Steel Legend", "ASRock B550 Pro4",
  "ASRock B550 Phantom Gaming 4", "ASRock B550M Steel Legend", "ASRock B550M Pro4",
  "ASRock B450 Steel Legend", "ASRock B450 Pro4", "ASRock B450M Steel Legend", "ASRock B450M Pro4",
  "ASRock X470 Taichi", "ASRock X470 Master SLI",
  "ASRock X370 Taichi", "ASRock X370 Killer SLI",
  "ASRock A320M Pro4", "ASRock A320M-HDV",
  "ASRock Z390 Taichi", "ASRock Z390 Phantom Gaming 9", "ASRock Z390 Steel Legend",
  "ASRock Z390 Pro4", "ASRock Z390 Phantom Gaming 4",
  "ASRock Z370 Taichi", "ASRock Z370 Killer SLI",
  "ASRock B360 Pro4", "ASRock H370 Pro4",
  "ASRock Z270 Taichi", "ASRock Z270 Killer SLI",
  "ASRock Z170 Extreme7+", "ASRock Z170 Extreme4",
  "ASRock Z97 Extreme6", "ASRock Z97 Extreme4", "ASRock Z97 Killer",
  "ASRock Z87 Extreme6", "ASRock Z87 Extreme4",
  "ASRock Z77 Extreme6", "ASRock Z77 Extreme4", "ASRock Z77 Pro4",
  "ASRock P67 Extreme6", "ASRock P67 Extreme4",
  "ASRock X58 Extreme6", "ASRock X58 Extreme3", "ASRock X58 Deluxe",
  "ASRock P45XE", "ASRock P45DE", "ASRock P43DE",
  "ASRock 990FX Extreme9", "ASRock 990FX Extreme4", "ASRock 970 Extreme4",
  "EVGA Z790 Dark", "EVGA Z790 Classified", "EVGA Z790 FTW",
  "EVGA Z690 Dark", "EVGA Z690 Classified",
  "EVGA Z590 Dark", "EVGA Z590 FTW",
  "EVGA Z490 Dark", "EVGA Z490 FTW",
  "EVGA Z390 Dark", "EVGA Z390 FTW",
  "EVGA Z370 Classified", "EVGA Z370 FTW",
  "EVGA X299 Dark", "EVGA X299 FTW K",
  "EVGA X99 Classified", "EVGA X99 FTW",
  "EVGA X58 Classified", "EVGA X58 FTW3", "EVGA X58 SLI",
  "EVGA nForce 790i Ultra SLI", "EVGA nForce 780i SLI", "EVGA nForce 680i SLI",
  "EVGA SR-2", "EVGA SR-X",
  "DFI LanParty UT X58-T3eH8", "DFI LanParty DK X58-T3eH6",
  "DFI LanParty UT P45-T3RS", "DFI LanParty DK P45-T2RS",
  "DFI LanParty UT X48-T3RS", "DFI LanParty LT X48-T2R",
  "DFI LanParty UT P35-T2R", "DFI LanParty DK P35-T2RS",
  "DFI LanParty UT NF4 SLI-DR", "DFI LanParty NF4 SLI-DR",
  "DFI LanParty UT NF3 250Gb", "DFI LanParty NFII Ultra",
  "DFI LanParty UT NF4 SLI-DR Expert", "DFI LanParty UT NF4 Ultra-D",
  "DFI LanParty UT NF3 250Gb",
  "DFI LanParty NFII Ultra B", "DFI LanParty NFII Ultra",
  "Abit NF7-S", "Abit NF7", "Abit NF7-M",
  "Abit IC7-MAX3", "Abit IC7-G", "Abit IC7",
  "Abit IP35 Pro", "Abit IP35-E",
  "Abit AB9 Pro", "Abit AB9",
  "Abit AN8 32X", "Abit AN8 SLI", "Abit AN8-V",
  "Abit AV8", "Abit AV8-3rd Eye",
  "Abit KG7-RAID", "Abit KG7",
  "Abit KT7A-RAID", "Abit KT7A", "Abit KT7",
  "Abit AN8 32X", "Abit AN8 Fatal1ty",
  "Abit NF7-S", "Abit NF7-S2", "Abit NF7-M",
  "Abit KT7A-RAID", "Abit KT7A", "Abit KT7",
  "Biostar Z790 Valkyrie", "Biostar Z690 Valkyrie",
  "Biostar X670E Valkyrie", "Biostar B650E Valkyrie",
  "Biostar X570 Valkyrie", "Biostar B550 Valkyrie",
  "Biostar Z590 Valkyrie", "Biostar Z490 Valkyrie",
  "Biostar Z270GT8", "Biostar Z170GT7",
  "Biostar TPower X58", "Biostar TPower I45",
  "Biostar B650EGTQ", "Biostar B650M-Silver",
  "Soyo SY-P4I875P Dragon 2", "Soyo SY-P4I865PE Plus Dragon 2",
  "Soyo SY-KT880 Dragon 2", "Soyo SY-KT600 Dragon Plus",
  "Soyo SY-K7VTA Pro",
  "Soyo SY-KT880 Dragon 2", "Soyo SY-K7VTA Pro",
  "ECS Z790H7-A", "ECS Z690H7-A",
  "ECS X670E-A", "ECS B650-A",
  "ECS Z590-A", "ECS Z490-A",
  "ECS Z270H7-AX", "ECS Z170H7-AX",
  "ECS X58B-A2", "ECS P45T-A",
  "ECS K7S5A", "ECS K7VTA3",
  "ECS K7S5A", "ECS K7S5A Pro",
  "Foxconn X58 Blood Rage", "Foxconn X58 Flaming Blade",
  "Foxconn P45A-S", "Foxconn P35A-S",
  "Foxconn C51XEM2AA-8EKRS2H",
  "Shuttle XPC SB81P", "Shuttle XPC SB83G5", "Shuttle XPC SN25P",
  "Shuttle XPC SN27P2", "Shuttle XPC SX48P2", "Shuttle XPC SZ87R6",
  "Supermicro C9Z790-CG", "Supermicro C9Z690-CG",
  "Supermicro C9X299-PG300F", "Supermicro C7X99-OCE",
  "Supermicro X9DAi", "Supermicro X8DAH",
  "Supermicro C2SBX", "Supermicro C2SEA",
  "Intel DZ77GA-70K", "Intel DZ68DB", "Intel DP67BG",
  "Intel DX58SO", "Intel DX58OG",
  "Intel D975XBX2", "Intel D975XBX",
  "Intel D865PERL", "Intel D865GBF",
  "Intel D850MV", "Intel D845BG",
  "Intel SE440BX-2",
  "NZXT N7 Z690", "NZXT N7 Z590", "NZXT N7 B550",
  "AMD X570 Aorus Xtreme", "AMD X570 Aorus Master",
  "AMD B550 Aorus Master", "AMD B550 Aorus Pro",
  "AMD X470 Aorus Gaming 7", "AMD X370 Aorus Gaming K7",
  "ASUS Crosshair V Formula-Z", "ASUS Crosshair V Formula",
  "ASUS Sabertooth 990FX", "ASUS Sabertooth 990FX R2.0",
  "ASUS M5A99FX PRO R2.0", "ASUS M5A99X EVO R2.0", "ASUS M5A97 R2.0",
  "ASUS Crosshair IV Formula", "ASUS Crosshair IV Extreme",
  "ASUS M4A89TD PRO", "ASUS M4A89GTD PRO",
  "ASUS Crosshair II Formula", "ASUS Crosshair",
  "ASUS M3A32-MVP Deluxe", "ASUS M3A79-T Deluxe",
  "ASUS M2N32-SLI Deluxe", "ASUS M2N-SLI Deluxe",
  "ASUS A8N32-SLI Deluxe", "ASUS A8N-SLI Deluxe", "ASUS A8N-SLI Premium",
  "ASUS A8N-E", "ASUS A8V Deluxe",
  "ASUS K8V Deluxe", "ASUS K8V SE Deluxe",
  "ASUS A7N8X-E Deluxe", "ASUS A7N8X Deluxe", "ASUS A7N8X",
  "ASUS A7V600", "ASUS A7V333", "ASUS A7V266-E",
  "ASUS P5A", "ASUS P5A-B",
  "Gigabyte GA-5AX", "Gigabyte GA-5SMM",
];
const PSU_DB = [
  "Corsair RM850x", "Corsair RM750x", "Corsair RM1000x", "Corsair RM1200x",
  "Corsair RM850e", "Corsair RM750e", "Corsair RM1000e",
  "Corsair RM550x",
  "Corsair HX1000i", "Corsair HX1500i", "Corsair HX1200",
  "Corsair SF750", "Corsair SF600", "Corsair SF850",
  "Corsair AX1600i", "Corsair AX1000",
  "Corsair CX750", "Corsair CX650", "Corsair CX550",
  "Corsair CX750M", "Corsair CX650M", "Corsair CX550M",
  "Corsair VS650", "Corsair VS550",
  "Corsair RM850x Shift", "Corsair RM750x Shift", "Corsair RM1200x Shift",
  "Seasonic Focus GX-850", "Seasonic Focus GX-750", "Seasonic Focus GX-1000",
  "Seasonic Focus GX-650", "Seasonic Focus GX-550",
  "Seasonic Prime TX-1000", "Seasonic Prime TX-850", "Seasonic Prime TX-1600",
  "Seasonic Prime TX-650",
  "Seasonic Prime PX-850", "Seasonic Prime PX-1000",
  "Seasonic Core GM-650", "Seasonic Core GM-500",
  "Seasonic Vertex GX-850", "Seasonic Vertex GX-1000", "Seasonic Vertex GX-750",
  "EVGA SuperNOVA G6 850", "EVGA SuperNOVA G6 1000", "EVGA SuperNOVA G6 750",
  "EVGA SuperNOVA G5 850", "EVGA SuperNOVA G5 750",
  "EVGA SuperNOVA P6 1000",
  "EVGA 600 W1", "EVGA 500 W1", "EVGA 700 BR",
  "EVGA SuperNOVA G3 750", "EVGA SuperNOVA G3 1000",
  "be quiet! Dark Power 13 850W", "be quiet! Dark Power 13 1000W",
  "be quiet! Dark Power 13 750W",
  "be quiet! Straight Power 12 850W", "be quiet! Straight Power 12 750W",
  "be quiet! Straight Power 12 1200W",
  "be quiet! System Power 10 750W", "be quiet! System Power 10 650W",
  "be quiet! System Power 10 550W",
  "be quiet! Pure Power 12 850W", "be quiet! Pure Power 12 750W",
  "be quiet! Pure Power 12 550W",
  "be quiet! Dark Power Pro 13 1300W",
  "NZXT C850", "NZXT C750", "NZXT C1000", "NZXT C1200",
  "NZXT C1500",
  "Thermaltake Toughpower GF3 750W", "Thermaltake Toughpower GF3 850W",
  "Thermaltake Toughpower GF3 1000W", "Thermaltake Toughpower GF3 1200W",
  "Thermaltake Toughpower GF1 750W",
  "Thermaltake Smart 700W", "Thermaltake Smart 600W", "Thermaltake Smart 500W",
  "Thermaltake Toughpower iRGB Plus 1250W",
  "Thermaltake Toughpower PF3 1050W",
  "Cooler Master MWE Gold 850 V2", "Cooler Master MWE Gold 750 V2",
  "Cooler Master MWE Gold 650 V2",
  "Cooler Master V850 Gold", "Cooler Master V750 Gold",
  "Cooler Master V1100 Gold",
  "Cooler Master XG750 Plus",
  "Cooler Master MWE Bronze 600 V2",
  "MSI MPG A850G", "MSI MPG A750G", "MSI MPG A1000G",
  "MSI MAG A850GL", "MSI MAG A750GL",
  "MSI MPG A1050G",
  "MSI MAG A550BN",
  "Enermax Revolution DF 850W", "Enermax Revolution DF 750W",
  "Enermax Revolution DF 1200W",
  "Enermax Platimax 1350W",
  "FSP Hydro G Pro 850W", "FSP Hydro G Pro 1000W",
  "FSP Hydro PTM Pro 1200W",
  "FSP Vita GM 750W", "FSP Vita GM 850W",
  "Super Flower Leadex VII 850W", "Super Flower Leadex VII 1000W",
  "Super Flower Leadex VII 1300W",
  "Super Flower Leadex V Platinum 850W",
  "Lian Li SP850", "Lian Li SP750",
  "Asus ROG Loki SFX-L 750W", "Asus ROG Loki SFX-L 850W", "Asus ROG Loki SFX-L 1000W",
  "Asus ROG Thor 1000P2", "Asus ROG Thor 1200P2",
  "Asus TUF Gaming 750B", "Asus TUF Gaming 850B",
  "Phanteks AMP GH 850W", "Phanteks AMP GH 1000W",
  "XPG Core Reactor 850W", "XPG Core Reactor 750W",
  "XPG CyberCore 1000W",
  "SilverStone DA850 Gold", "SilverStone DA750 Gold",
  "SilverStone SX1000", "SilverStone SX750",
  "SilverStone SST-ST65F-GS", "SilverStone SST-ST75F-GS",
  "MSI MAG A850GL PCIE5", "MSI MAG A750GL PCIE5",
  "MSI MPG A1200G PCIE5",
  "Asus ROG Thor 1000P2", "Asus ROG Thor 1200P2", "Asus ROG Thor 1600P2",
  "Asus ROG Loki SFX-L 1000W",
  "Lian Li EDGE 850W", "Lian Li EDGE 1000W",
  "Corsair RM1000x Shift", "Corsair RM850x Shift", "Corsair RM750x Shift",
  "Corsair RM1200x Shift",
  "be quiet! Dark Power Pro 13 1600W",
  "Thermaltake Toughpower GF A3 850W", "Thermaltake Toughpower GF A3 750W",
  "Thermaltake Toughpower GF A3 650W",
  "Cooler Master V850 Gold V2", "Cooler Master V750 Gold V2",
  "Cooler Master MWE Gold 1250W V2",
  "FSP Hydro G Pro ATX3.0 850W", "FSP Hydro G Pro ATX3.0 1000W",
  "Deepcool PX850G", "Deepcool PX1000G",
  "Deepcool PQ850M", "Deepcool PQ750M",
  "Montech CENTURY 850W", "Montech CENTURY 750W",
  "Montech TITAN GOLD 1000W", "Montech TITAN GOLD 1200W",
  "NZXT C1200 Gold",
  "Phanteks AMP V2 850W", "Phanteks AMP V2 1000W",
  "XPG Core Reactor II 850W", "XPG Core Reactor II 1000W",
];
const STORAGE_DB = [
  "Samsung 990 Pro 1TB", "Samsung 990 Pro 2TB", "Samsung 990 Pro 4TB",
  "Samsung 990 Evo 1TB", "Samsung 990 Evo 2TB", "Samsung 990 Evo Plus 2TB",
  "Samsung 980 Pro 1TB", "Samsung 980 Pro 2TB",
  "Samsung 970 Evo Plus 1TB", "Samsung 970 Evo Plus 500GB", "Samsung 970 Evo Plus 2TB",
  "Samsung 870 Evo 1TB", "Samsung 870 Evo 2TB", "Samsung 870 Evo 4TB",
  "Samsung 870 QVO 4TB", "Samsung 870 QVO 8TB",
  "Samsung 960 Pro 512GB", "Samsung 960 Pro 1TB",
  "Samsung T7 Shield 1TB", "Samsung T7 Shield 2TB", "Samsung T7 Shield 4TB",
  "Samsung T5 Evo 1TB",
  "WD Black SN850X 1TB", "WD Black SN850X 2TB", "WD Black SN850X 4TB",
  "WD Black SN770 1TB", "WD Black SN770 500GB", "WD Black SN770 2TB",
  "WD Black SN7100 1TB", "WD Black SN7100 2TB",
  "WD Blue SN580 1TB", "WD Blue SN580 2TB",
  "WD Blue SN5000 2TB", "WD Blue SN5000 4TB",
  "WD Red Pro 4TB", "WD Red Pro 6TB", "WD Red Plus 4TB", "WD Red Plus 6TB",
  "WD Blue 1TB", "WD Blue 2TB", "WD Blue 4TB",
  "Crucial T700 1TB", "Crucial T700 2TB", "Crucial T700 4TB",
  "Crucial T500 1TB", "Crucial T500 2TB",
  "Crucial P5 Plus 1TB", "Crucial P5 Plus 2TB",
  "Crucial P3 Plus 1TB", "Crucial P3 Plus 2TB", "Crucial P3 Plus 4TB",
  "Crucial P3 1TB", "Crucial P3 500GB",
  "Crucial MX500 1TB", "Crucial MX500 2TB", "Crucial MX500 500GB",
  "Crucial BX500 480GB", "Crucial BX500 1TB",
  "Kingston KC3000 1TB", "Kingston KC3000 2TB", "Kingston KC3000 4TB",
  "Kingston Fury Renegade 1TB", "Kingston Fury Renegade 2TB",
  "Kingston NV3 1TB", "Kingston NV3 2TB", "Kingston NV3 500GB",
  "Kingston NV2 1TB", "Kingston NV2 500GB", "Kingston NV2 2TB",
  "Kingston A400 480GB", "Kingston A400 960GB",
  "Seagate Barracuda 2TB", "Seagate Barracuda 4TB", "Seagate Barracuda 8TB",
  "Seagate Barracuda Pro 6TB",
  "Seagate FireCuda 530 1TB", "Seagate FireCuda 530 2TB", "Seagate FireCuda 530 4TB",
  "Seagate FireCuda 540 1TB", "Seagate FireCuda 540 2TB",
  "Seagate IronWolf 4TB", "Seagate IronWolf 6TB", "Seagate IronWolf 8TB",
  "Seagate IronWolf Pro 4TB", "Seagate IronWolf Pro 12TB",
  "Seagate SkyHawk 4TB", "Seagate SkyHawk 8TB",
  "Seagate Exos X16 16TB", "Seagate Exos X18 18TB",
  "Corsair MP600 Pro XT 1TB", "Corsair MP600 Pro XT 2TB", "Corsair MP600 Pro XT 4TB",
  "Corsair MP600 Elite 1TB", "Corsair MP600 Elite 2TB",
  "Corsair MP600 Mini 1TB",
  "Corsair MP700 Pro 1TB", "Corsair MP700 Pro 2TB",
  "TeamGroup MP44 1TB", "TeamGroup MP44 2TB",
  "TeamGroup MP44L 1TB", "TeamGroup MP44L 2TB",
  "TeamGroup T-Force Cardea A440 1TB", "TeamGroup T-Force Cardea A440 2TB",
  "TeamGroup T-Force Cardea Z540 1TB",
  "SK Hynix Platinum P41 1TB", "SK Hynix Platinum P41 2TB",
  "SK Hynix Gold P31 1TB", "SK Hynix Gold P31 2TB",
  "SK Hynix Tube T31 1TB",
  "Lexar NM790 1TB", "Lexar NM790 2TB", "Lexar NM790 4TB",
  "Lexar NM620 1TB",
  "ADATA Legend 960 1TB", "ADATA Legend 960 2TB",
  "ADATA XPG Gammix S70 Blade 1TB", "ADATA XPG Gammix S70 Blade 2TB",
  "ADATA XPG Gammix S50 Lite 1TB",
  "ADATA SU760 1TB",
  "Sabrent Rocket 4 Plus 1TB", "Sabrent Rocket 4 Plus 2TB",
  "Sabrent Rocket 5 1TB", "Sabrent Rocket 5 2TB",
  "Sabrent Rocket Q4 1TB",
  "Solidigm P44 Pro 1TB", "Solidigm P44 Pro 2TB",
  "Solidigm P41 Plus 1TB",
  "Inland TN470 1TB", "Inland TN470 2TB",
  "Fanox S460 1TB",
  "Phison E26 2TB",
  "Samsung 9100 Pro 1TB", "Samsung 9100 Pro 2TB", "Samsung 9100 Pro 4TB",
  "Samsung 990 EVO Plus 1TB", "Samsung 990 EVO Plus 2TB",
  "Samsung 870 EVO 500GB",
  "WD Black SN850 1TB", "WD Black SN850 2TB",
  "WD Red Plus 8TB", "WD Red Plus 10TB",
  "WD Blue SN5000 1TB",
  "Crucial T705 1TB", "Crucial T705 2TB", "Crucial T705 4TB",
  "Crucial P310 1TB", "Crucial P310 2TB",
  "Kingston KC4000 1TB", "Kingston KC4000 2TB",
  "Kingston NV3 4TB",
  "Seagate FireCuda 540 4TB",
  "Seagate IronWolf Pro 8TB", "Seagate IronWolf Pro 16TB",
  "Seagate Exos X20 20TB",
  "Corsair MP700 XT 1TB", "Corsair MP700 XT 2TB",
  "Corsair MP600 Elite 4TB",
  "TeamGroup MP44S 1TB", "TeamGroup MP44S 2TB",
  "TeamGroup MP33 1TB",
  "Lexar NM800 Pro 1TB", "Lexar NM800 Pro 2TB",
  "ADATA Legend 970 1TB", "ADATA Legend 970 2TB",
  "ADATA XPG Gammix S70 Blade 4TB",
  "Patriot Viper VP4300 1TB", "Patriot Viper VP4300 2TB",
  "Mushkin Vortex Redline 1TB",
  "Solidigm D7-PS1010 1TB",
  "Silicon Power UD90 1TB", "Silicon Power UD90 2TB",
  "Fanox S550 1TB",
  "HP FX900 Pro 1TB", "HP FX900 Pro 2TB",
  "PNY CS3150 1TB", "PNY CS3150 2TB",
  "Nextorage NEM-PA 1TB",
  "Kioxia Exceria Pro 1TB", "Kioxia Exceria Pro 2TB",
  "Kioxia Exceria G2 1TB",
];

const CASE_DB = [
  "NZXT H5 Flow", "NZXT H7 Flow", "NZXT H9 Flow", "NZXT H6 Flow",
  "NZXT H510", "NZXT H510 Elite", "NZXT H710", "NZXT H7 Elite",
  "NZXT H440", "NZXT H210",
  "NZXT H5 Elite", "NZXT H7 Flow RGB",
  "Corsair 4000D Airflow", "Corsair 5000D Airflow", "Corsair 7000D Airflow",
  "Corsair 3000D Airflow", "Corsair 6500D Airflow",
  "Corsair iCUE 4000X RGB", "Corsair iCUE 5000X RGB", "Corsair iCUE 7000X RGB",
  "Corsair iCUE 220T RGB", "Corsair iCUE 465X RGB",
  "Corsair Obsidian 500D", "Corsair Obsidian 1000D",
  "Corsair Carbide 275R", "Corsair Carbide 175R",
  "Corsair Crystal 680X", "Corsair Crystal 570X",
  "Corsair 250D", "Corsair 2000D Airflow",
  "Lian Li O11 Dynamic", "Lian Li O11 Dynamic EVO", "Lian Li O11 Dynamic Mini",
  "Lian Li O11 Dynamic EVO RGB", "Lian Li O11 Dynamic XL",
  "Lian Li Lancool 216", "Lian Li Lancool III", "Lian Li Lancool 207",
  "Lian Li O11 Vision", "Lian Li SUP01",
  "Lian Li TU150", "Lian Li A3-mATX",
  "Fractal Design North", "Fractal Design North XL",
  "Fractal Design Meshify 2", "Fractal Design Meshify 2 XL", "Fractal Design Meshify C",
  "Fractal Design Pop Air", "Fractal Design Pop XL Air",
  "Fractal Design Torrent", "Fractal Design Torrent Compact", "Fractal Design Torrent Nano",
  "Fractal Design Define 7", "Fractal Design Define 7 XL", "Fractal Design Define R5",
  "Fractal Design Pop Mini Air",
  "Fractal Design Era 2",
  "Cooler Master MasterCase H500M", "Cooler Master MasterBox Q300L",
  "Cooler Master MasterBox NR600", "Cooler Master MasterBox MB520",
  "Cooler Master MasterBox Q500L",
  "Cooler Master TD500 Mesh V2", "Cooler Master TD300 Mesh",
  "Cooler Master Cosmos C700M", "Cooler Master Cosmos C700P",
  "Cooler Master NR200", "Cooler Master NR200P Max",
  "Phanteks Eclipse G360A", "Phanteks Eclipse G500A",
  "Phanteks Eclipse P400A", "Phanteks Eclipse P600S",
  "Phanteks Eclipse P300A",
  "Phanteks NV5", "Phanteks NV7", "Phanteks NV9",
  "Phanteks Evolv X2",
  "Thermaltake View 71", "Thermaltake Tower 900", "Thermaltake Tower 100",
  "Thermaltake H200", "Thermaltake H570", "Thermaltake S200 TG ARGB",
  "Thermaltake View 270", "Thermaltake View 200",
  "Thermaltake Core P3", "Thermaltake Core P8",
  "be quiet! Silent Base 802", "be quiet! Silent Base 601",
  "be quiet! Pure Base 500DX", "be quiet! Pure Base 501",
  "be quiet! Dark Base Pro 900", "be quiet! Dark Base 700",
  "be quiet! Shadow Base 800",
  "HYTE Y60", "HYTE Y70 Touch", "HYTE Y40",
  "HYTE Revolt 3",
  "Antec Performance 1", "Antec NX410", "Antec NX800",
  "Antec DF700 Flux", "Antec C3",
  "Montech Air 903 Max", "Montech Air 903 Base",
  "Montech Sky Two", "Montech Sky One",
  "Montech King 95 Pro",
  "Deepcool CH560", "Deepcool CH370", "Deepcool CC560",
  "Deepcool CK560", "Deepcool LS720", "Deepcool CH780",
  "Jonsbo D31", "Jonsbo D41", "Jonsbo N5", "Jonsbo N3",
  "Jonsbo D300", "Jonsbo Z20",
  "SAMA SV01", "SAMA 3508",
  "SilverStone SST-RL08", "SilverStone Fara R1",
  "InWin 303", "InWin A1 Plus", "InWin 309",
  "Segotep K3",
  "NZXT H7 Flow 2024", "NZXT H5 Flow 2024", "NZXT H3 Flow",
  "NZXT H510i", "NZXT H710i",
  "Corsair 3500X", "Corsair 6500X",
  "Corsair iCUE LINK 2500X", "Corsair iCUE LINK 3500X",
  "Lian Li O11 Dynamic EVO XL", "Lian Li O11 Vision Compact",
  "Lian Li Lancool 217",
  "Fractal Design North Mesh", "Fractal Design Pop Silent",
  "Fractal Design Era ITX",
  "Cooler Master MasterBox 520", "Cooler Master MasterBox 600",
  "Cooler Master Qube 500",
  "Cooler Master NR200P", "Cooler Master NR200P V2",
  "Phanteks Eclipse G400A", "Phanteks Eclipse G300A",
  "Phanteks NV5 MKII",
  "Phanteks Enthoo Pro 2",
  "Thermaltake View 380", "Thermaltake View 98",
  "Thermaltake Tower 300",
  "be quiet! Light Base 600", "be quiet! Light Base 900",
  "be quiet! Pure Base 500 FX",
  "HYTE Y70", "HYTE Y40",
  "Montech Air 1000 Premium", "Montech Air 1000 Lite",
  "Montech King 95",
  "Deepcool CH560 Digital",
  "Deepcool CC360", "Deepcool CC560 V2",
  "Jonsbo D41 Mesh", "Jonsbo D31 Mesh",
  "Jonsbo N4", "Jonsbo N5",
  "Jonsbo VR4", "Jonsbo VR5",
  "Antec C5", "Antec C7", "Antec NX500",
  "Antec Flux Pro", "Antec Flux AI",
  "SilverStone Seta Q1", "SilverStone Seta A1",
  "SilverStone Sugo 17",
  "SAMA V8",
  "Lian Li A3-mATX", "Lian Li SUP01",
  "FSP CMT580", "FSP CMT590",
  "SHARK REV300",
  "BitFenix Nova Mesh SE",
  "GameMax Contac 2",
  "MagniumGear Neo Air",
];

const CATEGORY_DB = {
  CPU: { items: CPU_DB, brandMatch: /(\bintel\b|\bamd\b)/i },
  GPU: { items: GPU_DB, brandMatch: /(\bnvidia\b|\bamd\b|\bintel\b|\bradeon\b|\bgeforce\b|\bati\b|\b3dfx\b|\bmatrox\b|\bs3\b|\bpowerVR\b|\brendition\b|\btrident\b|\bxgi\b|\bsis\b)/i },
  RAM: { items: RAM_DB, brandMatch: /(\bcorsair\b|\bg\.?\s?skill\b|\bkingston\b|\bteamgroup\b|\bcrucial\b|\badata\b|\bpatriot\b|\blexar\b|\bmushkin\b)/i },
  Motherboard: { items: MOTHERBOARD_DB, brandMatch: /(\basus\b|\bmsi\b|\bgigabyte\b|\basrock\b|\bnzxt\b)/i },
  PSU: { items: PSU_DB, brandMatch: /(\bcorsair\b|\bseasonic\b|\bevga\b|\bbe quiet\b|\bnzxt\b|\bthermaltake\b|\bcooler master\b|\bmsi\b|\benermax\b|\bfsp\b|\bsuper flower\b|\blian li\b|\basus\b|\brog\b|\btuf\b|\bxpg\b|\bsilverstone\b|\bphanteks\b)/i },
  Storage: { items: STORAGE_DB, brandMatch: /(\bsamsung\b|\bwd\b|\bwestern digital\b|\bcrucial\b|\bkingston\b|\bseagate\b|\bcorsair\b|\bteamgroup\b|\bsk hynix\b|\blexar\b|\badata\b|\bsabrent\b|\bsolidigm\b|\binland\b|\bfanox\b|\bphison\b)/i },
  Case: { items: CASE_DB, brandMatch: /(\bnzxt\b|\bcorsair\b|\blian li\b|\bfractal\b|\bcooler master\b|\bphanteks\b|\bthermaltake\b|\bbe quiet\b|\bhyte\b|\bantec\b|\bmontech\b|\bdeepcool\b|\bjonsbo\b|\bsama\b|\bsilverstone\b|\binwin\b|\bsegotep\b)/i },
};
function diceSimilarity(a, b) {
  const as = normalizeForMatch(a);
  const bs = normalizeForMatch(b);
  if (as === bs) return 1;
  const bigrams = (s) => {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.substring(i, i + 2));
    return set;
  };
  const s1 = bigrams(as);
  const s2 = bigrams(bs);
  if (s1.size === 0 || s2.size === 0) return 0;
  let intersection = 0;
  for (const bg of s1) if (s2.has(bg)) intersection++;
  return (2 * intersection) / (s1.size + s2.size);
}

const HOMOGLYPHS = { "о": "o", "Ο": "O", "ο": "o", "О": "O", "０": "0", "１": "1", "２": "2", "３": "3", "４": "4", "５": "5", "６": "6", "７": "7", "８": "8", "９": "9" };

function normalizeForMatch(name) {
  let s = name.toLowerCase();
  for (const [glyph, ascii] of Object.entries(HOMOGLYPHS)) {
    s = s.replaceAll(glyph, ascii);
  }
  return s.replace(/[^a-z0-9]/g, "");
}

function findBestMatch(name, db) {
  const normalized = normalizeForMatch(name);
  if (!normalized) return null;

  const exact = db.find(p => normalizeForMatch(p) === normalized);
  if (exact) return { match: exact, similarity: 1, wasCorrected: false };

  let best = null;
  let bestSim = 0;
  for (const product of db) {
    const sim = diceSimilarity(name, product);
    if (sim > bestSim) {
      bestSim = sim;
      best = product;
    }
  }

  if (!best) return null;

  const AUTO_CORRECT_THRESHOLD = 0.7;
  const SUSPICIOUS_THRESHOLD = 0.55;

  if (bestSim >= AUTO_CORRECT_THRESHOLD) {
    return { match: best, similarity: bestSim, wasCorrected: bestSim < 1 };
  }

  if (bestSim >= SUSPICIOUS_THRESHOLD) {
    return { match: best, similarity: bestSim, wasCorrected: false, suspicious: true };
  }

  return null;
}

function hasKnownBrand(name, category) {
  const db = CATEGORY_DB[category];
  if (!db) return false;
  return db.brandMatch.test(name);
}

const MODEL_PATTERN = /\b([a-zA-Z]{2,}\s*[-]?\s*\d{3,5}(?!\s*(?:th|st|nd|rd)\b)[a-zA-Z0-9]*)\b/;

const OBVIOUSLY_NOT_HARDWARE = [
  /chicken|sandwich|pizza|pasta|food|burger|lunch|dinner|breakfast|fruit|cake|candy/i,
  /shoe.?box|cardboard|trash|garbage|bucket|basket|soap|shampoo/i,
  /^no$/i, /^none$/i, /^n\/a$/i,
  /idk|dunno|lol|lmao|haha|hehe|jk|kekw|wtf|omg/i,
  /^0\s*w$/i,
  /test|testing|placeholder|asdf|qwerty|foobar|xyzzy/i,
  /\b(gay|sex|porn|fuck|shit|dick|bitch|asshole)\b/i,
  /\b(bike|car|boat|plane|train|truck|van|suv|motorcycle|bicycle)\b/i,
  /\b(banana|apple|orange|grape|potato|tomato|cheese|bread|meat|soup)\b/i,
  /(.)\1{4,}/,
  /\b(?:sono|sei|ecco|cosa|perche|anche|allora|dove|quando|ormai|forse|questo|quello|questa|quella|nessun|alcun|ogni)\b/i,
];

function isObviouslyNotHardware(name) {
  return OBVIOUSLY_NOT_HARDWARE.some(p => p.test(name.trim()));
}

function isValidComponentName(name) {
  if (!name) return false;
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  if (/^\d+\s*(gb|mb|tb)\s*(ddr[34]5?)?$/i.test(trimmed)) return true;
  if (trimmed.length < 4) return false;
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount > 12) return false;
  return true;
}

function looksReasonable(name) {
  const lower = name.toLowerCase();
  const hasDigit = /\d/.test(name);
  const hasModelPattern = MODEL_PATTERN.test(name);
  if (hasModelPattern) return true;
  if (hasDigit && /(gb|tb|mhz|w|v|plus|ultra|ti|super|xt|xtx|gold|plat)\b/i.test(lower)) return true;
  if (lower.includes("ddr") || lower.includes("nvme") || lower.includes("sata") || lower.includes("pcie")) return true;
  if (lower.includes("rgb") || lower.includes("argb")) return true;
  if (lower.includes("fan") || lower.includes("liquid") || lower.includes("air")) return true;
  if (/^[ir]\d{1,2}\s/.test(lower)) return true;
  if (/^(ultra|ryzen|threadripper|xeon|epyc|pentium|celeron|athlon|duron|sempron|phenom|core)\s/.test(lower)) return true;
  if (/^core\s+(i\d+|ultra|2|3|5|7|9)\s/.test(lower)) return true;
  if (/^(geforce|radeon|voodoo|riva|tnt|firegl|firepro|quadro|tesla)\s/.test(lower)) return true;
  return false;
}

function validateComponentName(name, category) {
  const trimmed = name.trim();
  if (!isValidComponentName(trimmed)) return { action: "invalid", message: `"${name}" — nome troppo corto o eccessivamente lungo` };

  if (isObviouslyNotHardware(trimmed)) return { action: "nonsense", message: `"${name}" — non riconosciuto come componente hardware` };

  const dbKey = category || "CPU";
  const db = CATEGORY_DB[dbKey];
  if (!db) return { action: "unknown_category", message: `"${name}" — categoria "${category}" sconosciuta` };

  const result = findBestMatch(trimmed, db.items);

  if (result && result.wasCorrected) {
    return { action: "corrected", original: trimmed, corrected: result.match, similarity: result.similarity, message: `"${trimmed}" → corretto automaticamente in "${result.match}"` };
  }

  if (result && result.suspicious) {
    return { action: "suspicious", original: trimmed, closest: result.match, similarity: result.similarity, message: `"${trimmed}" — simile a "${result.match}" ma non corrisponde esattamente (verificare)` };
  }

  if (result && !result.wasCorrected) {
    return { action: "ok", match: result.match };
  }

  const hasBrand = hasKnownBrand(trimmed, dbKey);
  const reasonable = looksReasonable(trimmed);

  if (hasBrand && reasonable) return { action: "ok", match: trimmed };
  if (!hasBrand && reasonable) {
    if (dbKey === "PSU" && /^\d+\s*w$/i.test(trimmed)) {
      return { action: "suspicious", original: trimmed, message: `"${trimmed}" — solo potenza senza marca/modello, impossibile verificare compatibilità` };
    }
    return { action: "ok", match: trimmed };
  }
  if (hasBrand && !reasonable) return { action: "suspicious", original: trimmed, message: `"${trimmed}" — ha un marchio noto ma nessun modello/specifica riconoscibile` };
  if (/\d/.test(trimmed)) return { action: "suspicious", original: trimmed, message: `"${trimmed}" — ha numeri ma nessun marchio o specifica riconoscibile` };

  return { action: "not_found", message: `"${trimmed}" — componente descritto non trovato nel database` };
}

const FASCIA_ALIASES = {
  mid: "medio", "mid-range": "medio", medium: "medio",
  low: "budget", high: "alto", "high-end": "alto", premium: "alto",
};

function normalizeFascia(value) {
  const v = (value || "").trim().toLowerCase();
  if (ALLOWED_FASCE.has(v)) return v;
  if (v in FASCIA_ALIASES) return FASCIA_ALIASES[v];
  throw new Error(`Invalid fascia: "${value}"`);
}

function coerceStrList(value, field) {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((item, i) => {
        if (typeof item !== "string") throw new Error(`${field}[${i}] must be a string`);
        return item.trim();
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const s = value.trim();
    return s ? [s] : [];
  }
  throw new Error(`${field} must be a list of strings or a string`);
}

function sanitizeJson(text) {
  return text
    .replace(/,\s*([\]}])/g, "$1")
    .replace(/([\[{])\s*,/g, "$1")
    .replace(/\/\/.*?(\n|$)/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractJsonObject(text) {
  text = text.trim();
  if (!text) throw new Error("Empty model response");
  let cleaned = sanitizeJson(text);
  try {
    const parsed = JSON.parse(cleaned);
    if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
  } catch {}
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response");
  }
  const snippet = cleaned.slice(start, end + 1);
  try {
    const parsed = JSON.parse(snippet);
    if (typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Parsed JSON is not an object");
    }
    return parsed;
  } catch {
    const doubleTry = JSON.parse(sanitizeJson(snippet));
    if (typeof doubleTry !== "object" || Array.isArray(doubleTry)) {
      throw new Error("Parsed JSON is not an object");
    }
    return doubleTry;
  }
}

function parseUpgradeOptions(raw, ctx) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    if (typeof raw === "object" && raw !== null && raw.nome) {
      raw = [raw];
    } else {
      console.warn(`${ctx}: opzioni must be a list, got`, typeof raw);
      return [];
    }
  }
  return raw
    .filter((item) => item != null)
    .map((item) => {
      if (typeof item !== "object" || item === null) return null;
      const nome = String(item.nome || "").trim();
      if (!nome) return null;
      try {
        const fascia = normalizeFascia(item.fascia);
        const motivazione = String(item.motivazione || "").trim();
        const compatibilita = String(item.compatibilita || "").trim();
        return { nome, fascia, motivazione, compatibilita };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function parseUpgradeCategories(raw) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    console.warn("upgrade_consigliati must be a list, got", typeof raw);
    return [];
  }
  return raw
    .filter((item) => item != null)
    .map((item) => {
      if (typeof item !== "object" || item === null) return null;
      const componente = String(item.componente || "").trim();
      if (!componente) return null;
      const ctx = `upgrade_consigliati[${componente}]`;
      const opzioni = parseUpgradeOptions(item.opzioni, ctx);
      if (opzioni.length === 0) return null;
      return { componente, opzioni: opzioni.slice(0, 3) };
    })
    .filter(Boolean);
}

function parseDependent(raw) {
  if (raw == null) return [];
  if (typeof raw === "string") {
    raw = raw.trim() ? [raw] : [];
  } else if (typeof raw === "object" && !Array.isArray(raw) && raw !== null) {
    raw = [raw];
  }
  if (!Array.isArray(raw)) {
    console.warn("upgrade_dipendenti must be a list, got", typeof raw);
    return [];
  }
  return raw
    .filter((item) => item != null)
    .map((item) => {
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (!trimmed) return null;
        return { componente: trimmed, motivo: "Necessario per supportare l'upgrade principale" };
      }
      if (typeof item !== "object" || item === null) return null;
      const componente = String(item.componente || "").trim();
      const motivo = String(item.motivo || "").trim();
      if (!componente && !motivo) return null;
      return {
        componente: componente || "Componente sconosciuto",
        motivo: motivo || "Necessario per supportare l'upgrade principale",
      };
    })
    .filter(Boolean);
}

function parseSuggestions(raw) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    if (typeof raw === "object" && raw !== null) raw = [raw];
    else return [];
  }
  return raw
    .filter(s => s && typeof s === "object")
    .map(s => {
      const campo = String(s.campo || "").trim().toLowerCase();
      const valore_inserito = String(s.valore_inserito || "").trim();
      if (!campo || !valore_inserito) return null;
      const altRaw = s.alternative;
      if (!Array.isArray(altRaw) || altRaw.length === 0) return null;
      const alternative = altRaw
        .filter(a => a && typeof a === "object")
        .map(a => ({
          nome: String(a.nome || "").trim(),
          descrizione: String(a.descrizione || "").trim(),
        }))
        .filter(a => a.nome);
      if (alternative.length === 0) return null;
      return { campo, valore_inserito, alternative: alternative.slice(0, 3) };
    })
    .filter(Boolean);
}

const POSITIVE_SIGNALS = [
  "ottima base", "buona configurazione", "solida build", "build solida",
  "ottima build", "configurazione eccellente", "ben bilanciata",
  "ottimo punto di partenza", "base eccellente",
];

function checkInputContradiction(userBuild, analisiText, invalidFields) {
  if (!userBuild) return [];
  const warnings = [];
  const suspicious = [];

  const fields = { cpu: userBuild.cpu, gpu: userBuild.gpu, ram: userBuild.ram,
    motherboard: userBuild.motherboard, psu: userBuild.psu,
    storage: userBuild.storage, case: userBuild.case };

  for (const [key, val] of Object.entries(fields)) {
    if (!val || !val.trim()) continue;
    for (const pat of OBVIOUSLY_NOT_HARDWARE) {
      if (pat.test(val.trim())) {
        suspicious.push(`${key.toUpperCase()}: "${val}"`);
        break;
      }
    }
  }

  if (invalidFields && invalidFields.length > 0) {
    for (const f of invalidFields) {
      const desc = `${f.category}: "${f.value}"`;
      if (!suspicious.includes(desc)) suspicious.push(desc);
    }
  }

  if (suspicious.length > 0) {
    const hasPositive = POSITIVE_SIGNALS.some(s => analisiText.toLowerCase().includes(s));
    if (hasPositive) {
      warnings.push(`L'analisi definisce la configurazione come positiva ma i seguenti campi contengono valori non validi: ${suspicious.join(", ")}. Il modello AI potrebbe non aver riconosciuto input non hardware.`);
    }
  }
  return warnings;
}

const CATEGORY_ALTERNATIVES = {
  CPU: [
    { nome: "Intel Core i5-13400", descrizione: "CPU Intel 10 core, ottima per gaming e produttività" },
    { nome: "AMD Ryzen 5 7600", descrizione: "CPU AMD moderna su socket AM5, 6 core" },
    { nome: "Intel Core i7-14700K", descrizione: "CPU Intel di fascia alta, 20 core" },
    { nome: "AMD Ryzen 7 7800X3D", descrizione: "CPU AMD top per gaming, 8 core 3D V-Cache" },
    { nome: "Intel Core i5-13600K", descrizione: "CPU Intel 14 core, eccellente rapporto qualità/prezzo" },
    { nome: "AMD Ryzen 9 7950X", descrizione: "CPU AMD 16 core per produttività estrema" },
    { nome: "Intel Core i9-14900K", descrizione: "CPU Intel 24 core, il top di gamma Intel" },
    { nome: "AMD Ryzen 5 5600", descrizione: "CPU AMD 6 core su socket AM4, economica" },
    { nome: "Intel Core i3-14100", descrizione: "CPU Intel 4 core, ideale per PC entry-level" },
    { nome: "AMD Ryzen 7 5700X", descrizione: "CPU AMD 8 core su AM4, buon compromesso" },
    { nome: "Intel Core i7-12700K", descrizione: "CPU Intel 12 core di precedente generazione" },
    { nome: "AMD Ryzen 5 8600G", descrizione: "CPU AMD con grafica integrata Radeon 760M" },
  ],
  GPU: [
    { nome: "NVIDIA GeForce RTX 4060", descrizione: "GPU moderna di fascia media, ottima per gaming 1080p" },
    { nome: "AMD Radeon RX 7600", descrizione: "Alternativa AMD di fascia media" },
    { nome: "NVIDIA GeForce RTX 4070 Super", descrizione: "GPU di fascia alta per gaming 1440p" },
    { nome: "NVIDIA GeForce RTX 4090", descrizione: "GPU top di gamma per gaming 4K e produttività" },
    { nome: "AMD Radeon RX 7800 XT", descrizione: "GPU AMD 16GB per gaming 1440p" },
    { nome: "NVIDIA GeForce RTX 4060 Ti 16GB", descrizione: "GPU 16GB per gaming e AI" },
    { nome: "AMD Radeon RX 7900 GRE", descrizione: "GPU AMD 16GB ottima per 1440p" },
    { nome: "NVIDIA GeForce RTX 3050", descrizione: "GPU entry-level per gaming 1080p" },
    { nome: "Intel Arc A750", descrizione: "GPU Intel di fascia media, buon rapporto qualità/prezzo" },
    { nome: "NVIDIA GeForce RTX 4080 Super", descrizione: "GPU di altissima fascia per 4K" },
    { nome: "AMD Radeon RX 6600", descrizione: "GPU AMD entry-level, buona per 1080p" },
    { nome: "NVIDIA GeForce GTX 1650", descrizione: "GPU economica per PC senza scheda dedicata" },
  ],
  RAM: [
    { nome: "Corsair Vengeance DDR5 32GB 6000MHz", descrizione: "32GB DDR5 ad alta velocità" },
    { nome: "G.Skill Trident Z5 DDR5 32GB 6000MHz", descrizione: "32GB DDR5 performante con RGB" },
    { nome: "Kingston Fury Beast DDR5 32GB 5600MHz", descrizione: "32GB DDR5 affidabile" },
    { nome: "Corsair Vengeance DDR4 32GB 3200MHz", descrizione: "32GB DDR4 per piattaforme precedenti" },
    { nome: "G.Skill Ripjaws V DDR4 16GB 3200MHz", descrizione: "16GB DDR4 economica e affidabile" },
    { nome: "TeamGroup T-Force Delta DDR5 32GB 6000MHz", descrizione: "32GB DDR5 con RGB" },
    { nome: "Crucial Pro DDR5 32GB 5600MHz", descrizione: "32GB DDR5 senza fronzoli" },
    { nome: "Corsair Dominator Platinum DDR5 32GB 6000MHz", descrizione: "32GB DDR5 premium" },
    { nome: "Kingston Fury Beast DDR4 16GB 3200MHz", descrizione: "16GB DDR4 economica" },
    { nome: "G.Skill Trident Z5 Neo DDR5 32GB 6000MHz", descrizione: "32GB DDR5 ottimizzata per AMD" },
    { nome: "Corsair Vengeance DDR5 64GB 6000MHz", descrizione: "64GB DDR5 per workstation" },
    { nome: "Patriot Viper Elite DDR5 32GB 6000MHz", descrizione: "32GB DDR5 budget-friendly" },
  ],
  Motherboard: [
    { nome: "ASUS TUF Gaming B760-Plus", descrizione: "Motherboard Intel LGA1700 di fascia media" },
    { nome: "MSI MAG B650 Tomahawk WiFi", descrizione: "Motherboard AMD AM5 con WiFi" },
    { nome: "Gigabyte B760 Aorus Elite AX", descrizione: "Motherboard Intel LGA1700 con WiFi 6E" },
    { nome: "ASUS ROG Strix B650-A Gaming", descrizione: "Motherboard AMD AM5 con estetica bianca" },
    { nome: "MSI MPG Z790 Carbon WiFi", descrizione: "Motherboard Intel LGA1700 di fascia alta" },
    { nome: "Gigabyte X670E Aorus Master", descrizione: "Motherboard AMD AM5 top di gamma" },
    { nome: "ASRock B650 Pro RS", descrizione: "Motherboard AMD AM5 economica" },
    { nome: "ASUS Prime Z790-P", descrizione: "Motherboard Intel LGA1700 entry-level" },
    { nome: "MSI MAG Z790 Tomahawk WiFi", descrizione: "Motherboard Intel LGA1700 bilanciata" },
    { nome: "NZXT N7 B650E", descrizione: "Motherboard AMD AM5 dal design pulito" },
    { nome: "ASUS ROG Crosshair X670E Hero", descrizione: "Motherboard AMD AM5 enthusiast" },
    { nome: "Gigabyte B650 Aorus Pro AX", descrizione: "Motherboard AMD AM5 di qualità" },
  ],
  PSU: [
    { nome: "Corsair RM750x", descrizione: "750W 80+ Gold completamente modulare" },
    { nome: "Seasonic Focus GX-750", descrizione: "750W 80+ Gold di alta qualità" },
    { nome: "be quiet! Straight Power 12 750W", descrizione: "750W 80+ Platinum silenzioso" },
    { nome: "Corsair RM850x", descrizione: "850W 80+ Gold, più potenza per upgrade futuri" },
    { nome: "EVGA SuperNOVA G6 850", descrizione: "850W 80+ Gold completamente modulare" },
    { nome: "Corsair RM1000e", descrizione: "1000W 80+ Gold per build di potenza" },
    { nome: "Seasonic Prime TX-1000", descrizione: "1000W 80+ Titanium, il top dell'efficienza" },
    { nome: "be quiet! Dark Power 13 850W", descrizione: "850W 80+ Platinum di fascia alta" },
    { nome: "NZXT C850", descrizione: "850W 80+ Gold completamente modulare" },
    { nome: "MSI MPG A850G", descrizione: "850W 80+ Gold con connettore 12VHPWR" },
    { nome: "Cooler Master MWE Gold 750 V2", descrizione: "750W 80+ Gold economico" },
    { nome: "Thermaltake Toughpower GF3 850W", descrizione: "850W 80+ Gold con connettore PCIe 5.0" },
  ],
  Storage: [
    { nome: "Samsung 990 Pro 1TB", descrizione: "NVMe PCIe 4.0 di altissime prestazioni" },
    { nome: "WD Black SN850X 1TB", descrizione: "NVMe PCIe 4.0 con cache dinamica" },
    { nome: "Crucial T500 1TB", descrizione: "NVMe PCIe 4.0 ottimo rapporto qualità-prezzo" },
    { nome: "Samsung 980 Pro 1TB", descrizione: "NVMe PCIe 4.0 affidabile e veloce" },
    { nome: "WD Blue SN580 1TB", descrizione: "NVMe PCIe 4.0 economico per uso quotidiano" },
    { nome: "Samsung 870 Evo 1TB", descrizione: "SATA SSD di grande affidabilità" },
    { nome: "Crucial P3 Plus 1TB", descrizione: "NVMe PCIe 4.0 budget-friendly" },
    { nome: "SK Hynix Platinum P41 1TB", descrizione: "NVMe PCIe 4.0 tra i più veloci in circolazione" },
    { nome: "Kingston KC3000 1TB", descrizione: "NVMe PCIe 4.0 ad alte prestazioni" },
    { nome: "Seagate FireCuda 530 1TB", descrizione: "NVMe PCIe 4.0 resistente e veloce" },
    { nome: "TeamGroup MP44 1TB", descrizione: "NVMe PCIe 4.0 con DRAM cache" },
    { nome: "Corsair MP600 Pro XT 1TB", descrizione: "NVMe PCIe 4.0 con dissipatore integrato" },
  ],
  Case: [
    { nome: "NZXT H5 Flow", descrizione: "Case mid-tower con ottimo airflow" },
    { nome: "Corsair 4000D Airflow", descrizione: "Case mid-tower versatile" },
    { nome: "Fractal Design Pop Air", descrizione: "Case minimalista con buon airflow" },
    { nome: "Lian Li Lancool 216", descrizione: "Case mid-tower con airflow eccellente" },
    { nome: "Corsair 5000D Airflow", descrizione: "Case mid-tower spazioso con ottimo raffreddamento" },
    { nome: "NZXT H7 Flow", descrizione: "Case mid-tower più grande, airflow ottimale" },
    { nome: "Fractal Design North", descrizione: "Case dal design elegante in legno e mesh" },
    { nome: "Lian Li O11 Dynamic Evo", descrizione: "Case per raffreddamento a liquido e estetica" },
    { nome: "Cooler Master MasterBox Q300L", descrizione: "Case micro-ATX economico" },
    { nome: "be quiet! Silent Base 802", descrizione: "Case silenzioso con pannelli insonorizzati" },
    { nome: "Phanteks Eclipse G360A", descrizione: "Case mid-tower con airflow e RGB" },
    { nome: "Thermaltake View 270", descrizione: "Case con pannello in vetro temperato" },
  ],
};

export function getAlternatives(category, inputValue, count = 3) {
  const MAP = { cpu: "CPU", gpu: "GPU", ram: "RAM", motherboard: "Motherboard", psu: "PSU", storage: "Storage", case: "Case" };
  const dbKey = MAP[category.toLowerCase()] || "CPU";
  const db = CATEGORY_DB[dbKey];
  if (db && inputValue && normalizeForMatch(inputValue)) {
    const scored = db.items
      .map(p => ({ nome: p, sim: diceSimilarity(inputValue, p) }))
      .sort((a, b) => b.sim - a.sim)
      .slice(0, count)
      .map(s => ({ ...s, descrizione: `Corrispondenza al ${Math.round(s.sim * 100)}%` }));
    if (scored.length) return scored;
  }
  return (CATEGORY_ALTERNATIVES[dbKey] || CATEGORY_ALTERNATIVES.CPU).slice(0, count);
}

export function validateUserBuild(build) {
  const warnings = [];
  const cleaned = {};
  const invalidFields = [];
  const fieldCategories = {
    cpu: "CPU", gpu: "GPU", ram: "RAM",
    motherboard: "Motherboard", psu: "PSU",
    storage: "Storage", case: "Case",
  };

  for (const [field, value] of Object.entries(build)) {
    const v = (value || "").trim();
    if (!v) { cleaned[field] = ""; continue; }

    const category = fieldCategories[field] || "CPU";
    const result = validateComponentName(v, category);

    if (result.action === "nonsense" || result.action === "invalid") {
      warnings.push(result.message);
      cleaned[field] = "";
      invalidFields.push({ field, value: v, category });
    } else if (result.action === "not_found" || result.action === "suspicious") {
      warnings.push(result.message);
      cleaned[field] = v;
      invalidFields.push({ field, value: v, category });
    } else {
      cleaned[field] = v;
    }
  }

  return { cleaned, warnings, invalidFields };
}

export function parseAndValidateModelJson(rawText, userBuild, invalidFields) {
  let text = rawText.trim();
  const fenceMatch = text.match(/^```(?:json)?\s*\n?(.*?)\n?```\s*$/is);
  if (fenceMatch) text = fenceMatch[1].trim();

  const data = extractJsonObject(text);

  const analisi = String(data.analisi_build_attuale || "").trim();
  if (!analisi) throw new Error("analisi_build_attuale is required");

  const BOTTLENECK_COMPONENTS = ["cpu", "gpu", "ram", "storage", "psu", "monitor", "raffreddamento", "case", "motherboard", "scheda madre", "alimentatore", "dissipazione"];

  const COMPONENT_TAG_RE = /^\[([A-Za-z0-9_ /]+)\]\s*/;

  function simplifyForCompare(text) {
    return text.toLowerCase().replace(/[^a-z0-9àèéìòù]/g, " ").replace(/\s+/g, " ").trim();
  }

  function textSimilarity(a, b) {
    const sa = simplifyForCompare(a);
    const sb = simplifyForCompare(b);
    if (!sa || !sb) return 0;
    const wordsA = new Set(sa.split(" "));
    const wordsB = new Set(sb.split(" "));
    let intersection = 0;
    for (const w of wordsA) if (wordsB.has(w)) intersection++;
    const union = wordsA.size + wordsB.size - intersection;
    return union === 0 ? 0 : intersection / union;
  }

  const bottlenecks = coerceStrList(data.bottleneck_identificati, "bottleneck_identificati")
    .map(b => {
      const tagMatch = b.match(COMPONENT_TAG_RE);
      if (tagMatch) {
        return { text: b.replace(COMPONENT_TAG_RE, "").trim(), tag: tagMatch[1].trim(), raw: b };
      }
      return { text: b, tag: null, raw: b };
    })
    .filter(({ text, tag }) => {
      if (!text || text.length < 10) return false;
      const lower = text.toLowerCase();
      const hasComponent = (tag && BOTTLENECK_COMPONENTS.some(k => tag.toLowerCase().includes(k))) ||
                           BOTTLENECK_COMPONENTS.some(k => lower.includes(k));
      const hasKeyword = /\b(insuffic|coll?o|strozz|limit|bound|blocc|saturo|lento|rallent|vecchi|obsolet|surriscald|throttl|bottleneck|spreco|sottoutilizz|sprec)\b/i.test(lower);
      return hasComponent || hasKeyword;
    })
    .filter(({ text }) => textSimilarity(text, analisi) < 0.45)
    .map(({ raw }) => raw);
  const upgradeCats = parseUpgradeCategories(data.upgrade_consigliati);
  const dependents = parseDependent(data.upgrade_dipendenti);
  const GENERIC_WARNINGS = [
    "la build non è stabile", "la build attuale non è stabile",
    "la configurazione non è stabile", "la build non è bilanciata",
    "la build non è ottimale", "la configurazione non è ottimale",
    "il sistema non è stabile", "il sistema potrebbe non essere stabile",
    "build non stabile", "configurazione non stabile",
    "si consiglia di verificare", "si raccomanda di verificare",
    "prestare attenzione", "fare attenzione",
  ];

  const warnings = coerceStrList(data.avvertenze, "avvertenze").filter(w => {
    const lower = w.toLowerCase();
    if (lower.length < 20) return false;
    if (GENERIC_WARNINGS.some(g => lower.includes(g))) return false;
    return true;
  });

  const hallWarnings = [];
  const unknownForLLM = [];

  for (const cat of upgradeCats) {
    for (const opt of cat.opzioni) {
      const result = validateComponentName(opt.nome, cat.componente);
      if (result.action === "ok") continue;

      if (result.action === "corrected") {
        opt.nome = result.corrected;
      } else if (result.action === "suspicious" || result.action === "not_found") {
        unknownForLLM.push({ name: opt.nome, category: cat.componente, message: result.message });
      } else if (result.action === "invalid" || result.action === "nonsense") {
        hallWarnings.push(result.message);
      }
    }
  }

  const contradictionWarnings = checkInputContradiction(userBuild, analisi, invalidFields);
  const allWarnings = [...hallWarnings, ...contradictionWarnings, ...warnings];

  const suggerimenti = parseSuggestions(data.suggerimenti);

  return {
    analisi_build_attuale: analisi,
    bottleneck_identificati: bottlenecks,
    upgrade_consigliati: upgradeCats,
    upgrade_dipendenti: dependents,
    avvertenze: allWarnings,
    suggerimenti: suggerimenti.length > 0 ? suggerimenti : undefined,
    _hallucination_flags: hallWarnings.length > 0 ? hallWarnings : undefined,
    _unknown_components: unknownForLLM.length > 0 ? unknownForLLM : undefined,
  };
}