import apiVfs from "./api-vfs"

export const startServer = (opts: { port?: number } = {}) => {
  return Bun.serve({
    development: true,
    port: opts.port,
    fetch(req) {
      const routePath = new URL(req.url).pathname.slice(1)
      const route = apiVfs[routePath]
      if (route) return route(req)
      return new Response("Not Found", { status: 404 })
    },
  })
}
