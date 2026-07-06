const ALLOWED_FASCE = new Set(["budget", "medio", "alto"]);

const CPU_DB = [
  "Intel Core i9-14900K", "Intel Core i9-14900KF", "Intel Core i9-14900KS",
  "Intel Core i9-13900K", "Intel Core i9-13900KF", "Intel Core i9-13900KS",
  "Intel Core i9-12900K", "Intel Core i9-12900KF", "Intel Core i9-12900KS",
  "Intel Core i7-14700K", "Intel Core i7-14700KF",
  "Intel Core i7-13700K", "Intel Core i7-13700KF",
  "Intel Core i7-12700K", "Intel Core i7-12700KF", "Intel Core i7-12700",
  "Intel Core i5-14600K", "Intel Core i5-14600KF",
  "Intel Core i5-13600K", "Intel Core i5-13600KF",
  "Intel Core i5-13400", "Intel Core i5-13400F", "Intel Core i5-13500",
  "Intel Core i5-12600K", "Intel Core i5-12400", "Intel Core i5-12400F",
  "Intel Core i5-14400", "Intel Core i5-14400F",
  "Intel Core i3-14100", "Intel Core i3-14100F",
  "Intel Core i3-13100", "Intel Core i3-13100F",
  "Intel Core i3-12100", "Intel Core i3-12100F",
  "Intel Core i9-11900K", "Intel Core i7-11700K", "Intel Core i5-11400",
  "Intel Core i5-11600K",
  "AMD Ryzen 9 9950X", "AMD Ryzen 9 9900X", "AMD Ryzen 7 9800X3D",
  "AMD Ryzen 7 9700X", "AMD Ryzen 5 9600X",
  "AMD Ryzen 9 7950X", "AMD Ryzen 9 7950X3D", "AMD Ryzen 9 7900X",
  "AMD Ryzen 9 7900", "AMD Ryzen 7 7800X3D", "AMD Ryzen 7 7700X",
  "AMD Ryzen 7 7700", "AMD Ryzen 5 7600X", "AMD Ryzen 5 7600",
  "AMD Ryzen 5 7500F", "AMD Ryzen 5 8400F",
  "AMD Ryzen 9 5950X", "AMD Ryzen 9 5900X",
  "AMD Ryzen 7 5800X3D", "AMD Ryzen 7 5800X", "AMD Ryzen 7 5700X",
  "AMD Ryzen 5 5600X", "AMD Ryzen 5 5600", "AMD Ryzen 5 5500",
  "AMD Ryzen 7 5700G", "AMD Ryzen 5 5600G",
  "AMD Ryzen 9 3950X", "AMD Ryzen 7 3800X", "AMD Ryzen 5 3600X",
  "AMD Ryzen 5 3600",
  "AMD Ryzen 7 8700G", "AMD Ryzen 5 8600G",
  "AMD Threadripper 7980X", "AMD Threadripper 7960X",
  "AMD Threadripper 5975WX", "AMD Threadripper 3970X",
];

const GPU_DB = [
  "NVIDIA GeForce RTX 5090", "NVIDIA GeForce RTX 5080", "NVIDIA GeForce RTX 5070 Ti",
  "NVIDIA GeForce RTX 5070", "NVIDIA GeForce RTX 5060 Ti", "NVIDIA GeForce RTX 5060",
  "NVIDIA GeForce RTX 4090", "NVIDIA GeForce RTX 4080 Super", "NVIDIA GeForce RTX 4080",
  "NVIDIA GeForce RTX 4070 Ti Super", "NVIDIA GeForce RTX 4070 Ti",
  "NVIDIA GeForce RTX 4070 Super", "NVIDIA GeForce RTX 4070",
  "NVIDIA GeForce RTX 4060 Ti", "NVIDIA GeForce RTX 4060",
  "NVIDIA GeForce RTX 3090 Ti", "NVIDIA GeForce RTX 3090",
  "NVIDIA GeForce RTX 3080 Ti", "NVIDIA GeForce RTX 3080",
  "NVIDIA GeForce RTX 3070 Ti", "NVIDIA GeForce RTX 3070",
  "NVIDIA GeForce RTX 3060 Ti", "NVIDIA GeForce RTX 3060",
  "NVIDIA GeForce RTX 3050",
  "NVIDIA GeForce RTX 2080 Ti", "NVIDIA GeForce RTX 2070 Super",
  "NVIDIA GeForce GTX 1080 Ti", "NVIDIA GeForce GTX 1660 Super",
  "NVIDIA GeForce GTX 1660", "NVIDIA GeForce GTX 1650 Super", "NVIDIA GeForce GTX 1650",
  "NVIDIA GeForce GTX 1060 6GB",
  "AMD Radeon RX 9070 XT", "AMD Radeon RX 9070", "AMD Radeon RX 9060 XT",
  "AMD Radeon RX 7900 XTX", "AMD Radeon RX 7900 XT", "AMD Radeon RX 7900 GRE",
  "AMD Radeon RX 7800 XT", "AMD Radeon RX 7700 XT",
  "AMD Radeon RX 7600 XT", "AMD Radeon RX 7600",
  "AMD Radeon RX 6950 XT", "AMD Radeon RX 6900 XT",
  "AMD Radeon RX 6800 XT", "AMD Radeon RX 6800",
  "AMD Radeon RX 6750 XT", "AMD Radeon RX 6700 XT", "AMD Radeon RX 6700",
  "AMD Radeon RX 6650 XT", "AMD Radeon RX 6600 XT", "AMD Radeon RX 6600",
  "AMD Radeon RX 6500 XT", "AMD Radeon RX 6400",
  "AMD Radeon RX 5700 XT", "AMD Radeon RX 5600 XT",
  "Intel Arc A770 16GB", "Intel Arc A750", "Intel Arc A580", "Intel Arc A380",
  "Intel Arc B580", "Intel Arc B570",
];

const RAM_DB = [
  "Corsair Vengeance DDR5 32GB 5600MHz", "Corsair Vengeance DDR5 32GB 6000MHz",
  "Corsair Vengeance DDR5 64GB 6000MHz", "Corsair Vengeance DDR5 16GB 5200MHz",
  "Corsair Vengeance DDR4 32GB 3200MHz", "Corsair Vengeance DDR4 16GB 3200MHz",
  "Corsair Dominator Platinum DDR5 32GB 6000MHz",
  "Corsair Dominator Titanium DDR5 32GB 7200MHz",
  "G.Skill Trident Z5 DDR5 32GB 6000MHz", "G.Skill Trident Z5 DDR5 64GB 6000MHz",
  "G.Skill Trident Z5 Neo DDR5 32GB 6000MHz",
  "G.Skill Trident Z RGB DDR4 32GB 3200MHz",
  "G.Skill Ripjaws V DDR4 32GB 3200MHz", "G.Skill Ripjaws V DDR4 16GB 3200MHz",
  "G.Skill Flare X5 DDR5 32GB 6000MHz",
  "Kingston Fury Beast DDR5 32GB 5600MHz", "Kingston Fury Beast DDR5 32GB 6000MHz",
  "Kingston Fury Beast DDR4 32GB 3200MHz",
  "Kingston Fury Renegade DDR4 32GB 3600MHz",
  "TeamGroup T-Force Delta DDR5 32GB 6000MHz",
  "TeamGroup T-Force Vulcan DDR5 32GB 5600MHz",
  "TeamGroup T-Force Vulcan DDR4 32GB 3200MHz",
  "Crucial Pro DDR5 32GB 5600MHz", "Crucial Pro DDR5 64GB 5600MHz",
  "Crucial Ballistix DDR4 32GB 3200MHz",
  "ADATA XPG Lancer DDR5 32GB 6000MHz",
  "ADATA XPG Spectrix D50 DDR4 32GB 3200MHz",
  "Patriot Viper Elite DDR5 32GB 6000MHz",
  "Patriot Viper Steel DDR4 32GB 3200MHz",
];

const MOTHERBOARD_DB = [
  "ASUS ROG Crosshair X670E Hero", "ASUS ROG Crosshair X870E Hero",
  "ASUS ROG Strix Z790-E Gaming", "ASUS ROG Strix B650-A Gaming",
  "ASUS ROG Strix B760-F Gaming", "ASUS ROG Strix Z690-A Gaming",
  "ASUS TUF Gaming Z790-Plus", "ASUS TUF Gaming B760-Plus",
  "ASUS TUF Gaming B650-Plus", "ASUS TUF Gaming X670E-Plus",
  "ASUS Prime Z790-P", "ASUS Prime B760-PLUS", "ASUS Prime B650-PLUS",
  "ASUS ProArt Z790 Creator", "ASUS ProArt B650 Creator",
  "MSI MPG Z790 Carbon WiFi", "MSI MPG B650 Carbon WiFi",
  "MSI MPG Z690 Edge WiFi", "MSI MAG Z790 Tomahawk WiFi",
  "MSI MAG B650 Tomahawk WiFi", "MSI MAG B760 Tomahawk WiFi",
  "MSI Pro Z790-P", "MSI Pro B760-P", "MSI Pro B650-P",
  "MSI PRO B650M-A WiFi",
  "Gigabyte Z790 Aorus Master", "Gigabyte Z790 Aorus Elite AX",
  "Gigabyte B650 Aorus Pro AX", "Gigabyte B760 Aorus Elite AX",
  "Gigabyte X670E Aorus Master", "Gigabyte X870E Aorus Master",
  "Gigabyte Z690 Aorus Elite AX",
  "ASRock Z790 Taichi", "ASRock X670E Taichi", "ASRock B650E Taichi",
  "ASRock B650 Pro RS", "ASRock Z790 Pro RS", "ASRock B760 Pro RS",
  "ASRock B650M-HDV/M.2",
  "ASRock B660M Pro RS",
  "NZXT N7 Z790", "NZXT N7 B650E",
];

const PSU_DB = [
  "Corsair RM850x", "Corsair RM750x", "Corsair RM1000x", "Corsair RM1200x",
  "Corsair RM850e", "Corsair RM750e", "Corsair RM1000e",
  "Corsair HX1000i", "Corsair HX1500i", "Corsair HX1200",
  "Corsair SF750", "Corsair SF600",
  "Corsair AX1600i", "Corsair AX1000",
  "Corsair CX750", "Corsair CX650", "Corsair CX550",
  "Corsair CX750M", "Corsair CX650M", "Corsair CX550M",
  "Corsair VS650", "Corsair VS550",
  "Seasonic Focus GX-850", "Seasonic Focus GX-750", "Seasonic Focus GX-1000",
  "Seasonic Prime TX-1000", "Seasonic Prime TX-850", "Seasonic Prime TX-1600",
  "Seasonic Prime PX-850", "Seasonic Prime PX-1000",
  "Seasonic Core GM-650", "Seasonic Core GM-500",
  "EVGA SuperNOVA G6 850", "EVGA SuperNOVA G6 1000",
  "EVGA SuperNOVA G5 850", "EVGA SuperNOVA G5 750",
  "EVGA SuperNOVA P6 1000",
  "EVGA 600 W1", "EVGA 500 W1", "EVGA 700 BR",
  "be quiet! Dark Power 13 850W", "be quiet! Dark Power 13 1000W",
  "be quiet! Straight Power 12 850W", "be quiet! Straight Power 12 750W",
  "be quiet! System Power 10 750W", "be quiet! System Power 10 650W",
  "be quiet! Pure Power 12 850W", "be quiet! Pure Power 12 750W",
  "NZXT C850", "NZXT C750", "NZXT C1000", "NZXT C1200",
  "Thermaltake Toughpower GF3 750W", "Thermaltake Toughpower GF3 850W",
  "Thermaltake Toughpower GF3 1000W",
  "Thermaltake Smart 700W", "Thermaltake Smart 600W",
  "Cooler Master MWE Gold 850 V2", "Cooler Master MWE Gold 750 V2",
  "Cooler Master V850 Gold", "Cooler Master V750 Gold",
  "Cooler Master XG750 Plus",
  "MSI MPG A850G", "MSI MPG A750G", "MSI MPG A1000G",
  "MSI MAG A850GL", "MSI MAG A750GL",
  "Enermax Revolution DF 850W", "Enermax Revolution DF 750W",
  "FSP Hydro G Pro 850W", "FSP Hydro G Pro 1000W",
  "Super Flower Leadex VII 850W", "Super Flower Leadex VII 1000W",
];

const STORAGE_DB = [
  "Samsung 990 Pro 1TB", "Samsung 990 Pro 2TB", "Samsung 990 Pro 4TB",
  "Samsung 980 Pro 1TB", "Samsung 980 Pro 2TB",
  "Samsung 970 Evo Plus 1TB", "Samsung 970 Evo Plus 500GB",
  "Samsung 870 Evo 1TB", "Samsung 870 Evo 2TB", "Samsung 870 QVO 4TB",
  "Samsung 990 Evo 1TB", "Samsung 990 Evo 2TB",
  "WD Black SN850X 1TB", "WD Black SN850X 2TB", "WD Black SN850X 4TB",
  "WD Black SN770 1TB", "WD Black SN770 500GB",
  "WD Blue SN580 1TB", "WD Blue SN5000 2TB",
  "WD Red Pro 4TB", "WD Red Plus 4TB",
  "WD Blue 1TB", "WD Blue 2TB", "WD Blue 4TB",
  "Crucial T700 1TB", "Crucial T700 2TB", "Crucial T700 4TB",
  "Crucial T500 1TB", "Crucial T500 2TB",
  "Crucial P5 Plus 1TB", "Crucial P5 Plus 2TB",
  "Crucial P3 Plus 1TB", "Crucial P3 Plus 2TB",
  "Crucial MX500 1TB", "Crucial MX500 2TB",
  "Kingston KC3000 1TB", "Kingston KC3000 2TB",
  "Kingston Fury Renegade 1TB", "Kingston Fury Renegade 2TB",
  "Kingston NV3 1TB", "Kingston NV3 2TB",
  "Kingston NV2 1TB", "Kingston NV2 500GB",
  "Seagate Barracuda 2TB", "Seagate Barracuda 4TB",
  "Seagate FireCuda 530 1TB", "Seagate FireCuda 530 2TB",
  "Seagate IronWolf 4TB", "Seagate IronWolf 8TB",
  "Seagate SkyHawk 4TB",
  "Corsair MP600 Pro XT 1TB", "Corsair MP600 Pro XT 2TB",
  "Corsair MP600 Mini 1TB",
  "TeamGroup MP44 1TB", "TeamGroup MP44 2TB",
  "TeamGroup T-Force Cardea A440 1TB",
  "SK Hynix Platinum P41 1TB", "SK Hynix Platinum P41 2TB",
  "SK Hynix Gold P31 1TB",
  "Lexar NM790 1TB", "Lexar NM790 2TB",
  "ADATA Legend 960 1TB", "ADATA XPG Gammix S70 Blade 1TB",
  "Sabrent Rocket 4 Plus 1TB", "Sabrent Rocket 4 Plus 2TB",
];

const CASE_DB = [
  "NZXT H5 Flow", "NZXT H7 Flow", "NZXT H9 Flow", "NZXT H6 Flow",
  "NZXT H510", "NZXT H510 Elite", "NZXT H710",
  "NZXT H440",
  "Corsair 4000D Airflow", "Corsair 5000D Airflow", "Corsair 7000D Airflow",
  "Corsair 3000D Airflow", "Corsair 6500D Airflow",
  "Corsair iCUE 4000X RGB", "Corsair iCUE 5000X RGB", "Corsair iCUE 7000X RGB",
  "Corsair Obsidian 500D", "Corsair Obsidian 1000D",
  "Corsair Carbide 275R",
  "Lian Li O11 Dynamic", "Lian Li O11 Dynamic EVO", "Lian Li O11 Dynamic Mini",
  "Lian Li Lancool 216", "Lian Li Lancool III",
  "Lian Li O11 Vision", "Lian Li SUP01",
  "Fractal Design North", "Fractal Design Meshify 2", "Fractal Design Meshify C",
  "Fractal Design Pop Air", "Fractal Design Torrent",
  "Fractal Design Define 7", "Fractal Design Define R5",
  "Fractal Design Pop Mini Air",
  "Cooler Master MasterCase H500M", "Cooler Master MasterBox Q300L",
  "Cooler Master MasterBox NR600", "Cooler Master MasterBox MB520",
  "Cooler Master TD500 Mesh V2",
  "Cooler Master Cosmos C700M",
  "Phanteks Eclipse G360A", "Phanteks Eclipse G500A",
  "Phanteks Eclipse P400A", "Phanteks Eclipse P600S",
  "Phanteks NV5", "Phanteks NV7",
  "Thermaltake View 71", "Thermaltake Tower 900",
  "Thermaltake H200", "Thermaltake H570", "Thermaltake S200 TG ARGB",
  "be quiet! Silent Base 802", "be quiet! Pure Base 500DX",
  "be quiet! Dark Base Pro 900",
  "HYTE Y60", "HYTE Y70 Touch",
  "Antec Performance 1", "Antec NX410",
  "Montech Air 903 Max", "Montech Sky Two",
  "Deepcool CH560", "Deepcool CH370", "Deepcool CC560",
  "Jonsbo D31", "Jonsbo D41", "Jonsbo N5",
];

const CATEGORY_DB = {
  CPU: { items: CPU_DB, brandMatch: /(\bintel\b|\bamd\b)/i },
  GPU: { items: GPU_DB, brandMatch: /(\bnvidia\b|\bamd\b|\bintel\b|\bradeon\b|\bgeforce\b)/i },
  RAM: { items: RAM_DB, brandMatch: /(\bcorsair\b|\bg\.?\s?skill\b|\bkingston\b|\bteamgroup\b|\bcrucial\b|\badata\b|\bpatriot\b)/i },
  Motherboard: { items: MOTHERBOARD_DB, brandMatch: /(\basus\b|\bmsi\b|\bgigabyte\b|\basrock\b|\bnzxt\b)/i },
  PSU: { items: PSU_DB, brandMatch: /(\bcorsair\b|\bseasonic\b|\bevga\b|\bbe quiet\b|\bnzxt\b|\bthermaltake\b|\bcooler master\b|\bmsi\b|\benermax\b|\bfsp\b|\bsuper flower\b)/i },
  Storage: { items: STORAGE_DB, brandMatch: /(\bsamsung\b|\bwd\b|\bwestern digital\b|\bcrucial\b|\bkingston\b|\bseagate\b|\bcorsair\b|\bteamgroup\b|\bsk hynix\b|\blexar\b|\badata\b|\bsabrent\b)/i },
  Case: { items: CASE_DB, brandMatch: /(\bnzxt\b|\bcorsair\b|\blian li\b|\bfractal\b|\bcooler master\b|\bphanteks\b|\bthermaltake\b|\bbe quiet\b|\bhyte\b|\bantec\b|\bmontech\b|\bdeepcool\b|\bjonsbo\b)/i },
};

function diceSimilarity(a, b) {
  const as = a.toLowerCase().trim();
  const bs = b.toLowerCase().trim();
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

function normalizeForMatch(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
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
  if (!name || name.length < 4) return false;
  const trimmed = name.trim();
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
  if (!hasBrand && reasonable) return { action: "ok", match: trimmed };
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

const POSITIVE_SIGNALS = [
  "ottima base", "buona configurazione", "solida build", "build solida",
  "ottima build", "configurazione eccellente", "ben bilanciata",
  "ottimo punto di partenza", "base eccellente",
];

function checkInputContradiction(userBuild, analisiText) {
  if (!userBuild) return [];
  const warnings = [];
  const fields = { cpu: userBuild.cpu, gpu: userBuild.gpu, ram: userBuild.ram,
    motherboard: userBuild.motherboard, psu: userBuild.psu,
    storage: userBuild.storage, case: userBuild.case };

  let hasSuspiciousField = false;
  const suspiciousDetails = [];

  for (const [key, val] of Object.entries(fields)) {
    if (!val || !val.trim()) continue;
    const v = val.trim();
    for (const pat of OBVIOUSLY_NOT_HARDWARE) {
      if (pat.test(v)) {
        hasSuspiciousField = true;
        suspiciousDetails.push(`${key.toUpperCase()}: "${v}"`);
        if (/^1\s*w$/i.test(v) || /^0\s*w$/i.test(v)) {
          suspiciousDetails[suspiciousDetails.length - 1] += " (valore impossibile per un PSU)";
        }
        if (/no\s*(storage|ssd|hdd)?$/i.test(v)) {
          suspiciousDetails[suspiciousDetails.length - 1] += " (campo non compilato)";
        }
        break;
      }
    }
  }

  if (hasSuspiciousField) {
    const hasPositive = POSITIVE_SIGNALS.some(s => analisiText.toLowerCase().includes(s.toLowerCase()));
    if (hasPositive) {
      warnings.push(`L'analisi definisce la configurazione come positiva ma i seguenti campi contengono valori non realistici: ${suspiciousDetails.join(", ")}. Il modello AI potrebbe non aver riconosciuto input scherzosi.`);
    } else {
      warnings.push(`Rilevati valori non realistici nei campi: ${suspiciousDetails.join(", ")}. Presta attenzione alle raccomandazioni.`);
    }
  }
  return warnings;
}

const CATEGORY_ALTERNATIVES = {
  CPU: [
    { nome: "Intel Core i5-13400", descrizione: "CPU Intel 10 core, ottima per gaming e produttività" },
    { nome: "AMD Ryzen 5 7600", descrizione: "CPU AMD moderna su socket AM5, 6 core" },
    { nome: "Intel Core i7-14700K", descrizione: "CPU Intel di fascia alta, 20 core" },
  ],
  GPU: [
    { nome: "NVIDIA GeForce RTX 4060", descrizione: "GPU moderna di fascia media, ottima per gaming 1080p" },
    { nome: "AMD Radeon RX 7600", descrizione: "Alternativa AMD di fascia media" },
    { nome: "NVIDIA GeForce RTX 4070 Super", descrizione: "GPU di fascia alta per gaming 1440p" },
  ],
  RAM: [
    { nome: "Corsair Vengeance DDR5 32GB 6000MHz", descrizione: "32GB DDR5 ad alta velocità" },
    { nome: "G.Skill Trident Z5 DDR5 32GB 6000MHz", descrizione: "32GB DDR5 performante con RGB" },
    { nome: "Kingston Fury Beast DDR5 32GB 5600MHz", descrizione: "32GB DDR5 affidabile" },
  ],
  Motherboard: [
    { nome: "ASUS TUF Gaming B760-Plus", descrizione: "Motherboard Intel LGA1700 di fascia media" },
    { nome: "MSI MAG B650 Tomahawk WiFi", descrizione: "Motherboard AMD AM5 con WiFi" },
    { nome: "Gigabyte B760 Aorus Elite AX", descrizione: "Motherboard Intel LGA1700 con WiFi 6E" },
  ],
  PSU: [
    { nome: "Corsair RM750x", descrizione: "750W 80+ Gold completamente modulare" },
    { nome: "Seasonic Focus GX-750", descrizione: "750W 80+ Gold di alta qualità" },
    { nome: "be quiet! Straight Power 12 750W", descrizione: "750W 80+ Platinum silenzioso" },
  ],
  Storage: [
    { nome: "Samsung 990 Pro 1TB", descrizione: "NVMe PCIe 4.0 di altissime prestazioni" },
    { nome: "WD Black SN850X 1TB", descrizione: "NVMe PCIe 4.0 con cache dinamica" },
    { nome: "Crucial T500 1TB", descrizione: "NVMe PCIe 4.0 ottimo rapporto qualità-prezzo" },
  ],
  Case: [
    { nome: "NZXT H5 Flow", descrizione: "Case mid-tower con ottimo airflow" },
    { nome: "Corsair 4000D Airflow", descrizione: "Case mid-tower versatile" },
    { nome: "Fractal Design Pop Air", descrizione: "Case minimalista con buon airflow" },
  ],
};

export function getAlternatives(category, count = 3) {
  const key = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const map = { cpu: "CPU", gpu: "GPU", ram: "RAM", motherboard: "Motherboard", psu: "PSU", storage: "Storage", case: "Case" };
  const dbKey = map[key.toLowerCase()] || "CPU";
  const items = CATEGORY_ALTERNATIVES[dbKey] || CATEGORY_ALTERNATIVES.CPU;
  return items.slice(0, count);
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

    if (result.action === "ok" && !(/\d/.test(v)) && !hasKnownBrand(v, category) && !looksReasonable(v)) {
      console.warn(`[Validator] fallback catch: "${v}" (${category}) risultato ok ma sembra falso`);
    }

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

export function parseAndValidateModelJson(rawText, userBuild) {
  let text = rawText.trim();
  const fenceMatch = text.match(/^```(?:json)?\s*\n?(.*?)\n?```\s*$/is);
  if (fenceMatch) text = fenceMatch[1].trim();

  const data = extractJsonObject(text);

  const analisi = String(data.analisi_build_attuale || "").trim();
  if (!analisi) throw new Error("analisi_build_attuale is required");

  const bottlenecks = coerceStrList(data.bottleneck_identificati, "bottleneck_identificati");
  const upgradeCats = parseUpgradeCategories(data.upgrade_consigliati);
  const dependents = parseDependent(data.upgrade_dipendenti);
  const warnings = coerceStrList(data.avvertenze, "avvertenze");

  const hallWarnings = [];
  const corrections = [];
  const unknownForLLM = [];

  for (const cat of upgradeCats) {
    for (const opt of cat.opzioni) {
      const result = validateComponentName(opt.nome, cat.componente);
      if (result.action === "ok") continue;

      if (result.action === "corrected") {
        corrections.push({ from: result.original, to: result.corrected, category: cat.componente });
        opt.nome = result.corrected;
        hallWarnings.push(result.message);
      } else if (result.action === "suspicious" || result.action === "not_found") {
        unknownForLLM.push({ name: opt.nome, category: cat.componente, message: result.message });
      } else if (result.action === "invalid" || result.action === "nonsense") {
        hallWarnings.push(result.message);
      }
    }
  }

  const contradictionWarnings = checkInputContradiction(userBuild, analisi);
  const allWarnings = [...hallWarnings, ...contradictionWarnings, ...warnings];

  return {
    analisi_build_attuale: analisi,
    bottleneck_identificati: bottlenecks,
    upgrade_consigliati: upgradeCats,
    upgrade_dipendenti: dependents,
    avvertenze: allWarnings,
    _hallucination_flags: hallWarnings.length > 0 ? hallWarnings : undefined,
    _correzioni: corrections.length > 0 ? corrections : undefined,
    _unknown_components: unknownForLLM.length > 0 ? unknownForLLM : undefined,
  };
}