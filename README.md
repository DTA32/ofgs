# DTA32's Flash Game Site

## About

DFGS is a site for all of my favorite flash games, this project use React (using NextJS framework) as Frontend, Ruffle as Flash Player emulator*, and Express as API**

*considered to be replaced in the future because it's buggy on some games

**[API Repo](https://github.com/DTA32/ofgs-api)

*iya tau kok nama projectnya jelek, bodo amat lah yang penting jalan*

### Docker setup

For quick preview, image is available on docker hub and can be pulled by `docker pull dta32/ofgs:latest` then step 2, but it's based on master branch, so if there's code changes or want to change API url to local can do these

1. `docker build --build-arg NEXT_PUBLIC_API_URL="{localIp:port}" -t dta32/ofgs .`
1. `docker run -d -p {externalPort}:3000 dta32/ofgs:latest`

For more simple deploy on each side can also use docker compose, it will autorun frontend and backend, but please build/pull backend image first and edit env and args for each image

1. `docker compose build`
1. `docker compose up -d`

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
