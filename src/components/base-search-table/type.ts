import type { DefineComponent } from 'vue'

export type BaseSearchTableSlots = {
  search: () => any
  action: () => any
  default: (props: { tableHeight: number }) => any
  pagination: () => any
}

// 为带有泛型的组件提供类型定义
export type BaseSearchTableComponentType = DefineComponent<
  // Props
  Record<string, any>,
  // RawBindings
  Record<string, any>,
  // D
  any,
  // ComputedOptions
  any,
  // MethodOptions
  any,
  // PublicProps
  any,
  // Defaults
  any,
  // MakeDefaultsOptional
  any,
  // TypeSafeComponentDefine
  any,
  // InjectOptions
  any,
  // SlotsType
  BaseSearchTableSlots,
  // EmitsOptions
  any
>
