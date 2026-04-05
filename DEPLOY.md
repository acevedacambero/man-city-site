# Deploy Notes

1. Upload this project to GitHub.
2. Connect the repository in Cloudflare Workers.
3. Use `npx wrangler deploy` as the deploy command if needed.
4. Your `wrangler.jsonc` already points to `src/index.ts`.

If your worker name conflicts globally, change the `name` field in `wrangler.jsonc`.
