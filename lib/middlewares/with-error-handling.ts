export const withErrorHandling = (next) => async (req, res) => {
  try {
    return await next(res, res)
  } catch (e) {
    console.log(`Error while processing request: ${e.toString()}`)
    res.status(500).json({
      error: {
        error_type: "internal_server_error",
        message: e.toString(),
      },
    })
  }
}
