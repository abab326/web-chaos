export interface TableColumn<T = Record<string, any>> {
  prop: keyof T
  label: string
}
