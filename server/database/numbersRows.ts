import storage from "../lib/storage";
import { NumberI } from "../types/Number";
import { NumbersRowsI } from "../types/NumbersRows";

const dirName: string = "numbers_rows";
const fileName: string = "numbers_rows";
const fileNameId: string = "numbers_rows_id";

//create numbers
const createNumbers = function (
  data: any,
  cb: (err: string | boolean, id: string | number | null) => void
) {
  storage.createFile(dirName, fileName, [{ id: 0, ...data }], (e) => {
    if (!e) {
      storage.createFile(dirName, fileNameId, 1, (e) => {
        if (!e) {
          return cb(false, null);
        } else {
          return cb("Error creating file for numbers id", null);
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
                      if (!e) return cb(false, id);
                      return cb(
                        "Errror updating file database numbers id",
                        null
                      );
                    }
                  );
                } else {
                  return cb("Error creating file database and id", null);
                }
              });
            } else {
              return cb(
                e + "Error" + " [numberRows] database: error creating number",
                null
              );
            }
          });
        } else {
          cb(
            "Error reading, " +
              err +
              ", [numbersRos.ts]: error creating number",
            null
          );
        }
      });
    }
  });
};

//read number
const readNumberById = function (
  id: string | number,
  cb: (err: string | boolean, data: NumberI | null) => void
) {
  storage.readFile(dirName, fileName, (err, data: NumberI[]) => {
    if (err) return cb("Error reading fileName ", null);
    if (data) {
      let numberFound = data.find((item) => item.id == id);
      if (!numberFound) return cb("Not found number", null);
      cb(false, numberFound);
    } else {
      cb("Not data Found in file", null);
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
  id: string | number,
  data: NumberI,
  cb: (err: string | boolean) => void
) {
  storage.readFile(dirName, fileName, (err, numbers: NumberI[]) => {
    let foundNumber = numbers.find((item) => item.id == id);
    if (!foundNumber)
      return cb("not found number for update: [Error]; numbersRows");
    if (!err && numbers) {
      let updatedNumbers = numbers.map((item) => {
        if (item.id == id) {
          item = { id: item.id, ...data };
        }
        return item;
      });
      storage.updateFile(dirName, fileName, updatedNumbers, (err) => {
        if (err) return cb(err);
        cb(false);
      });
    } else {
      return cb("Error readin numbers, updating numbers on numberRows [error]");
    }
  });
};

const deleteNumberById = function (
  id: string | number,
  cb: (err: string | boolean) => void
) {
  storage.readFile(dirName, fileName, (err, numbers: NumberI[]) => {
    if (!err && numbers) {
      let numberFound = numbers.find((item) => item.id == id);
      if (!numberFound) {
        return cb("Not found number for update database");
      }
      let deleteNumber = numbers.filter((item) => item.id != id);
      storage.updateFile(dirName, fileName, deleteNumber, (err) => {
        if (!err) {
          return cb(false);
        }
        return cb("Error updating file for delete a number");
      });
    } else {
      cb("Error readin numbers for delete a number [error] numbersRows");
    }
  });
};

const numbersRows: NumbersRowsI = {
  readNumberById,
  createNumbers,
  readNumbers,
  updateNumbers,
  deleteNumberById,
};

export default numbersRows;
