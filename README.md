# Next.js with TypeScript and Material-UI Bootstrap

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.

## Getting Started

### Pre-Flight

Before anything, you'll want to clone this repository and run `npm i` to install all dependencies.

To use this app locally, you will need [Oauth2 credentials](https://api.emsidata.com/apis/job-postings#authentication) that give you access to the [JPA API](https://api.emsidata.com/apis/job-postings). Once you have those, create a new file called `.env.local` using the following template (filling in the values for your own Oauth2 credentials):

```bash
NEXT_PUBLIC_CLIENT_ID=<your client id>
NEXT_PUBLIC_CLIENT_SECRET=<your client secret>
```

### Take-Off

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> Note: NextJS automatically enables hot-refresh, so you can update files and see the results in real-time.

## Testing

### Unit Testing

### End-to-End Testing
