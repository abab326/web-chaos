import type { PaginatedResponse, PaginationParams } from '@/types'
import { onMounted, ref } from 'vue'

export type SearchParams = Record<string, any>
export const useSearchTable = <T>(
  fetchData: (params: SearchParams & PaginationParams) => Promise<PaginatedResponse<T>>,
  initialSearchParams?: SearchParams,
  initialPagination: Partial<PaginationParams> = {
    page: 1,
    pageSize: 10,
  }
) => {
  // 确保分页参数有默认值
  const defaultPagination: PaginationParams = {
    page: 1,
    pageSize: 10,
  }

  const finalPagination = { ...defaultPagination, ...initialPagination }

  const searchParams = ref<SearchParams & PaginationParams>({
    ...(initialSearchParams || ({} as SearchParams)),
    ...finalPagination,
  })

  const pagination = ref<PaginationParams>(finalPagination)

  const tableData = ref<T[]>([])

  const fetchTableData = async () => {
    const res = await fetchData({
      ...(searchParams.value as SearchParams),
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
    })
    tableData.value = res.list
  }

  onMounted(() => {
    fetchTableData()
  })

  return {
    searchParams,
    pagination,
    tableData,
    fetchTableData,
  }
}
