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

//update route
numbersRowsRoutes.put("/api/numbers", numbersRowsControllers.updateNumbersRows);

//delete route
numbersRowsRoutes.delete(
  "/api/numbers",
  numbersRowsControllers.deleteNumbersRows
);

export default numbersRowsRoutes;
