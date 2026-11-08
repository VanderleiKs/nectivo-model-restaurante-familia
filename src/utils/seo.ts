import { site } from '../config/site';
import { absoluteUrl } from './urls';

export interface SeoInput {
  /** Se omitido, usa site.seo.defaultTitle. Se informado, aplica site.seo.titleTemplate. */
  title?: string;
  description?: string;
  /** Caminho ou URL. Padrão: URL da página atual. */
  canonical?: string;
  image?: string;
  imageAlt?: string;
  /** Padrão: true se o caminho estiver em site.seo.noindexPaths. */
  noindex?: boolean;
  lang?: string;
  type?: 'website' | 'article';
}

export type JsonLd = Record<string, unknown>;

export function buildSeo(input: SeoInput = {}, pathname = '/') {
  const noindex = input.noindex ?? site.seo.noindexPaths.some((p) => pathname.startsWith(p));
  return {
    title: input.title ? site.seo.titleTemplate.replace('%s', input.title) : site.seo.defaultTitle,
    description: input.description ?? site.description,
    canonical: absoluteUrl(input.canonical ?? pathname),
    image: absoluteUrl(input.image ?? site.seo.defaultImage),
    imageAlt: input.imageAlt ?? site.seo.defaultImageAlt,
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    lang: input.lang ?? site.lang,
    locale: site.locale,
    type: input.type ?? 'website',
  };
}

const clean = (o: JsonLd): JsonLd => JSON.parse(JSON.stringify(o));

/** Entidade principal do site (NAP, horários, redes). Tipo definido em site.schemaType. */
export function organizationSchema(): JsonLd {
  const a = site.address;
  return clean({
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    image: absoluteUrl(site.seo.defaultImage),
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: site.geo && { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: site.social.map((s) => s.url),
  });
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.lang,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
