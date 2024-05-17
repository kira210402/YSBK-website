import BaseJoi from "joi";
import JoiDate from "@joi/date";
import { REGEX } from "../constants/index.js";
const joi = BaseJoi.extend(JoiDate);

export const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req) req = {};
      if (!req['params']) req.params = {};

      req.body = validatorResult.value;
      next();
    }
  }
}

export const schemas = {
  signUpSchema: joi.object().keys({
    username: joi.string().min(6).required(),
    email: joi.string().email().required(),
    mssv: joi.string().min(8).max(8).required(),
    password: joi.string().min(6).required(),
    avatar: joi.string(),
    role: joi.string().valid("User", "Admin", "Moderator"),
  }),

  signInSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),

  bookSchema: joi.object().keys({
    title: joi.string().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
    price: joi.number(),
    rating: joi.number(),
    bookCode: joi.string().min(5).max(5).pattern(new RegExp(REGEX.BOOKCODE)).required(),
    genre: joi.string().valid("VN", "NN", "SK").required(),
    status: joi.string().valid("AVAILABLE", "BORROWED"),
  }),

  // recheck borrowDate either default or required
  loanSchema: joi.object().keys({
    borrowDate: joi.date().format("YYYY-MM-DD").required(),
    fullName: joi.string().required(),
    mssv: joi.string().min(8).max(8).required(),
    phoneNumber: joi.string().min(10).max(10).required(),
    bookTitle: joi.string().required(),
    bookCode: joi.string().min(5).max(5).pattern(new RegExp(REGEX.BOOKCODE)).required(),
    deposite: joi.number().required(),
    status: joi.string().valid("BORROWED", "RETURNED"),
  }),

  activitySchema: joi.object().keys({
    title: joi.string().max(200).required(),
    description: joi.string().required(),
    content: joi.string().required(),
    image: joi.string(),
    status: joi.string().valid("PASSED", "ONGOING", "COMING SOON").required(),
    startDate: joi.date().format("YYYY-MM-DD").required(),
    endDate: joi.date().format("YYYY-MM-DD").required(),
  })
}