/**
 * Ícones SVG locais (src/assets/icons/*.svg). Para adicionar um, coloque o arquivo
 * na pasta (sem width/height, com fill="currentColor") e inclua o nome em IconName.
 */
export type IconName = 'logo' | 'arrow-right' | 'clock' | 'phone' | 'pin' | 'whatsapp' | 'instagram' | 'facebook' | 'nectivo' | 'mail';

const files = import.meta.glob<string>('../assets/icons/*.svg', { query: '?raw', import: 'default', eager: true });

export const icons = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => [path.split('/').pop()!.replace('.svg', ''), svg.trim()]),
) as Record<IconName, string>;
