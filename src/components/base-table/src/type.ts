import { type TableColumnCtx } from 'element-plus';
type BaseTableColumnProps<T extends Record<string, any> = Record<string, any>> = Omit<
  Partial<TableColumnCtx<T>>,
  'prop' | 'label' | 'children'
>;
// 完整的列配置
export interface TableColumn<T extends Record<string, any> = Record<string, any>>
  extends BaseTableColumnProps<T> {
  prop: keyof T & string;
  label: string;
  children?: Array<TableColumn<T>>;
}
