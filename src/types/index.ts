// 分页参数接口
export interface PaginationParams {
  page: number
  size: number
}

// 分页响应接口
export interface PaginatedResponse<T> {
  list?: T[]
  elements?: T[]
  total: number
}

// 通用ID类型
export type ID = string | number

// 空值类型
export type Nullable<T> = T | null | undefined

// 可选属性类型
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 必需属性类型
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
