export interface FsLibI {
  createFile: (
    dir: string,
    file: string,
    data: any,
    callback: (err: string | boolean) => void
  ) => void;
  readFile: (
    dir: string,
    file: string,
    callback: (err: string | boolean, data: any) => void
  ) => void;
  updateFile: (
    dir: string,
    file: string,
    data: any,
    callback: (err: string | boolean) => void
  ) => void;
  deleteFile: (
    dir: string,
    file: string,
    callback: (err: string | boolean) => void
  ) => void;
}
