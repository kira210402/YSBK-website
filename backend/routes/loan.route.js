import express from "express";
import { borrowBook, returnBook, updateBooksLoanAfterRegister } from "../controllers/loan.controller.js";
const router = express.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);

router.post('/update/:mssv', updateBooksLoanAfterRegister);
export default router;