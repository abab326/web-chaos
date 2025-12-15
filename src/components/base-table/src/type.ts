import { ElTableColumn } from 'element-plus'

export type TableColumn<T = Record<string, any>> = Partial<typeof ElTableColumn> & {
  prop?: keyof T
  label: string
  width?: string | number
  'min-width'?: string | number
  children?: TableColumn<T>[]
}
