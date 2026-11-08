/**
 * Conteúdo da página (textos e imagens). Dados da empresa (telefone, endereço,
 * horários) ficam em src/config/site.ts. Use "\n" para quebra de linha em títulos.
 *
 * Regra: só entra aqui o que foi confirmado pelo cliente. Não há cardápio, preço,
 * horário de troca de refeição, depoimento nem número de prova social.
 */
import salao from '../assets/images/salao.webp';
import fundo_visit from '../assets/images/fundo-visit.webp';

export const hero = {
  eyebrow: 'Camaquã, RS',
  title: 'Restaurante Família',
  description: 'Oferecemos buffet livre no almoço e alaminutas à noite.\nQualidade e sabor para toda a família.',
  image: salao,
  imageAlt: 'Salão do restaurante com mesas de madeira, bancos estofados e luminárias circulares acesas',
  primaryCta: 'Bora marcar?',
};

export const meals = {
  eyebrow: 'Nossas refeições',
  title: 'Do almoço ao jantar',
  items: [
    { period: 'Almoço', title: 'Buffet livre', text: 'Oferecemos buffet livre no almoço.' },
    { period: 'Noite', title: 'Alaminutas', text: 'Alaminutas à noite, para o seu jantar.' },
  ],
  linkLabel: 'Endereço e horário',
  linkHref: '#visita',
};

/** TEXTO PROVISÓRIO: montado só com frases já publicadas e dados confirmados. Título "Nossa cozinha" ainda sem aprovação formal. */
export const house = {
  eyebrow: 'A casa',
  title: 'Nossa cozinha',
  text: 'Buffet livre no almoço e alaminutas para o seu jantar. Venha fazer uma refeição conosco.',
  fact: 'Há mais de 3 anos.',
  cta: { label: 'Ver o ambiente', href: '#ambiente' },
};

export const ambient = {
  eyebrow: 'Ambiente',
  title: 'O salão',
  image: salao,
  imageAlt: 'Salão do restaurante com mesas de madeira, bancos estofados, balcão ao fundo e luminárias circulares acesas',
};

export const visit = {
  eyebrow: 'Visita',
  title: 'Bora marcar?',
  text: 'Chame no WhatsApp, ligue agora ou venha até a casa.\nSerá um prazer receber você!',
  image: fundo_visit,
  imageAlt: 'Ambiente acolhedor de restaurante, com mesa posta, flores e iluminação quente à luz de velas.',
  whatsappLabel: 'Chamar no WhatsApp',
  phoneLabel: 'Ligar',
  mapsLabel: 'Como chegar',
  addressTitle: 'Endereço',
  hoursTitle: 'Horário',
  phoneTitle: 'Telefone e WhatsApp',
};
