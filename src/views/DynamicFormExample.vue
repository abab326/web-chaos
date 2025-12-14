<template>
  <div class="dynamic-form-example p-6">
    <h1 class="text-2xl font-bold mb-6">动态表单示例</h1>

    <BaseForm
      v-model="formData"
      :form-items="formItems"
      :form-config="formConfig"
      :rules="rules"
      :submit-loading="submitLoading"
      @submit="handleSubmit"
      @reset="handleReset"
      @field-change="handleFieldChange"
    >
    </BaseForm>

    <div class="mt-8 p-4 bg-gray-100 rounded">
      <h2 class="text-lg font-semibold mb-2">表单数据:</h2>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseForm from '@/components/base-form'
import type { FormItem, FormConfig } from '@/components/base-form'
import type { FormRules } from 'element-plus'

// 表单数据
const formData = reactive<Record<string, any>>({
  name: '',
  email: '',
  age: null,
  gender: '',
  hobbies: [],
  subscribe: false,
  description: '',
  startDate: '',
  salary: null,
  customField: '',
})

// 表单配置项
const formItems = ref<FormItem[]>([
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入姓名',
    required: true,
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    required: true,
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'input-number',
    attrs: {
      min: 0,
      max: 120,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    prop: 'hobbies',
    label: '爱好',
    type: 'checkbox',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' },
      { label: '旅行', value: 'travel' },
    ],
  },
  {
    prop: 'subscribe',
    label: '订阅邮件',
    type: 'switch',
  },
  {
    prop: 'description',
    label: '个人描述',
    type: 'textarea',
    placeholder: '请输入个人描述',
  },
  {
    prop: 'startDate',
    label: '入职日期',
    type: 'date-picker',
    attrs: {
      type: 'date',
      placeholder: '请选择日期',
    },
  },
  {
    prop: 'salary',
    label: '期望薪资',
    type: 'input-number',
    attrs: {
      min: 0,
      controlsPosition: 'right',
    },
    itemProps: {
      'label-width': '120px',
    },
  },
  {
    prop: 'customField',
    label: '自定义字段',
    type: 'slot',
    slotName: 'custom-slot',
  },
])

// 表单配置
const formConfig = ref<FormConfig>({
  labelWidth: '100px',
  labelPosition: 'right',
  size: 'default',
  showActionButtons: true,
  submitText: '提交',
  showResetButton: true,
  resetText: '重置',
})

// 表单验证规则
const rules = ref<FormRules>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
})

// 提交加载状态
const submitLoading = ref(false)

// 处理表单提交
const handleSubmit = (data: Record<string, any>) => {
  submitLoading.value = true
  console.log('提交数据:', data)

  // 模拟提交过程
  setTimeout(() => {
    submitLoading.value = false
    alert('表单提交成功!')
  }, 1000)
}

// 处理表单重置
const handleReset = () => {
  console.log('表单已重置')
}

// 处理字段变化
const handleFieldChange = (item: any, value: any) => {
  console.log(`字段 ${item.prop} 发生变化:`, value)
}
</script>

<style scoped>
.dynamic-form-example {
  max-width: 800px;
  margin: 0 auto;
}
</style>
