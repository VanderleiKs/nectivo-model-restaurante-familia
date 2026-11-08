# Restaurante Família — site institucional (Astro)

Página única do Restaurante Família (Camaquã, RS), construída sobre o modelo Nectivo
(Astro 7 + Tailwind 4 + TypeScript). Saída estática: HTML, CSS e JS mínimo (só o fechamento do menu mobile).

## Comandos
```bash
nvm use          # Node 24 (exigido por package.json)
npm install
npm run dev      # http://localhost:4321
npm run check
npm run build    # gera dist/
npm run preview
```

## Onde mexer
| Para trocar… | Edite |
|---|---|
| Nome, domínio, telefone, WhatsApp, endereço, horários, Instagram, SEO, robots, llms | `src/config/site.ts` |
| Cores, fontes, raio | `src/config/theme.ts` |
| Textos e imagens das seções | `src/data/home.ts` |
| Foto do salão | `src/assets/images/salao.webp` |
| Imagem de compartilhamento (1200×630) | `public/og-default.jpg` |
| Favicon | `public/favicon.svg` |

## Estrutura da página
Cabeçalho → Hero → Refeições → A casa (`#a-casa`) → Ambiente (`#ambiente`) → Visita (`#visita`) → Rodapé.
CTA principal: "Bora marcar?" abre o WhatsApp (`https://wa.me/5551990123120`).

## Conteúdo provisório (trocar antes de publicar)
- `src/assets/images/salao.webp` é um **placeholder gerado**, não a foto real. Substituir pela foto do salão
  (com autorização de reuso), mantendo o nome do arquivo ou ajustando o import em `src/data/home.ts`.
- `public/og-default.jpg` e `public/favicon.svg`: provisórios.
- Fontes (Fraunces e Source Sans 3) carregam do Google Fonts em `BaseLayout.astro`. Hospedar localmente antes da entrega.
- Texto de "A casa" e título "Nossa cozinha": montados com frases já publicadas; aguardam aprovação.
- `site.domain`: domínio atual de publicação (workers.dev), a trocar pelo definitivo.
- Marca: só o nome em texto; o ícone do site atual não teve o reuso confirmado.

## Não publicar até o cliente confirmar
Domingo, horário em que o buffet termina e as alaminutas começam, reserva/retirada/delivery, cardápio e preços,
"+789 pratos" e "+10.000 funcionários", depoimentos e avaliações.
