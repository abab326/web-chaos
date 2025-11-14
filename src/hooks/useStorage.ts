import { ref, watch, type Ref } from 'vue'

/**
 * 本地存储Hook
 * @param key 存储键名
 * @param defaultValue 默认值
 * @param storage 存储类型 (localStorage/sessionStorage)
 */
export function useStorage<T>(
  key: string,
  defaultValue: T,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage'
): Ref<T> {
  // 获取存储对象
  const storageObject = window[storage]

  // 尝试从存储中读取数据
  const readValue = (): T => {
    try {
      const item = storageObject.getItem(key)
      return item ? (JSON.parse(item) as T) : defaultValue
    } catch (error) {
      console.warn(`Error reading ${storage} key "${key}":`, error)
      return defaultValue
    }
  }

  // 创建响应式引用
  const storedValue = ref<T>(readValue())

  // 监听值变化，自动保存到存储
  watch(
    storedValue,
    (newValue) => {
      try {
        if (newValue === null) {
          storageObject.removeItem(key)
        } else {
          storageObject.setItem(key, JSON.stringify(newValue))
        }
      } catch (error) {
        console.warn(`Error setting ${storage} key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return storedValue
}

/**
 * 本地存储Hook (localStorage)
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  return useStorage(key, defaultValue, 'localStorage')
}

/**
 * 会话存储Hook (sessionStorage)
 */
export function useSessionStorage<T>(key: string, defaultValue: T): Ref<T> {
  return useStorage(key, defaultValue, 'sessionStorage')
}
