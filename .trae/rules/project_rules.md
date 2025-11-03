# 项目规则和上下文

## 技术栈说明
- **框架**: Vue 3.5.22 + Composition API + `<script setup>`
- **构建工具**: Vite 7+
- **语言**: TypeScript  ～5.9.3
- **UI 库**: Element Plus
- **代码质量**: ESLint 9+ + Prettier
- **包管理器**: pnpm (优先)

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
- 使用 Scoped CSS
- 优先使用 CSS 变量
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
- 验证 TypeScript 类型安全
- 确保代码可维护性
