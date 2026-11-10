/**
 * Configuração central da empresa/cliente.
 * Este é o ÚNICO arquivo com dados empresariais (NAP, horários, SEO, robots, llms).
 * Os textos de cada seção da página ficam em src/data/.
 *
 * Importante: este arquivo é lido também pelo astro.config.mjs (Node), então não
 * importe nada aqui e use apenas tipos/interfaces (sem enum).
 */

export interface NavItem { label: string; href: string }
export interface SocialLink { name: string; username: string; url: string }
export interface RobotsRule { userAgent: string; allow?: string[]; disallow?: string[] }
export interface LlmsSection { title: string; items: { label: string; url: string; note?: string }[] }
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export interface OpeningHours {
  /** Texto exibido: "Segunda a sexta" */
  label: string;
  /** Texto exibido: "8:30h às 18h" */
  text: string;
  /** Para o Schema.org (openingHoursSpecification) */
  days: DayOfWeek[];
  /** HH:MM */
  opens: string;
  closes: string;
}

export interface SiteConfig {
  /** Razão social (opcional; omitida do Schema.org quando vazia). */
  legalName?: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  url: string;
  lang: string;
  locale: string;
  /** Tipo Schema.org do negócio. Ex.: 'Organization', 'LocalBusiness', 'AutoRepair', 'Dentist'. */
  schemaType: string;
  phone: string;
  /** Somente dígitos, com DDI e DDD. Ex.: 5511999999999 */
  whatsapp: string;
  whatsappMessage: string;
  /** Balão do botão flutuante de WhatsApp (opcional). */
  whatsappHint?: { title: string; text: string };
  email: string;
  address: { street: string; neighborhood?: string; city: string; state: string; postalCode?: string; country: string };
  /** Texto usado no link "Como chegar" / Google Maps. */
  mapsQuery: string;
  /** Opcional: melhora o Schema.org de negócio local. */
  geo?: { latitude: number; longitude: number };
  priceRange?: string;
  hours: OpeningHours[];
  /** Link das avaliações no Google (opcional). */
  reviewsUrl?: string;
  /** Tokens de verificação de propriedade (opcional). */
  verification?: { google?: string };
  social: SocialLink[];
  nav: NavItem[];
  /** Links do rodapé. */
  footerNav: NavItem[];
  seo: {
    defaultTitle: string;
    /** %s é substituído pelo título da página. */
    titleTemplate: string;
    /** Caminho em /public ou URL absoluta. Recomendado: 1200x630. */
    defaultImage: string;
    defaultImageAlt: string;
    /** Rotas (prefixos) fora do sitemap e com meta robots noindex. */
    noindexPaths: string[];
    robots: RobotsRule[];
    llms: { summary: string; details?: string; sections: LlmsSection[] };
  };
}

// PROVISÓRIO: domínio atual de publicação. Trocar quando houver domínio definitivo.
const domain = 'restaurantefamilia.vanderleis47.workers.dev';

/** Crawlers de IA liberados explicitamente (GEO). Remova um se o cliente não quiser aparecer nele. */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
];

export const site: SiteConfig = {
  // Sem razão social: não informada nesta etapa.
  // PENDENTE: confirmar a grafia oficial. Aqui, "Família" com acento (hipótese).
  name: 'Restaurante Família',
  tagline: 'Boa comida, bons momentos',
  description:
    'Restaurante em Camaquã, RS, com buffet livre no almoço e alaminutas à noite. Venha nos visitar!',
  domain,
  url: `https://${domain}`,
  lang: 'pt-BR',
  locale: 'pt_BR',
  schemaType: 'Restaurant',
  phone: '+55 51 99012-3120',
  whatsapp: '5551990123120',
  whatsappMessage: 'Olá! Vim pelo site do Restaurante Família.',
  email: 'contato@restaurantefamilia.com.br',
  address: {
    street: 'Rua Júlio de Castilhos, 63',
    neighborhood: 'Olaria',
    city: 'Camaquã',
    state: 'RS',
    // CEP não informado: omitido.
    country: 'BR',
  },
  mapsQuery: 'Rua Júlio de Castilhos, 63, Olaria, Camaquã, RS',
  // Domingo não informado: não publicar "fechado aos domingos".
  hours: [
    {
      label: 'Segunda a sábado',
      text: '11h30 às 22h30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:30',
      closes: '22:30',
    },
  ],
  social: [
    { name: 'Instagram', username: '@restaurantefamilia', url: 'https://www.instagram.com/restaurantefamilia' },
    { name: 'Facebook', username: '@restaurantefamilia', url: 'https://www.facebook.com/restaurantefamilia' },
  ],
  nav: [
    { label: 'A casa', href: '/#a-casa' },
    { label: 'Ambiente', href: '/#ambiente' },
  ],
  footerNav: [
    { label: 'A casa', href: '/#a-casa' },
    { label: 'Ambiente', href: '/#ambiente' },
    { label: 'Visita', href: '/#visita' },
  ],
  seo: {
    defaultTitle: 'Restaurante Família — Buffet livre e alaminutas em Camaquã, RS',
    titleTemplate: '%s | Restaurante Família',
    defaultImage: '/og-default.webp',
    defaultImageAlt: 'Restaurante Família, Camaquã: buffet livre no almoço e alaminutas à noite',
    noindexPaths: ['/404'],
    robots: [
      { userAgent: '*', allow: ['/'], disallow: [] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: ['/'] })),
    ],
    llms: {
      summary:
        'Restaurante em Camaquã/RS, bairro Olaria, com buffet livre no almoço e alaminutas à noite, há mais de 3 anos.',
      details: 'Atende de segunda a sábado, das 11h30 às 22h30. Contato direto pelo WhatsApp.',
      sections: [
        {
          title: 'Páginas principais',
          items: [
            { label: 'Página inicial', url: '/', note: 'Apresentação do restaurante, das refeições e da visita' },
            { label: 'A casa', url: '/#a-casa' },
            { label: 'Ambiente', url: '/#ambiente' },
            { label: 'Visita', url: '/#visita', note: 'Endereço, horário, telefone e WhatsApp' },
          ],
        },
      ],
    },
  },
};
