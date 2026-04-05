import { Hono } from 'hono'
import { zh } from './i18n/zh'
import { en } from './i18n/en'
import { es } from './i18n/es'

const app = new Hono()

const messages = { zh, en, es }

type Lang = keyof typeof messages

function getLang(lang?: string): Lang {
  if (lang === 'en') return 'en'
  if (lang === 'es') return 'es'
  return 'zh'
}

function detectLang(header = ''): Lang {
  const lower = header.toLowerCase()
  if (lower.includes('es')) return 'es'
  if (lower.includes('en')) return 'en'
  return 'zh'
}

const facts = {
  founded: '1880',
  stadium: 'Etihad Stadium',
  colors: 'Sky Blue',
  league: 'Premier League',
}

const squad = [
  'Ederson',
  'Ruben Dias',
  'Kevin De Bruyne',
  'Rodri',
  'Phil Foden',
  'Erling Haaland',
]

function layout(lang: Lang, title: string, body: string, path: string) {
  const t = messages[lang]
  const base = `/${lang}`
  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${t.siteDescription}" />
  <link rel="alternate" hreflang="zh-CN" href="/zh${path}" />
  <link rel="alternate" hreflang="en" href="/en${path}" />
  <link rel="alternate" hreflang="es" href="/es${path}" />
  <style>
    :root {
      --sky: #6cabdd;
      --navy: #0b1f3a;
      --card: rgba(255,255,255,0.92);
      --text: #19324a;
      --line: rgba(11,31,58,0.09);
      --shadow: 0 18px 40px rgba(11,31,58,0.12);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top right, rgba(108,171,221,.35), transparent 24%),
        linear-gradient(180deg, #f7fbff 0%, #eef5fb 100%);
    }
    a { color: inherit; }
    .container { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    .nav {
      position: sticky; top: 0; z-index: 50;
      backdrop-filter: blur(14px);
      background: rgba(255,255,255,.78);
      border-bottom: 1px solid var(--line);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 14px 0; flex-wrap: wrap;
    }
    .brand { font-weight: 800; color: var(--navy); text-decoration: none; letter-spacing: .3px; }
    .nav-links, .lang-links { display: flex; gap: 16px; flex-wrap: wrap; }
    .nav-links a, .lang-links a { text-decoration: none; font-size: 14px; opacity: .88; }
    .lang-links a.active { font-weight: 800; }
    .hero {
      display: grid; grid-template-columns: 1.15fr .85fr; gap: 28px;
      align-items: center; padding: 72px 0 32px;
    }
    .eyebrow {
      display: inline-block; background: rgba(108,171,221,.18);
      color: #235883; padding: 8px 12px; border-radius: 999px;
      font-size: 13px; font-weight: 700; margin-bottom: 14px;
    }
    h1 {
      margin: 0 0 14px; font-size: clamp(38px, 5.8vw, 66px);
      line-height: 1.05; color: var(--navy);
    }
    .lead { font-size: 18px; line-height: 1.8; max-width: 700px; }
    .hero-card, .card {
      background: var(--card);
      border: 1px solid rgba(255,255,255,.7);
      border-radius: 28px;
      box-shadow: var(--shadow);
    }
    .hero-card { padding: 28px; }
    .badge {
      width: 86px; height: 86px; border-radius: 50%;
      display: grid; place-items: center;
      background: radial-gradient(circle at 35% 35%, #fff, #d7ebfa 40%, #6cabdd 100%);
      color: var(--navy); font-weight: 800; letter-spacing: 1px;
      box-shadow: inset 0 0 0 8px rgba(255,255,255,.8);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 24px 0 40px;
    }
    .facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 20px; }
    .fact {
      background: rgba(255,255,255,.72);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 14px;
    }
    .fact strong, .stat strong { display: block; font-size: 24px; color: var(--navy); }
    .section-title {
      font-size: 30px;
      color: var(--navy);
      margin: 0 0 12px;
    }
    .section-subtitle { margin: 0 0 18px; opacity: .86; max-width: 760px; }
    .card { padding: 24px; }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 16px;
    }
    .stat {
      text-align: center;
      padding: 22px;
      background: linear-gradient(180deg, rgba(255,255,255,.95), rgba(229,242,252,.9));
      border-radius: 22px;
      box-shadow: var(--shadow);
    }
    .btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      text-decoration: none; font-weight: 700;
      padding: 13px 18px; border-radius: 14px;
    }
    .btn-primary { background: linear-gradient(135deg, var(--sky), #90c9ee); color: var(--navy); }
    .btn-secondary { background: rgba(255,255,255,.84); border: 1px solid var(--line); }
    footer { padding: 34px 0 54px; color: rgba(25,50,74,.8); font-size: 14px; }
    .footer-line { padding-top: 16px; border-top: 1px solid var(--line); }
    ul.clean { padding-left: 20px; margin: 10px 0 0; }
    @media (max-width: 900px) {
      .hero, .grid, .stats { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="${base}">${t.brand}</a>
      <nav class="nav-links">
        <a href="${base}">${t.navHome}</a>
        <a href="${base}/squad">${t.navSquad}</a>
        <a href="${base}/honours">${t.navHonours}</a>
        <a href="/api/club?lang=${lang}">${t.navApi}</a>
      </nav>
      <nav class="lang-links">
        <a class="${lang === 'zh' ? 'active' : ''}" href="/zh${path}">中文</a>
        <a class="${lang === 'en' ? 'active' : ''}" href="/en${path}">English</a>
        <a class="${lang === 'es' ? 'active' : ''}" href="/es${path}">Espanol</a>
      </nav>
    </div>
  </header>
  ${body}
  <footer>
    <div class="container footer-line">
      ${t.footer}
    </div>
  </footer>
</body>
</html>`
}

app.get('/', (c) => {
  const lang = detectLang(c.req.header('accept-language') || '')
  return c.redirect(`/${lang}`)
})

app.get('/:lang', (c) => {
  const lang = getLang(c.req.param('lang'))
  const t = messages[lang]

  const body = `
  <main class="container">
    <section class="hero">
      <div>
        <div class="eyebrow">${t.heroBadge}</div>
        <h1>${t.heroTitle}</h1>
        <p class="lead">${t.heroDesc}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="/${lang}/squad">${t.btnSquad}</a>
          <a class="btn btn-secondary" href="/api/club?lang=${lang}">${t.btnApi}</a>
        </div>
      </div>

      <div class="hero-card">
        <div class="badge">MCFC</div>
        <h2 style="margin:16px 0 10px; color:var(--navy);">${t.factsTitle}</h2>
        <div class="facts">
          <div class="fact"><strong>${facts.founded}</strong>${t.founded}</div>
          <div class="fact"><strong>${facts.stadium}</strong>${t.stadium}</div>
          <div class="fact"><strong>${facts.colors}</strong>${t.colors}</div>
          <div class="fact"><strong>${facts.league}</strong>${t.league}</div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">${t.sectionFeatures}</h2>
      <p class="section-subtitle">${t.sectionFeaturesDesc}</p>
      <div class="grid">
        <article class="card">
          <h3>${t.feature1Title}</h3>
          <p>${t.feature1Desc}</p>
        </article>
        <article class="card">
          <h3>${t.feature2Title}</h3>
          <p>${t.feature2Desc}</p>
        </article>
        <article class="card">
          <h3>${t.feature3Title}</h3>
          <p>${t.feature3Desc}</p>
        </article>
      </div>
    </section>
  </main>`
  return c.html(layout(lang, t.siteTitle, body, ''))
})

app.get('/:lang/squad', (c) => {
  const lang = getLang(c.req.param('lang'))
  const t = messages[lang]

  const body = `
  <main class="container" style="padding:40px 0;">
    <h1 style="font-size:44px;">${t.squadTitle}</h1>
    <p class="section-subtitle">${t.squadDesc}</p>
    <div class="grid">
      ${squad.map((name) => `
        <article class="card">
          <h3>${name}</h3>
          <p>${t.squadCardDesc}</p>
        </article>
      `).join('')}
    </div>
  </main>`
  return c.html(layout(lang, t.squadTitle, body, '/squad'))
})

app.get('/:lang/honours', (c) => {
  const lang = getLang(c.req.param('lang'))
  const t = messages[lang]

  const body = `
  <main class="container" style="padding:40px 0;">
    <h1 style="font-size:44px;">${t.honoursTitle}</h1>
    <p class="section-subtitle">${t.honoursDesc}</p>
    <div class="card">
      <ul class="clean">
        ${t.honoursList.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div class="stats">
      <div class="stat"><strong>10</strong>${t.statLeague}</div>
      <div class="stat"><strong>7</strong>${t.statFaCup}</div>
      <div class="stat"><strong>8</strong>${t.statLeagueCup}</div>
    </div>
  </main>`
  return c.html(layout(lang, t.honoursTitle, body, '/honours'))
})

app.get('/api/club', (c) => {
  const lang = getLang(c.req.query('lang'))
  const t = messages[lang]

  return c.json({
    lang,
    siteTitle: t.siteTitle,
    club: {
      name: 'Manchester City',
      shortName: 'MCFC',
      founded: 1880,
      stadium: 'Etihad Stadium',
      colors: ['Sky Blue', 'White', 'Navy'],
      league: 'Premier League',
    },
    squad,
    honours: t.honoursList,
  })
})

export default app
