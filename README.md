# UNI-CLI

### 前言

使用 uniapp 开发新的项目时，往往都需要一个可以开箱即用的基础脚手架，每次重新搭建项目比较浪费时间，故记录下从零开始搭建脚手架，用到的时候可以直接使用，以可以为将来重新搭建脚手架时提供参考。

### 技术栈

- 使用 Vue3 + Typescript + Vite 进行开发
- 使用 pinia 进行状态管理
- 使用 scss 预处理器编写样式
- 使用 lodash 实用工具类
- 原子化 css(unocss) + iconify 图标
- eslint + prettier + stylelint 规范代码格式
- husky + commitlint 来规范 git 提交信息
- 使用 [uni-mini-router](https://fant-mini-plus.top/fant-mini-plus/uni-mini-router/introduction.html) 进行路由相关操作（跳转、传参、拦截）
- 使用 [alova](https://alova.js.org/zh-CN) 进行数据请求，支持请求和响应拦截等功能
