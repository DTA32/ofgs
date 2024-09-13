# DTA32's Flash Game Site

## About

DFGS is a site for all of my favorite flash games, this project use React (using NextJS framework) as Frontend, Ruffle as Flash Player emulator*, and Express as API**

*considered to be replaced in the future because it's buggy on some games

**[API Repo](https://github.com/DTA32/ofgs-api)

*iya tau kok nama projectnya jelek, bodo amat lah yang penting jalan*

### Docker setup

To run frontend and backend individually can just `docker build -t (fe/be) .` and `docker run -d -p ext:3000 (fe/be)` each of them

Also can be run simultaneously using `docker compose up -d`, but first do `docker build -t dfgs-api .` on backend

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
