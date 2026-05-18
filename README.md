# BizMatch

BizMatch is an AI-guided business ideation coach for students and young entrepreneurs.
It helps users think through realistic beginner-friendly business ideas without turning
the experience into a generic startup generator.

## Stack

- Next.js
- React
- Tailwind CSS
- Next.js API routes
- OpenAI API with `gpt-4o-mini`
- Vercel deployment target

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Add your OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
```

3. Start the development server:

```bash
npm run dev
```

## Product Scope

The app is intentionally focused on four flows:

- Landing page
- BizMatch questionnaire
- Recommendation results
- Expanded mentor view with a live business model canvas

No internship, job, academic, dashboard, scraping, or account systems are included in
this version.

## Notes

If no API key is present, the app falls back to local demo recommendations and mentor
responses so the product remains usable during development.
