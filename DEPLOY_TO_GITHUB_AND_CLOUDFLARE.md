# GitHub + Cloudflare 发布步骤

## 1. 推到 GitHub
在本地项目目录运行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
git push -u origin main
```

## 2. Cloudflare 连接 GitHub
去 Cloudflare Dashboard：

- Workers & Pages
- Create application
- Workers
- Import a repository / Connect to Git

选择你的 GitHub 仓库。

## 3. 构建配置
这是一个 Workers 项目，推荐使用：

- Deploy command: `npx wrangler deploy`

如果 Cloudflare 显示自动检测成功，也可以直接沿用它生成的默认配置。

## 4. 项目名
第一次部署时，建议把 `wrangler.jsonc` 里的 `name` 改成全局唯一名称，例如：

```json
{
  "name": "acevedacambero-man-city-hono-site"
}
```

否则可能因为名称重复导致部署失败。
