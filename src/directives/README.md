# 自定义指令

## 目录

- [水印指令 (v-watermark)](#水印指令-v-watermark)
- [权限指令 (v-permission)](#权限指令-v-permission)

## 水印指令 (v-watermark)

### 功能

为元素添加水印效果，支持自定义文本、样式和布局。

### 用法

#### 基本使用

```vue
<template>
  <div v-watermark="'机密文件'" class="content">
    <!-- 内容 -->
  </div>
</template>
```

#### 多行文本

```vue
<template>
  <div v-watermark="['机密文件', '内部使用']" class="content">
    <!-- 内容 -->
  </div>
</template>
```

#### 自定义配置

```vue
<template>
  <div
    v-watermark="{
      text: 'Web Chaos',
      fontSize: 16,
      color: 'rgba(255, 0, 0, 0.2)',
      angle: -20,
      spacing: 200,
    }"
    class="content"
  >
    <!-- 内容 -->
  </div>
</template>
```

### 配置选项

| 选项     | 类型               | 默认值               | 说明          |
| -------- | ------------------ | -------------------- | ------------- |
| text     | string \| string[] | 'Watermark'          | 水印文本      |
| fontSize | number             | 14                   | 字体大小 (px) |
| color    | string             | 'rgba(0, 0, 0, 0.1)' | 字体颜色      |
| opacity  | number             | 0.1                  | 透明度        |
| angle    | number             | -15                  | 旋转角度 (度) |
| spacing  | number             | 150                  | 水印间距 (px) |

## 权限指令 (v-permission)

### 功能

基于权限判断控制元素的显示或禁用状态。

### 用法

#### 基本使用

```vue
<template>
  <!-- 检查单个权限 -->
  <button v-permission="'user:create'">创建用户</button>

  <!-- 检查多个权限 (默认 any 模式) -->
  <button v-permission="['user:create', 'user:edit']">编辑用户</button>
</template>
```

#### 检查模式

- `any` 模式 (默认)：只要有一个权限匹配则显示
- `all` 模式：必须所有权限都匹配才显示

```vue
<template>
  <!-- all 模式：需要同时有查看和编辑权限 -->
  <button v-permission:all="['user:view', 'user:edit']">编辑用户</button>
</template>
```

#### 禁用模式

使用 `disable` 修饰符可以将元素设置为禁用状态而非隐藏。

```vue
<template>
  <button v-permission.disable="'user:delete'">删除用户</button>
</template>
```

### 配置权限检查函数

需要在应用初始化时配置全局权限检查函数：

```typescript
// main.ts
import { createApp } from 'vue';
import { createPermissionDirective } from './directives';

const app = createApp(App);

// 自定义权限检查函数
const checkPermission = (requiredPermissions: string[], mode: 'any' | 'all') => {
  // 从状态管理中获取用户权限
  const userPermissions = ['user:view', 'user:edit'];

  if (mode === 'all') {
    // 检查所有权限是否都存在
    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  } else {
    // 检查是否有任何一个权限存在
    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  }
};

// 注册自定义权限指令
app.directive('permission', createPermissionDirective(checkPermission));

app.mount('#app');
```

### 类型定义

```typescript
// 权限检查函数类型
export type PermissionChecker = (requiredPermissions: string[], mode: 'any' | 'all') => boolean;

// 创建权限指令的工厂函数
export function createPermissionDirective(checker?: PermissionChecker): Directive;
```

## 注册所有指令

```typescript
// main.ts
import { createApp } from 'vue';
import { registerDirectives } from './directives';

const app = createApp(App);
registerDirectives(app);
app.mount('#app');
```
