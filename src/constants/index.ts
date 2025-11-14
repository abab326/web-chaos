/****************   全局常量定义   **************/

// API相关常量
export const API_CONSTANTS = {
  TIMEOUT: 10000,
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
} as const

// 路由相关常量
export const ROUTE_CONSTANTS = {
  // 路由名称
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  USERS: 'Users',
  SETTINGS: 'Settings',
  NOT_FOUND: 'NotFound',

  // 路由路径
  PATH_LOGIN: '/login',
  PATH_DASHBOARD: '/dashboard',
  PATH_USERS: '/users',
  PATH_SETTINGS: '/settings',
  PATH_NOT_FOUND: '/:pathMatch(.*)*',
} as const

// 状态码常量
export const STATUS_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const

// 分页常量
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
} as const

// 正则表达式
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
} as const

// 主题色
export const THEME_COLORS = {
  PRIMARY: '#409EFF',
  SUCCESS: '#67C23A',
  WARNING: '#E6A23C',
  DANGER: '#F56C6C',
  INFO: '#909399',
} as const
