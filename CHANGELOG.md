# Kings Inn private concept — implementation changelog

## November 11, 2026 — Wren v3 editorial refinement

### Ancestry and scope

The implementation began by copying `/home/ubuntu/upload/kings-inn-concept-website-wren-build-v3-nov11.html` to `site/index.html`. This is a refinement of that supplied Wren v3 document, not a replacement concept. Its section anchors, June copy slots, booking scaffold, six-space Transformation builder, before/after comparison pattern, menu, native FAQs, concept inquiry, footer disclaimer, and mobile quick-action pattern are retained and developed. Inline styling and behavior were extracted into `site/styles.css` and `site/script.js`.

All four Kings Inn Markdown sources were read. June's hero, pitch, book-direct banner, Transformation introduction and change notes, amenities descriptions, room section copy, longer-stay paragraph, inquiry copy, and disclaimer were retained. The directed room renaming, factual corrections, removal of unverified nearby claims, and essential safety/accessibility microcopy are the exceptions.

Only the assigned site files and this changelog were written. The main project ToDo was not edited. No initialization, configuration, server start, browser use, image generation, publication, commit, upload, hotel contact, sending, transaction, or video work was performed by this implementation seat.

### Presentation

- Warm linen/oat surfaces, deep navy, walnut, brushed-brass accents, thin rules, large serif typography, and generous section spacing refine the original palette. No heavy shadows or gradients remain.
- The thin navy CONCEPT strip and header share a sticky wrapper on mobile and desktop. The document clearly says it is independent and not the hotel's official website.
- The hero retains June's headline and pitch, with the arrival AFTER panel beside the text on larger screens and below it on smaller screens. Mobile booking remains near the opening viewport rather than following a fixed, tall hero.
- The Transformation immediately follows booking. The King guest room and pool lead; the four remaining spaces form a shorter desktop grid.
- Exactly two standalone room feature stories replace the original crowded room-category cards: **The King Room** and **The Double Full Room**. Their alternating editorial layouts include large imagery, June-derived taglines and prose, individual Featured Amenities definition lists, and separate CONCEPT proposals.
- Local Cormorant Garamond and DM Sans font URLs use the exact supplied filenames and their provided weight ranges, with system serif/sans fallbacks. The font files were supplied by main, not modified by this seat.

### Room facts and property safeguards

The King Room's existing configuration is one king plus a sofa bed; FOUR cushions are confirmed per Rose. Its premium king proposal retains the four-cushion sofa bed and is expressly CONCEPT, not represented as installed. The Double Full Room's existing configuration is two full-size beds plus a sofa bed; THREE cushions are confirmed per Rose. Its separate CONCEPT proposal replaces the full-size beds with two queens and retains the three-cushion sofa bed. Both room sizes and maximum occupancies are UNCONFIRMED — [TO CONFIRM]. The booking selector has exactly these two room options, and the guest input imposes no invented maximum occupancy.

All six amenities descriptions keep June's words with adjacent UNCONFIRMED / access [TO CONFIRM] status text. Rose's observations are not represented as independent verification. The whirlpool is explicitly not presented as working, with operating status UNCONFIRMED — [TO CONFIRM]. Event-room dimensions and capacity claims are absent. The market nook appears only as a Transformation CONCEPT idea, not an existing amenity.

The address is the Rose-supplied **9365 Waterstone Blvd, Mason, OH 45249**. Unverified nearby drive times were removed. The quiet location card depicts no roads or accurate geography and labels the exact pin UNCONFIRMED — [TO CONFIRM]. The sole outbound address link opens a standard Maps address search only when the visitor clicks it; there is no map embed or automatic map request.

### Imagery and portability handoff

All seven authoritative managed pair-board URLs remain unchanged. `data-image-key` attributes and the `assets` map in `script.js` identify their placement for main's portable conversion. Each board is shown inside a landscape `aspect-ratio: 3 / 2` wrapper, with its full portrait image positioned at `width: 100%; height: 200%`. BEFORE is `top: 0`; AFTER is `bottom: 0`. The hero and room stories default to AFTER. Room before toggles use the same pair source.

A web CONCEPT overlay remains visible over every image presentation, including slider endpoints. Comparison and room captions state: “Before: illustrative baseline, not a current hotel photo. After: CONCEPT design. Geometry: UNCONFIRMED — [TO CONFIRM].” The global disclosure says no actual hotel photos or measurements were supplied and does not claim verified geometry preservation.

Main is responsible for runtime asset availability, visual inspection of the generated boards, and portable image download/splitting. This seat did not retrieve or generate images.

### Interaction and accessibility

- Native date, guest, and room inputs preserve the mock booking bar. Submission updates a live `role="status"` notice, checks no availability, and creates no reservation.
- The Rose-only concept form sends nothing. Submission updates its live status notice. Both forms defensively cancel native submission, have no external action, and transmit no named fields.
- Rose's supplied email is displayed as text, not an automatic email link or sending integration.
- Every Call button opens an accessible native dialog explaining that no call is connected and the hotel phone is UNCONFIRMED. There are no `tel:` links.
- Mobile navigation toggles with accurate expanded state and closes through navigation, outside click, or Escape. Native dialog Escape behavior is retained, with focus returned on closing.
- The six comparisons use native keyboard-operable range inputs, descriptive accessible names, percentage value text, caption descriptions, and visible wrapper/knob focus states. Both room before toggles update image phase and accessible state.
- Skip-to-content, native FAQ details, minimum 48px targets, 16px body/control text, responsive grids with shrinkable columns, sticky-header scroll offsets, reduced-motion support, and safe-area bottom padding are implemented. The mobile Call/Book bar appears after the booking bar has been passed, preserving Wren's original pattern.

### Checks completed

`node --check site/script.js` passed. Focused Python checks passed for HTML5 parsing, recursive CSS parsing, the route JSON, unique IDs, internal anchors, form labels, ARIA references, exactly two room stories/options, eight specification rows, six amenities, four native FAQs, Transformation placement, twelve original June section-copy slots, both exact taglines/prose passages, seven exact managed asset URLs, correct pair-half CSS, font-file existence, and disconnected interaction scaffolding.

The visible-copy scan found no commercial wording, guest-review/rating content, old room labels, forbidden amenity claims, unverified nearby drive times, or benchmark-brand references. June's “design and review purposes” disclaimer is retained as design-review language, not guest-review content. No network, storage, email, or telephone sending API is present in the script.

### Handoff limitations

No browser or viewport rendering checks were run because they were explicitly out of scope. Mobile overflow and image composition still need main's visual/runtime inspection at the requested widths. Async managed-image readiness was not checked. No actual property photographs, measurements, exact map pin, verified operating/access status, or hotel telephone were supplied; the visible uncertainty labels remain deliberately in place. `noindex` metadata and `robots.txt` discourage crawling but are not authentication or a guarantee of access privacy.

### Files

- `site/index.html`
- `site/styles.css`
- `site/script.js`
- `site/manus-routes.json`
- `site/robots.txt`
- `CHANGELOG.md`
