/**
 * Identidade visual global. Os valores viram CSS Variables (--theme-*) no <head>
 * pelo BaseLayout e são mapeados para tokens do Tailwind em src/styles/global.css.
 * Para um novo cliente: troque as cores e (se preciso) as fontes. Nada mais.
 */

export interface ThemeConfig {
  colors: {
    /** Cor da marca (botões, destaques) → bg-primary / text-primary */
    primary: string;
    /** Versão do primary legível sobre fundos escuros → text-primary-on-dark */
    primaryOnDark: string;
    /** Fundo escuro (header, hero, rodapé) → bg-secondary */
    secondary: string;
    /** Destaque secundário (estrelas, foco de teclado) → text-accent */
    accent: string;
    background: string;
    /** Fundo de seções alternadas → bg-surface */
    surface: string;
    /** Texto principal → text-foreground */
    foreground: string;
    /** Texto secundário → text-muted */
    muted: string;
    /** Bordas e divisórias → border-line */
    line: string;
    /** Texto sobre fundo primary */
    onPrimary: string;
    /** Texto sobre fundo secondary */
    onSecondary: string;
    /** Texto sobre fundo accent */
    onAccent: string;
    /** Hover do botão primário → bg-primary-hover */
    primaryHover: string;
    /** Títulos e nome sobre a foto → text-highlight */
    highlight: string;
    /** Madeira: linhas e apoios decorativos (não usar para texto) → border-wood */
    wood: string;
  };
  fonts: { heading: string; body: string };
  /** Raio padrão → rounded-brand */
  radius: string;
}

const heading = 'Fraunces, Georgia, "Times New Roman", serif';
const body = '"Source Sans 3", Arial, ui-sans-serif, system-ui, sans-serif';

/** Direção de arte "A casa acesa antes da refeição" (Restaurante Família). */
export const theme: ThemeConfig = {
  colors: {
    primary: '#F09A2A', // âmbar das luminárias: ação
    primaryOnDark: '#F19838',
    secondary: '#171310', // teto escuro da casa: header, hero, rodapé
    accent: '#F3E6D4', // foco de teclado visível sobre fundo escuro
    background: '#171310',
    surface: '#241C17', // blocos das refeições e visita
    foreground: '#F6F1EA',
    muted: '#CDBDAE',
    line: '#3A2E26',
    onPrimary: '#1C1612',
    onSecondary: '#F6F1EA',
    onAccent: '#1C1612',
    primaryHover: '#C9853E',
    highlight: '#F3E6D4',
    wood: '#8C6A4A',
  },
  fonts: { heading, body },
  radius: '0.5rem',
};

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Converte o tema em CSS Variables para injetar em :root. */
export function themeToCss(t: ThemeConfig = theme): string {
  const vars = [
    ...Object.entries(t.colors).map(([k, v]) => `--theme-${kebab(k)}:${v}`),
    `--theme-font-heading:${t.fonts.heading}`,
    `--theme-font-body:${t.fonts.body}`,
    `--theme-radius:${t.radius}`,
  ];
  return `:root{${vars.join(';')}}`;
}
