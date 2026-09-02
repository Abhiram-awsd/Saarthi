# SAARTHI — THE MENTATS

SIH 2026 PS92 frontend prototype + MERN-ready API structure.

## Current product functionality

- Dashboard / personalized overview
- Multi-step AI scheme matching flow
- Replaceable mock ML recommendation service
- Scheme explorer with search + category filter
- Scheme details + explainable recommendation reasons
- EMI / financial calculator
- Partner locator with radius/type filters, geolocation permission and directions links
- Application tracker
- Document center with demo upload interaction
- Notifications center
- Responsive desktop/mobile navigation
- Netlify + Vercel SPA configuration

## Run locally

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173
API: http://localhost:5000

## Deploy frontend to Netlify

Build command: `npm run build`
Publish directory: `dist`

The frontend is deliberately self-contained with mock data, so the Netlify preview works without MongoDB or the ML model.

## ML integration

`src/services/recommendationService.js` is the integration point. When the ML team exposes an inference endpoint, set `VITE_API_URL` and keep the response contract:

```json
{
  "recommendations": [
    {
      "schemeId": "PMEGP",
      "score": 92,
      "eligible": true,
      "reasons": ["..."]
    }
  ]
}
```

## Production next steps

1. Replace mock scheme/partner/application data with MongoDB APIs.
2. Connect the ML inference API.
3. Replace the visual map with Mapbox/Google Maps/OpenStreetMap integration.
4. Add real authentication and encrypted document storage.
5. Add official source URLs + last-verified timestamps to every scheme.
