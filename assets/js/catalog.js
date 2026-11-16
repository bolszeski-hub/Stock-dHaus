// Stock'd Haus catalog and store settings.
// PREVIEW DATA: brands are real; products, sizes, prices and every setting
// below are samples to be replaced with the real list before launch.
window.SH = window.SH || {};

SH.settings = {
  freeShippingCents: 19900,      // free shipping at $199 [sample]
  flatShippingCents: 2995,       // flat rate under the threshold [sample]
  emailOfferCents: 2500,         // first-order discount for joining the list [sample]
  emailOfferMinimumCents: 15000, // minimum order for that discount [sample]
  subscribeSavePercent: 10,      // subscribe-and-save discount on boxes [sample]
  membershipCents: 1999,         // monthly membership dues [sample]
  // Build Your Box: more items, bigger saving [sample]
  boxTiers: [
    { items: 4, percent: 5 },
    { items: 6, percent: 10 },
    { items: 8, percent: 15 }
  ]
};

SH.brands = [
  { id: 'wc-wagyu', name: 'WC Wagyu', line: 'Australian wagyu, graded by bloodline and marble score.', mark: 'images/wc-wagyu-mark.webp', image: 'images/hero-ribeye.webp', site: 'https://windycitywagyu.vercel.app',
    story: 'Australian wagyu bred from Japanese bloodlines, fed on grain for 450 days or more, and graded on Australia\'s official marbling scale. Every cut carries its tier (Black, Gold or White) and its marble score on the label.' },
  { id: 'joker-wagyu', name: 'Joker Wagyu', usExclusive: true, line: '[One line about Joker Wagyu]' },
  { id: 'gambler-wagyu', name: 'Gambler Wagyu', usExclusive: true, line: '[One line about Gambler Wagyu]' },
  { id: 'purely-meat-co', name: 'Purely Meat Co.', line: '[One line about Purely Meat Co.]' },
  { id: 'samuels-seafood-co', name: 'Samuels Seafood Co.', line: '[One line about Samuels Seafood Co.]' }
];

SH.categories = [
  { id: 'wagyu', name: 'Wagyu' },
  { id: 'beef', name: 'Beef & Burgers' },
  { id: 'pork-poultry', name: 'Pork & Poultry' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'boxes', name: 'Boxes & Samplers' },
  { id: 'gifts', name: 'Gifts' }
];

// price and compareAt are in cents. variants override price.
SH.products = [
  // WC Wagyu: tiers and cuts from windycitywagyu.vercel.app; scores from its grading table
  { id: 'wc-gold-ribeye', brand: 'wc-wagyu', category: 'wagyu', tier: 'Gold', name: 'Gold Ribeye', size: '16 oz [confirm]', price: 8900,
    image: 'images/cut-ribeye.webp', badges: ['Best seller'], featured: 1,
    variants: [{ label: 'MS6', price: 8900 }, { label: 'MS7', price: 9900 }, { label: 'MS8', price: 11500 }, { label: 'MS9', price: 12900 }, { label: 'MS9+', price: 14900 }],
    description: 'Purebred, 93%+ wagyu, fed on grain for 450 to 500+ days. The richest steak, where marbling shows best. Choose your marble score: the higher the score, the richer the steak.' },
  { id: 'wc-black-striploin', brand: 'wc-wagyu', category: 'wagyu', tier: 'Black', name: 'Black Striploin', size: '12 oz [confirm]', price: 13900,
    image: 'images/cut-striploin.webp', badges: ['100% wagyu'], featured: 2,
    variants: [{ label: 'MS8', price: 13900 }, { label: 'MS9', price: 15900 }, { label: 'MS9+', price: 17900 }],
    description: 'Fullblood, 100% wagyu, fed on grain for 500+ days. Also called the New York strip. Slice it thin, sear it briefly, and share it.' },
  { id: 'wc-gold-tenderloin', brand: 'wc-wagyu', category: 'wagyu', tier: 'Gold', name: 'Gold Tenderloin', size: '8 oz [confirm]', price: 9500,
    image: 'images/cut-tenderloin.webp', featured: 3,
    variants: [{ label: 'MS6', price: 9500 }, { label: 'MS7', price: 10500 }, { label: 'MS8', price: 11900 }],
    description: 'Purebred, 93%+ wagyu. The most tender cut, made richer by wagyu marbling.' },
  { id: 'wc-black-tomahawk', brand: 'wc-wagyu', category: 'wagyu', tier: 'Black', name: 'Black Tomahawk', size: '40 oz [confirm]', price: 32900,
    image: 'images/cut-tomahawk.webp', badges: ['For the table'], featured: 4,
    variants: [{ label: 'MS8', price: 32900 }, { label: 'MS9+', price: 38900 }],
    description: 'Fullblood, 100% wagyu. A bone-in ribeye made for the center of the table.' },
  { id: 'wc-white-ribeye', brand: 'wc-wagyu', category: 'wagyu', tier: 'White', name: 'White Ribeye', size: '16 oz [confirm]', price: 5900,
    image: 'images/cut-ribeye.webp', featured: 5,
    variants: [{ label: 'MS4', price: 5900 }, { label: 'MS5', price: 6500 }, { label: 'MS6', price: 6900 }, { label: 'MS7', price: 7500 }],
    description: 'F1 cross, about 50% wagyu. Wagyu marbling with a classic beefy flavor: your first taste of wagyu, and your new everyday steak.' },
  { id: 'wc-white-ground', brand: 'wc-wagyu', category: 'beef', tier: 'White', name: 'White Ground Wagyu', size: '1 lb [confirm]', price: 1800,
    image: 'images/cut-ground.webp',
    description: 'Everyday wagyu, with richness in every bite. Made for burgers, meatballs and weeknight cooking.' },
  { id: 'wc-tier-sampler', brand: 'wc-wagyu', category: 'boxes', name: 'Black, Gold & White Sampler', size: '3 ribeyes [confirm]', price: 24900, compareAt: 27900,
    image: 'images/cuts-board.webp', badges: ['Start here'], featured: 6, subscribable: true,
    description: 'One ribeye from each tier, side by side, so you can taste what bloodline and marble score really mean.' },

  // Other confirmed brands: product names below are placeholders until the real list arrives
  { id: 'joker-ribeye', brand: 'joker-wagyu', category: 'wagyu', name: '[Joker Wagyu product]', size: '[size]', price: 7900, placeholder: true },
  { id: 'joker-burgers', brand: 'joker-wagyu', category: 'beef', name: '[Joker Wagyu product]', size: '[size]', price: 2400, placeholder: true },
  { id: 'gambler-strip', brand: 'gambler-wagyu', category: 'wagyu', name: '[Gambler Wagyu product]', size: '[size]', price: 8400, placeholder: true },
  { id: 'gambler-box', brand: 'gambler-wagyu', category: 'boxes', name: '[Gambler Wagyu box]', size: '[size]', price: 19900, placeholder: true, subscribable: true },
  { id: 'purely-1', brand: 'purely-meat-co', category: 'pork-poultry', name: '[Purely Meat Co. product]', size: '[size]', price: 2900, placeholder: true },
  { id: 'purely-2', brand: 'purely-meat-co', category: 'beef', name: '[Purely Meat Co. product]', size: '[size]', price: 3400, placeholder: true },
  { id: 'samuels-1', brand: 'samuels-seafood-co', category: 'seafood', name: '[Samuels Seafood Co. product]', size: '[size]', price: 5900, placeholder: true },
  { id: 'samuels-2', brand: 'samuels-seafood-co', category: 'seafood', name: '[Samuels Seafood Co. product]', size: '[size]', price: 4500, placeholder: true },

  // Stock'd Haus boxes and gifts
  { id: 'haus-starter-box', brand: 'stockd-haus', category: 'boxes', name: "Stock'd Haus Starter Box", size: '[contents to confirm]', price: 19900, compareAt: 22900,
    image: 'images/real-sliced.webp', badges: ['New here?'], featured: 7, subscribable: true,
    description: 'A first box across our brands: [contents to confirm].' },
  { id: 'gift-card', brand: 'stockd-haus', category: 'gifts', name: "Stock'd Haus Gift Card", size: 'Delivered by email', price: 10000,
    image: 'images/real-flames.webp', giftCard: true,
    variants: [{ label: '$50', price: 5000 }, { label: '$100', price: 10000 }, { label: '$200', price: 20000 }, { label: '$500', price: 50000 }],
    description: 'Let them choose. Delivered by email, spendable on anything in the store.' }
];

// Exclusive U.S. distribution (brands with usExclusive: true)
SH.exclusiveNote = function (name) {
  return 'Stock\'d Up and Stock\'d Haus are the exclusive distributors of ' + name + ' in the United States.';
};
SH.isExclusive = function (brandId) {
  var b = SH.brands.find(function (x) { return x.id === brandId; });
  return !!(b && b.usExclusive);
};

SH.brandName = function (id) {
  if (id === 'stockd-haus') return "Stock'd Haus";
  var b = SH.brands.find(function (x) { return x.id === id; });
  return b ? b.name : id;
};
SH.product = function (id) { return SH.products.find(function (p) { return p.id === id; }); };
