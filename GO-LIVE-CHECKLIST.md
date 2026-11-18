# Kings Inn & Suites: Go-Live Checklist

Do these in order. Nothing here is live yet.

1. **Photos.** Delete every `BORROWED-NOT-CLEARED-*` file in `assets/borrowed/`. Put in the owner's own photos for the same slots, and keep the same alt text (or update it to match the new photo). Slots: hero, King Room, Double Full Room, gallery strip (7), location, and the three Transformation cards (Guest Room, Indoor Pool, Arrival & Parking, set in `script.js` under `PHOTOS`).
2. **Booking.** Find out which booking engine or reservation system the owner uses. In `site-config.js`, fill `BOOKING_URL` and `BOOKING_PARAMS` and set `BOOKING_DATE_FORMAT` to the format his engine expects. If his engine gives an embed instead, fill `BOOKING_EMBED`. Test one booking end to end with the owner.
3. **Analytics.** Set `ANALYTICS_TOKEN` from a free Cloudflare Web Analytics account in the owner's name.
4. **Facts.** Fix the address and breakfast items listed in the report (address shows as 9365 Waterstone Blvd in several places; Google lists breakfast as unavailable).
5. **Indexing.** Remove the `noindex` robots tag from every page and change `robots.txt` to allow crawling.
6. **Private files.** Delete `README-PRIVATE.txt` and this checklist from the files that go live.
7. **Amenities and accessibility.** Owner confirms every amenity on the list. For each accessible room, list: tub or roll-in shower, grab bars, bed height, door width, and the route from accessible parking. This is required on booking pages under the ADA, 28 CFR 36.302(e).
8. **Hosting.** Host on hosting the owner owns and point his domain at it. Then change each page's Open Graph image (`og:image`) to the full https address of the live hero photo, for example `https://hisdomain.com/assets/hero.jpg`.
