<template>
  <div class="icon-page">
    <h1 class="text-2xl font-bold mb-6">@iconify/tailwind4 图标方案</h1>

    <!-- 安装指南 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">安装指南</h2>
      <div class="bg-gray-50 p-4 rounded-md">
        <pre class="text-sm"><code>pnpm add @iconify/tailwind4 @iconify/json</code></pre>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-medium mb-2">配置 Tailwind CSS</h3>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>// tailwind.config.js
const { addIconUtilities } = require('@iconify/tailwind4')

module.exports = {
  plugins: [
    addIconUtilities({
      prefix: 'icon', // 可选，默认是 'i'
      collections: ['mdi', 'fa', 'carbon'] // 需要的图标集合
    })
  ]
}
</code></pre>
        </div>
      </div>
    </section>

    <!-- 基本用法 -->
    <section class="mb-8 bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold mb-4">基本用法</h2>
      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">使用方式</h3>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;template&gt;
  &lt;i class="icon-[mdi--home] text-blue-500"&gt;&lt;/i&gt;
  &lt;i class="icon-[mdi--user] text-green-500"&gt;&lt;/i&gt;
  &lt;i class="icon-[mdi--settings] text-yellow-500"&gt;&lt;/i&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">图标演示</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <i class="icon-[mdi--home] text-blue-500"></i>
            <span>mdi:home</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--user] text-green-500"></i>
            <span>mdi:user</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--settings] text-yellow-500"></i>
            <span>mdi:settings</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--email] text-red-500"></i>
            <span>mdi:email</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--calendar] text-purple-500"></i>
            <span>mdi:calendar</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--search] text-orange-500"></i>
            <span>mdi:search</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--bell] text-pink-500"></i>
            <span>mdi:bell</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--file] text-cyan-500"></i>
            <span>mdi:file</span>
          </div>
          <div class="icon-item">
            <i class="icon-[local--message] text-cyan-500"></i>
            <span>local:message</span>
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
            <i class="icon-[mdi--home] text-blue-500 text-sm"></i>
            <span>text-xl</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--home] text-blue-500 text-base"></i>
            <span>text-2xl</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--home] text-blue-500 text-lg"></i>
            <span>text-3xl</span>
          </div>
          <div class="icon-item">
            <i class="icon-[mdi--home] text-blue-500 text-xl"></i>
            <span>text-xl</span>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md mt-4">
          <pre
            class="text-sm"
          ><code>&lt;i class="icon-[mdi--home] text-blue-500 text-xl"&gt;&lt;/i&gt;
&lt;i class="icon-[mdi--home] text-blue-500 text-2xl"&gt;&lt;/i&gt;
&lt;i class="icon-[mdi--home] text-blue-500 text-3xl"&gt;&lt;/i&gt;
&lt;i class="icon-[mdi--home] text-blue-500 text-4xl"&gt;&lt;/i&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">在组件中使用</h3>
        <div class="space-y-4 mb-4">
          <el-button type="primary" class="flex items-center gap-2">
            <i class="icon-[mdi--search] text-white"></i>
            <span>搜索</span>
          </el-button>
          <div class="flex items-center gap-2 p-2 border rounded-md w-64">
            <i class="icon-[mdi--search] text-gray-400"></i>
            <input type="text" placeholder="输入内容" class="flex-1 outline-none" />
          </div>
          <div class="bg-white border rounded-md p-2">
            <ul class="space-y-2">
              <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                <i class="icon-[mdi--home] text-blue-500"></i>
                <span>首页</span>
              </li>
              <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                <i class="icon-[mdi--user] text-green-500"></i>
                <span>用户中心</span>
              </li>
              <li class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                <i class="icon-[mdi--settings] text-yellow-500"></i>
                <span>设置</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md">
          <pre class="text-sm"><code>&lt;!-- 在按钮中使用 --&gt;
&lt;el-button type="primary" class="flex items-center gap-2"&gt;
  &lt;i class="icon-[mdi--search] text-white"&gt;&lt;/i&gt;
  &lt;span&gt;搜索&lt;/span&gt;
&lt;/el-button&gt;

&lt;!-- 在导航中使用 --&gt;
&lt;ul class="space-y-2"&gt;
  &lt;li class="flex items-center gap-3"&gt;
    &lt;i class="icon-[mdi--home] text-blue-500"&gt;&lt;/i&gt;
    &lt;span&gt;首页&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">使用不同图标集</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">Material Design Icons</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <i class="icon-[mdi--home] text-blue-500 text-xl"></i>
                <span class="text-xs mt-1">mdi:home</span>
              </div>
              <div class="flex flex-col items-center">
                <i class="icon-[mdi--calendar] text-green-500 text-xl"></i>
                <span class="text-xs mt-1">mdi:calendar</span>
              </div>
            </div>
          </div>
          <div class="bg-white border rounded-md p-4">
            <h4 class="font-medium mb-2">Font Awesome</h4>
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <i class="icon-[fa--home] text-blue-500 text-xl"></i>
                <span class="text-xs mt-1">fa:home</span>
              </div>
              <div class="flex flex-col items-center">
                <i class="icon-[fa--calendar] text-green-500 text-xl"></i>
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
          <i :class="`${icon.name} text-gray-600 text-2xl`"></i>
          <span>{{ icon.displayName }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 图标列表用于展示
const iconList = [
  { name: 'icon-[mdi--home]', displayName: 'mdi:home' },
  { name: 'icon-[mdi--user]', displayName: 'mdi:user' },
  { name: 'icon-[mdi--settings]', displayName: 'mdi:settings' },
  { name: 'icon-[mdi--email]', displayName: 'mdi:email' },
  { name: 'icon-[mdi--calendar]', displayName: 'mdi:calendar' },
  { name: 'icon-[mdi--search]', displayName: 'mdi:search' },
  { name: 'icon-[mdi--bell]', displayName: 'mdi:bell' },
  { name: 'icon-[mdi--file]', displayName: 'mdi:file' },
  { name: 'icon-[mdi--download]', displayName: 'mdi:download' },
  { name: 'icon-[mdi--upload]', displayName: 'mdi:upload' },
  { name: 'icon-[mdi--edit]', displayName: 'mdi:edit' },
  { name: 'icon-[mdi--delete]', displayName: 'mdi:delete' },
  { name: 'icon-[mdi--check]', displayName: 'mdi:check' },
  { name: 'icon-[mdi--close]', displayName: 'mdi:close' },
  { name: 'icon-[mdi--plus]', displayName: 'mdi:plus' },
  { name: 'icon-[mdi--minus]', displayName: 'mdi:minus' },
  { name: 'icon-[mdi--arrow-left]', displayName: 'mdi:arrow-left' },
  { name: 'icon-[mdi--arrow-right]', displayName: 'mdi:arrow-right' },
  { name: 'icon-[mdi--refresh]', displayName: 'mdi:refresh' },
  { name: 'icon-[mdi--trash-can]', displayName: 'mdi:trash-can' },
  { name: 'icon-[mdi--save]', displayName: 'mdi:save' },
  { name: 'icon-[mdi--copy]', displayName: 'mdi:copy' },
  { name: 'icon-[mdi--share-variant]', displayName: 'mdi:share' },
  { name: 'icon-[mdi--star]', displayName: 'mdi:star' },
  { name: 'icon-[mdi--heart]', displayName: 'mdi:heart' },
  { name: 'icon-[mdi--message]', displayName: 'mdi:message' },
  { name: 'icon-[mdi--alert]', displayName: 'mdi:alert' },
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
  box-shadow:
    0 -2px 8px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item span {
  font-size: 14px;
  color: #4b5563;
  text-align: center;
}
</style>
