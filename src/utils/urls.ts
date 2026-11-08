import { site } from '../config/site';

export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

/** Converte caminho relativo em URL absoluta usando o domínio configurado. */
export function absoluteUrl(path: string, base: string = site.url): string {
  return new URL(path, base).toString();
}

export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

export function whatsappUrl(phone: string = site.whatsapp, message: string | undefined = site.whatsappMessage): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${onlyDigits(phone)}${query}`;
}

export const telUrl = (phone: string = site.phone): string => `tel:${phone.replace(/[^\d+]/g, '')}`;
export const mailtoUrl = (email: string): string => `mailto:${email}`;
export const mapsUrl = (query: string = site.mapsQuery): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** "Rua Júlio de Castilhos, 63 — Olaria, Camaquã/RS" */
export function formatAddress(a = site.address): string {
  const place = a.neighborhood ? `${a.neighborhood}, ${a.city}` : a.city;
  return `${a.street} — ${place}/${a.state}`;
}
