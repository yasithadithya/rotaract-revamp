# Strapi Blog Setup

This project now supports blog content from Strapi.

## 1. Create Strapi inside this same repository

From this project root, run:

```bash
npx create-strapi@latest cms
```

During setup:
- Choose Quickstart for local testing.
- Create an admin user for your marketing team.

Then start Strapi from the root project:

```bash
npm run cms:dev
```

Or run it directly from the CMS folder:

```bash
cd cms
npm run develop
```

This gives you a single repository structure like:

```text
rotaract-revamp/
	app/            # Next.js website
	components/
	lib/
	cms/            # Strapi CMS
```

## 2. Create the Blog content type in Strapi

In Strapi Admin panel:

1. Go to Content-Type Builder.
2. Create collection type named `Blog` (API ID: `blogs`).
3. Add these fields:

- `title` (Text, required)
- `slug` (UID, attached to title, required)
- `excerpt` (Text, optional)
- `content` (Rich text, required)
- `authorName` (Text, optional)
- `coverImage` (Media, single image, optional)

4. Save and restart Strapi.

## 3. Set public permissions

If you want blogs visible without login:

1. Go to Settings -> Users & Permissions Plugin -> Roles -> Public.
2. For `Blog`, enable:
- `find`
- `findOne`

## 4. Optional: use API token instead of public permissions

If you want to keep public role locked down:

1. Go to Settings -> API Tokens.
2. Create a Read-only token.
3. Put it in `STRAPI_API_TOKEN`.

## 5. Connect this Next.js app to Strapi

Copy `.env.example` to `.env.local` and set values:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
STRAPI_REVALIDATE_SECONDS=120
```

Notes:
- `NEXT_PUBLIC_STRAPI_URL` should be your Strapi base URL.
- Keep `STRAPI_API_TOKEN` empty if using public permissions.
- `STRAPI_REVALIDATE_SECONDS` controls cache refresh.

## 6. Routes added in this website

- `/blogs` -> blog listing page
- `/blogs/[slug]` -> single blog post page

After publishing a new post in Strapi, it will appear automatically after cache revalidation.

## 7. Root scripts added for CMS

From this root project you can now run:

```bash
npm run cms:dev
npm run cms:build
npm run cms:start
```