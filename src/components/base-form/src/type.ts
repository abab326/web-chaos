import type { FormItemRule, FormProps } from 'element-plus';

export type FormItemSpan =
  | number
  | {
      default: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };
export type FormItemComponent =
  | 'input'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date-picker'
  | 'time-picker'
  | 'slider'
  | 'slot';

// 定义表单项类型
export interface FormItem {
  // 字段名
  prop: string;
  // 标签文本
  label?: string;
  // 表单组件类型
  type?: FormItemComponent;
  // 占位符
  placeholder?: string;
  // 是否必填
  required?: boolean;
  // 是否隐藏
  hidden?: boolean;
  // 列数（用于网格布局）
  span?: FormItemSpan;
  // 选项列表（用于select、radio、checkbox）
  options?: Array<{ label: string; value: any }>;
  // formItem 组件属性
  formItemProps?: Record<string, any>;
  // 表单项组件属性
  itemComponentProps?: Record<string, any>;
  // 默认值
  defaultValue?: any;
  // 规则
  rules?: FormItemRule[];
}

// 表单配置
export interface FormConfig {
  // 标签宽度
  labelWidth?: string;
  // 标签位置
  labelPosition?: 'left' | 'right' | 'top';
  // 表单尺寸
  size?: 'large' | 'default' | 'small';
  // 其他表单属性
  formProps?: Partial<FormProps>;
  // 是否显示操作按钮
  showActionButtons?: boolean;
  // 提交按钮文本
  submitText?: string;
  // 是否显示重置按钮
  showResetButton?: boolean;
  // 重置按钮文本
  resetText?: string;
}
