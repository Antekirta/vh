export interface iTableCell<T = string> {
  value: T;
  width?: number; // in percents of width
}

export interface iTableRow {
  index: number;
  cells: Array<iTableCell>;
}
