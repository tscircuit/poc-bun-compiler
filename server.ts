import apiVfs from "./api-vfs"

Bun.serve({
  development: true,
  fetch(req) {
    const routePath = new URL(req.url).pathname.slice(1)
    const route = apiVfs[routePath]
    if (route) return route(req)
    return new Response("Not Found", { status: 404 })
  },
})
