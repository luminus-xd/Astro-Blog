# Luminus Astro Blog

![Luminus Astro Blog](/public/images/top-ogp.png)

[日本語版はこちら](./README-ja.md)

Luminus Astro Blog is a blog site After cloning this project locally, use the following commands to install dependencies.

## Setting

### Install NPM package

| Package Manager | Command        |
| --------------- | -------------- |
| npm             | `npm install`  |
| yarn            | `yarn install` |
| pnpm            | `pnpm install` |
| bun             | `bun install`  |

### Add .env file

Please create the .env file required for the build.  
 Without this file, both the build and local environment won't function properly.

```env
MICROCMS_SERVICE_DOMAIN="{ microCMS domain }"
MICROCMS_API_KEY="{ microCMS API KEY }"
BUN_VERSION="{ Bun version }"
BASE_URL="{　Page URL　}"
```

## Scripts

| Script (Example) | Description                          |
| ---------------- | ------------------------------------ |
| npm run dev      | Starts the local development server. |
| npm run build    | Builds the project for production.   |
| npm run preview  | Previews the built project.          |

## Documentation

For more detailed documentation, please see the [docs directory](./docs/README.md).
