/**
 * Worker entry point — Cloudflare Worker with static assets.
 *
 * The site is deployed as a Worker serving the static build from dist/. Such a
 * Worker ignores the functions/ directory (that convention belongs to Cloudflare
 * Pages), so this entry routes /api/contact to the existing handler and leaves
 * everything else to the assets binding.
 *
 * wrangler.jsonc sets run_worker_first to /api/*, so pages and files are served
 * straight from the assets layer and only API requests reach this code.
 */

import { onRequestGet, onRequestPost } from '../functions/api/contact';

/** The bindings this Worker reads; the contact handler takes the rest of env. */
type WorkerEnv = Parameters<typeof onRequestPost>[0]['env'] & {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      if (request.method === 'POST') return onRequestPost({ request, env });
      if (request.method === 'GET') return onRequestGet({ request, env });
      return new Response('Method Not Allowed', { status: 405, headers: { allow: 'GET, POST' } });
    }

    return env.ASSETS.fetch(request);
  },
};
