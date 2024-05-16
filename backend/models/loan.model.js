import mongoose, { Schema } from "mongoose";

const loanSchema = new mongoose.Schema({
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now
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
    required: true,
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
    required: true,
  }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
