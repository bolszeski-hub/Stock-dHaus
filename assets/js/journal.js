// Stock'd Haus Journal: guides for home cooks.
// Grading and cooking guidance is taken from windycitywagyu.vercel.app; lines marked [confirm] need checking.
window.SH = window.SH || {};

SH.articles = [
  {
    id: 'how-to-cook-wagyu',
    kicker: 'Cooking',
    title: 'How to cook wagyu',
    excerpt: 'Four simple rules for a perfect wagyu steak, from the fridge to the plate.',
    image: 'images/real-grill-rosemary.webp',
    minutes: 4,
    body: [
      ['p', 'Wagyu is richer than the steaks most of us grew up cooking. The good news is that it asks for less, not more. Follow these four rules and let the marbling do the work.'],
      ['h2', '1. Take the chill off'],
      ['p', 'Take the steak out of the fridge 30 to 45 minutes before cooking so it cooks evenly. A cold center under a hot crust is the most common mistake.'],
      ['h2', '2. Keep it simple'],
      ['p', 'Salt is all you need. The marbling does the rest, so skip heavy marinades and rubs that hide the flavor you paid for.'],
      ['h2', '3. Sear it hot'],
      ['p', 'Use a heavy pan, like cast iron, over high heat. Wagyu releases its own fat as it cooks, so you need little or no oil. Let it rest for a few minutes before slicing.'],
      ['h2', '4. Match the portion to the score'],
      ['p', 'The higher the marble score, the richer the steak. Slice a Black tier steak thin and share it; enjoy White and Gold as a full steak.'],
      ['tip', 'New to wagyu? Start with a White or Gold ribeye. It cooks like a great steakhouse steak, with more richness in every bite.']
    ],
    shop: ['wc-gold-ribeye', 'wc-white-ribeye', 'wc-black-striploin']
  },
  {
    id: 'storage-and-thawing',
    kicker: 'Storage',
    title: 'Storing and thawing frozen meat',
    excerpt: 'What to do the moment your box arrives, and how to thaw for the best results.',
    image: 'images/real-carving.webp',
    minutes: 3,
    body: [
      ['p', 'Everything from Stock\'d Haus arrives frozen and vacuum-sealed. A little care when it lands keeps it at its best until you cook it.'],
      ['h2', 'When your box arrives'],
      ['p', 'Move everything to the freezer right away, still sealed. Vacuum-sealed cuts keep their best quality for up to [12] months at 0°F. [confirm]'],
      ['h2', 'Thawing in the fridge'],
      ['p', 'Thaw in the fridge, still sealed, for 24 to 48 hours. Large cuts like a tomahawk can take up to 72 hours. Never thaw on the counter.'],
      ['h2', 'A quicker thaw'],
      ['p', 'In a hurry? Submerge the sealed package in cold water and change the water every 30 minutes. Steaks thaw in 1 to 2 hours.'],
      ['h2', 'After thawing'],
      ['p', 'Cook within 3 to 4 days, and do not refreeze. [confirm]']
    ],
    shop: ['haus-starter-box', 'wc-tier-sampler']
  },
  {
    id: 'what-marble-scores-mean',
    kicker: 'Wagyu 101',
    title: 'What marble scores mean',
    excerpt: 'Why the same word, wagyu, can mean very different steaks, and how to read the label.',
    image: 'images/marbling-macro.webp',
    minutes: 5,
    body: [
      ['p', 'Wagyu is the most celebrated beef in the world, and one of the most confusing to buy. The same word is used for an animal that\'s half wagyu and one that\'s 100% wagyu. Two marks on a WC Wagyu label clear that up: the tier and the marble score.'],
      ['h2', 'The tier is the bloodline'],
      ['p', 'Black is fullblood, 100% wagyu. Gold is purebred, at least 93% wagyu. White is an F1 cross, about half wagyu. The more wagyu in the bloodline, the more marbling the animal can build, and the finer that marbling becomes.'],
      ['h2', 'The score is the marbling'],
      ['p', 'Australian wagyu is graded on Australia\'s official AUS-MEAT marble score, from MS0, with almost no marbling, to MS9+, the very top of the scale. The higher the number, the more fine, buttery fat runs through the meat.'],
      ['h2', 'Where each tier sits'],
      ['list', ['Black: MS8 to MS9+', 'Gold: MS6 to MS9+', 'White: MS4 to MS7']],
      ['p', 'Every animal is graded on its own, so an exceptional Gold can reach MS9+. What sets Black apart at the same score is the bloodline: finer marbling and a deeper, more buttery flavor.'],
      ['tip', 'USDA and Australian grades are different systems, with no official conversion between them.']
    ],
    shop: ['wc-black-striploin', 'wc-gold-tenderloin', 'wc-tier-sampler']
  }
];

SH.article = function (id) { return SH.articles.find(function (a) { return a.id === id; }); };
SH.articleCard = function (a) {
  return '<a class="post" href="article.html?id=' + a.id + '" data-reveal>' +
    '<span class="post-img"><img src="' + a.image + '" alt="" loading="lazy"></span>' +
    '<span class="card-brand">' + SH.esc(a.kicker) + ' · ' + a.minutes + ' min read</span>' +
    '<span class="post-title">' + SH.esc(a.title) + '</span>' +
    '<span class="post-ex">' + SH.esc(a.excerpt) + '</span></a>';
};
