# Lookify Try-On Backend

This folder contains the small server-side proxy used by the Shopify Try It On section.

## Files

- `api/try-on.js` — starts a Corlen virtual try-on job.
- `api/try-on-status.js` — checks a Corlen job status.
- `package.json` — minimal Vercel project configuration.

## Environment variable

Add this in Vercel:

`CORLEN_API_KEY=your_private_corlen_api_key`

Do NOT put the API key in Shopify Custom Liquid or frontend JavaScript.

## Vercel endpoints after deployment

POST:
`https://YOUR-DOMAIN.vercel.app/api/try-on`

GET:
`https://YOUR-DOMAIN.vercel.app/api/try-on-status?jobId=JOB_ID`
