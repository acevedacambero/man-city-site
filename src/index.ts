import { Hono } from 'hono'

type ClubFact = {
  label: string
  value: string
}

const app = new Hono()

const facts: ClubFact[] = [
  { label: '成立时间', value: '1880' },
  { label: '主场', value: 'Etihad Stadium' },
  { label: '主色', value: 'Sky Blue' },
  { label: '联赛', value: 'Premier League' },
]

const honours = [
  '英格兰顶级联赛冠军：10次',
  '足总杯冠军：7次',
  '联赛杯冠军：8次',
  '欧冠冠军：1次',
  '欧洲超级杯冠军：1次',
  '世俱杯冠军：1次',
]

const squad = [
  'Ederson',
  'Rúben Dias',
  'Kevin De Bruyne',
  'Rodri',
  'Phil Foden',
  'Erling Haaland',
]

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --sky: #6cabdd;
      --navy: #0b1f3a;
      --bg: #eff6fc;
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
      gap: 12px; padding: 14px 0;
    }
    .brand { font-weight: 800; color: var(--navy); text-decoration: none; letter-spacing: .3px; }
    .nav-links { display: flex; gap: 16px; flex-wrap: wrap; }
    .nav-links a { text-decoration: none; font-size: 14px; opacity: .88; }
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
    .fact, .mini {
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
    code.inline {
      background: rgba(11,31,58,.06);
      border-radius: 8px; padding: 2px 6px;
    }
    @media (max-width: 900px) {
      .hero, .grid, .stats { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="/">MANCHESTER CITY</a>
      <nav class="nav-links">
        <a href="/">首页</a>
        <a href="/squad">阵容</a>
        <a href="/honours">荣誉</a>
        <a href="/api/club">API</a>
      </nav>
    </div>
  </header>
  ${body}
  <footer>
    <div class="container footer-line">
      这是一个基于 Hono + Cloudflare Workers 的动态网站程序示例，适合放到 GitHub 后通过 Cloudflare 部署。
    </div>
  </footer>
</body>
</html>`
}

app.get('/', (c) => {
  const body = `
  <main class="container">
    <section class="hero">
      <div>
        <div class="eyebrow">Hono + Cloudflare Workers</div>
        <h1>曼城足球网站程序</h1>
        <p class="lead">
          这不是纯静态页，而是一个真正的网站程序：由 Hono 路由驱动，支持服务端渲染页面和 JSON API，
          可以继续扩展成新闻、赛程、球员详情、后台管理、数据库查询等完整网站。
        </p>
        <div class="btn-row">
          <a class="btn btn-primary" href="/squad">查看阵容页</a>
          <a class="btn btn-secondary" href="/api/club">打开 JSON API</a>
        </div>
      </div>

      <div class="hero-card">
        <div class="badge">MCFC</div>
        <h2 style="margin:16px 0 10px; color:var(--navy);">一个“正常程序化网站”的起点</h2>
        <p style="margin:0;">当前项目包含页面路由、接口路由、统一模板和部署配置，适合直接接到 GitHub 与 Cloudflare。</p>
        <div class="facts">
          ${facts.map((item) => `<div class="fact"><strong>${item.value}</strong>${item.label}</div>`).join('')}
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">项目特点</h2>
      <p class="section-subtitle">相较于单个 index.html，这个项目更接近真实上线网站的结构。</p>
      <div class="grid">
        <article class="card">
          <h3>服务端路由</h3>
          <p>通过 Hono 定义 <code class="inline">/</code>、<code class="inline">/squad</code>、<code class="inline">/honours</code> 等页面路由。</p>
        </article>
        <article class="card">
          <h3>JSON API</h3>
          <p>通过 <code class="inline">/api/club</code> 提供结构化数据，后续前端或移动端都能复用。</p>
        </article>
        <article class="card">
          <h3>Cloudflare 友好</h3>
          <p>项目内已经带好 <code class="inline">wrangler.jsonc</code> 和 <code class="inline">package.json</code>，可以直接走 GitHub + Cloudflare。</p>
        </article>
      </div>
    </section>
  </main>`
  return c.html(layout('曼城网站程序', body))
})

app.get('/squad', (c) => {
  const body = `
  <main class="container" style="padding:40px 0;">
    <h1 style="font-size:44px;">一线队核心阵容</h1>
    <p class="section-subtitle">这里演示了一个独立页面路由。你以后可以继续扩展成球员详情页、转会页、数据页。</p>
    <div class="grid">
      ${squad.map((name) => `
        <article class="card">
          <h3>${name}</h3>
          <p>示例球员卡片。后续可以把这里接到数据库或外部 API，显示号码、位置、照片、统计数据等内容。</p>
        </article>
      `).join('')}
    </div>
  </main>`
  return c.html(layout('曼城阵容', body))
})

app.get('/honours', (c) => {
  const body = `
  <main class="container" style="padding:40px 0;">
    <h1 style="font-size:44px;">主要荣誉</h1>
    <p class="section-subtitle">这里演示另一条页面路由，也方便你后面继续做筛选、搜索和管理功能。</p>
    <div class="card">
      <ul class="clean">
        ${honours.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div class="stats">
      <div class="stat"><strong>10</strong>联赛冠军</div>
      <div class="stat"><strong>7</strong>足总杯</div>
      <div class="stat"><strong>8</strong>联赛杯</div>
    </div>
  </main>`
  return c.html(layout('曼城荣誉', body))
})

app.get('/api/club', (c) => {
  return c.json({
    name: 'Manchester City',
    shortName: 'MCFC',
    founded: 1880,
    stadium: 'Etihad Stadium',
    colors: ['Sky Blue', 'White', 'Navy'],
    league: 'Premier League',
    facts,
    honours,
    squad,
  })
})

export default app
