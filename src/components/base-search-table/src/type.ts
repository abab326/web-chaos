export type BaseSearchTableSlots = {
  search: () => any;
  action: () => any;
  table: (props: { tableHeight: number }) => any;
  pagination: () => any;
  default: () => any;
};
