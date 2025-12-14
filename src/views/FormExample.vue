<template>
  <div class="flex flex-col">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">表单示例</h1>
      <p class="text-gray-600 mt-1">基于BaseForm组件的配置化表单示例</p>
    </div>

    <el-card class="mb-6">
      <BaseForm
        v-model="formData"
        :form-items="formItems"
        :form-config="formConfig"
        :rules="formRules"
        :submit-loading="submitLoading"
        @submit="handleSubmit"
        @reset="handleReset"
        @field-change="handleFieldChange"
      >
        <!-- 自定义插槽示例 -->
        <template #avatar>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </template>
      </BaseForm>
    </el-card>

    <!-- 表单数据展示 -->
    <el-card>
      <h2 class="text-lg font-semibold mb-4">表单数据</h2>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormItem, FormConfig } from '@/components/base-form'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import BaseForm from '@/components/base-form'

defineOptions({ name: 'FormExample' })

// 表单数据
const formData = ref<Record<string, any>>({
  username: '',
  email: '',
  phone: '',
  gender: 1,
  hobby: [],
  status: true,
  birthday: '',
  description: '',
  avatar: '',
})

// 表单项配置
const formItems: FormItem[] = [
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 6,
    required: true,
    defaultValue: '',
    itemComponentProps: {
      clearable: true,
      maxlength: 20,
    },
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    required: true,
    defaultValue: '',
    span: {
      default: 6,
      sm: 6,
      md: 6,
      lg: 8,
      xl: 10,
      xxl: 12,
    },
    itemComponentProps: {
      clearable: true,
    },
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号',
    defaultValue: '',
    itemComponentProps: {
      clearable: true,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    required: true,
    defaultValue: 1,
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
    ],
  },
  {
    prop: 'hobby',
    label: '爱好',
    type: 'checkbox',
    defaultValue: [],
    options: [
      { label: '读书', value: 'reading' },
      { label: '游泳', value: 'swimming' },
      { label: '跑步', value: 'running' },
      { label: '电影', value: 'movie' },
    ],
  },
  {
    prop: 'status',
    label: '状态',
    type: 'switch',
    defaultValue: true,
  },
  {
    prop: 'birthday',
    label: '生日',
    type: 'date-picker',
    placeholder: '请选择生日',
    defaultValue: '',
    itemComponentProps: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    prop: 'avatar',
    label: '头像',
    type: 'slot',
  },
  {
    prop: 'area',
    label: '区域',
    type: 'select',
    defaultValue: '',
    itemComponentProps: {
      options: [
        { label: '区域1', value: 'area1' },
        { label: '区域2', value: 'area2' },
      ],
    },
  },
  {
    prop: 'description',
    label: '个人简介',
    type: 'input',
    placeholder: '请输入个人简介',
    defaultValue: '',
    itemComponentProps: {
      type: 'textarea',
      rows: 4,
      maxlength: 200,
      showWordLimit: true,
    },
  },
]

// 表单配置
const formConfig = reactive<FormConfig>({
  labelWidth: '80px',
  labelPosition: 'right' as const,
  size: 'default',
  showActionButtons: true,
  submitText: '提交',
  showResetButton: true,
  resetText: '重置',
})

// 表单规则
const formRules = reactive({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email' as const, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
})

// 提交加载状态
const submitLoading = ref(false)

// 处理表单提交
const handleSubmit = (data: Record<string, any>) => {
  submitLoading.value = true
  console.log('表单提交数据:', data)

  // 模拟提交过程
  setTimeout(() => {
    submitLoading.value = false
    ElMessage.success('表单提交成功!')
  }, 1000)
}

// 处理表单重置
const handleReset = () => {
  ElMessage.info('表单已重置')
}

// 处理字段变化
const handleFieldChange = (item: FormItem, value: any) => {
  console.log('handleFieldChange', formData.value)
  console.log(`字段 ${item.prop} 发生变化:`, value)
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader-icon:hover {
  border-color: var(--el-color-primary);
}
</style>
