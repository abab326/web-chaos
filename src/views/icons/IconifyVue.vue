<template>
  <div class="icon-page">
    <h1 class="text-2xl font-bold mb-6">@iconify/vue 图标方案</h1>

    <!-- 安装指南 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">安装指南</h2>
      <div class="bg-gray-50 p-4 rounded-md">
        <pre class="text-sm"><code>pnpm add @iconify/vue @iconify/json</code></pre>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">基本用法</h2>
      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">导入和使用</h3>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;script setup lang="ts"
import { Icon } from '@iconify/vue'
&lt;/script&gt;

&lt;template&gt;
  &lt;Icon icon="mdi:home" class="text-blue-500" /&gt;
  &lt;Icon icon="mdi:user" class="text-green-500" /&gt;
  &lt;Icon icon="mdi:settings" class="text-yellow-500" /&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">图标演示</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <Icon icon="mdi:home" class="text-blue-500" />
            <span>mdi:home</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:user" class="text-green-500" />
            <span>mdi:user</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:settings" class="text-yellow-500" />
            <span>mdi:settings</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:email" class="text-red-500" />
            <span>mdi:email</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:calendar" class="text-purple-500" />
            <span>mdi:calendar</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:search" class="text-orange-500" />
            <span>mdi:search</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:bell" class="text-pink-500" />
            <span>mdi:bell</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:file" class="text-cyan-500" />
            <span>mdi:file</span>
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
            <Icon icon="mdi:home" class="text-blue-500" :size="16" />
            <span>size=16</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:home" class="text-blue-500" :size="24" />
            <span>size=24</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:home" class="text-blue-500" :size="32" />
            <span>size=32</span>
          </div>
          <div class="icon-item">
            <Icon icon="mdi:home" class="text-blue-500" :size="48" />
            <span>size=48</span>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md mt-4">
          <pre class="text-sm"><code>&lt;Icon icon="mdi:home" class="text-blue-500" :size="16" /&gt;
&lt;Icon icon="mdi:home" class="text-blue-500" :size="24" /&gt;
&lt;Icon icon="mdi:home" class="text-blue-500" :size="32" /&gt;
&lt;Icon icon="mdi:home" class="text-blue-500" :size="48" /&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">动态图标和属性</h3>
        <div class="mb-4">
          <div class="flex gap-4 items-center mb-4">
            <Icon :icon="currentIcon" :class="iconColor" :size="iconSize" />
            <el-slider v-model="iconSize" :min="16" :max="64" class="w-40" />
            <el-select v-model="iconColor" class="w-40">
              <el-option label="蓝色" value="text-blue-500" />
              <el-option label="绿色" value="text-green-500" />
              <el-option label="黄色" value="text-yellow-500" />
              <el-option label="红色" value="text-red-500" />
            </el-select>
          </div>
          <el-select v-model="currentIcon" class="w-full">
            <el-option label="Home" value="mdi:home" />
            <el-option label="User" value="mdi:user" />
            <el-option label="Settings" value="mdi:settings" />
            <el-option label="Email" value="mdi:email" />
            <el-option label="Calendar" value="mdi:calendar" />
          </el-select>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;script setup lang="ts"
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const currentIcon = ref('mdi:home')
const iconColor = ref('text-blue-500')
const iconSize = ref(24)
&lt;/script&gt;

&lt;template&gt;
  &lt;Icon :icon="currentIcon" :class="iconColor" :size="iconSize" /&gt;
  &lt;el-slider v-model="iconSize" :min="16" :max="64" /&gt;
  &lt;el-select v-model="currentIcon"&gt;
    &lt;el-option label="Home" value="mdi:home" /&gt;
    &lt;el-option label="User" value="mdi:user" /&gt;
  &lt;/el-select&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">使用不同图标集</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">Material Design Icons</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <Icon icon="mdi:home" class="text-blue-500" :size="32" />
                <span class="text-xs mt-1">mdi:home</span>
              </div>
              <div class="flex flex-col items-center">
                <Icon icon="mdi:calendar" class="text-green-500" :size="32" />
                <span class="text-xs mt-1">mdi:calendar</span>
              </div>
            </div>
          </div>
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">Font Awesome</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <Icon icon="fa:home" class="text-blue-500" :size="32" />
                <span class="text-xs mt-1">fa:home</span>
              </div>
              <div class="flex flex-col items-center">
                <Icon icon="fa:calendar" class="text-green-500" :size="32" />
                <span class="text-xs mt-1">fa:calendar</span>
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
          <Icon :icon="icon.name" class="text-gray-600" />
          <span>{{ icon.displayName }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

// 动态图标演示数据
const currentIcon = ref('mdi:home');
const iconColor = ref('text-blue-500');
const iconSize = ref(24);

// 图标列表用于展示
const iconList = [
  { name: 'mdi:home', displayName: 'mdi:home' },
  { name: 'mdi:user', displayName: 'mdi:user' },
  { name: 'mdi:settings', displayName: 'mdi:settings' },
  { name: 'mdi:email', displayName: 'mdi:email' },
  { name: 'mdi:calendar', displayName: 'mdi:calendar' },
  { name: 'mdi:search', displayName: 'mdi:search' },
  { name: 'mdi:bell', displayName: 'mdi:bell' },
  { name: 'mdi:file', displayName: 'mdi:file' },
  { name: 'mdi:download', displayName: 'mdi:download' },
  { name: 'mdi:upload', displayName: 'mdi:upload' },
  { name: 'mdi:edit', displayName: 'mdi:edit' },
  { name: 'mdi:delete', displayName: 'mdi:delete' },
  { name: 'mdi:check', displayName: 'mdi:check' },
  { name: 'mdi:close', displayName: 'mdi:close' },
  { name: 'mdi:plus', displayName: 'mdi:plus' },
  { name: 'mdi:minus', displayName: 'mdi:minus' },
  { name: 'mdi:arrow-left', displayName: 'mdi:arrow-left' },
  { name: 'mdi:arrow-right', displayName: 'mdi:arrow-right' },
  { name: 'mdi:refresh', displayName: 'mdi:refresh' },
  { name: 'mdi:trash-can', displayName: 'mdi:trash-can' },
  { name: 'mdi:save', displayName: 'mdi:save' },
  { name: 'mdi:copy', displayName: 'mdi:copy' },
  { name: 'mdi:share-variant', displayName: 'mdi:share' },
  { name: 'mdi:star', displayName: 'mdi:star' },
  { name: 'mdi:heart', displayName: 'mdi:heart' },
  { name: 'mdi:message', displayName: 'mdi:message' },
  { name: 'mdi:alert', displayName: 'mdi:alert' },
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

.icon-item .iconify {
  width: 32px;
  height: 32px;
}

.icon-item span {
  font-size: 14px;
  color: #4b5563;
  text-align: center;
}
</style>
