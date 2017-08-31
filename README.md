### 说明文档
本工程为使用webpack结合es6、react构建自动化框架，热更新等


-webpack.config.js   webpack的配置都在该文件中
注释中记录了webpack配置的详细过程

***

**目录结构**
```
-src
  -components          // 公用组件(头，左侧导航等)
  -config
    -config.json      //  配置跨域域名相关
    -leftMenu.json     // 左侧导航栏数据
  -layouts
    -index.html         // 入口html
  -pages
    -HeadCon            // react组件相关
       -style         //  对应组件样式
  -routes
    -Catalog            // 路由拆分
    -index.jsx          // 路由配置文件
  -static             // 静态资源
  -style                // 样式文件
    -common.scss
  -utils          // 工具相关
  -main.js          // 入口js文件
```

***

step2:加入了react-router路由部分
==note: 要注意安装的react-router的版本，不同版本使用方法不同，本项目使用的是3.0.2的版本==

1. 安装
```
npm install react-router@3.0.2 --save
// 默认history随着react-router一起安装
```
2. 使用
```
import { Router, hashHistory } from 'react-router';
import routes from './routes';   // 路由配置文件
<Router routes={routes} history={hashHistory} />
```
如果项目庞大，路由非常多，将路由拆分，分块管理非常必要

***

**运行相关**
```
// 开发和联调环境的运行命令，source-map开启，devserver代理跨域访问
npm run dev


// 生产环境, 打包js,css文件等
npm run build
```
