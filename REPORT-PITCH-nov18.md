# Kings Inn pitch copy: report (Nov 18, 2026)

**Task:** Photo order (pitch-version-nov17) + go-live order (pitch-golive-ready-nov17) + fixes A–F
**Assigned to:** Claude (run directly on viper; Claude Code CLI isn't installed on viper, so the orders were carried out by the cloud session through viper's file tools)
**Status:** Done
**Folder:** C:\Users\david_kmhet26\Downloads\kings-inn-concept-PITCH (original kings-inn-concept untouched)

## Result

**Photos (index.html, coastal, green):**
| Slot | File | Alt |
|---|---|---|
| Hero (exterior/entrance) | hero-01 | Front of the hotel with its covered entrance and drive, daytime |
| King Room | rooms-01 | Suite with a sofa seating area and a bed past a divider wall |
| Double Full Room | rooms-02 | Guest room with two beds, a window and a TV |
| Transformation: Guest Room | rooms-01 | (same as King Room) |
| Transformation: Pool & Whirlpool | amenities-01 | Indoor pool with lounge chairs along the wall |
| Transformation: Arrival & Parking | hero-01 | (same as hero) |
| Gallery strip (new section "A Look Around", added because the site had no gallery) | hero-01, gallery-01 (lobby), rooms-02, rooms-01, gallery-02 (bathroom), amenities-01, gallery-03 | per the order |
| Location, next to the Maps link | hero-01 | Front of the hotel on Waterstone Blvd |

Placeholders left (no matching photo): Transformation "Event Room" and "Market Nook". No separate lobby, bathroom, accessible, breakfast, fitness, parking or whirlpool slots existed, so lobby and bathroom photos are used in the gallery only.

**Room types:** The King Room, The Double Full Room.
**Sample rates (site-config.js):** King $129, Double Full $119. Each labeled "Sample rate".
**Widget:** under the hero on all three pages (check-in, check-out, guests 1–6, room type; Check Availability + Book). Header "Book Direct" and the mobile bottom-bar "Book Direct" jump to it (or open the booking link directly once BOOKING_URL is set and dates are valid).
**Counter:** footer bottom line on all three pages.
**Config:** site-config.js loads before script.js on every page. Includes BOOKING_DATE_FORMAT = "YYYY-MM-DD" (fix A). Existing BOOKING_URL parameters are kept (fix B).
**Also added:** favicon.svg, page titles/descriptions, Open Graph tags (relative hero path), Gallery nav link, demo dialog, README-PRIVATE.txt, GO-LIVE-CHECKLIST.md (fix F in item 7). noindex was already on every page.

**Tests:** all 3 pages × 390 px and 1280 px, headless Chrome, every request outside the local folder blocked and logged (fix C).
1. Config empty: 14 images load, all with alt, 2 placeholders show, sample rates labeled, Book shows "Demo only. No booking was made…", footer "Site views this month: 1,248 (sample)", zero outside requests, zero script errors, no sideways scroll. Past dates and check-out-before-check-in show plain messages. PASS.
2. BOOKING_URL = https://example.com/book?hotel=KI123 with params arrive/depart/adults/room: no tab opened (fix D). Link Book would open:
   `https://example.com/book?hotel=KI123&arrive=2027-03-10&depart=2027-03-12&adults=3&room=double` (hotel=KI123 kept). Sample rates hidden. Zero outside requests. PASS.
3. ANALYTICS_TOKEN = TEST: beacon script tag present with {"token":"TEST"}, sample line hidden. The one attempt to fetch static.cloudflareinsights.com was blocked, so nothing reached Cloudflare (fix E). PASS.
Config put back to empty after testing.

## Problems
**Address (9365 Waterstone Blvd, Mason, OH 45249) appears on each page in:** meta description, og:description, Location map box, Location address block, Maps link, FAQ "Where is…", footer. Check against the owner.
**Breakfast:** not claimed anywhere visible. Only in script.js as a placeholder label ("breakfast or common area, if one exists") on the Event Room and Market Nook placeholders. Google lists breakfast as unavailable.
**Existing claims kept as-is (not added by me):** Amenities list and FAQ mention whirlpool and event room, marked UNCONFIRMED.
**Concept labels:** the top "CONCEPT · Not the official hotel website" bar and footer disclaimer are still on. They weren't borrowed-photo warnings, so I left them; remove them at go-live if the owner hires you.
**Search for gtag, googletagmanager, fetch(, XMLHttpRequest, sendBeacon, action=:** none found. The Cloudflare beacon is only added when ANALYTICS_TOKEN is set.

## Next step
Open kings-inn-concept-PITCH\index.html on viper and review before showing the owner.
