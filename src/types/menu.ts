export interface MenuItem {
  id: number
  name: string
  path: string
  component: string
  icon: string
  children?: MenuItem[]
}
