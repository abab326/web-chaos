export const MENU_TYPE = {
  dir: '目录',
  menu: '菜单',
} as const;
export type MenuType = keyof typeof MENU_TYPE;
export interface Menu {
  id: number;
  // 菜单名称
  name: string;
  // 路由路径
  path: string;
  // 组件路径
  component: string;
  // 图标
  icon: string;
  // 是否显示在菜单中
  isShow: boolean;
  // 菜单类型
  type: MenuType;
  // 子菜单
  children?: Menu[];
}
