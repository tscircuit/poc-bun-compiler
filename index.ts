import apiVfs from "./api-vfs"

export const startServer = (opts: { port?: number } = {}) => {
  return Bun.serve({
    development: true,
    port: opts.port,
    async fetch(req) {
      const routePath = new URL(req.url).pathname.slice(1)
      const route = apiVfs[routePath]
      if (route) {
        try {
          return await route(req)
        } catch (e: any) {
          console.error(e)
          return new Response(
            JSON.stringify({
              error: {
                error_type: "unknown_error",
                message: e.message,
                stack: e.stack,
              },
            }),
            { status: 500 }
          )
        }
      }
      return new Response("Not Found", { status: 404 })
    },
  })
}
