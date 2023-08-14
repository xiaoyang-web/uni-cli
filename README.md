### 前言

使用 `uniapp` 开发新的项目时，往往都需要一个可以开箱即用的基础脚手架，每次重新搭建项目比较浪费时间，故记录下从零开始搭建脚手架，用到的时候可以直接使用，以可以为将来重新搭建脚手架时提供参考。

### 相关文档

- [vite 官方文档](https://cn.vitejs.dev/)
- [esLint 中文文档](http://eslint.cn/)
- [prettier 中文文档](https://www.prettier.cn/)
- [stylelint 中文文档](https://www.stylelint.com.cn/)
- [husky 中文文档](https://www.breword.com/typicode-husky)
- [lint-staged 文档](https://github.com/okonet/lint-staged/)

### 技术栈

- 使用 `vue3` + `typescript` + `vite` 进行开发
- 使用 `pinia` 进行状态管理
- 使用 `scss` 预处理器编写样式
- 使用 `lodash` 实用工具类
- 原子化样式库( `unocss` ) + `iconify` 图标
- `eslint` + `prettier` + `stylelint` 规范代码格式
- `husky` + `commitlint` 来规范代码提交信息
- 使用 `alova` 进行数据请求，支持请求和响应拦截等功能

### 项目构建

#### 1. 使用 uniapp 官方 vite-ts 模板

```shell
npx degit dcloudio/uni-preset-vue#vite-ts uni-preset-template
```

#### 2. 安装依赖

```shell
npm install
```

#### 3. 配置 eslint

**安装 eslint**

```shell
npm install eslint -D
```

**初始化 eslint**

```shell
npx eslint --init
```

```shell
(1) How would you like to use ESLint? （你想如何使用ESLint？）
选择：To check syntax, find problems, and enforce code style

(2) What type of modules does your project use? （你的项目使用什么类型的模块？）
选择：JavaScript modules (import/export)

(3) Which framework does your project use? （你的项目使用哪个框架？）
选择：Vue.js

(4) Does your project use TypeScript? （你的项目使用TypeScript吗？）
选择：Yes

(5) Where does your code run? （你的代码在哪里运行？）
选择：Browser,Node

(6) How would you like to define a style for your project?（您希望如何为您的项目定义样式？）
选择：Answer questions about your style

(7) What format do you want your config file to be in?（您希望您的配置文件采用什么格式？）
选择：JavaScript

(8) What style of indentation do you use?（你用什么样式的缩进？）
选择：Spaces

(9) What quotes do you use for strings?（字符串用什么引号？）
选择：Single

(10) What line endings do you use?（你用什么行尾？）
选择：Windows

(11) Do you require semicolons?（你需要分号吗？）
选择：Yes

(12) Would you like to install them now? （您现在要安装它们吗？）
选择：Yes

(13) Which package manager do you want to use? （您想使用哪个包管理器？）
选择：npm
```

**初始化完成后，会生成 `.eslintrc.js` 配置文件**

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
```

**在 `package.json` 文件中添加对应脚本命令**

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
  }
}
```

**执行 `lint` 命令**

```shell
npm run lint
```

此时会报错，我们要修改配置文件使解析器正常工作。修改后的 `.eslintrc.js` 文件如下：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'vue/multi-word-component-names': 'off'
  }
};
```

此时，再执行`npm run lint`，就会发现校验通过了。

**安装 vscode 插件 eslint**

我们可以配合 vscode 的 `eslint` 插件，实现每次保存代码时，自动执行 `lint` 命令来修复代码的错误。

根目录下新建 `.vscode/settings.json` 文件，然后在其中加入以下配置：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

#### 4. 配置 prettier

**安装 prettier**

```shell
npm install prettier -D
```

**根目录新建 `.prettierrc.js` 文件**

```javascript
module.exports = {
  // 在多行逗号分隔的语法结构中，后面不尾随逗号
  trailingComma: 'none',
  // 自动换行的行长
  printWidth: 100,
  // 每个缩进空格数
  tabWidth: 2,
  // 语句末尾跟随分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 在对象字面量的括号之间打印空格
  bracketSpacing: true,
  // 维护现有的行尾
  endOfLine: 'auto'
};
```

**在 `package.json` 文件中添加对应脚本命令**

```json
{
  "scripts": {
    "format": "prettier --write \"./**/*.{html,vue,ts,js,cjs,json,md}\""
  }
}
```

**执行 `format` 命令**

```shell
npm run format
```

此时会对匹配文件进行代码格式化

**安装 vscode 插件 prettier**

可以让该插件在我们保存的时候自动完成格式化。

在 `.vscode/settings.json` 中添加新的规则。

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

**解决 eslint 与 prettier 可能存在冲突的问题**

在理想的状态下，`eslint` 与 `prettier` 应该各司其职。`eslint` 负责检测代码质量，`prettier` 负责格式化代码。但是在使用的过程中会发现，由于我们开启了自动化的 `eslint` 修复与自动化的根据 `prettier` 来格式化代码。所以我们已保存代码，会出现屏幕闪一起后又恢复到了报错的状态，这其中的根本原因就是 `eslint` 有部分规则与 `prettier` 冲突了。

安装依赖

```shell
npm install eslint-config-prettier eslint-plugin-prettier -D
```

修改 `.eslintrc.js` 配置文件

```diff
{
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
+   'plugin:prettier/recommended'
  ],
}
```

#### 5. 配置 stylelint

**安装相关依赖**

```shell
npm install -D stylelint postcss postcss-html stylelint-config-html stylelint-config-prettier-scss stylelint-config-standard-scss stylelint-order
```

**根目录新建 `.stylelintrc.js` 文件**

```javascript
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss', 'stylelint-config-html'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'overflow',
      'overflow-x',
      'overflow-y',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': null,
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'scss/at-import-partial-extension': null
  }
};
```

**在 `package.json` 文件中添加对应脚本命令**

```json
{
  "scripts": {
    "lint:style": "stylelint \"./**/*.{css,scss,vue,html}\" --fix"
  }
}
```

**执行 `lint:style` 命令**

```shell
npm run lint:style
```

此时会对匹配文件进行代码格式化

**安装 vscode 插件 stylelint**

安装该插件可在我们保存代码时对样式自动格式化。

在 `.vscode/settings.json` 中添加新的规则。

```json
{
  "stylelint.validate": ["css", "scss", "vue", "html"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

#### 6. 配置 husky

**初始化项目仓库**

```shell
git init
```

**安装依赖**

```shell
npm install husky -D
```

**在 `package.json` 文件中添加对应脚本命令**

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

**初始化**

```shell
npm run prepare
```

#### 7. 配置 lint-staged

每次执行 `git commit -m “xxx”` 都会把所有文件检测一遍，在实际项目， `commit` 时我们只想检测暂存的代码。这时候我们就可以借助 `lint-staged` 对已经通过 `git add` 加入到暂存区 `stage` 的文件进行扫描即可。

**安装依赖**

```shell
npm install lint-staged -D
```

**在 `package.json` 中配置 lint-staged**

```json
{
  "lint-staged": {
    ".vue,.js,.ts,.jsx,.tsx": "eslint --fix",
    "./**/*.{html,vue,ts,js,cjs,json,md}": "prettier --write",
    "./**/*.{css,scss,vue,html}": ["stylelint --fix", "prettier --write"]
  }
}
```

**添加 `pre-commit` 钩子**

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 8. 配置 commitlint

**安装相关依赖**

```shell
npm install @commitlint/config-conventional @commitlint/cli -D
```

**根目录新建 `.commitlintrc.js` 文件**

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'init', // 初始化相关
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
      ]
    ]
  }
};
```

**添加 `commit-msg` 钩子**

```shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

接着我们执行 `git commit -m "xxx"` 会提示错误，无法提交，此时我们需按照约定格式提交，例如：`git commit -m "feat: xxx"`
