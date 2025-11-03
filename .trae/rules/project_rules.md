# 项目规则和上下文

## 技术栈说明
- **框架**: Vue 3.5.22 + Composition API + `<script setup>`
- **构建工具**: Vite 7+
- **语言**: TypeScript  ～5.9.3
- **包管理器**: pnpm (优先)
- **UI 库**: Element Plus
- **代码质量**: ESLint 9+ + Prettier

## 编码规范
### Vue 组件规范
- 使用 `<script setup>` 语法
- 组件名使用 PascalCase
- Props 使用 TypeScript 接口定义
- 使用 Composition API 替代 Options API
- 模板中使用 kebab-case

### TypeScript 规范
- 严格类型检查
- 避免使用 `any` 类型
- 使用接口定义复杂数据结构
- 充分利用泛型

### 样式规范
- 优先使用 tailwindcss 进行样式开发
- 不能使用 tailwindcss 的 lang='scss' scoped 模式 ,比如修改组件库的样式
- 遵循 BEM 命名规范

## 项目架构
src/
├── components/ # 公共组件
├── views/ # 页面组件
├── composables/ # 组合式函数
├── stores/ # 状态管理
├── types/ # 类型定义
├── utils/ # 工具函数
├── api/ # API 接口
└── assets/ # 静态资源


## AI 处理指南
### 组件开发
- 创建组件时自动生成 TypeScript 接口
- 为复杂逻辑添加 JSDoc 注释
- 遵循单一职责原则

### 问题解决
- 遇到错误时先检查 TypeScript 类型
- 优先使用 Element Plus 现有组件
- 保持响应式数据的正确使用

### 代码审查
- 自动检查 ESLint 规则
- 自动格式化代码 使用 Prettier
- 验证 TypeScript 类型安全
- 确保代码可维护性

## 需求开发
 - 需求文档目录: `docs/requirements/`
 - 需求文档格式: Markdown
 - 项目需求文档总览管理项目需求
 - 需求开发时，先在需求文档中描述需求,每个需求一个文件，文件名格式为 `需求编号-需求描述.md`
 - 需求文档中包含需求描述、优先级、影响范围、 acceptance criteria 等内容
 - 然后在项目中创建对应的组件或功能模块
 - 开发完成后，进行代码审查和测试
 - 需求开发完成后，更新需求文档

 ## 需求开发流程
 1. 需求描述
 2. 需求文档编写
 3. 需求开发
 4. 代码审查
 5. 测试
 6. 合并代码
 7. 需求文档更新
