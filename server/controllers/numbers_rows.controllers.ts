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

//@TODO read number by id
const readNumberById: RequestHandler = function (req, res, next) {
  let id = req.params.numberId;
  try {
    numbersRows.readNumberById(id, (err, number) => {
      if (!err && number) {
        res.status(200);
        return res.json(number);
      }
      res.status(404);
      res.send("number not found");
    });
  } catch (e) {
    res.status(501);
    res.send({ Error: "server error read number" });
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
  let id = req.params.numberId;
  try {
    let number = req.body;
    numbersRows.updateNumbers(id, number, (e) => {
      if (e) {
        res.status(404);
        return res.send("not found number for update");
      }
      res.status(200);
      return res.send("number updating successfull");
    });
  } catch (e) {
    res.status(501);
    return res.send("error updating number[server error]");
  }
};

//@TODO deleting numbers
const deleteNumbersRows: RequestHandler = function (req, res, next) {
  let id = req.params.numberId;
  try {
    numbersRows.deleteNumberById(id, (e) => {
      if (!e) {
        res.status(200);
        return res.send("number deleting successfull");
      } else {
        res.status(404);
        return res.send("not found number for delete");
      }
    });
  } catch (e) {
    res.status(501);
    return res.send("server error");
  }
};
//object
const numbersRowsControllers = {
  readNumberById,
  createNumbersRows,
  readNumbersRows,
  updateNumbersRows,
  deleteNumbersRows,
};

export default numbersRowsControllers;
