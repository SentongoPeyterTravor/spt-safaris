# SPT Safaris Website

A full multi-page safari tour website themed around the SPT Safaris logo (forest green + warm orange), built with plain HTML, CSS, and JavaScript — no build tools required.

## Pages included
- `index.html` — Home (hero + search bar, stats, why-us, about preview, featured tours, destinations, testimonials,community, blog preview, newsletter)
- `about.html` — About Us, values, team
- `tours.html` — All tour packages grid
- `tour-detail.html` — Single tour detail page with itinerary, FAQs, booking sidebar
- `destinations.html` — National parks / destinations grid
- `bwindi.html`, `queen-elizabeth.html`, `masai-mara.html`, `serengeti.html` — Dedicated destination field notes
- `murchison-falls.html`, `rwenzori-mountains.html`, `lake-mburo.html`, `volcanoes.html` — Dedicated destination field notes
- `gallery.html` — Filterable photo gallery
- `blog.html` — Blog/journal listing
- `contact.html` — Contact form, info card, embedded map
- `quotation.html` — Interactive FNR Uganda park-fee and activity quotation calculator

## How to use in VS Code
1. Unzip this folder and open it in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. The site will open in your browser and hot-reload as you edit.

No npm install or build step is needed — it's all static HTML/CSS/JS.

## Customizing
- **Logo**: `images/logo.png` (your uploaded SPT Safaris logo).
- **Colors**: edit the CSS variables at the top of `css/style.css` (`--green-600`, `--orange-600`, etc.) to adjust the theme.
- **Images**: all photography currently pulls from Unsplash via direct URLs for demo purposes — swap these `src` attributes for your own photos before going live.
- **Content**: tour prices, itineraries, team bios, and blog posts are placeholder text — update directly in the HTML files.
- **Forms**: the contact/newsletter/booking forms currently show a demo confirmation message (see `js/script.js`, `form[data-demo]` handler). Connect them to a backend, Formspree, EmailJS, or similar service to make them functional.

## Notes
- Fully responsive (desktop, tablet, mobile) with a slide-in mobile menu.
- Includes animated stat counters, FAQ accordion, gallery filtering, scroll-reveal, and back-to-top button — all in `js/script.js`.
- Font Awesome icons and Google Fonts (Poppins + Mulish) are loaded via CDN — an internet connection is required for full styling/icons.
