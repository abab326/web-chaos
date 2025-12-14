import { h, resolveComponent, type VNode, type Slots } from 'vue'
import type { FormItem } from './type'

/**
 * 表单控件类型映射表
 * 将表单项类型映射到对应的 Element Plus 组件名称
 */
const COMPONENT_MAP: Record<string, string> = {
  input: 'ElInput',
  textarea: 'ElInput',
  number: 'ElInputNumber',
  select: 'ElSelect',
  radio: 'ElRadioGroup',
  checkbox: 'ElCheckboxGroup',
  switch: 'ElSwitch',
  'date-picker': 'ElDatePicker',
  'time-picker': 'ElTimePicker',
  slider: 'ElSlider',
}

/***
 *
 * 渲染下拉选择器的选项
 *
 */
const renderSelectOptions = (item: FormItem) => {
  const optionComponent: VNode[] = []
  item.options?.forEach((option) => {
    const optionComponentItem = h(resolveComponent('ElOption'), {
      label: option.label,
      value: option.value,
      ...item.itemComponentProps,
    })
    optionComponent.push(optionComponentItem)
  })

  return optionComponent
}
/**
 *
 * 渲染单选框或复选框的选项
 * @param item 表单项配置
 * @returns VNode[]
 */
const renderRadioOptions = (item: FormItem) => {
  const radioComponents: VNode[] = []
  item.options?.forEach((option) => {
    const radioComponentItem = h(resolveComponent('ElRadio'), {
      label: option.label,
      value: option.value,
      ...item.itemComponentProps,
    })
    radioComponents.push(radioComponentItem)
  })

  return radioComponents
}

/**
 *
 * 渲染单选框或复选框的选项
 * @param item 表单项配置
 * @returns VNode[]
 */
const renderCheckboxOptions = (item: FormItem) => {
  const checkboxComponents: VNode[] = []
  item.options?.forEach((option) => {
    const checkboxComponentItem = h(resolveComponent('ElCheckbox'), {
      label: option.label,
      value: option.value,
      ...item.itemComponentProps,
    })
    checkboxComponents.push(checkboxComponentItem)
  })

  return checkboxComponents
}
/**
 *
 * 处理不同类型的选项渲染
 * @param item 表单项配置
 * @returns VNode[]
 */
const handleOptionsRender = (item: FormItem) => {
  switch (item.type) {
    case 'select':
      return renderSelectOptions(item)
    case 'radio':
      return renderRadioOptions(item)
    case 'checkbox':
      return renderCheckboxOptions(item)
    default:
      return []
  }
}
/**
 * 渲染不同类型的表单控件
 * @param item 表单项配置
 * @param formData 表单数据
 * @param handleChange 字段变化处理函数
 * @returns VNode
 */
export const renderControl = (
  item: FormItem,
  formData: Record<string, any>,
  handleChange: (item: FormItem, value: any) => void
) => {
  // 渲染不同类型的表单控件
  const componentName = COMPONENT_MAP[item.type || 'input'] || 'ElInput'
  const component = resolveComponent(componentName)

  // 根据不同的组件类型设置不同的事件处理
  const componentProps: Record<string, any> = {
    modelValue: formData[item.prop],
    ...item.itemComponentProps,
  }

  // 为不同类型的组件设置不同的事件处理函数
  switch (item.type) {
    case 'input':
    case 'textarea':
    case undefined:
      componentProps['onUpdate:modelValue'] = (value: any) => handleChange(item, value)
      break
    case 'input-number':
    case 'select':
    case 'switch':
    case 'date-picker':
    case 'time-picker':
    case 'slider':
      componentProps['onUpdate:modelValue'] = (value: any) => handleChange(item, value)
      break
    case 'radio':
      componentProps['onUpdate:modelValue'] = (value: any) => handleChange(item, value)
      break
    case 'checkbox':
      componentProps['onUpdate:modelValue'] = (value: any) => handleChange(item, value)
      break
    default:
      componentProps['onUpdate:modelValue'] = (value: any) => handleChange(item, value)
  }

  // 处理选项渲染
  const options = handleOptionsRender(item)
  // 渲染组件
  return h(component, componentProps, {
    default: () => options,
  })
}

/**
 *
 * 渲染表单项
 * @param item 表单项配置
 * @param formData 表单数据
 * @param handleChange 字段变化处理函数
 * @param slots 插槽
 * @returns VNode
 */
export const renderFormItem = (
  item: FormItem,
  formData: Record<string, any>,
  handleChange: (item: FormItem, value: any) => void,
  slots: Slots
) => {
  // 如果字段被隐藏，不渲染任何内容
  if (item.hidden) {
    return null
  }
  let childComponent
  console.log('slots', slots)
  if (slots && slots[item.prop]) {
    childComponent = slots[item.prop]!()
  } else {
    childComponent = renderControl(item, formData, handleChange)
  }
  // 渲染组件
  return h(
    resolveComponent('ElFormItem'),
    {
      label: item.label,
      prop: item.prop,
      required: item.required,
      ...item.formItemProps,
    },
    {
      default: () => childComponent,
    }
  )
}
