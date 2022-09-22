import numbersRowsControllers from "../controllers/numbers_rows.controllers";

import { Router } from "express";

const numbersRowsRoutes = Router();

//create route
numbersRowsRoutes.post(
  "/api/numbers",
  numbersRowsControllers.createNumbersRows
);

//read route
numbersRowsRoutes.get("/api/numbers", numbersRowsControllers.readNumbersRows);

//read number route
numbersRowsRoutes.get(
  "/api/numbers/:numberId",
  numbersRowsControllers.readNumberById
);

//update route
numbersRowsRoutes.put(
  "/api/numbers/:numberId",
  numbersRowsControllers.updateNumbersRows
);

//delete route
numbersRowsRoutes.delete(
  "/api/numbers/:numberId",
  numbersRowsControllers.deleteNumbersRows
);

export default numbersRowsRoutes;
