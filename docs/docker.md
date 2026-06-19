# Docker

Docker support is provided for reliable local development, production-like local testing, and runner consistency. Vercel remains the production deployment path for Marhaban Canada.

## Prerequisites

- Docker Desktop installed and running.
- On Windows, Docker Desktop WSL integration enabled for the Linux distribution used by this project.
- `.env.local` present locally.

## Local Development

```bash
npm run docker:dev
```

This starts the app on port 3000 using `docker-compose.dev.yml`. Source files are mounted into the container, `node_modules` stays inside a Docker volume, and the app runs `npm run dev:3000` with Webpack instead of Turbopack.

## Production-Like Local Test

```bash
npm run docker:prod
```

This builds the production Docker image with Next.js standalone output and starts it on port 3000.

## Stop Containers

```bash
npm run docker:down
```

## Clean Volumes

```bash
npm run docker:clean
```

## Environment Rules

`.env.local` is required for local Docker runs and is loaded at runtime through Docker Compose `env_file`. It must never be committed.

Secrets are not copied into the Docker image. `.env.local` and other `.env.*` files are excluded from the Docker build context by `.dockerignore`.

Do not expose or bake `SUPABASE_SERVICE_ROLE_KEY` into the image. Keep Supabase secrets runtime-only.

## Troubleshooting Port 3000

If port 3000 is already in use:

```bash
sudo lsof -i :3000
```

Then stop the process shown by `lsof`, or change the local port mapping temporarily in the compose file.
