// PLACEHOLDER: veškerý obsah je ilustrační, dokud klient nedodá finální údaje.
// Fotografie (`src`) zatím chybí – komponenta Photo zobrazí barevný placeholder.

// PLACEHOLDER: otevírací doba je vymyšlená – potvrdit s provozovatelem.
const HOURS = [
  { days: "Po–Pá", time: "9:00–20:00" },
  { days: "So–Ne", time: "8:00–22:00" },
];

export const site = {
  name: "KATAFE",
  city: "Chrudim",
  cityLocative: "Chrudimi", // 6. pád ("v Chrudimi") pro věty
  // PLACEHOLDER: rezervační URL / telefon – zatím anchor na kontakt.
  reservationHref: "#kontakt",
  // Adresa podniku (dodal klient) a odkaz na ni v mapách.
  address: "náměstí U Vodárny 111, Chrudim",
  routeHref: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("náměstí U Vodárny 111, Chrudim"),
  // PLACEHOLDER: telefon, e-mail a otevírací doba jsou vymyšlené – nahradit skutečnými
  // údaji od provozovatele, jakmile budou k dispozici.
  phone: "+420 123 456 789",
  email: "info@katafe.cz",
  hours: HOURS.map((h) => `${h.days} ${h.time}`), // footer: jeden řádek na položku
  hoursHero: HOURS.map((h) => `${h.days} ${h.time}`).join(" · "), // pod hero fotkou
  // PLACEHOLDER: sociální sítě zatím neexistují / nejsou potvrzené – odkazy jsou neaktivní ("#"),
  // dokud nedostaneme skutečné profily. Nevyplňovat žádnou konkrétní URL bez potvrzení klientem.
  instagramHref: "#",
  facebookHref: "#",
};

export const nav = [
  { label: "Nabídka", href: "#nabidka" },
  { label: "Brunch", href: "#nabidka" },
  { label: "Dnes u nás", href: "#dnes" },
  { label: "Kontakt", href: "#kontakt" },
];

export type PhotoData = { src?: string; alt: string; position?: string };

export const slides: PhotoData[] = [
  { src: "/hero-1.webp", alt: "Černá káva a latte v keramických šálcích, na jednom logo KATAFE", position: "50% 50%" },
  { src: "/hero-2.webp", alt: "Míchaná vejce, pošírované vejce, salát a pečivo na talíři", position: "50% 50%" },
  { src: "/hero-3.webp", alt: "Ledová matcha, citronáda a croissant na stole", position: "50% 50%" },
];

export const offerings = [
  { n: "01", icon: "/icon-kafe.png", title: "Kafe.", text: ["Espresso, flat white nebo dlouhé latte.", "Vaše oblíbená chvíle v šálku."], photo: { src: "/offer-kafe.webp", alt: "Latte v šálku se symbolem KATAFE" } },
  { n: "02", icon: "/icon-brunch.png", title: "Brunch.", text: ["Sladký i slaný začátek dne.", "Nejlépe bez spěchu a v dobré společnosti."], photo: { src: "/offer-brunch.webp", alt: "Vejce Benedikt s pažitkou" } },
  { n: "03", icon: "/icon-matcha.png", title: "Nápoje.", text: ["Matcha, limonády a drinky.", "Něco chladného na osvěžení."], photo: { src: "/offer-napoje.webp", alt: "Ledová matcha a citronáda s tymiánem" } },
] satisfies { n: string; icon: string; title: string; text: [string, string]; photo: PhotoData }[];

// PLACEHOLDER: ilustrační menu včetně cen – nahradit finálním menu / napojit na administraci.
export type MenuItem = { name: string; desc?: string; price: string };
export const menu: { id: string; label: string; items: MenuItem[] }[] = [
  {
    id: "kafe",
    label: "Kafe",
    items: [
      { name: "Espresso", desc: "Krátké, intenzivní, na jeden doušek.", price: "59 Kč" },
      { name: "Flat white", desc: "Dvojité espresso a jemně našlehané mléko.", price: "89 Kč" },
      { name: "Cappuccino", desc: "Klasika s hustou mléčnou pěnou.", price: "85 Kč" },
      { name: "Latte", desc: "Dlouhé, hebké a mléčné.", price: "89 Kč" },
      { name: "Filtrovaná káva", desc: "Střídáme zrna podle sezóny.", price: "95 Kč" },
    ],
  },
  {
    id: "snidane",
    label: "Snídaně",
    items: [
      { name: "Míchaná vejce", desc: "Na opečeném chlebu s bylinkami.", price: "159 Kč" },
      { name: "Avokádový toast", desc: "Kváskový chléb, avokádo, sezam.", price: "169 Kč" },
      { name: "Ovesná kaše", desc: "Sezónní ovoce a med.", price: "119 Kč" },
      { name: "Jogurt s granolou", desc: "Domácí granola a ovoce.", price: "109 Kč" },
      { name: "Croissant s máslem", desc: "Čerstvě upečený, s domácí marmeládou.", price: "79 Kč" },
    ],
  },
  {
    id: "brunch",
    label: "Brunch",
    items: [
      { name: "Vejce Benedikt", desc: "Pošírovaná vejce, holandská omáčka, chléb.", price: "199 Kč" },
      { name: "Vaječná omeleta", desc: "Se sezónní zeleninou a sýrem.", price: "179 Kč" },
      { name: "Snídaňový talíř", desc: "Od všeho trochu, pro největší hlad.", price: "249 Kč" },
      { name: "Burger s halloumi", desc: "Grilovaný sýr, zelenina a domácí omáčka.", price: "219 Kč" },
      { name: "Francouzský toast", desc: "Sladký, s ovocem a javorovým sirupem.", price: "179 Kč" },
    ],
  },
  {
    id: "napoje",
    label: "Nápoje",
    items: [
      { name: "Matcha latte", desc: "Jemná matcha, ledová nebo teplá.", price: "99 Kč" },
      { name: "Domácí limonáda", desc: "Citron, tymián a led.", price: "79 Kč" },
      { name: "Ledové latte", desc: "Espresso, mléko a led.", price: "95 Kč" },
      { name: "Čerstvý džus", desc: "Podle sezóny.", price: "89 Kč" },
      { name: "Domácí ledový čaj", desc: "Ovocný, s mátou a citronem.", price: "69 Kč" },
    ],
  },
];

// PLACEHOLDER: jedna reprezentativní fotka za celou kategorii (fotka se v řádku menu
// ukáže při najetí myší). Ideálně časem nahradit fotkou ke každé položce zvlášť.
export const menuCategoryPhotos: Record<string, PhotoData> = {
  kafe: { src: "/offer-kafe.webp", alt: "Šálek kávy se symbolem KATAFE" },
  snidane: { src: "/offer-brunch.webp", alt: "Vejce na opečeném chlebu" },
  brunch: { src: "/offer-brunch.webp", alt: "Vejce Benedikt s pažitkou" },
  napoje: { src: "/offer-napoje.webp", alt: "Ledová matcha a citronáda" },
};

// PLACEHOLDER: galerie zatím jede na fotkách použitých jinde na webu – nahradit
// šesti samostatnými fotkami podniku, jídla a hostů, jakmile budou k dispozici.
export const gallery: PhotoData[] = [
  { src: "/hero-1.webp", alt: "Černá káva a latte v keramických šálcích" },
  { src: "/offer-brunch.webp", alt: "Vejce Benedikt s pažitkou" },
  { src: "/offer-napoje.webp", alt: "Ledová matcha a citronáda" },
  { src: "/table-4.webp", alt: "Prostřený stůl pro čtyři v kavárně" },
  { src: "/offer-kafe.webp", alt: "Latte v šálku se symbolem KATAFE" },
  { src: "/table-6.webp", alt: "Dlouhý stůl pro větší skupinu v kavárně" },
];

// PLACEHOLDER: otevírací doba a délka kroku rezervací – potvrdit s provozovatelem.
export const reservationConfig = {
  open: "09:00",
  close: "16:30", // PLACEHOLDER: zkrácená doba, aby se časy vešly bez posouvání
  stepMinutes: 30,
  daysAhead: 14,
  maxGuests: 8,
};

// Fotografie stolů podle počtu hostů. PLACEHOLDER: dodat skutečné fotky (`src`).
export const tables: { max: number; photo: PhotoData }[] = [
  { max: 2, photo: { src: "/table-2.webp", alt: "Kulatý stolek pro dva v kavárně", position: "50% 42%" } },
  { max: 4, photo: { src: "/table-4.webp", alt: "Čtvercový stůl pro čtyři v kavárně", position: "50% 42%" } },
  { max: 8, photo: { src: "/table-6.webp", alt: "Dlouhý stůl pro větší skupinu v kavárně", position: "50% 42%" } },
];

// Rozdělení časů do částí dne. PLACEHOLDER: názvy i hranice potvrdit s provozovatelem.
export const timeGroups = [
  { label: "Brunch", from: "09:00", to: "12:30" },
  { label: "Odpoledne", from: "13:00", to: "16:30" },
];
