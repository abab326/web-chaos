import { onMounted, ref } from 'vue';
import type { PaginatedResponse, PaginationParams } from '@/types';
import { apiService } from '@/services/index';

export type FetchDataFn<T, S> = (
  params: S & PaginationParams
) => Promise<PaginatedResponse<T> | T[]>;

export interface UseSearchTableOptions<T, S = Record<string, any>> {
  url?: string;
  method?: 'GET' | 'POST';
  autoLoad?: boolean;
  fetchData?: FetchDataFn<T, S>;
  convertData?: (data: T[]) => T[];
  initialSearchParams?: { [K in keyof S]?: S[K] };
  // 不可重置的搜索参数
  noResetSearchParams?: (keyof S)[];
  // 初始分页参数
  initialPagination?: Partial<PaginationParams>;
}

export const useSearchTable = <T, S = Record<string, any>>(
  options: UseSearchTableOptions<T, S>
) => {
  const {
    url,
    method,
    fetchData,
    convertData,
    initialSearchParams,
    initialPagination,
    noResetSearchParams = [],
  } = options;
  if (!url && !fetchData) {
    throw new Error('url、fetchData 必须提供一个');
  }
  // 分页参数
  const defaultPagination: PaginationParams = { page: 1, size: 20 };
  const pagination = ref<PaginationParams>({ ...defaultPagination, ...initialPagination });
  // 搜索参数
  const searchParams = ref<S>({ ...(initialSearchParams || {}) } as S);

  const tableData = ref<T[]>([]);
  const total = ref<number>(0);
  const selectedItems = ref<T[]>([]);
  // 挂载是否加载数
  const autoLoad = ref<boolean>(options.autoLoad ?? true);
  // 获取数据
  const fetchTableData = async () => {
    const params = { ...searchParams.value, ...pagination.value };
    let result: PaginatedResponse<T> | T[] = [];
    if (url) {
      const [error, data] = await getDataByUrl(url, params, method);
      if (error) {
        result = [];
        return;
      }
      result = data;
    } else {
      result = await fetchData!(params);
    }
    const originalResult: T[] = [];
    if (Array.isArray(result)) {
      originalResult.push(...result);
    } else {
      originalResult.push(...(result.elements || result.list || []));
      total.value = result.total || 0;
    }

    tableData.value = convertData?.(originalResult) || originalResult;
  };

  /**
   * 根据URL获取数据
   * @param url 请求URL
   * @param params 请求参数
   * @param method 请求方法，默认GET
   */
  const getDataByUrl = async (
    url: string,
    params: S & PaginationParams,
    method?: 'GET' | 'POST'
  ) => {
    if (method && method === 'POST') {
      return apiService.post<PaginatedResponse<T> | T[]>(url, params);
    } else {
      return apiService.get<PaginatedResponse<T> | T[]>(url, params);
    }
  };

  /**
   * 处理分页变化
   *
   */
  const handlePaginationChange = ({ page, size }: Partial<PaginationParams>) => {
    console.log('handlePaginationChange', { page, size });
    pagination.value = {
      page: page || pagination.value.page,
      size: size || pagination.value.size,
    };
    fetchTableData();
  };

  const handleSizeChange = (size: number) => {
    handlePaginationChange({ size });
  };

  const handleCurrentChange = (page: number) => {
    handlePaginationChange({ page });
  };
  /**
   * 处理搜索参数变化
   *
   */
  const search = () => {
    pagination.value = { ...pagination.value, page: 1 };
    fetchTableData();
  };
  /**
   *  重置搜索
   */
  const resetSearch = () => {
    // 获取不需要重置的搜索参数
    const noResetParams = noResetSearchParams.reduce(
      (acc, key) => ({ ...acc, [key]: searchParams.value[key] }),
      {}
    );
    searchParams.value = { ...(initialSearchParams || {}), ...noResetParams };

    pagination.value = { ...pagination.value, page: 1 };
    fetchTableData();
  };

  /**
   * 处理选中项变化
   *
   */
  const handleSelectedItemsChange = (newSelectedItems: T[]) => {
    selectedItems.value = newSelectedItems;
  };

  onMounted(() => {
    if (autoLoad.value) {
      fetchTableData();
    }
  });

  return {
    // 状态
    searchParams,
    pagination,
    tableData,
    total,
    selectedItems,

    // 方法
    handleSizeChange,
    handleCurrentChange,
    handlePaginationChange,
    search,
    resetSearch,
    handleSelectedItemsChange,
  };
};
