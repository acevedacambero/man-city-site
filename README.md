# Man City Hono Site

一个基于 **Hono + Cloudflare Workers** 的网站程序示例。

## 本地运行

```bash
npm install
npm run dev
```

## 部署到 Cloudflare

### 本地命令行部署
```bash
npm install
npm run deploy
```

### 通过 GitHub + Cloudflare 部署
1. 把本项目推到 GitHub 仓库
2. 在 Cloudflare 的 Workers 页面连接该 GitHub 仓库
3. Deploy command 使用：

```bash
npx wrangler deploy
```

## 主要路由

- `/` 首页
- `/squad` 阵容页
- `/honours` 荣誉页
- `/api/club` JSON API
