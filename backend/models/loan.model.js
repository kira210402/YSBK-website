import mongoose, { Schema } from "mongoose";

const loanSchema = new mongoose.Schema({
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  fullName: {
    type: String,
    required: true,
  },
  mssv: {
    type: String,
    required: true,
  },
  phoneNumber: {  
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
  },
  bookCode: {
    type: String,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["BORROWED", "RETURNED"],
    default: "BORROWED",
  }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
