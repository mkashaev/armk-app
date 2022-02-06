export interface ITableData<T> {
  data: T[];
  page: number;
  size: number;
  count: number;
}

export interface IPagination {
  page: number;
  size: number;
}
