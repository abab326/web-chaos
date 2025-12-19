<template>
  <div class="icon-examples">
    <h1 class="text-2xl font-bold mb-6">图标方案示例</h1>

    <!-- lucide-vue-next 示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">1. lucide-vue-next</h2>
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
      </div>
    </section>

    <!-- @element-plus/icons-vue 示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">2. @element-plus/icons-vue</h2>
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
      </div>
    </section>

    <!-- @iconify/tailwind4 示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">3. @iconify/tailwind4</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="text-blue-500 icon-[mdi--home]"></i>
          <span>mdi:home</span>
        </div>
        <div class="icon-item">
          <i class="text-green-500 icon-[mdi--user]"></i>
          <span>mdi:user</span>
        </div>
        <div class="icon-item">
          <i class="text-yellow-500 icon-[mdi--settings]"></i>
          <span>mdi:settings</span>
        </div>
        <div class="icon-item">
          <i class="text-red-500 icon-[mdi--email]"></i>
          <span>mdi:email</span>
        </div>
        <div class="icon-item">
          <i class="text-purple-500 icon-[mdi--calendar]"></i>
          <span>mdi:calendar</span>
        </div>
        <div class="icon-item">
          <i class="text-orange-500 icon-[mdi--search]"></i>
          <span>mdi:search</span>
        </div>
      </div>
    </section>

    <!-- @iconify/vue 示例 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">4. @iconify/vue</h2>
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Home, User, Settings, Mail, Calendar, Search } from 'lucide-vue-next';
import { Avatar, Bell, Edit, Delete, Download, Upload } from '@element-plus/icons-vue';
import { Icon } from '@iconify/vue';
</script>

<style scoped>
.icon-examples {
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

.icon-item i {
  font-size: 32px;
  line-height: 1;
}

.icon-item span {
  font-size: 14px;
  color: #4b5563;
}
</style>
