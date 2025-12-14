export interface TableColumn<T = Record<string, any>> {
  prop?: keyof T
  label: string
  width?: string | number
  'min-width'?: string | number
  children?: TableColumn<T>[]
}
