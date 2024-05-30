const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({ message: "An error occurred while processing your request!" })
};

export {
  errorHandler,
}