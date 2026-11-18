/* Refined from Wren v3's six-space comparison builder and menu interactions.
 * No form posts, storage or messages. Booking only opens BOOKING_URL (site-config.js) when set;
 * analytics only loads when ANALYTICS_TOKEN is set.
 * Authoritative pair-board URLs stay unchanged for the managed live project.
 */
(function () {
  'use strict';

  var disclosure = 'AI concept images removed. A real photo of this space goes here.';
  // Shot list labels (Rose, Nov 13). Every AI image is marked as not the real property.
  var SHOTS = { king: 'standard king room', double: 'Double Full room', pool: 'indoor pool', event: 'event room', arrival: 'exterior and entrance', market: '24-hour vending area' };
  var spaces = [
    {
      name: 'Guest Room', key: 'king',
      notes: ['A more cohesive presentation of the guest room experience.', 'A cleaner, more inviting visual identity.', 'Room details presented clearly for prospective guests.'],
      status: 'The King Room CONCEPT: premium king + four-cushion sofa bed. Not represented as installed.'
    },
    {
      name: 'Indoor Pool', key: 'pool',
      notes: ['Present the indoor pool as a central property feature.', 'Create a more inviting visual presentation of the pool area.'],
      status: 'Pool access / operating status: UNCONFIRMED — [TO CONFIRM].'
    },
    {
      name: 'Event Room', key: 'event',
      notes: ['Give the existing event room a more prominent presentation.', 'Illustrate its potential as a gathering space.', 'Create a dedicated visual destination for event inquiries.'],
      status: 'Status / access: UNCONFIRMED — [TO CONFIRM].'
    },
    {
      name: 'Arrival & Parking', key: 'arrival',
      notes: ['Make arrival information easier to understand.', "Present the property's substantial rear parking area clearly.", 'Create a more welcoming first impression online.'],
      status: 'Parking observation supplied by Rose, not independently verified. Status / access: UNCONFIRMED — [TO CONFIRM].'
    },
    {
      name: '24-Hour Vending', key: 'market',
      notes: ['Present the 24-hour vending area as a guest convenience.', 'Make it easy for guests to find at any hour.', 'Exact location: [TO CONFIRM].'],
      status: 'Status / access: UNCONFIRMED — [TO CONFIRM].'
    }
  ];

  function el(tag, cls, text) {
    var element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text) element.textContent = text;
    return element;
  }

  // Real photos for spaces that have one (Nov 18 pitch copy). Others keep the gray placeholder.
  var PHOTOS = {
    king: { src: 'assets/borrowed/BORROWED-NOT-CLEARED-rooms-01.jpg', alt: 'Suite with a sofa seating area and a bed past a divider wall', w: 678, h: 453 },
    pool: { src: 'assets/borrowed/BORROWED-NOT-CLEARED-amenities-01.jpg', alt: 'Indoor pool with lounge chairs along the wall', w: 680, h: 453 },
    arrival: { src: 'assets/borrowed/BORROWED-NOT-CLEARED-hero-01.jpg', alt: 'Front of the hotel with its covered entrance and drive, daytime', w: 720, h: 551 }
  };

  function photo(space) {
    var p = PHOTOS[space.key];
    var i = document.createElement('img');
    i.className = 'photo';
    i.src = p.src; i.alt = p.alt; i.width = p.w; i.height = p.h;
    i.loading = 'lazy'; i.decoding = 'async';
    return i;
  }

  function grayBox(space) {
    var shot = SHOTS[space.key] || space.name;
    var b = el('div', 'ph-box');
    b.setAttribute('role', 'img');
    b.setAttribute('aria-label', '[PLACEHOLDER] PHOTO: not the real property. Real photo to be added: ' + shot + '.');
    b.appendChild(el('span', 'ph-box__t', '[PLACEHOLDER] PHOTO: not the real property'));
    b.appendChild(el('span', 'ph-box__s', 'Real photo to be added: ' + shot));
    return b;
  }

  var wrap = document.getElementById('baCards');
  if (wrap) {
    spaces.forEach(function (space, index) {
      var card = el('figure', 'card' + (index < 2 ? ' lead' : ''));
      var body = el('figcaption', 'body');
      var heading = el('div', 'card-heading');
      heading.appendChild(el('span', 'eyebrow', '0' + (index + 1)));
      heading.appendChild(el('h3', '', space.name));
      body.appendChild(heading);
      var notes = el('p', 'change-notes', space.notes.join(' '));
      notes.setAttribute('data-slot', 'change-notes');
      body.appendChild(notes);
      if (!PHOTOS[space.key]) body.appendChild(el('p', 'image-caption', disclosure));
      body.appendChild(el('p', 'feature-status', space.status));
      card.appendChild(PHOTOS[space.key] ? photo(space) : grayBox(space));
      card.appendChild(body);
      wrap.appendChild(card);
    });
  }

  var header = document.getElementById('siteHeader');
  var menuButton = document.getElementById('menuBtn');
  var menu = document.getElementById('mnav');
  var desktop = window.matchMedia('(min-width: 1100px)');

  function setHeaderHeight() {
    // An open mobile menu must not inflate anchor offsets after it closes.
    var baseHeight = header.offsetHeight - (menu.hidden ? 0 : menu.offsetHeight);
    document.documentElement.style.setProperty('--headerh', baseHeight + 'px');
  }

  function closeMenu(restoreFocus) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    setHeaderHeight();
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', function () {
    var opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
    setHeaderHeight();
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('click', function (event) {
    if (!menu.hidden && !header.contains(event.target)) closeMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu(true);
    }
  });
  function handleDesktopChange() {
    if (desktop.matches) closeMenu(false);
    setHeaderHeight();
  }
  if (desktop.addEventListener) desktop.addEventListener('change', handleDesktopChange);
  else desktop.addListener(handleDesktopChange);
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  if ('ResizeObserver' in window) new ResizeObserver(setHeaderHeight).observe(header);

  /* ---------- Booking widget (settings in site-config.js) ---------- */
  function cfg(name, fallback) {
    return typeof window[name] !== 'undefined' ? window[name] : fallback;
  }
  var BOOKING_URL = String(cfg('BOOKING_URL', '') || '').trim();
  var BOOKING_PARAMS = cfg('BOOKING_PARAMS', {}) || {};
  var BOOKING_DATE_FORMAT = String(cfg('BOOKING_DATE_FORMAT', 'YYYY-MM-DD') || 'YYYY-MM-DD');
  var BOOKING_EMBED = String(cfg('BOOKING_EMBED', '') || '').trim();
  var ANALYTICS_TOKEN = String(cfg('ANALYTICS_TOKEN', '') || '').trim();
  var SAMPLE_RATES = cfg('SAMPLE_RATES', {}) || {};
  var SAMPLE_VIEWS = Number(cfg('SAMPLE_VIEWS', 0)) || 0;

  var booking = document.getElementById('booking');
  var bookingForm = document.getElementById('bookingForm');
  var bookNote = document.getElementById('bookNote');
  var badge = document.getElementById('bookingBadge');
  var ratesBox = document.getElementById('sampleRates');
  var embedBox = document.getElementById('bookingEmbed');
  var ci = document.getElementById('ci');
  var co = document.getElementById('co');
  var guests = document.getElementById('g');
  var room = document.getElementById('r');
  var demoDialog = document.getElementById('demoDialog');
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  ci.min = todayISO();
  co.min = todayISO();
  ci.addEventListener('change', function () { if (ci.value) co.min = ci.value; });

  function formatDate(iso) {
    var p = iso.split('-');
    if (BOOKING_DATE_FORMAT === 'MM/DD/YYYY') return p[1] + '/' + p[2] + '/' + p[0];
    if (BOOKING_DATE_FORMAT === 'DD/MM/YYYY') return p[2] + '/' + p[1] + '/' + p[0];
    return iso;
  }

  function validate() {
    var today = todayISO();
    if (!ci.value || !co.value) return 'Please choose a check-in and a check-out date.';
    if (ci.value < today) return 'Check-in can’t be in the past.';
    if (co.value <= ci.value) return 'Check-out must be after check-in.';
    return '';
  }

  // Builds the booking link, keeping any parameters already in BOOKING_URL.
  function bookingLink() {
    var url = new URL(BOOKING_URL, window.location.href);
    var values = { checkIn: ci.value && formatDate(ci.value), checkOut: co.value && formatDate(co.value), adults: guests.value, roomType: room.value };
    Object.keys(values).forEach(function (key) {
      var name = String(BOOKING_PARAMS[key] || '').trim();
      if (name && values[key]) url.searchParams.set(name, values[key]);
    });
    return url.href;
  }
  window.__kingsInnBookingLink = function () { return BOOKING_URL ? bookingLink() : ''; };

  function openBooking() {
    var link = bookingLink();
    var w = window.open(link, '_blank', 'noopener');
    if (w) w.opener = null;
    return link;
  }

  function roomName(key) {
    var opt = room.querySelector('option[value="' + key + '"]');
    return opt ? opt.textContent : key;
  }

  function showSampleRates() {
    ratesBox.textContent = '';
    var list = document.createElement('ul');
    Array.prototype.forEach.call(room.options, function (opt) {
      var rate = SAMPLE_RATES[opt.value];
      if (rate === undefined || rate === '') return;
      var li = document.createElement('li');
      if (opt.value === room.value) li.className = 'is-selected';
      li.appendChild(el('span', 'rate-room', roomName(opt.value)));
      li.appendChild(el('span', 'rate-price', '$' + Math.round(Number(rate)) + ' / night'));
      li.appendChild(el('span', 'rate-label', 'Sample rate'));
      list.appendChild(li);
    });
    ratesBox.appendChild(list);
    ratesBox.hidden = false;
  }

  function check() {
    var problem = validate();
    if (problem) { bookNote.textContent = problem; return false; }
    if (BOOKING_URL) {
      openBooking();
      bookNote.textContent = 'Your booking page opened in a new tab.';
    } else {
      showSampleRates();
      bookNote.textContent = 'Sample rates for your dates. These are examples, not live prices.';
    }
    return true;
  }

  function book() {
    if (BOOKING_URL) {
      var problem = validate();
      if (problem) { bookNote.textContent = problem; booking.scrollIntoView({ block: 'start' }); ci.focus(); return; }
      openBooking();
      bookNote.textContent = 'Your booking page opened in a new tab.';
    } else {
      if (!demoDialog.open) demoDialog.showModal();
    }
  }

  if (BOOKING_EMBED) {
    // Embed replaces the widget: an https address becomes an iframe, otherwise the snippet is inserted as given.
    bookingForm.hidden = true;
    bookNote.hidden = true;
    badge.textContent = '';
    if (/^https:\/\//i.test(BOOKING_EMBED)) {
      var frame = document.createElement('iframe');
      frame.src = BOOKING_EMBED;
      frame.title = 'Book your stay';
      frame.className = 'booking-frame';
      embedBox.appendChild(frame);
    } else {
      embedBox.appendChild(document.createRange().createContextualFragment(BOOKING_EMBED));
    }
    embedBox.hidden = false;
  } else if (BOOKING_URL) {
    badge.textContent = '';
  } else {
    badge.textContent = 'Sample rates shown';
  }

  document.getElementById('checkBtn').addEventListener('click', check);
  document.getElementById('bookBtn').addEventListener('click', book);
  bookingForm.addEventListener('submit', function (event) { event.preventDefault(); check(); });
  room.addEventListener('change', function () { if (!ratesBox.hidden) showSampleRates(); });

  // Header and bottom-bar "Book Direct": go straight to booking when a link is set, otherwise to the widget.
  document.querySelectorAll('[data-book]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (BOOKING_URL && !validate()) { event.preventDefault(); openBooking(); }
    });
  });

  document.querySelector('[data-close-demo]').addEventListener('click', function () { demoDialog.close(); });
  demoDialog.addEventListener('click', function (event) {
    if (event.target !== demoDialog) return;
    var box = demoDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) demoDialog.close();
  });

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    formNote.textContent = 'Concept mockup only: this form is not connected and sends nothing. No message or personal information was transmitted.';
  });
  document.querySelectorAll('[data-select-room]').forEach(function (link) {
    link.addEventListener('click', function () {
      room.value = link.dataset.selectRoom;
      if (!ratesBox.hidden) showSampleRates();
    });
  });

  /* ---------- View counter / analytics ---------- */
  var counter = document.getElementById('viewCounter');
  if (ANALYTICS_TOKEN) {
    counter.hidden = true;
    var beacon = document.createElement('script');
    beacon.defer = true;
    beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: ANALYTICS_TOKEN }));
    document.body.appendChild(beacon);
  } else if (SAMPLE_VIEWS) {
    counter.textContent = 'Site views this month: ' + SAMPLE_VIEWS.toLocaleString('en-US') + ' (sample)';
  } else {
    counter.hidden = true;
  }

  var dialog = document.getElementById('callDialog');
  var lastCallButton;
  document.querySelectorAll('[data-call]').forEach(function (button) {
    button.addEventListener('click', function () {
      lastCallButton = button;
      closeMenu(false);
      if (!dialog.open) dialog.showModal();
    });
  });
  document.querySelector('[data-close-dialog]').addEventListener('click', function () {
    dialog.close();
  });
  // The native dialog supplies focus containment and Escape-to-close behavior.
  dialog.addEventListener('close', function () {
    if (lastCallButton && lastCallButton.getClientRects().length) lastCallButton.focus();
    else menuButton.focus();
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });

  var bar = document.getElementById('bottombar');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var activeElementInside = bar.contains(document.activeElement);
        var bookingNotPassed = entry.isIntersecting || entry.boundingClientRect.top >= 0;
        bar.classList.toggle('is-hidden', bookingNotPassed && !activeElementInside);
      });
    }).observe(booking);
  } else {
    bar.classList.remove('is-hidden');
  }
})();
