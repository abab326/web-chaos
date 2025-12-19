<template>
  <div class="icon-page">
    <h1 class="text-2xl font-bold mb-6">Element Plus Icons 图标方案</h1>

    <!-- 安装指南 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">安装指南</h2>
      <div class="bg-gray-50 p-4 rounded-md">
        <pre class="text-sm"><code>pnpm add @element-plus/icons-vue</code></pre>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">基本用法</h2>
      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">导入和使用</h3>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;script setup lang="ts"
import { Avatar, Bell, Edit } from '@element-plus/icons-vue'
&lt;/script&gt;

&lt;template&gt;
  &lt;el-icon class="text-blue-500"&gt;&lt;Avatar /&gt;&lt;/el-icon&gt;
  &lt;el-icon class="text-green-500"&gt;&lt;Bell /&gt;&lt;/el-icon&gt;
  &lt;el-icon class="text-yellow-500"&gt;&lt;Edit /&gt;&lt;/el-icon&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">图标演示</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <el-icon class="text-blue-500"><Avatar /></el-icon>
            <span>Avatar</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-green-500"><Bell /></el-icon>
            <span>Bell</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-yellow-500"><Edit /></el-icon>
            <span>Edit</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-red-500"><Delete /></el-icon>
            <span>Delete</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-purple-500"><Download /></el-icon>
            <span>Download</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-orange-500"><Upload /></el-icon>
            <span>Upload</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-cyan-500"><Search /></el-icon>
            <span>Search</span>
          </div>
          <div class="icon-item">
            <el-icon class="text-pink-500"><Setting /></el-icon>
            <span>Setting</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见使用场景 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">常见使用场景</h2>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">自定义尺寸和颜色</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <el-icon :size="16" class="text-blue-500"><HomeFilled /></el-icon>
            <span>size=16</span>
          </div>
          <div class="icon-item">
            <el-icon :size="24" class="text-blue-500"><HomeFilled /></el-icon>
            <span>size=24</span>
          </div>
          <div class="icon-item">
            <el-icon :size="32" class="text-blue-500"><HomeFilled /></el-icon>
            <span>size=32</span>
          </div>
          <div class="icon-item">
            <el-icon :size="48" class="text-blue-500"><HomeFilled /></el-icon>
            <span>size=48</span>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md mt-4">
          <pre
            class="text-sm"
          ><code>&lt;el-icon :size="16" class="text-blue-500"&gt;&lt;HomeFilled /&gt;&lt;/el-icon&gt;
&lt;el-icon :size="24" class="text-blue-500"&gt;&lt;HomeFilled /&gt;&lt;/el-icon&gt;
&lt;el-icon :size="32" class="text-blue-500"&gt;&lt;HomeFilled /&gt;&lt;/el-icon&gt;
&lt;el-icon :size="48" class="text-blue-500"&gt;&lt;HomeFilled /&gt;&lt;/el-icon&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">在 Element Plus 组件中使用</h3>
        <div class="space-y-4 mb-4">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-input placeholder="输入内容" :prefix-icon="Search" class="w-64" />
          <el-card class="w-64" :body-style="{ padding: '16px' }">
            <template #header>
              <div class="flex items-center justify-between">
                <span>卡片标题</span>
                <el-icon><Setting /></el-icon>
              </div>
            </template>
            <div>卡片内容</div>
          </el-card>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;!-- 在按钮中使用 --&gt;
&lt;el-button type="primary" :icon="Search"&gt;搜索&lt;/el-button&gt;

&lt;!-- 在输入框中使用 --&gt;
&lt;el-input placeholder="输入内容" :prefix-icon="Search" /&gt;

&lt;!-- 在卡片中使用 --&gt;
&lt;el-card&gt;
  &lt;template #header&gt;
    &lt;div class="flex items-center justify-between"&gt;
      &lt;span&gt;卡片标题&lt;/span&gt;
      &lt;el-icon&gt;&lt;Setting /&gt;&lt;/el-icon&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;div&gt;卡片内容&lt;/div&gt;
&lt;/el-card&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">填充与轮廓图标</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">填充图标</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <el-icon class="text-blue-500"><HomeFilled /></el-icon>
                <span class="text-xs mt-1">HomeFilled</span>
              </div>
              <div class="flex flex-col items-center">
                <el-icon class="text-green-500"><UserFilled /></el-icon>
                <span class="text-xs mt-1">UserFilled</span>
              </div>
              <div class="flex flex-col items-center">
                <el-icon class="text-yellow-500"><StarFilled /></el-icon>
                <span class="text-xs mt-1">StarFilled</span>
              </div>
            </div>
          </div>
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">轮廓图标</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <el-icon class="text-blue-500"><Message /></el-icon>
                <span class="text-xs mt-1">Message</span>
              </div>
              <div class="flex flex-col items-center">
                <el-icon class="text-green-500"><User /></el-icon>
                <span class="text-xs mt-1">User</span>
              </div>
              <div class="flex flex-col items-center">
                <el-icon class="text-yellow-500"><Star /></el-icon>
                <span class="text-xs mt-1">Star</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 完整图标展示 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">常用图标展示</h2>
      <div class="icon-grid">
        <div v-for="icon in iconList" :key="icon.name" class="icon-item">
          <el-icon class="text-gray-600"><component :is="icon.component" /></el-icon>
          <span>{{ icon.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Avatar,
  Bell,
  Edit,
  Delete,
  Download,
  Upload,
  Search,
  Setting,
  User,
  Star,
  Message,
  Plus,
  Minus,
  Check,
  Close,
  Refresh,
  Share,
  InfoFilled,
  WarningFilled,
  SuccessFilled,
  HomeFilled,
} from '@element-plus/icons-vue';

// 图标列表用于展示
const iconList = [
  { name: 'Avatar', component: Avatar },
  { name: 'Bell', component: Bell },
  { name: 'Edit', component: Edit },
  { name: 'Delete', component: Delete },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'Search', component: Search },
  { name: 'Setting', component: Setting },
  { name: 'User', component: User },
  { name: 'Star', component: Star },
  { name: 'Message', component: Message },
  { name: 'Plus', component: Plus },
  { name: 'Minus', component: Minus },
  { name: 'Check', component: Check },
  { name: 'Close', component: Close },
  { name: 'Refresh', component: Refresh },
  { name: 'Share', component: Share },
  { name: 'InfoFilled', component: InfoFilled },
  { name: 'WarningFilled', component: WarningFilled },
  { name: 'SuccessFilled', component: SuccessFilled },
];
</script>

<style scoped>
.icon-page {
  padding: 20px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.icon-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item .el-icon {
  font-size: 32px;
}

.icon-item span {
  font-size: 14px;
  color: #4b5563;
  text-align: center;
}
</style>
