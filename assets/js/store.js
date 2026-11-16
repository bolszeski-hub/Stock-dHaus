// Stock'd Haus storefront: shared header, footer, cart drawer, product cards and motion.
// The cart lives in this browser (localStorage) until checkout is connected to a commerce platform.
(function () {
  var S = window.SH;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = document.body.getAttribute('data-page') || '';

  // ---------- helpers ----------
  S.money = function (cents) {
    var v = cents / 100;
    return '$' + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2));
  };
  S.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  S.param = function (name) { return new URLSearchParams(location.search).get(name); };

  // ---------- shell ----------
  var nav = [
    ['shop.html', 'Shop All', 'shop'],
    ['#', 'Brands', 'brands'],
    ['shop.html?category=wagyu', 'Wagyu', 'wagyu'],
    ['shop.html?category=seafood', 'Seafood', 'seafood'],
    ['build-your-box.html', 'Build Your Box', 'box'],
    ['membership.html', 'Membership', 'membership'],
    ['gifts.html', 'Gifts', 'gifts'],
    ['about.html', 'About', 'about']
  ];
  function navLink(n) {
    if (n[2] === 'brands') {
      return '<div class="nav-drop"><button type="button" class="nav-drop-btn" aria-expanded="false">Brands</button><div class="nav-menu">' +
        S.brands.map(function (b) { return '<a href="shop.html?brand=' + b.id + '">' + S.esc(b.name) + '</a>'; }).join('') +
        '<a href="shop.html" class="nav-menu-all">All brands →</a></div></div>';
    }
    var current = (n[2] === page) ? ' aria-current="page"' : '';
    return '<a href="' + n[0] + '"' + current + '>' + n[1] + '</a>';
  }
  var set = S.settings;
  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="announce">Free shipping on orders of ' + S.money(set.freeShippingCents) + ' or more · Ships frozen, Monday to Thursday [confirm]</div>' +
    '<div class="wrap">' +
    '<a class="brand brand--logo" href="index.html"><img src="images/brand/logo-wordmark.webp" alt="Stock\'d Haus" width="900" height="121"></a>' +
    '<nav id="site-nav" class="nav" aria-label="Main">' + nav.map(navLink).join('') + '</nav>' +
    '<div class="header-icons">' +
    '<button class="icon-btn search-btn" type="button" aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button>' +
    '<button class="icon-btn cart-btn" type="button" aria-label="Open cart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 7z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg><span class="cart-count" hidden>0</span></button>' +
    '<button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button>' +
    '</div></div>';
  document.body.prepend(header);

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="wrap">' +
    '<div class="news">' +
    '<div><p class="eyebrow">Join the list</p><h2 class="h2 news-title">' + S.money(set.emailOfferCents) + ' off your first order</h2>' +
    '<p class="muted small">On orders of ' + S.money(set.emailOfferMinimumCents) + ' or more, plus first access to new drops.</p></div>' +
    '<form class="news-form" data-signup><label class="visually-hidden" for="news-email">Email address</label><input id="news-email" type="email" placeholder="Email address" required><button class="btn" type="submit">Sign up</button></form>' +
    '</div>' +
    '<div class="footer-cols">' +
    '<div><a class="footer-logo" href="index.html"><img src="images/brand/logo-lockup.webp" alt="Stock\'d Haus, by Stock\'d Up" width="1000" height="195" loading="lazy"></a><p class="fine">The online store of Stock\'d Up Brands.</p></div>' +
    '<div><h3>Shop</h3>' + S.brands.map(function (b) { return '<a href="shop.html?brand=' + b.id + '">' + S.esc(b.name) + '</a>'; }).join('') + '<a href="gifts.html">Gifts & gift cards</a></div>' +
    '<div><h3>Help</h3><a href="help.html#shipping">Shipping</a><a href="help.html#storage">Storage & thawing</a><a href="help.html#faq">FAQ</a><a href="help.html#contact">Contact us</a></div>' +
    '<div><h3>Stock\'d Haus</h3><a href="about.html">About</a><a href="journal.html">Journal</a><a href="membership.html">Membership</a><a href="build-your-box.html">Build Your Box</a><a href="help.html#trade">Restaurants & trade</a></div>' +
    '</div>' +
    '<div class="footer-meta"><span>© 2026 Stock\'d Up Brands</span><span class="footer-policies"><a href="policies.html#shipping">Shipping policy</a><a href="policies.html#refunds">Refunds</a><a href="policies.html#terms">Terms</a><a href="policies.html#privacy">Privacy</a></span></div>' +
    '</div>';
  document.body.appendChild(footer);

  var drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.setAttribute('hidden', '');
  drawer.innerHTML =
    '<div class="drawer-scrim" data-close></div>' +
    '<aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">' +
    '<div class="drawer-head"><h2 id="cart-title">Your cart</h2><button class="icon-btn" type="button" data-close aria-label="Close cart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<div class="ship-meter"><p class="ship-msg"></p><div class="ship-bar"><i></i></div></div>' +
    '<div class="drawer-lines"></div>' +
    '<div class="drawer-foot">' +
    '<label class="gift-toggle"><input type="checkbox" id="gift-check"> This is a gift</label>' +
    '<textarea id="gift-note" class="gift-note" rows="3" placeholder="Gift message, printed and tucked in the box" hidden></textarea>' +
    '<div class="drawer-total"><span>Subtotal</span><b class="subtotal">$0</b></div>' +
    '<p class="fine">Shipping and taxes are calculated at checkout.</p>' +
    '<a class="btn btn--block" href="checkout.html">Checkout</a>' +
    '</div></aside>';
  document.body.appendChild(drawer);

  var preview = document.createElement('div');
  preview.className = 'preview-flag';
  preview.textContent = 'Preview · sample products and prices · checkout not connected';
  document.body.appendChild(preview);

  var toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  var toastTimer;
  S.toast = function (msg) {
    toast.textContent = msg; toast.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2600);
  };

  // ---------- search ----------
  var search = document.createElement('div');
  search.className = 'search';
  search.hidden = true;
  search.innerHTML = '<div class="search-panel" role="dialog" aria-modal="true" aria-label="Search">' +
    '<div class="wrap"><div class="search-row"><label class="visually-hidden" for="search-q">Search products and brands</label>' +
    '<input id="search-q" type="search" placeholder="Search ribeye, seafood, a brand…" autocomplete="off">' +
    '<button class="icon-btn" type="button" data-search-close aria-label="Close search"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<div class="search-results" aria-live="polite"></div></div></div>';
  document.body.appendChild(search);
  var sq = search.querySelector('#search-q'), sres = search.querySelector('.search-results');
  function runSearch() {
    var q = sq.value.trim().toLowerCase();
    if (!q) {
      sres.innerHTML = '<p class="search-k">Popular</p><div class="search-chips">' +
        ['Ribeye', 'Wagyu', 'Seafood', 'Gift card', 'Box'].map(function (t) { return '<button type="button" class="chip-btn" data-q="' + t + '">' + t + '</button>'; }).join('') + '</div>';
      return;
    }
    var brands = S.brands.filter(function (b) { return b.name.toLowerCase().indexOf(q) >= 0; });
    var prods = S.products.filter(function (p) {
      return (p.name + ' ' + S.brandName(p.brand) + ' ' + (p.tier || '') + ' ' + p.category).toLowerCase().indexOf(q) >= 0;
    }).slice(0, 6);
    sres.innerHTML = (brands.length ? '<p class="search-k">Brands</p><div class="search-chips">' + brands.map(function (b) { return '<a class="chip-btn" href="shop.html?brand=' + b.id + '">' + S.esc(b.name) + '</a>'; }).join('') + '</div>' : '') +
      (prods.length ? '<p class="search-k">Products</p><div class="search-list">' + prods.map(function (p) {
        return '<a class="search-item" href="product.html?id=' + p.id + '"><span class="search-thumb">' + (p.image ? '<img src="' + p.image + '" alt="">' : '') + '</span>' +
          '<span><small>' + S.esc(S.brandName(p.brand)) + '</small>' + S.esc(p.name) + '</span><b>' + (p.variants ? 'From ' : '') + S.money(S.fromPrice(p)) + '</b></a>';
      }).join('') + '</div><a class="text-link" href="shop.html?q=' + encodeURIComponent(q) + '">See all results →</a>' : '') +
      (!brands.length && !prods.length ? '<p class="muted">Nothing matches "' + S.esc(sq.value) + '". Try a cut, like ribeye, or a brand.</p>' : '');
  }
  function openSearch() { search.hidden = false; document.body.style.overflow = 'hidden'; runSearch(); requestAnimationFrame(function () { search.classList.add('is-open'); sq.focus(); }); }
  function closeSearch() { search.classList.remove('is-open'); search.hidden = true; document.body.style.overflow = ''; }
  sq.addEventListener('input', runSearch);
  sq.addEventListener('keydown', function (e) { if (e.key === 'Enter' && sq.value.trim()) location.href = 'shop.html?q=' + encodeURIComponent(sq.value.trim()); });
  search.addEventListener('click', function (e) {
    if (e.target === search || e.target.closest('[data-search-close]')) return closeSearch();
    var c = e.target.closest('[data-q]'); if (c) { sq.value = c.dataset.q; runSearch(); sq.focus(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !search.hidden) closeSearch(); });
  header.querySelector('.search-btn').addEventListener('click', openSearch);

  // ---------- header behavior ----------
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  var toggle = header.querySelector('.nav-toggle');
  toggle.addEventListener('click', function () {
    var navEl = header.querySelector('.nav');
    navEl.style.top = header.offsetHeight + 'px';
    navEl.style.height = 'calc(100dvh - ' + header.offsetHeight + 'px)';
    var open = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  var dropBtn = header.querySelector('.nav-drop-btn');
  dropBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = dropBtn.parentElement.classList.toggle('is-open');
    dropBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', function () { dropBtn.parentElement.classList.remove('is-open'); dropBtn.setAttribute('aria-expanded', 'false'); });

  // ---------- cart ----------
  var KEY = 'sh-cart';
  S.cart = store(KEY) || [];
  function save() { store(KEY, S.cart); render(); }
  S.cartSubtotal = function () { return S.cart.reduce(function (t, l) { return t + l.price * l.qty; }, 0); };
  S.addToCart = function (line) {
    var key = [line.id, line.variant || '', line.plan || 'once', line.box ? JSON.stringify(line.box) : ''].join('|');
    var found = S.cart.find(function (l) { return l.key === key; });
    if (found) found.qty += line.qty || 1;
    else { line.key = key; line.qty = line.qty || 1; S.cart.push(line); }
    save(); openCart();
  };
  function lineHtml(l, i) {
    var meta = [l.variant, l.size, l.plan === 'subscribe' ? 'Subscribe and save, every month' : ''].filter(Boolean).join(' · ');
    var box = l.box ? '<ul class="line-box">' + l.box.map(function (b) { return '<li>' + b.qty + ' × ' + S.esc(b.name) + '</li>'; }).join('') + '</ul>' : '';
    return '<div class="line">' +
      '<div class="line-img">' + (l.image ? '<img src="' + l.image + '" alt="">' : '<span>' + S.esc(S.brandName(l.brand)) + '</span>') + '</div>' +
      '<div class="line-body"><p class="line-brand">' + S.esc(S.brandName(l.brand)) + '</p><p class="line-name">' + S.esc(l.name) + '</p>' +
      (meta ? '<p class="line-meta">' + S.esc(meta) + '</p>' : '') + box +
      '<div class="line-row"><div class="qty qty--sm"><button type="button" data-dec="' + i + '" aria-label="Decrease quantity">−</button><span>' + l.qty + '</span><button type="button" data-inc="' + i + '" aria-label="Increase quantity">+</button></div>' +
      '<button type="button" class="line-remove" data-rm="' + i + '">Remove</button></div></div>' +
      '<b class="line-price">' + S.money(l.price * l.qty) + '</b></div>';
  }
  function render() {
    var count = S.cart.reduce(function (t, l) { return t + l.qty; }, 0);
    var badge = header.querySelector('.cart-count');
    badge.textContent = count; badge.hidden = count === 0;
    var sub = S.cartSubtotal();
    drawer.querySelector('.subtotal').textContent = S.money(sub);
    var left = set.freeShippingCents - sub;
    drawer.querySelector('.ship-msg').innerHTML = left > 0
      ? 'You\'re <b>' + S.money(left) + '</b> away from free shipping.'
      : '<b>Your order ships free.</b>';
    drawer.querySelector('.ship-bar i').style.width = Math.min(100, sub / set.freeShippingCents * 100) + '%';
    var lines = drawer.querySelector('.drawer-lines');
    lines.innerHTML = S.cart.length ? S.cart.map(lineHtml).join('') :
      '<div class="empty"><p>Your cart is empty.</p><a class="btn btn--ghost btn--sm" href="shop.html">Shop all</a></div>';
    drawer.querySelector('.drawer-foot').hidden = S.cart.length === 0;
    document.dispatchEvent(new CustomEvent('cart:change'));
  }
  drawer.addEventListener('click', function (e) {
    var t = e.target.closest('[data-inc],[data-dec],[data-rm],[data-close]');
    if (!t) return;
    if (t.hasAttribute('data-close')) return closeCart();
    var i = +(t.dataset.inc || t.dataset.dec || t.dataset.rm);
    if (t.dataset.inc) S.cart[i].qty++;
    if (t.dataset.dec) { S.cart[i].qty--; if (S.cart[i].qty < 1) S.cart.splice(i, 1); }
    if (t.dataset.rm) S.cart.splice(i, 1);
    save();
  });
  var giftCheck = drawer.querySelector('#gift-check'), giftNote = drawer.querySelector('#gift-note');
  var gift = store('sh-gift') || {};
  giftCheck.checked = !!gift.on; giftNote.value = gift.note || ''; giftNote.hidden = !gift.on;
  function saveGift() { store('sh-gift', { on: giftCheck.checked, note: giftNote.value }); giftNote.hidden = !giftCheck.checked; }
  giftCheck.addEventListener('change', saveGift); giftNote.addEventListener('input', saveGift);
  var lastFocus;
  function openCart() {
    lastFocus = document.activeElement;
    drawer.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { drawer.classList.add('is-open'); drawer.querySelector('.drawer-head .icon-btn').focus(); });
  }
  function closeCart() {
    drawer.classList.remove('is-open'); document.body.style.overflow = '';
    setTimeout(function () { drawer.hidden = true; }, reduced ? 0 : 350);
    if (lastFocus) lastFocus.focus();
  }
  S.openCart = openCart;
  header.querySelector('.cart-btn').addEventListener('click', openCart);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) closeCart(); });
  render();

  // ---------- product cards ----------
  S.fromPrice = function (p) {
    return p.variants ? Math.min.apply(null, p.variants.map(function (v) { return v.price; })) : p.price;
  };
  S.media = function (p, cls) {
    if (p.image) return '<img src="' + p.image + '" alt="' + S.esc(S.brandName(p.brand) + ' ' + p.name) + '" loading="lazy">';
    return '<div class="ph"><span class="ph-brand">' + S.esc(S.brandName(p.brand)) + '</span><span class="ph-note">Photo coming soon</span></div>';
  };
  S.card = function (p) {
    var badges = (p.badges || []).map(function (b) { return '<span class="badge">' + S.esc(b) + '</span>'; }).join('');
    if (p.compareAt) badges += '<span class="badge badge--save">Save ' + Math.round((1 - p.price / p.compareAt) * 100) + '%</span>';
    var from = p.variants ? 'From ' : '';
    return '<article class="card" data-reveal>' +
      '<a class="card-media" href="product.html?id=' + p.id + '">' + S.media(p) + (badges ? '<div class="badges">' + badges + '</div>' : '') + '</a>' +
      '<div class="card-body">' +
      '<p class="card-brand">' + S.esc(S.brandName(p.brand)) + (p.tier ? ' · ' + p.tier + ' tier' : '') + '</p>' +
      '<h3 class="card-name"><a href="product.html?id=' + p.id + '">' + S.esc(p.name) + '</a></h3>' +
      '<p class="card-size">' + S.esc(p.size || '') + '</p>' +
      '<div class="card-foot"><p class="card-price">' + from + S.money(S.fromPrice(p)) + (p.compareAt ? ' <s>' + S.money(p.compareAt) + '</s>' : '') + '</p>' +
      (p.variants ? '<a class="card-add" href="product.html?id=' + p.id + '">Choose</a>' : '<button class="card-add" type="button" data-quick="' + p.id + '">Add</button>') +
      '</div></div></article>';
  };
  document.addEventListener('click', function (e) {
    var q = e.target.closest('[data-quick]');
    if (!q) return;
    var p = S.product(q.dataset.quick);
    S.addToCart({ id: p.id, name: p.name, brand: p.brand, size: p.size, image: p.image, price: p.price });
  });

  // ---------- email signup (not connected yet) ----------
  document.addEventListener('submit', function (e) {
    if (!e.target.matches('[data-signup]')) return;
    e.preventDefault();
    S.toast('Thanks. Email signup connects when the store launches.');
    e.target.reset();
    store('sh-signed-up', true);
    var pop = document.querySelector('.pop'); if (pop) pop.hidden = true;
  });
  // First-visit offer, shown once per visitor after a short delay
  if (!store('sh-pop-seen') && !store('sh-signed-up') && page === 'home') {
    setTimeout(function () {
      var pop = document.createElement('div');
      pop.className = 'pop';
      pop.innerHTML = '<div class="pop-card" role="dialog" aria-modal="true" aria-labelledby="pop-title">' +
        '<button class="icon-btn pop-close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<p class="eyebrow eyebrow--center">Welcome to Stock\'d Haus</p><h2 id="pop-title" class="h2">' + S.money(set.emailOfferCents) + ' off your first order</h2>' +
        '<p class="muted">Join our list for ' + S.money(set.emailOfferCents) + ' off your first order of ' + S.money(set.emailOfferMinimumCents) + ' or more, plus first access to new drops.</p>' +
        '<form class="news-form" data-signup><label class="visually-hidden" for="pop-email">Email address</label><input id="pop-email" type="email" placeholder="Email address" required><button class="btn" type="submit">Sign up</button></form></div>';
      document.body.appendChild(pop);
      store('sh-pop-seen', true);
      pop.addEventListener('click', function (e) { if (e.target === pop || e.target.closest('.pop-close')) pop.hidden = true; });
    }, 9000);
  }

  // ---------- motion (from the WC Wagyu site) ----------
  S.reveal = function (root) {
    var targets = (root || document).querySelectorAll('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window) || reduced) { targets.forEach(function (t) { t.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  };
  document.addEventListener('DOMContentLoaded', function () { S.reveal(); });
  var layers = [];
  S.parallax = function () {
    layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    update();
  };
  function update() {
    if (reduced) return;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      el.style.setProperty('--shift', (((r.top + r.height / 2 - vh / 2) / (vh + r.height)) * -12).toFixed(2) + '%');
    });
  }
  window.addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  document.addEventListener('DOMContentLoaded', S.parallax);
})();
