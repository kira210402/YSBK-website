import express from "express";
import { borrowBook, filterByBookCode, filterByDate, filterByMssv, filterByStatus, getAllLoans, returnBook, updateBooksLoanAfterRegister } from "../controllers/loan.controller.js";
import { verifyModAndAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { schemas, validateBody } from "../middlewares/validateData.js";
const router = express.Router();

router.get("/", verifyModAndAdmin, getAllLoans);

router.post("/borrow", validateBody(schemas.loanSchema), verifyModAndAdmin, borrowBook);
router.get("/return/:bookCode", verifyModAndAdmin, returnBook);

// filter by date, mssv, bookcode
router.get("/date/:date", verifyModAndAdmin, filterByDate);
router.get("/mssv/:mssv", verifyModAndAdmin, filterByMssv);

// filter loans by bookCode, mssv, status
router.get("/bookcode/:bookcode", verifyModAndAdmin, filterByBookCode);
router.get("/mssv/:bookcode", verifyModAndAdmin, filterByMssv);
router.get("/date/:date", verifyModAndAdmin, filterByDate);
router.get("/status/:status", verifyModAndAdmin, filterByStatus);

router.post("/update/:mssv", verifyToken, updateBooksLoanAfterRegister);
export default router;