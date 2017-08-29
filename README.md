### 说明文档
本工程为使用webpack结合es6、react构建自动化框架，热更新等


-webpack.config.js   webpack的配置都在该文件中
注释中记录了webpack配置的详细过程

**目录结构**
-src
  -config
    -config.json      //  配置跨域域名相关
  -layouts
    -index.html         // 入口html
  -pages
    -HeadCon            // react组件相关
  -style                // 样式文件
    -common.scss
  -utils          // 工具相关
  -main.js          // 入口js文件


**运行相关**
```
// 开发和联调环境的运行命令，source-map开启，devserver代理跨域访问
npm run dev
// 生产环境, 打包js,css文件等
npm run build
```
