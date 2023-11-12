export const withErrorHandling = (next) => async (req) => {
  try {
    return await next(req)
  } catch (e: any) {
    console.log(`Error while processing request: ${e.toString()}`)
    return new Response(
      JSON.stringify({
        error: {
          error_type: "internal_server_error",
          message: e.toString(),
        },
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    )
  }
}
