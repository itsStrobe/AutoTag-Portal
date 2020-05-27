export class Row {
  dataName: string;
  rowId: number;
  content: string;
  status: Status;
  tag: string;
}

export enum Status {
  NotTagged = 0,
  PreTagged = 1,
  Tagged = 2
}
