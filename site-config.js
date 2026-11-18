/* Kings Inn & Suites site settings.
 * Going live only needs this file filled in (and the photos swapped).
 * Leave a value as "" to keep the demo behaviour.
 */

/* ---------- BOOKING HOOKUP: where the owner's details go ----------
 * Nothing below is live. No link, key or account is set in this file.
 *
 * 1. Booking link: paste the owner's booking engine address into
 *    BOOKING_URL (e.g. the "Book now" page of the reservation system).
 *    Then fill BOOKING_PARAMS with the names that engine uses for
 *    check-in, check-out, guests and room type, and set
 *    BOOKING_DATE_FORMAT. If the engine gives an embed or iframe
 *    address instead, put it in BOOKING_EMBED and leave BOOKING_URL "".
 *
 * 2. Real rates: real prices come from the owner's booking engine once
 *    BOOKING_URL or BOOKING_EMBED is set; the site does not store them.
 *    SAMPLE_RATES below are examples labeled "Sample rate" and only show
 *    while no booking link or embed is set. Do not type real rates into
 *    SAMPLE_RATES; they would still be labeled as samples.
 *
 * 3. Payment provider: payment is taken by the owner's booking engine
 *    (or the payment provider it is connected to, e.g. Stripe or Square),
 *    on its own secure page. Never put a payment key, secret or card
 *    setting in this file or anywhere in the website files; this site
 *    is static and every file in it is public once hosted.
 * ------------------------------------------------------------------ */

// The owner's online booking engine link. Any parameters already in it
// (for example a hotel ID) are kept; dates, guests and room are added after them.
var BOOKING_URL = "";

// The names the booking engine uses in its link for dates, guests and room.
// Leave a key "" if the engine doesn't take it.
var BOOKING_PARAMS = { checkIn: "", checkOut: "", adults: "", roomType: "" };

// The date format the booking engine expects in its link:
// "YYYY-MM-DD", "MM/DD/YYYY" or "DD/MM/YYYY".
var BOOKING_DATE_FORMAT = "YYYY-MM-DD";

// Optional: an embed snippet or iframe address (https://...) if the engine
// gives one instead of a link. When set, it replaces the booking widget.
var BOOKING_EMBED = "";

// A free Cloudflare Web Analytics token. When set, the Cloudflare beacon
// loads and the sample view line in the footer is hidden.
var ANALYTICS_TOKEN = "";

// Sample nightly rates shown only while no booking link or embed is set.
// One round number per room type the site lists. Labeled "Sample rate".
var SAMPLE_RATES = { king: 129, double: 119 };

// Sample monthly view count shown in the footer while ANALYTICS_TOKEN is "".
var SAMPLE_VIEWS = 1248;
