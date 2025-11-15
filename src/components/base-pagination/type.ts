import type { DefineComponent } from 'vue'
import type { PaginationParams } from '@/types'

export type { PaginationParams }

export type BasePaginationProps = {
  total: number
  pageSizes: number[]
  disabled: boolean
}

export type BasePaginationEmits = {
  (e: 'pagination-change', params: PaginationParams): void
}

// 为组件提供类型定义
export type BasePaginationComponent = DefineComponent<
  BasePaginationProps,
  // RawBindings
  Record<string, any>,
  // D
  any,
  // ComputedOptions
  any,
  // MethodOptions
  any,
  // PublicProps
  { name: 'BasePagination' },
  // Defaults
  any,
  // MakeDefaultsOptional
  any,
  // TypeSafeComponentDefine
  any,
  // InjectOptions
  any,
  // SlotsType
  any,
  // EmitsOptions
  BasePaginationEmits
>
