import { Router } from "express";
import {
    postFinancialTransaction,
    getFinancialTransaction,
    sumFinancialTransactions
}
    from "../controllers/financialControllers";

import { verifyToken } from "../middlewares/tokenMiddlewares";

const financialRouter = Router();

financialRouter.use(verifyToken);

financialRouter.post("/financial-events", postFinancialTransaction);
financialRouter.get("/financial-events", getFinancialTransaction);
financialRouter.get("/financial-events/sum", sumFinancialTransactions);

export default financialRouter; 