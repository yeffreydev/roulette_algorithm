import { NumberI } from "./Number";

export interface NumbersRowsI {
  createNumbers: (
    data: any,
    cb: (err: string | boolean, id: string | number | null) => void
  ) => void;
  readNumberById: (
    id: string | number,
    cb: (err: string | boolean, data: NumberI | null) => void
  ) => void;
  readNumbers: (cb: (data: any, err: string | boolean) => void) => void;
  updateNumbers: (
    id: number | string,
    data: NumberI,
    cb: (err: string | boolean) => void
  ) => void;
  deleteNumberById: (
    id: string | number,
    cb: (err: string | boolean) => void
  ) => void;
}
