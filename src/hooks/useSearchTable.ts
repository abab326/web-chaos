import { onMounted, ref } from 'vue'
import type { PaginatedResponse, PaginationParams } from '@/types'
import { apiService } from '@/services/index'

export type SearchParams = Record<string, any>

export type FetchDataFn<T> = (
  params: SearchParams & PaginationParams
) => Promise<PaginatedResponse<T> | T[]>

export interface UseSearchTableOptions<T, S extends SearchParams> {
  url?: string
  method?: 'GET' | 'POST'
  fetchData?: FetchDataFn<T>
  convertData?: (data: T[]) => T[]
  initialSearchParams?: S
  initialPagination?: Partial<PaginationParams>
}

export const useSearchTable = <T, S extends SearchParams>(options: UseSearchTableOptions<T, S>) => {
  const { url, method, fetchData, convertData, initialSearchParams, initialPagination } = options
  if (!url && !fetchData) {
    throw new Error('url、fetchData 必须提供一个')
  }
  // 分页参数
  const defaultPagination: PaginationParams = { page: 1, pageSize: 30 }
  const finalPagination = { ...defaultPagination, ...initialPagination }
  const pagination = ref<PaginationParams>(finalPagination)
  // 搜索参数
  const searchParams = ref<SearchParams>({ ...initialSearchParams })

  const tableData = ref<T[]>([])
  const total = ref<number>(0)
  const selectedItems = ref<T[]>([])

  // 获取数据
  const fetchTableData = async () => {
    const params = { ...searchParams.value, ...pagination.value }
    let result: PaginatedResponse<T> | T[] = []
    if (url) {
      result = await getDataByUrl(url, params, method)
    } else {
      result = await fetchData!(params)
    }
    const originalResult: T[] = []
    if (Array.isArray(result)) {
      originalResult.push(...result)
    } else {
      originalResult.push(...(result.list || []))
      total.value = result.total || 0
    }

    tableData.value = convertData?.(originalResult) || originalResult
  }

  /**
   * 根据URL获取数据
   *
   */
  const getDataByUrl = async (
    url: string,
    params: SearchParams & PaginationParams,
    method?: 'GET' | 'POST'
  ) => {
    if (method && method === 'POST') {
      return apiService.post<PaginatedResponse<T> | T[]>(url, params)
    } else {
      return apiService.get<PaginatedResponse<T> | T[]>(url, { params })
    }
  }

  /**
   * 处理分页变化
   *
   */
  const handlePaginationChange = ({ page, pageSize }: Partial<PaginationParams>) => {
    console.log('handlePaginationChange', { page, pageSize })
    pagination.value = {
      page: page || pagination.value.page,
      pageSize: pageSize || pagination.value.pageSize,
    }
    fetchTableData()
  }

  /**
   * 处理搜索参数变化
   *
   */
  const search = (newSearchParams: SearchParams) => {
    searchParams.value = newSearchParams
    pagination.value = { ...finalPagination, page: 1 }
    fetchTableData()
  }
  /**
   *  重置搜索
   */
  const resetSearch = () => {
    searchParams.value = { ...(initialSearchParams || {}) }
    pagination.value = { ...finalPagination, page: 1 }
    fetchTableData()
  }

  /**
   * 处理选中项变化
   *
   */
  const handleSelectedItemsChange = (newSelectedItems: T[]) => {
    selectedItems.value = newSelectedItems
  }

  onMounted(() => {
    fetchTableData()
  })

  return {
    // 状态
    searchParams,
    pagination,
    tableData,
    total,
    selectedItems,

    // 方法
    handlePaginationChange,
    search,
    resetSearch,
    handleSelectedItemsChange,
  }
}
