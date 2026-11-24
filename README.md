# ContentHub Renderer

基于 Remotion 的数据故事模板，内置横屏、竖屏和中文显示测试三个合成。示例使用合成标题、字幕和数据。源码声明为 UNLICENSED，Remotion 及其依赖适用各自的使用条款。[Remotion 条款](https://www.remotion.dev/docs/terms)

## 在干净环境恢复模板

1. 使用 Node.js 20.19+（20.x）、22.13+（22.x）或 24+，并准备可用的 Chromium 和中文系统字体（例如 Noto Sans CJK SC）。
2. 在项目目录安装依赖并运行静态检查与构建。首次安装需要能够取得锁定版本的包。

   ~~~sh
   npm ci
   npm run lint
   npm run build
   ~~~

3. npm run dev 打开 Remotion Studio。选择 DataStory-16x9 或 DataStory-9x16 查看内置示例，不需要配置 .env。也可生成一帧核对字体和布局。

   ~~~sh
   npx --no-install remotion still src/index.ts DataStory-16x9 out/datastory.png
   ~~~

模板快照包含构图、字幕、图表和可选音频输入。恢复服务端队列、TTS、R2、本机下载和回调需要另行取得授权的内部部署代码与配置。README 与环境变量模板仅用于说明依赖与恢复边界。
