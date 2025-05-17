export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Page ${req.originalUrl} not found`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  console.error(err)

  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    success: false,
    message: err.message ?? 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}
