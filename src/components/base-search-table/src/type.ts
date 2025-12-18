export type BaseSearchTableSlots = {
  search: () => any;
  action: () => any;
  default: (props: { tableHeight: number }) => any;
  pagination: () => any;
};
