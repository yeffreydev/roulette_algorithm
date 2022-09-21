import storage from "../lib/storage";
import { NumbersRowsI } from "../types/NumbersRows";

const dirName: string = "numbers_rows";
const fileName: string = "numbers_rows";
const fileNameId: string = "numbers_rows_id";

//create numbers
const createNumbers = function (
  data: any,
  cb: (err: string | boolean) => void
) {
  storage.createFile(dirName, fileName, [{ id: 0, ...data }], (e) => {
    if (!e) {
      storage.createFile(dirName, fileNameId, 1, (e) => {
        if (!e) {
          return cb(false);
        } else {
          return cb("Error creating file for numbers id");
        }
      });
    } else {
      storage.readFile(dirName, fileNameId, (err, id) => {
        if (!err && typeof id == "number") {
          storage.updateFile(dirName, fileNameId, id + 1, (e) => {
            if (!e) {
              storage.readFile(dirName, fileName, (err, d) => {
                if (!err && d) {
                  storage.updateFile(
                    dirName,
                    fileName,
                    [...d, { id, ...data }],
                    (e) => {
                      if (!e) return cb(false);
                      return cb("Errror updating file database numbers id");
                    }
                  );
                } else {
                  return cb("Error creating file database and id");
                }
              });
            } else {
              return cb(
                e + "Error" + " [numberRows] database: error creating number"
              );
            }
          });
        } else {
          cb(
            "Error reading, " + err + ", [numbersRos.ts]: error creating number"
          );
        }
      });
    }
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
