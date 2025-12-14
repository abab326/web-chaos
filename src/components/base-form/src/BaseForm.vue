<template>
  <div class="base-form">
    <el-form
      ref="formRef"
      class="grid grid-cols-12 gap-x-3"
      :model="formData"
      :rules="mergedRules"
      :label-width="formConfig.labelWidth || '80px'"
      :label-position="formConfig.labelPosition || 'right'"
      :size="formConfig.size || 'default'"
      v-bind="formConfig.formProps"
    >
      <!-- 渲染表单项 -->
      <BaseFormItem
        v-for="item in formItems"
        :key="item.prop"
        :class="getSpanClass(item)"
        :item="item"
        :form-data="formData"
        :handle-change="handleChange"
      >
        <template v-if="$slots[item.prop]" #[item.prop]>
          <slot :name="item.prop" :item="item" :form-data="formData" />
        </template>
      </BaseFormItem>
      <el-form-item v-if="showActionButtons" class="col-span-12" label-width="0">
        <el-button type="primary" @click="handleSubmit">{{ submitText }}</el-button>
        <el-button v-if="showResetButton" type="default" @click="handleReset">
          {{ resetText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { ElForm, type FormRules } from 'element-plus'
import BaseFormItem from './BaseFormItem'
import type { FormConfig, FormItem } from './type'
import { spanClassMaps } from './utils'
// 组件属性定义
interface Props {
  // 表单项配置
  formItems: FormItem[]
  // 表单配置
  formConfig?: FormConfig
  // 表单数据
  modelValue?: Record<string, any>
  // 表单规则
  rules?: FormRules
  // 提交加载状态
  submitLoading?: boolean
}

// 组件事件定义
interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit', formData: Record<string, any>): void
  (e: 'reset'): void
  (e: 'field-change', item: FormItem, value: any): void
}

defineOptions({ name: 'BaseForm' })

// 属性和事件
const props = withDefaults(defineProps<Props>(), {
  formConfig: () => ({}),
  modelValue: () => ({}),
  rules: () => ({}),
  submitLoading: false,
})

const emit = defineEmits<Emits>()

// 表单引用
const formRef = ref<InstanceType<typeof ElForm>>()

// 表单数据
const formData = reactive<Record<string, any>>({ ...props.modelValue })

// 合并规则
const mergedRules = computed<FormRules>(() => {
  const rules: FormRules = { ...props.rules }
  props.formItems.forEach((item) => {
    if (item.rules && item.rules.length > 0) {
      rules[item.prop] = item.rules
    }
    // 处理必填字段
    if (item.required && !rules[item.prop]) {
      rules[item.prop] = [
        { required: true, message: `${item.label || item.prop}不能为空`, trigger: 'blur' },
      ]
    }
  })
  return rules
})

// 表单项
const formItems = computed<FormItem[]>(() => props.formItems)

// 表单配置
const formConfig = computed<FormConfig>(() => ({
  labelWidth: '100px',
  labelPosition: 'right',
  size: 'default',
  showActionButtons: true,
  submitText: '提交',
  showResetButton: true,
  resetText: '重置',
  ...props.formConfig,
}))

// 操作按钮相关
const showActionButtons = computed(() => formConfig.value.showActionButtons)
const submitText = computed(() => formConfig.value.submitText)
const showResetButton = computed(() => formConfig.value.showResetButton)
const resetText = computed(() => formConfig.value.resetText)

// 初始化默认值
onMounted(() => {
  props.formItems.forEach((item) => {
    if (item.defaultValue !== undefined && formData[item.prop] === undefined) {
      formData[item.prop] = item.defaultValue
    }
  })
  // 更新父组件的modelValue
  emit('update:modelValue', { ...formData })
})

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    Object.keys(newVal).forEach((key) => {
      formData[key] = newVal[key]
    })
  },
  { deep: true }
)

// 监听formData变化
watch(
  formData,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
  },
  { deep: true }
)

const getSpanClass = (item: FormItem) => {
  const spanClass = []
  if (item.span && typeof item.span === 'object') {
    const defaultSpan = item.span.default || 12
    spanClass.push(spanClassMaps['default'][defaultSpan])

    if (item.span.sm) {
      spanClass.push(spanClassMaps['sm'][item.span.sm])
    }
    if (item.span.md) {
      spanClass.push(spanClassMaps['md'][item.span.md])
    }
    if (item.span.lg) {
      spanClass.push(spanClassMaps['lg'][item.span.lg])
    }
    if (item.span.xl) {
      spanClass.push(spanClassMaps['xl'][item.span.xl])
    }
    if (item.span.xxl) {
      spanClass.push(spanClassMaps['xxl'][item.span.xxl])
    }
  } else {
    spanClass.push(spanClassMaps['default'][item.span || 12])
  }

  return spanClass.join(' ')
}
// 处理字段变化
const handleChange = (item: FormItem, value: any) => {
  console.log('字段变化:', item.prop, value)
  // 更新表单数据
  formData[item.prop] = value

  // 触发字段变化事件
  emit('field-change', item, value)
}

// 提交表单
const handleSubmit = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) {
      emit('submit', { ...formData })
    }
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
  // 重置为默认值
  props.formItems.forEach((item) => {
    if (item.defaultValue !== undefined) {
      formData[item.prop] = item.defaultValue
    }
  })
  emit('reset')
}

// 手动验证表单
const validate = () => {
  return formRef.value?.validate()
}

// 重置表单字段
const resetFields = () => {
  formRef.value?.resetFields()
}

// 清除表单验证
const clearValidate = () => {
  formRef.value?.clearValidate()
}

// 暴露方法给父组件
defineExpose({
  validate,
  resetFields,
  clearValidate,
})
</script>

<style lang="scss" scoped>
.base-form {
  :deep(.el-form) {
    .el-form-item__content {
      align-items: flex-start;
    }
  }
}
</style>
