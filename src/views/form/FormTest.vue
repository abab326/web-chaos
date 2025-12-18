<template>
  <div class="form-test p-6">
    <h1 class="text-2xl font-bold mb-6">表单测试页面</h1>

    <BaseForm v-model="formData" :form-items="formItems" @field-change="handleFieldChange" />

    <div class="mt-8 p-4 bg-gray-100 rounded">
      <h2 class="text-lg font-semibold mb-2">表单数据:</h2>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseForm, { type FormItem } from '@/components/base-form';

// 表单数据
const formData = ref({
  name: '',
  email: '',
  age: null,
});

// 表单配置项
const formItems = ref<FormItem[]>([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    required: true,
    rules: [{ min: 2, max: 10, message: '姓名长度必须在 2 到 10 个字符之间', trigger: 'blur' }],
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'number',
  },
]);

// 处理字段变化
const handleFieldChange = (item: FormItem, value: any) => {
  console.log(`字段 ${item.prop} 发生变化:`, value);
  console.log('测试页面 formData 变化:', formData.value);
};
</script>
