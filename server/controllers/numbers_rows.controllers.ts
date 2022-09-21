import numbersRows from "../database/numbersRows";
import { RequestHandler } from "express";

//create numbers rows
const createNumbersRows: RequestHandler = function (req, res, next) {
  try {
    const number = req.body;
    numbersRows.createNumbers(number, (e) => {
      if (!e) {
        res.status(200);
        return res.send("created successfull");
      }
      console.log(e);
      res.status(500);
      return res.send("error creating number");
    });
  } catch (e) {
    res.status(500);
    res.send({
      Error: `[number_rows.controllers]: ${
        typeof e == "object" ? JSON.stringify(e) : e
      }`,
    });
  }
};

//@TODO read numbers
const readNumbersRows: RequestHandler = function (req, res, next) {
  try {
    numbersRows.readNumbers((e, data) => {
      if (e) {
        res.status(404);
        return res.send("not found number");
      }
      res.status(200);
      return res.json(data);
    });
  } catch (e) {
    res.status(501);
    return res.send({ Error: "Server Error" });
  }
};

//@TODO update numbers
const updateNumbersRows: RequestHandler = function (req, res, next) {
  try {
    let number = req.body;
    numbersRows.updateNumbers(number, (e) => {
      if (e) {
        res.status(501);
        return res.send("Error updating number");
      }
      res.status(200);
      return res.send("number updating successfull");
    });
  } catch (e) {
    res.status(501);
    return res.send("Server error");
  }
};

//@TODO deleting numbers
const deleteNumbersRows: RequestHandler = function (req, res, next) {
  try {
    numbersRows.deleteNumbers((e) => {
      if (!e) {
        res.status(200);
        return res.send("number deleting successfull");
      }
    });
  } catch (e) {
    res.status(501);
    return res.send("server error");
  }
};
//object
const numbersRowsControllers = {
  createNumbersRows,
  readNumbersRows,
  updateNumbersRows,
  deleteNumbersRows,
};

export default numbersRowsControllers;
