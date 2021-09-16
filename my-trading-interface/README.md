# My Trading Interface

Modern, real time trading interface.

This project uses the React Framework [Next.js](https://nextjs.org/) and is written in TypeScript.

## Getting Started

Run the development server:

```sh
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## General project structure

- `components` - all available React components
  - `hoc` - higher-order components
  - `ui` - smaller user interface components
  - `widgets` - bigger components that provide a particular feature
- `pages` - all pages of the website (see: [Pages](https://nextjs.org/docs/basic-features/pages))
- `types` - shared TypeScript types

## Building

```sh
yarn build
```

## Testing

```sh
yarn test
```
