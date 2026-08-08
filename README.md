# Isnad Institute — Next.js website

Production-oriented V1 rebuild using the supplied Sanad Next.js project as a layout/UX reference and the supplied Elementor export as a source for Isnad messaging/testimonials.

## Included pages
- Home
- Arabic Course
- Quran Classes
- Pricing
- About
- Contact
- Book Free Trial

Teacher credibility and FAQ are intentionally integrated into the homepage rather than separate pages.

## Brand
- Domain: https://isnadinstitute.com
- Email: hello@isnadinstitute.com
- Primary green: #0F6B4F
- Logo files: `/public/isnad-logo.png` and `/public/isnad-mark.png`

## Run locally
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm start
```

## Forms
The Contact and Book Trial forms currently use `mailto:hello@isnadinstitute.com` so they work without backend credentials. For production, connect them to Hostinger forms, Resend, Formspree, a CRM, or your booking platform.

## Notes
- Testimonials are based on the genuine testimonial copy in the supplied Elementor export.
- No Blog, Teachers page or separate FAQ page in V1.
- The site uses the Sanad landing-page pacing as a reference, but the design and copy are original to Isnad Institute.
