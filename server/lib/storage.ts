import path from "path";
import fs from "fs";
import { FsLibI } from "../types/FsLib";

//dir

const dataDir = path.join(__dirname, "./../data/");

//create function
const createFile = function (
  dir: string,
  file: string,
  data: any,
  callback: (err: string | boolean) => void
) {
  //Open the file writing
  fs.open(
    `${dataDir}${dir}/${file}.json`,
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        //convert data to string
        let stringData = JSON.stringify(data);
        //Write to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            console.log(err);
            callback("Error writing to new fiel");
          }
        });
      } else {
        console.log(err);
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

//read file function
const readFile = function (
  dir: string,
  file: string,
  callback: (e: string | boolean, data: any) => void
) {
  fs.readFile(`${dataDir}${dir}/${file}.json`, "utf-8", function (err, data) {
    if (!err && data) {
      var parsedData = JSON.parse(data);
      callback(false, parsedData);
    } else {
      callback("Error reading file", data);
      console.log(err);
    }
  });
};

//update files
const updateFile = function (
  dir: string,
  file: string,
  data: any,
  callback: (err: string | boolean) => void
) {
  //open the file for writing
  fs.open(
    `${dataDir}${dir}/${file}.json`,
    "r+",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        //convert data to string
        let stringData = JSON.stringify(data);

        //Truncate the file
        fs.truncate(`${dataDir}${dir}/${file}.json`, function (err) {
          if (!err) {
            //write to the file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing existing file");
                  }
                });
              } else {
                callback("Error writing to existing file");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        console.error(err);
        callback("Error open file, the file not exist");
      }
    }
  );
};

//delete a file
const deleteFile = function (
  dir: string,
  file: string,
  callback: (e: string | boolean) => void
) {
  //unlink the file
  fs.unlink(`${dataDir}${dir}/${file}.json`, function (err) {
    if (!err) {
      callback(false);
    } else {
      console.log(err);
      callback("Error deleting file");
    }
  });
};

const storage: FsLibI = {
  createFile,
  readFile,
  updateFile,
  deleteFile,
};

export default storage;
