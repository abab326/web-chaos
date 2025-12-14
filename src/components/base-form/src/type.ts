import type { FormItemRule } from 'element-plus'

// 定义表单项类型
export interface FormItem {
  // 字段名
  prop: string
  // 标签文本
  label?: string
  // 表单组件类型
  type?:
    | 'input'
    | 'textarea'
    | 'input-number'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'date-picker'
    | 'time-picker'
    | 'slider'
    | 'slot'
    | string
  // 占位符
  placeholder?: string
  // 是否必填
  required?: boolean
  // 是否隐藏
  hidden?: boolean
  // 选项列表（用于select、radio、checkbox）
  options?: Array<{ label: string; value: any }>
  // formItem 组件属性
  attrs?: Record<string, any>
  // 表单项属性
  itemProps?: Record<string, any>
  // 插槽名称（type为slot时使用）
  slotName?: string
  // 自定义组件（type为自定义组件名时使用）
  component?: any
  // 默认值
  defaultValue?: any
  // 规则
  rules?: FormItemRule[]
}

// 表单配置
export interface FormConfig {
  // 标签宽度
  labelWidth?: string
  // 标签位置
  labelPosition?: 'left' | 'right' | 'top'
  // 表单尺寸
  size?: 'large' | 'default' | 'small'
  // 其他表单属性
  formProps?: Record<string, any>
  // 是否显示操作按钮
  showActionButtons?: boolean
  // 提交按钮文本
  submitText?: string
  // 是否显示重置按钮
  showResetButton?: boolean
  // 重置按钮文本
  resetText?: string
}
