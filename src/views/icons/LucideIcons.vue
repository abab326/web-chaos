<template>
  <div class="icon-page">
    <h1 class="text-2xl font-bold mb-6">Lucide 图标方案</h1>

    <!-- 安装指南 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">安装指南</h2>
      <div class="bg-gray-50 p-4 rounded-md">
        <pre class="text-sm"><code>pnpm add lucide-vue-next</code></pre>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">基本用法</h2>
      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">导入和使用</h3>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;script setup lang="ts"
import { Home, User, Settings } from 'lucide-vue-next'
&lt;/script&gt;

&lt;template&gt;
  &lt;Home class="text-blue-500" /&gt;
  &lt;User class="text-green-500" /&gt;
  &lt;Settings class="text-yellow-500" /&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">图标演示</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <Home class="text-blue-500" />
            <span>Home</span>
          </div>
          <div class="icon-item">
            <User class="text-green-500" />
            <span>User</span>
          </div>
          <div class="icon-item">
            <Settings class="text-yellow-500" />
            <span>Settings</span>
          </div>
          <div class="icon-item">
            <Mail class="text-red-500" />
            <span>Mail</span>
          </div>
          <div class="icon-item">
            <Calendar class="text-purple-500" />
            <span>Calendar</span>
          </div>
          <div class="icon-item">
            <Search class="text-orange-500" />
            <span>Search</span>
          </div>
          <div class="icon-item">
            <Bell class="text-pink-500" />
            <span>Bell</span>
          </div>
          <div class="icon-item">
            <File class="text-cyan-500" />
            <span>File</span>
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
            <Home class="text-blue-500" :size="16" />
            <span>size=16</span>
          </div>
          <div class="icon-item">
            <Home class="text-blue-500" :size="24" />
            <span>size=24</span>
          </div>
          <div class="icon-item">
            <Home class="text-blue-500" :size="32" />
            <span>size=32</span>
          </div>
          <div class="icon-item">
            <Home class="text-blue-500" :size="48" />
            <span>size=48</span>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md mt-4">
          <pre class="text-sm"><code>&lt;Home class="text-blue-500" :size="16" /&gt;
&lt;Home class="text-blue-500" :size="24" /&gt;
&lt;Home class="text-blue-500" :size="32" /&gt;
&lt;Home class="text-blue-500" :size="48" /&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">在按钮中使用</h3>
        <div class="flex gap-4 mb-4">
          <el-button type="primary" :icon="Search">搜索</el-button>
          <el-button type="success" :icon="Download">下载</el-button>
          <el-button type="warning" :icon="Edit">编辑</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre
            class="text-sm"
          ><code>&lt;el-button type="primary" :icon="Search"&gt;搜索&lt;/el-button&gt;
&lt;el-button type="success" :icon="Download"&gt;下载&lt;/el-button&gt;
&lt;el-button type="warning" :icon="Edit"&gt;编辑&lt;/el-button&gt;
&lt;el-button type="danger" :icon="Delete"&gt;删除&lt;/el-button&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">在导航中使用</h3>
        <div class="bg-white border rounded-md p-2 mb-4">
          <ul class="space-y-2">
            <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <Home class="text-blue-500" />
              <span>首页</span>
            </li>
            <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <User class="text-green-500" />
              <span>用户中心</span>
            </li>
            <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <Settings class="text-yellow-500" />
              <span>设置</span>
            </li>
          </ul>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;ul class="space-y-2"&gt;
  &lt;li class="flex items-center gap-3"&gt;
    &lt;Home class="text-blue-500" /&gt;
    &lt;span&gt;首页&lt;/span&gt;
  &lt;/li&gt;
  &lt;li class="flex items-center gap-3"&gt;
    &lt;User class="text-green-500" /&gt;
    &lt;span&gt;用户中心&lt;/span&gt;
  &lt;/li&gt;
  &lt;li class="flex items-center gap-3"&gt;
    &lt;Settings class="text-yellow-500" /&gt;
    &lt;span&gt;设置&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- 完整图标展示 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">常用图标展示</h2>
      <div class="icon-grid">
        <div v-for="icon in iconList" :key="icon.name" class="icon-item">
          <component :is="icon.component" class="text-gray-600" />
          <span>{{ icon.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Home,
  User,
  Settings,
  Mail,
  Calendar,
  Search,
  Bell,
  File,
  Download,
  Edit,
  Delete,
  Check,
  X,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Trash,
  Save,
  Copy,
  Share,
  Star,
  Heart,
  RefreshCcw,
} from 'lucide-vue-next';

// 图标列表用于展示
const iconList = [
  { name: 'Home', component: Home },
  { name: 'User', component: User },
  { name: 'Settings', component: Settings },
  { name: 'Mail', component: Mail },
  { name: 'Calendar', component: Calendar },
  { name: 'Search', component: Search },
  { name: 'Bell', component: Bell },
  { name: 'File', component: File },
  { name: 'Download', component: Download },
  { name: 'Edit', component: Edit },
  { name: 'Delete', component: Delete },
  { name: 'Check', component: Check },
  { name: 'X', component: X },
  { name: 'Plus', component: Plus },
  { name: 'Minus', component: Minus },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'Refresh', component: RefreshCcw },
  { name: 'Trash', component: Trash },
  { name: 'Save', component: Save },
  { name: 'Copy', component: Copy },

  { name: 'Share', component: Share },
  { name: 'Star', component: Star },
  { name: 'Heart', component: Heart },
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

.icon-item svg {
  width: 32px;
  height: 32px;
}

.icon-item span {
  font-size: 14px;
  color: #4b5563;
  text-align: center;
}
</style>
