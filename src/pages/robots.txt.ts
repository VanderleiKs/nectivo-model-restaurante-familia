import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { absoluteUrl } from '../utils/urls';

export const GET: APIRoute = () => {
  const blocks = site.seo.robots.map((rule) => {
    const lines = [`User-agent: ${rule.userAgent}`];
    for (const p of rule.allow ?? []) lines.push(`Allow: ${p}`);
    for (const p of rule.disallow ?? []) lines.push(`Disallow: ${p}`);
    if (!rule.allow?.length && !rule.disallow?.length) lines.push('Disallow:');
    return lines.join('\n');
  });
  const body = `${blocks.join('\n\n')}\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
