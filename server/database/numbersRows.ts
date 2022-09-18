import storage from "../lib/storage";
import { NumbersRowsI } from "../types/NumbersRows";

const dirName: string = "numbers_rows";
const fileName: string = "numbers_rows";

//create numbers
const createNumbers = function (
  data: any,
  cb: (err: string | boolean) => void
) {
  storage.createFile(dirName, fileName, data, (e) => {
    if (e) return cb(e);
    cb(false);
  });
};

//read numbers
const readNumbers = function (cb: (err: string | boolean, data: any) => void) {
  storage.readFile(dirName, fileName, (err, data) => {
    if (err) return cb(err, null);
    cb(false, data);
  });
};

const updateNumbers = function (
  data: any,
  cb: (err: string | boolean) => void
) {
  storage.updateFile(dirName, fileName, data, (err) => {
    if (err) return cb(err);
    cb(false);
  });
};

const deleteNumbers = function (cb: (err: string | boolean) => void) {
  storage.deleteFile(dirName, fileName, (err) => {
    if (err) cb(err);
    cb(false);
  });
};

const numbersRows: NumbersRowsI = {
  createNumbers,
  readNumbers,
  updateNumbers,
  deleteNumbers,
};

export default numbersRows;
