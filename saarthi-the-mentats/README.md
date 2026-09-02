# SAARTHI — THE MENTATS

Premium React + Express + MongoDB-ready prototype for SIH 2026 PS92.

## Preview on Netlify

This project is configured for Netlify:

1. Upload/push the folder to GitHub.
2. Import the repository in Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

The frontend works with local mock data, so the preview does not require MongoDB or the ML model.

## Local development

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:5000

## MERN structure

- `src/` — React frontend
- `server/` — Express API + MongoDB models
- `src/services/recommendationService.js` — replaceable ML integration point
- `src/data/mockData.js` — temporary scheme/partner/application data

When the ML team's model is ready, replace the mock recommendation call in `recommendationService.js` with their API endpoint without changing the UI.

## Brand palette

Extracted from the supplied palette reference:
- `#D9A068`
- `#C2B5A9`
- `#996531`
- `#A69C92`
- `#261707`

The UI uses these as accent/brand tones over warm ivory surfaces and espresso text.
