const CPU_META = {
  // Intel Core (desktop)
  "Intel Core i9-14900K":  { tier: 85, socket: "LGA1700", tdp: 125, year: 2023, cores: 24, ddr: 5 },
  "Intel Core i9-14900KF": { tier: 85, socket: "LGA1700", tdp: 125, year: 2023, cores: 24, ddr: 5 },
  "Intel Core i7-14700K":  { tier: 78, socket: "LGA1700", tdp: 125, year: 2023, cores: 20, ddr: 5 },
  "Intel Core i5-14600K":  { tier: 68, socket: "LGA1700", tdp: 125, year: 2023, cores: 14, ddr: 5 },
  "Intel Core i5-14500":   { tier: 60, socket: "LGA1700", tdp: 65,  year: 2023, cores: 14, ddr: 5 },
  "Intel Core i5-14500T":  { tier: 55, socket: "LGA1700", tdp: 35,  year: 2023, cores: 14, ddr: 5 },
  "Intel Core i5-14400":   { tier: 56, socket: "LGA1700", tdp: 65,  year: 2023, cores: 10, ddr: 5 },
  "Intel Core i5-14400F":  { tier: 56, socket: "LGA1700", tdp: 65,  year: 2024, cores: 10, ddr: 5 },
  "Intel Core i3-14100":   { tier: 40, socket: "LGA1700", tdp: 60,  year: 2023, cores: 4,  ddr: 5 },
  "Intel Core i9-13900K":  { tier: 82, socket: "LGA1700", tdp: 125, year: 2022, cores: 24, ddr: 5 },
  "Intel Core i7-13700K":  { tier: 75, socket: "LGA1700", tdp: 125, year: 2022, cores: 16, ddr: 5 },
  "Intel Core i5-13600K":  { tier: 65, socket: "LGA1700", tdp: 125, year: 2022, cores: 14, ddr: 5 },
  "Intel Core i5-13500":   { tier: 58, socket: "LGA1700", tdp: 65,  year: 2022, cores: 14, ddr: 5 },
  "Intel Core i5-13400":   { tier: 54, socket: "LGA1700", tdp: 65,  year: 2022, cores: 10, ddr: 5 },
  "Intel Core i5-13490F":  { tier: 56, socket: "LGA1700", tdp: 65,  year: 2023, cores: 10, ddr: 5 },
  "Intel Core i3-13100":   { tier: 38, socket: "LGA1700", tdp: 60,  year: 2022, cores: 4,  ddr: 5 },
  "Intel Core i9-12900K":  { tier: 75, socket: "LGA1700", tdp: 125, year: 2021, cores: 16, ddr: 5 },
  "Intel Core i7-12700K":  { tier: 67, socket: "LGA1700", tdp: 125, year: 2021, cores: 12, ddr: 5 },
  "Intel Core i5-12600K":  { tier: 58, socket: "LGA1700", tdp: 125, year: 2021, cores: 10, ddr: 5 },
  "Intel Core i5-12400":   { tier: 48, socket: "LGA1700", tdp: 65,  year: 2021, cores: 6,  ddr: 5 },
  "Intel Core i5-12490F":  { tier: 50, socket: "LGA1700", tdp: 65,  year: 2022, cores: 6,  ddr: 5 },
  "Intel Core i3-12100":   { tier: 35, socket: "LGA1700", tdp: 60,  year: 2021, cores: 4,  ddr: 5 },
  "Intel Core i9-11900K":  { tier: 62, socket: "LGA1200", tdp: 125, year: 2021, cores: 8,  ddr: 4 },
  "Intel Core i7-11700K":  { tier: 55, socket: "LGA1200", tdp: 125, year: 2021, cores: 8,  ddr: 4 },
  "Intel Core i5-11600K":  { tier: 48, socket: "LGA1200", tdp: 125, year: 2021, cores: 6,  ddr: 4 },
  "Intel Core i5-11400":   { tier: 44, socket: "LGA1200", tdp: 65,  year: 2021, cores: 6,  ddr: 4 },
  "Intel Core i3-10100":   { tier: 28, socket: "LGA1200", tdp: 65,  year: 2020, cores: 4,  ddr: 4 },
  "Intel Core i9-10900K":  { tier: 58, socket: "LGA1200", tdp: 125, year: 2020, cores: 10, ddr: 4 },
  "Intel Core i7-10700K":  { tier: 52, socket: "LGA1200", tdp: 125, year: 2020, cores: 8,  ddr: 4 },
  "Intel Core i5-10600K":  { tier: 44, socket: "LGA1200", tdp: 125, year: 2020, cores: 6,  ddr: 4 },
  "Intel Core i9-9900K":   { tier: 54, socket: "LGA1151", tdp: 95,  year: 2019, cores: 8,  ddr: 4 },
  "Intel Core i7-9700K":   { tier: 47, socket: "LGA1151", tdp: 95,  year: 2019, cores: 8,  ddr: 4 },
  "Intel Core i5-9600K":   { tier: 40, socket: "LGA1151", tdp: 95,  year: 2019, cores: 6,  ddr: 4 },
  "Intel Core i7-8700K":   { tier: 45, socket: "LGA1151", tdp: 95,  year: 2017, cores: 6,  ddr: 4 },
  "Intel Core i5-8400":    { tier: 35, socket: "LGA1151", tdp: 65,  year: 2017, cores: 6,  ddr: 4 },
  "Intel Core i7-7700K":   { tier: 40, socket: "LGA1151", tdp: 91,  year: 2017, cores: 4,  ddr: 4 },
  "Intel Core i5-7600K":   { tier: 33, socket: "LGA1151", tdp: 91,  year: 2017, cores: 4,  ddr: 4 },
  "Intel Core i7-6700K":   { tier: 38, socket: "LGA1151", tdp: 91,  year: 2015, cores: 4,  ddr: 4 },
  "Intel Core i5-6500":    { tier: 30, socket: "LGA1151", tdp: 65,  year: 2015, cores: 4,  ddr: 4 },
  "Intel Core i7-4790K":   { tier: 35, socket: "LGA1150", tdp: 88,  year: 2014, cores: 4,  ddr: 3 },
  "Intel Core i5-4690K":   { tier: 28, socket: "LGA1150", tdp: 88,  year: 2014, cores: 4,  ddr: 3 },
  "Intel Core i7-3770K":   { tier: 30, socket: "LGA1155", tdp: 77,  year: 2012, cores: 4,  ddr: 3 },
  "Intel Core i5-3570K":   { tier: 24, socket: "LGA1155", tdp: 77,  year: 2012, cores: 4,  ddr: 3 },
  "Intel Core i5-2500K":   { tier: 20, socket: "LGA1155", tdp: 95,  year: 2011, cores: 4,  ddr: 3 },
  "Intel Pentium G4620":   { tier: 12, socket: "LGA1151", tdp: 51,  year: 2017, cores: 2,  ddr: 4 },
  "Intel Pentium G4560":   { tier: 11, socket: "LGA1151", tdp: 54,  year: 2017, cores: 2,  ddr: 4 },
  "Intel Pentium G4400":   { tier: 8,  socket: "LGA1151", tdp: 54,  year: 2015, cores: 2,  ddr: 4 },
  "Intel Pentium G3258":   { tier: 10, socket: "LGA1150", tdp: 53,  year: 2014, cores: 2,  ddr: 3 },
  "Intel Celeron G3930":   { tier: 5,  socket: "LGA1151", tdp: 51,  year: 2017, cores: 2,  ddr: 4 },
  // AMD Ryzen (desktop)
  "AMD Ryzen 9 9950X":     { tier: 88, socket: "AM5", tdp: 170, year: 2024, cores: 16, ddr: 5 },
  "AMD Ryzen 9 9900X":     { tier: 82, socket: "AM5", tdp: 120, year: 2024, cores: 12, ddr: 5 },
  "AMD Ryzen 7 9800X3D":   { tier: 80, socket: "AM5", tdp: 120, year: 2024, cores: 8,  ddr: 5 },
  "AMD Ryzen 7 9700X":     { tier: 72, socket: "AM5", tdp: 65,  year: 2024, cores: 8,  ddr: 5 },
  "AMD Ryzen 5 9600X":     { tier: 62, socket: "AM5", tdp: 65,  year: 2024, cores: 6,  ddr: 5 },
  "AMD Ryzen 9 7950X":     { tier: 85, socket: "AM5", tdp: 170, year: 2022, cores: 16, ddr: 5 },
  "AMD Ryzen 9 7950X3D":   { tier: 87, socket: "AM5", tdp: 120, year: 2023, cores: 16, ddr: 5 },
  "AMD Ryzen 9 7900X":     { tier: 78, socket: "AM5", tdp: 170, year: 2022, cores: 12, ddr: 5 },
  "AMD Ryzen 9 7900":      { tier: 74, socket: "AM5", tdp: 65,  year: 2023, cores: 12, ddr: 5 },
  "AMD Ryzen 7 7800X3D":   { tier: 76, socket: "AM5", tdp: 120, year: 2023, cores: 8,  ddr: 5 },
  "AMD Ryzen 7 7700X":     { tier: 68, socket: "AM5", tdp: 105, year: 2022, cores: 8,  ddr: 5 },
  "AMD Ryzen 7 7700":      { tier: 64, socket: "AM5", tdp: 65,  year: 2023, cores: 8,  ddr: 5 },
  "AMD Ryzen 5 7600X":     { tier: 58, socket: "AM5", tdp: 105, year: 2022, cores: 6,  ddr: 5 },
  "AMD Ryzen 5 7600":      { tier: 55, socket: "AM5", tdp: 65,  year: 2023, cores: 6,  ddr: 5 },
  "AMD Ryzen 5 7500F":     { tier: 52, socket: "AM5", tdp: 65,  year: 2023, cores: 6,  ddr: 5 },
  "AMD Ryzen 5 8400F":     { tier: 48, socket: "AM5", tdp: 65,  year: 2024, cores: 6,  ddr: 5 },
  "AMD Ryzen 7 8700G":     { tier: 50, socket: "AM5", tdp: 65,  year: 2024, cores: 8,  ddr: 5, igpu: true },
  "AMD Ryzen 5 8600G":     { tier: 44, socket: "AM5", tdp: 65,  year: 2024, cores: 6,  ddr: 5, igpu: true },
  "AMD Ryzen 5 8500G":     { tier: 38, socket: "AM5", tdp: 65,  year: 2024, cores: 6,  ddr: 5, igpu: true },
  "AMD Ryzen 3 8300G":     { tier: 30, socket: "AM5", tdp: 65,  year: 2024, cores: 4,  ddr: 5, igpu: true },
  "AMD Ryzen 9 5950X":     { tier: 78, socket: "AM4", tdp: 105, year: 2020, cores: 16, ddr: 4 },
  "AMD Ryzen 9 5900X":     { tier: 72, socket: "AM4", tdp: 105, year: 2020, cores: 12, ddr: 4 },
  "AMD Ryzen 7 5800X3D":   { tier: 70, socket: "AM4", tdp: 105, year: 2022, cores: 8,  ddr: 4 },
  "AMD Ryzen 7 5700X3D":   { tier: 66, socket: "AM4", tdp: 105, year: 2024, cores: 8,  ddr: 4 },
  "AMD Ryzen 7 5800X":     { tier: 62, socket: "AM4", tdp: 105, year: 2020, cores: 8,  ddr: 4 },
  "AMD Ryzen 7 5700X":     { tier: 58, socket: "AM4", tdp: 65,  year: 2022, cores: 8,  ddr: 4 },
  "AMD Ryzen 5 5600X":     { tier: 50, socket: "AM4", tdp: 65,  year: 2020, cores: 6,  ddr: 4 },
  "AMD Ryzen 5 5600":      { tier: 48, socket: "AM4", tdp: 65,  year: 2022, cores: 6,  ddr: 4 },
  "AMD Ryzen 5 5500":      { tier: 38, socket: "AM4", tdp: 65,  year: 2022, cores: 6,  ddr: 4 },
  "AMD Ryzen 7 5700G":     { tier: 48, socket: "AM4", tdp: 65,  year: 2021, cores: 8,  ddr: 4, igpu: true },
  "AMD Ryzen 5 5600G":     { tier: 40, socket: "AM4", tdp: 65,  year: 2021, cores: 6,  ddr: 4, igpu: true },
  "AMD Ryzen 7 3800X":     { tier: 48, socket: "AM4", tdp: 105, year: 2019, cores: 8,  ddr: 4 },
  "AMD Ryzen 5 3600":      { tier: 40, socket: "AM4", tdp: 65,  year: 2019, cores: 6,  ddr: 4 },
  "AMD Ryzen 7 2700X":     { tier: 38, socket: "AM4", tdp: 105, year: 2018, cores: 8,  ddr: 4 },
  "AMD Ryzen 5 2600":      { tier: 32, socket: "AM4", tdp: 65,  year: 2018, cores: 6,  ddr: 4 },
  "AMD Ryzen 7 1700":      { tier: 34, socket: "AM4", tdp: 65,  year: 2017, cores: 8,  ddr: 4 },
  "AMD Ryzen 5 1600":      { tier: 28, socket: "AM4", tdp: 65,  year: 2017, cores: 6,  ddr: 4 },
  // Intel Ultra (desktop)
  "Intel Core Ultra 9 285K": { tier: 86, socket: "LGA1851", tdp: 125, year: 2024, cores: 24, ddr: 5 },
  "Intel Core Ultra 9 285":  { tier: 84, socket: "LGA1851", tdp: 65,  year: 2025, cores: 24, ddr: 5 },
  "Intel Core Ultra 7 265K": { tier: 76, socket: "LGA1851", tdp: 125, year: 2024, cores: 20, ddr: 5 },
  "Intel Core Ultra 7 265KF":{ tier: 76, socket: "LGA1851", tdp: 125, year: 2024, cores: 20, ddr: 5 },
  "Intel Core Ultra 7 265":  { tier: 74, socket: "LGA1851", tdp: 65,  year: 2025, cores: 20, ddr: 5 },
  "Intel Core Ultra 5 245K": { tier: 64, socket: "LGA1851", tdp: 125, year: 2024, cores: 14, ddr: 5 },
  "Intel Core Ultra 5 245KF":{ tier: 64, socket: "LGA1851", tdp: 125, year: 2024, cores: 14, ddr: 5 },
  "Intel Core Ultra 5 245":  { tier: 62, socket: "LGA1851", tdp: 65,  year: 2025, cores: 14, ddr: 5 },
};

export { CPU_META };

const GPU_META = {
  // NVIDIA RTX 50 series
  "NVIDIA GeForce RTX 5090":     { tier: 100, minPsu: 1000, tdp: 575, vram: 32, year: 2025, gen: "Blackwell" },
  "NVIDIA GeForce RTX 5080":     { tier: 82,  minPsu: 850,  tdp: 360, vram: 16, year: 2025, gen: "Blackwell" },
  "NVIDIA GeForce RTX 5070 Ti":  { tier: 68,  minPsu: 700,  tdp: 300, vram: 16, year: 2025, gen: "Blackwell" },
  "NVIDIA GeForce RTX 5070":     { tier: 60,  minPsu: 650,  tdp: 250, vram: 12, year: 2025, gen: "Blackwell" },
  "NVIDIA GeForce RTX 5060 Ti":  { tier: 48,  minPsu: 550,  tdp: 180, vram: 16, year: 2025, gen: "Blackwell" },
  "NVIDIA GeForce RTX 5060":     { tier: 42,  minPsu: 500,  tdp: 150, vram: 8,  year: 2025, gen: "Blackwell" },
  // NVIDIA RTX 40 series
  "NVIDIA GeForce RTX 4090":     { tier: 98,  minPsu: 850,  tdp: 450, vram: 24, year: 2022, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4080 Super": { tier: 78, minPsu: 750,  tdp: 320, vram: 16, year: 2024, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4080":     { tier: 74,  minPsu: 750,  tdp: 320, vram: 16, year: 2022, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4070 Ti Super": { tier: 66, minPsu: 700, tdp: 285, vram: 16, year: 2024, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4070 Ti":  { tier: 62,  minPsu: 700,  tdp: 285, vram: 12, year: 2023, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4070 Super": { tier: 58, minPsu: 650,  tdp: 220, vram: 12, year: 2024, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4070":     { tier: 52,  minPsu: 650,  tdp: 200, vram: 12, year: 2023, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4060 Ti 16GB": { tier: 44, minPsu: 550, tdp: 165, vram: 16, year: 2023, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4060 Ti 8GB": { tier: 43,  minPsu: 550, tdp: 160, vram: 8,  year: 2023, gen: "Ada Lovelace" },
  "NVIDIA GeForce RTX 4060":     { tier: 38,  minPsu: 500,  tdp: 115, vram: 8,  year: 2023, gen: "Ada Lovelace" },
  // NVIDIA RTX 30 series
  "NVIDIA GeForce RTX 3090 Ti":  { tier: 72,  minPsu: 850,  tdp: 450, vram: 24, year: 2022, gen: "Ampere" },
  "NVIDIA GeForce RTX 3090":     { tier: 66,  minPsu: 750,  tdp: 350, vram: 24, year: 2020, gen: "Ampere" },
  "NVIDIA GeForce RTX 3080 Ti":  { tier: 64,  minPsu: 750,  tdp: 350, vram: 12, year: 2021, gen: "Ampere" },
  "NVIDIA GeForce RTX 3080":     { tier: 58,  minPsu: 750,  tdp: 320, vram: 10, year: 2020, gen: "Ampere" },
  "NVIDIA GeForce RTX 3080 12GB":{ tier: 60,  minPsu: 750,  tdp: 350, vram: 12, year: 2022, gen: "Ampere" },
  "NVIDIA GeForce RTX 3070 Ti":  { tier: 50,  minPsu: 650,  tdp: 290, vram: 8,  year: 2021, gen: "Ampere" },
  "NVIDIA GeForce RTX 3070":     { tier: 46,  minPsu: 650,  tdp: 220, vram: 8,  year: 2020, gen: "Ampere" },
  "NVIDIA GeForce RTX 3060 Ti":  { tier: 40,  minPsu: 600,  tdp: 200, vram: 8,  year: 2020, gen: "Ampere" },
  "NVIDIA GeForce RTX 3060 12GB":{ tier: 34,  minPsu: 550,  tdp: 170, vram: 12, year: 2021, gen: "Ampere" },
  "NVIDIA GeForce RTX 3060 8GB": { tier: 30,  minPsu: 550,  tdp: 170, vram: 8,  year: 2022, gen: "Ampere" },
  "NVIDIA GeForce RTX 3050":     { tier: 20,  minPsu: 450,  tdp: 130, vram: 8,  year: 2022, gen: "Ampere" },
  // NVIDIA GTX 16 series
  "NVIDIA GeForce GTX 1660 Ti":  { tier: 24,  minPsu: 450,  tdp: 120, vram: 6,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce GTX 1660 Super": { tier: 22, minPsu: 450,  tdp: 125, vram: 6,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce GTX 1660":     { tier: 18,  minPsu: 450,  tdp: 120, vram: 6,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce GTX 1650 Super": { tier: 16, minPsu: 350,  tdp: 100, vram: 4,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce GTX 1650":     { tier: 12,  minPsu: 300,  tdp: 75,  vram: 4,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce GTX 1630":     { tier: 8,   minPsu: 300,  tdp: 75,  vram: 4,  year: 2022, gen: "Turing" },
  // RTX 20 series
  "NVIDIA GeForce RTX 2080 Ti":  { tier: 52,  minPsu: 650,  tdp: 250, vram: 11, year: 2018, gen: "Turing" },
  "NVIDIA GeForce RTX 2080 Super": { tier: 46, minPsu: 650,  tdp: 250, vram: 8,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce RTX 2080":     { tier: 42,  minPsu: 650,  tdp: 215, vram: 8,  year: 2018, gen: "Turing" },
  "NVIDIA GeForce RTX 2070 Super": { tier: 38, minPsu: 550,  tdp: 215, vram: 8,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce RTX 2070":     { tier: 34,  minPsu: 550,  tdp: 175, vram: 8,  year: 2018, gen: "Turing" },
  "NVIDIA GeForce RTX 2060 Super": { tier: 32, minPsu: 500,  tdp: 175, vram: 8,  year: 2019, gen: "Turing" },
  "NVIDIA GeForce RTX 2060":     { tier: 28,  minPsu: 500,  tdp: 160, vram: 6,  year: 2019, gen: "Turing" },
  // GTX 10 series
  "NVIDIA GeForce GTX 1080 Ti":  { tier: 36,  minPsu: 600,  tdp: 250, vram: 11, year: 2017, gen: "Pascal" },
  "NVIDIA GeForce GTX 1080":     { tier: 28,  minPsu: 500,  tdp: 180, vram: 8,  year: 2016, gen: "Pascal" },
  "NVIDIA GeForce GTX 1070 Ti":  { tier: 26,  minPsu: 500,  tdp: 180, vram: 8,  year: 2017, gen: "Pascal" },
  "NVIDIA GeForce GTX 1070":     { tier: 24,  minPsu: 500,  tdp: 150, vram: 8,  year: 2016, gen: "Pascal" },
  "NVIDIA GeForce GTX 1060 6GB": { tier: 18,  minPsu: 400,  tdp: 120, vram: 6,  year: 2016, gen: "Pascal" },
  "NVIDIA GeForce GTX 1060 3GB": { tier: 15,  minPsu: 400,  tdp: 120, vram: 3,  year: 2016, gen: "Pascal" },
  "NVIDIA GeForce GTX 1050 Ti":  { tier: 10,  minPsu: 300,  tdp: 75,  vram: 4,  year: 2016, gen: "Pascal" },
  "NVIDIA GeForce GTX 1050":     { tier: 8,   minPsu: 300,  tdp: 75,  vram: 2,  year: 2016, gen: "Pascal" },
  // AMD RX 9000 series
  "AMD Radeon RX 9070 XT":      { tier: 72,  minPsu: 750,  tdp: 340, vram: 16, year: 2025, gen: "RDNA 4" },
  "AMD Radeon RX 9070":         { tier: 62,  minPsu: 650,  tdp: 260, vram: 16, year: 2025, gen: "RDNA 4" },
  "AMD Radeon RX 9060 XT":      { tier: 46,  minPsu: 550,  tdp: 190, vram: 8,  year: 2025, gen: "RDNA 4" },
  // AMD RX 7000 series
  "AMD Radeon RX 7900 XTX":     { tier: 76,  minPsu: 800,  tdp: 355, vram: 24, year: 2022, gen: "RDNA 3" },
  "AMD Radeon RX 7900 XT":      { tier: 68,  minPsu: 750,  tdp: 315, vram: 20, year: 2022, gen: "RDNA 3" },
  "AMD Radeon RX 7900 GRE":     { tier: 58,  minPsu: 700,  tdp: 260, vram: 16, year: 2024, gen: "RDNA 3" },
  "AMD Radeon RX 7800 XT":      { tier: 54,  minPsu: 650,  tdp: 263, vram: 16, year: 2023, gen: "RDNA 3" },
  "AMD Radeon RX 7700 XT":      { tier: 46,  minPsu: 600,  tdp: 245, vram: 12, year: 2023, gen: "RDNA 3" },
  "AMD Radeon RX 7600 XT":      { tier: 36,  minPsu: 550,  tdp: 190, vram: 16, year: 2024, gen: "RDNA 3" },
  "AMD Radeon RX 7600":         { tier: 32,  minPsu: 500,  tdp: 165, vram: 8,  year: 2023, gen: "RDNA 3" },
  // AMD RX 6000 series
  "AMD Radeon RX 6950 XT":      { tier: 60,  minPsu: 750,  tdp: 335, vram: 16, year: 2022, gen: "RDNA 2" },
  "AMD Radeon RX 6900 XT":      { tier: 56,  minPsu: 750,  tdp: 300, vram: 16, year: 2020, gen: "RDNA 2" },
  "AMD Radeon RX 6800 XT":      { tier: 52,  minPsu: 650,  tdp: 300, vram: 16, year: 2020, gen: "RDNA 2" },
  "AMD Radeon RX 6800":         { tier: 48,  minPsu: 650,  tdp: 250, vram: 16, year: 2020, gen: "RDNA 2" },
  "AMD Radeon RX 6750 XT":      { tier: 40,  minPsu: 550,  tdp: 250, vram: 12, year: 2022, gen: "RDNA 2" },
  "AMD Radeon RX 6700 XT":      { tier: 38,  minPsu: 550,  tdp: 230, vram: 12, year: 2021, gen: "RDNA 2" },
  "AMD Radeon RX 6700":         { tier: 34,  minPsu: 500,  tdp: 175, vram: 10, year: 2021, gen: "RDNA 2" },
  "AMD Radeon RX 6650 XT":      { tier: 34,  minPsu: 500,  tdp: 175, vram: 8,  year: 2022, gen: "RDNA 2" },
  "AMD Radeon RX 6600 XT":      { tier: 32,  minPsu: 500,  tdp: 160, vram: 8,  year: 2021, gen: "RDNA 2" },
  "AMD Radeon RX 6600":         { tier: 26,  minPsu: 450,  tdp: 132, vram: 8,  year: 2021, gen: "RDNA 2" },
  "AMD Radeon RX 6500 XT":      { tier: 14,  minPsu: 400,  tdp: 107, vram: 4,  year: 2022, gen: "RDNA 2" },
  "AMD Radeon RX 6400":         { tier: 10,  minPsu: 300,  tdp: 53,  vram: 4,  year: 2022, gen: "RDNA 2" },
  // AMD RX 5000 series
  "AMD Radeon RX 5700 XT":      { tier: 32,  minPsu: 600,  tdp: 225, vram: 8,  year: 2019, gen: "RDNA" },
  "AMD Radeon RX 5600 XT":      { tier: 24,  minPsu: 450,  tdp: 150, vram: 6,  year: 2020, gen: "RDNA" },
  "AMD Radeon RX 5500 XT":      { tier: 16,  minPsu: 450,  tdp: 130, vram: 8,  year: 2019, gen: "RDNA" },
  // AMD RX 500 series
  "AMD Radeon RX 580":          { tier: 18,  minPsu: 450,  tdp: 185, vram: 8,  year: 2017, gen: "GCN" },
  "AMD Radeon RX 570":          { tier: 14,  minPsu: 450,  tdp: 150, vram: 4,  year: 2017, gen: "GCN" },
  "AMD Radeon RX 480":          { tier: 16,  minPsu: 450,  tdp: 150, vram: 8,  year: 2016, gen: "GCN" },
  // Intel Arc
  "Intel Arc A770 16GB":        { tier: 34,  minPsu: 600,  tdp: 225, vram: 16, year: 2022, gen: "Alchemist" },
  "Intel Arc A750":             { tier: 30,  minPsu: 600,  tdp: 225, vram: 8,  year: 2022, gen: "Alchemist" },
  "Intel Arc B580":             { tier: 38,  minPsu: 500,  tdp: 190, vram: 12, year: 2024, gen: "Battlemage" },
};

export { GPU_META };

function normalizeForMatch(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function diceSimilarity(a, b) {
  const na = normalizeForMatch(a);
  const nb = normalizeForMatch(b);
  if (na === nb) return 1;
  const bigrams = (s) => {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.substring(i, i + 2));
    return set;
  };
  const s1 = bigrams(na);
  const s2 = bigrams(nb);
  if (s1.size === 0 || s2.size === 0) return 0;
  let intersection = 0;
  for (const bg of s1) if (s2.has(bg)) intersection++;
  return (2 * intersection) / (s1.size + s2.size);
}

const MATCH_THRESHOLD = 0.45;

function findBestMeta(name, metaMap) {
  const normalized = normalizeForMatch(name);
  if (!normalized) return null;
  let bestKey = null;
  let bestSim = 0;
  for (const key of Object.keys(metaMap)) {
    const sim = diceSimilarity(name, key);
    if (sim > bestSim) { bestSim = sim; bestKey = key; }
  }
  if (bestKey && bestSim >= MATCH_THRESHOLD) {
    return { ...metaMap[bestKey], _matchedName: bestKey, _similarity: bestSim };
  }
  return null;
}

export function getCpuMeta(name) {
  return findBestMeta(name, CPU_META);
}

export function getGpuMeta(name) {
  return findBestMeta(name, GPU_META);
}

export function extractWattage(psuStr) {
  if (!psuStr) return null;
  const match = psuStr.match(/(\d+)\s*W/i);
  return match ? parseInt(match[1], 10) : null;
}

export function detectDdrGen(ramStr) {
  if (!ramStr) return null;
  const lower = ramStr.toLowerCase();
  if (lower.includes("ddr5") || lower.includes("ddr 5")) return 5;
  if (lower.includes("ddr4") || lower.includes("ddr 4")) return 4;
  if (lower.includes("ddr3") || lower.includes("ddr 3")) return 3;
  return null;
}

export const BUDGET_RANGES = {
  GPU: [
    { max: 300, label: "fino a 300€", tiers: [30, 40] },
    { max: 500, label: "300-500€", tiers: [40, 52] },
    { max: 800, label: "500-800€", tiers: [50, 62] },
    { max: 1200, label: "800-1200€", tiers: [60, 72] },
    { max: Infinity, label: "oltre 1200€", tiers: [70, 100] },
  ],
  CPU: [
    { max: 200, label: "fino a 200€", tiers: [40, 55] },
    { max: 400, label: "200-400€", tiers: [55, 72] },
    { max: 600, label: "400-600€", tiers: [70, 82] },
    { max: Infinity, label: "oltre 600€", tiers: [80, 88] },
  ],
};

const CHIPSET_META = {
  // AMD AM5
  "A620":  { socket: "AM5",  tier: 30, ddr: 5, pcie: 4 },
  "B650":  { socket: "AM5",  tier: 50, ddr: 5, pcie: 5 },
  "B650E": { socket: "AM5",  tier: 55, ddr: 5, pcie: 5 },
  "X670":  { socket: "AM5",  tier: 70, ddr: 5, pcie: 5 },
  "X670E": { socket: "AM5",  tier: 75, ddr: 5, pcie: 5 },
  "X870":  { socket: "AM5",  tier: 80, ddr: 5, pcie: 5 },
  "X870E": { socket: "AM5",  tier: 85, ddr: 5, pcie: 5 },
  // Intel LGA1700
  "H610":  { socket: "LGA1700", tier: 25, ddr: 5, pcie: 4 },
  "B660":  { socket: "LGA1700", tier: 40, ddr: 5, pcie: 5 },
  "B760":  { socket: "LGA1700", tier: 45, ddr: 5, pcie: 5 },
  "Z690":  { socket: "LGA1700", tier: 60, ddr: 5, pcie: 5 },
  "Z790":  { socket: "LGA1700", tier: 65, ddr: 5, pcie: 5 },
  // Intel LGA1851
  "H810":  { socket: "LGA1851", tier: 25, ddr: 5, pcie: 4 },
  "B860":  { socket: "LGA1851", tier: 45, ddr: 5, pcie: 5 },
  "Z890":  { socket: "LGA1851", tier: 65, ddr: 5, pcie: 5 },
  // Intel LGA1200
  "H410":  { socket: "LGA1200", tier: 15, ddr: 4, pcie: 3 },
  "H510":  { socket: "LGA1200", tier: 20, ddr: 4, pcie: 4 },
  "B460":  { socket: "LGA1200", tier: 35, ddr: 4, pcie: 3 },
  "B560":  { socket: "LGA1200", tier: 40, ddr: 4, pcie: 4 },
  "Z490":  { socket: "LGA1200", tier: 55, ddr: 4, pcie: 3 },
  "Z590":  { socket: "LGA1200", tier: 60, ddr: 4, pcie: 4 },
  // Intel LGA1151
  "H310":  { socket: "LGA1151", tier: 12, ddr: 4, pcie: 3 },
  "B360":  { socket: "LGA1151", tier: 28, ddr: 4, pcie: 3 },
  "B365":  { socket: "LGA1151", tier: 28, ddr: 4, pcie: 3 },
  "Z370":  { socket: "LGA1151", tier: 45, ddr: 4, pcie: 3 },
  "Z390":  { socket: "LGA1151", tier: 50, ddr: 4, pcie: 3 },
  // AMD AM4
  "A320":  { socket: "AM4",  tier: 15, ddr: 4, pcie: 3 },
  "B350":  { socket: "AM4",  tier: 28, ddr: 4, pcie: 3 },
  "B450":  { socket: "AM4",  tier: 32, ddr: 4, pcie: 3 },
  "X370":  { socket: "AM4",  tier: 42, ddr: 4, pcie: 3 },
  "X470":  { socket: "AM4",  tier: 45, ddr: 4, pcie: 3 },
  "B550":  { socket: "AM4",  tier: 50, ddr: 4, pcie: 4 },
  "X570":  { socket: "AM4",  tier: 62, ddr: 4, pcie: 4 },
};

export function detectChipset(moboName) {
  if (!moboName) return null;
  const upper = moboName.toUpperCase();
  const entries = Object.entries(CHIPSET_META).sort((a, b) => b[0].length - a[0].length);
  for (const [chipset, meta] of entries) {
    if (upper.includes(chipset)) return { chipset, ...meta };
  }
  return null;
}

export function getSocketChipsets(socket) {
  return Object.entries(CHIPSET_META)
    .filter(([_, m]) => m.socket === socket)
    .sort((a, b) => b[1].tier - a[1].tier);
}
