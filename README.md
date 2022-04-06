# Next.js with TypeScript and Material-UI Bootstrap

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material`, Typescript, `eslint`, and `prettier`.

## Getting Started

### Pre-Flight

Before anything, you'll want to clone this repository and run `npm i` to install all dependencies.

To use this app locally, you will need [Oauth2 credentials](https://api.emsidata.com/apis/job-postings#authentication) that give you access to the [JPA API](https://api.emsidata.com/apis/job-postings). Once you have those, create a new file called `.env.local` at the root of this repository using the following template (filling in the values for your own Oauth2 credentials):

```bash
NEXT_PUBLIC_CLIENT_ID=<your client id>
NEXT_PUBLIC_CLIENT_SECRET=<your client secret>
```

### Take-Off

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> Note: NextJS automatically enables hot-refresh, so you can update files and see the results in real-time.

## Testing

### Unit Testing

Unit tests have been written using [`React Testing Library`](https://testing-library.com/docs/react-testing-library/) and [`jest`](https://jestjs.io/). To run the unit tests in 'watch' mode (rather than in the CI/CD-ready mode of `npm run test`), simply use the following:

```bash
npm run test:unit-watch
```
