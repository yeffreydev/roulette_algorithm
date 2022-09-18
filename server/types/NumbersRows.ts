export interface NumbersRowsI {
  createNumbers: (data: any, cb: (err: string | boolean) => void) => void;
  readNumbers: (cb: (data: any, err: string | boolean) => void) => void;
  updateNumbers: (data: any, cb: (err: string | boolean) => void) => void;
  deleteNumbers: (cb: (err: string | boolean) => void) => void;
}
