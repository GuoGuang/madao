<h1 align="center">Welcome to madaoo.com 👋</h1>

<p align="center">
  <a href="https://github.com/nuxt/nuxt.js" target="blank">
    <img src="https://github.com/GuoGuang/madao/blob/master/static/nuxt.png" height="90" alt="nuxt logo" />
  </a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/GuoGuang/madao" target="blank">
    <img src="https://github.com/GuoGuang/madao/blob/master/static/favicon.ico" height="90" alt="madaoo.com logo" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D9.3.0-blue.svg" />
  <a href="https://github.com/GuoGuang/madao#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/GuoGuang/madao/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/GuoGuang/madao/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>


### 🏠 [Homepage](https://madaoo.com)
> 如果喜欢记得给个star哦🌟

更多内容请关注公众号：`码道人生`


## PC

![演示](http://vue-admin-guoguang.oss-cn-shanghai.aliyuncs.com/images/demo.jpg)

## Directory
```
nuxt.js-blog/
   |
   ├──assets/                    * 需经webpack处理的静态资源
   |
   ├──components/                * 所有组件
   │   │
   │   │──common                 * 全局公共组件
   │   │
   │   └──layout                 * 布局组件
   │   │
   │   └──*****                  * 其他复用组件
   │
   │──expansions/                * 膨胀物扩展
   │
   │──middleware/                * Nuxt.js 中间件，c/s  渲染均会在路由改变前执行，需 next/返回promise，支持异步
   |
   ├──filters/                   * 过滤器
   │
   ├──layouts/                   * Nuxt.js宿主元素布局模板，默认default，目前不可更改，error为渲染失败时的页面模板，目前不可指定layout属性
   |
   ├──pages/                     * Nuxt.js的页面文件，会根据文件生成路由
   │
   │──plugins/                   * 第三方组件 + 自有js库 + 其他插件性质的脚本
   │
   │──static/                    * 不经编译器处理的静态资源
   │
   │──store/                     * 全局数据状态管理
   │   │
   │   ├──*******                * 各数据模块
   │   │
   │   └──index                  * 根模块（因为异步操作较少，目前仅用来存放actions）
   │
   │──package.json               * 包信息
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   |
   │──Dockerfile                 * devops部署
   |
   │──Jenkinsfile                * devops部署
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──nuxt.config.js             * Nuxt.js程序配置
   │
   │──server.js                  * Nuxt.js程序入口文件（节省内存 + 优化内存）
   │
   │──ecosystem.config           * pm2部署配置（日志文件的路径需要自行修改）
   │
   └──.editorconfig              * 编码风格配置
```


## Prerequisites

- npm >=5.5.0
- node >=9.3.0 (最好使用10版本)

## Usage

```bash

# 安装依赖
# 该项目中的库依赖python2.7，需要提前安装
$ npm install --save-dev  --unsafe-perm node-sass
  或者用cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install --save-dev  --unsafe-perm node-sass

# 运行在 127.0.0.1:3000
$ npm run dev

# build for production and launch server
# If you don't want to upload Alibaba Cloud, mark the following code as a comment
# upFile('')

$ npm run build
$ npm start

# lint test
$ npm run lint

```

## CHANGELOG

### 2.1.4

- 增加图片懒加载功能
- 去除PWA
- 优化网站访问速度

### 1.1.0

- 增加文章详情、评论
- 增加登录功能
- 增加三方登录功能

### 1.0.0

- 初始化框架
- 博客基础功能完成

## Author

👤 **GuoGuang**

* Github: [@GuoGuang](https://github.com/GuoGuang)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/GuoGuang/madao/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [GuoGuang](https://github.com/GuoGuang).<br />
This project is [MIT](https://github.com/GuoGuang/madao/blob/master/LICENSE) licensed.
