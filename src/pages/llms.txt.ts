import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { meals } from '../data/home';
import { absoluteUrl, formatAddress } from '../utils/urls';

// Formato llms.txt: título, resumo em citação, detalhes e seções com links.
// Resumo e páginas vêm de site.seo.llms; serviços e contato são montados a partir dos dados do site.
export const GET: APIRoute = () => {
  const { llms } = site.seo;
  const out: string[] = [`# ${site.name}`, '', `> ${llms.summary}`, ''];
  if (llms.details) out.push(llms.details, '');

  for (const section of llms.sections) {
    out.push(`## ${section.title}`, '');
    for (const it of section.items) {
      out.push(`- [${it.label}](${absoluteUrl(it.url)})${it.note ? `: ${it.note}` : ''}`);
    }
    out.push('');
  }

  out.push('## Refeições', '');
  for (const m of meals.items) out.push(`- ${m.title}: ${m.text}`);
  out.push('');

  out.push('## Contato e localização', '');
  out.push(`- Endereço: ${formatAddress()}`);
  out.push(`- Telefone: ${site.phone}`);
  out.push(`- E-mail: ${site.email}`);
  out.push(`- WhatsApp: https://wa.me/${site.whatsapp}`);
  for (const h of site.hours) out.push(`- ${h.label}: ${h.text}`);
  out.push('');

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
