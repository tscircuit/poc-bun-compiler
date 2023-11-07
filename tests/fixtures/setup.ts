import { afterEach, beforeEach } from "bun:test"
import { startServer } from "../.."
import defaultAxios from "redaxios"

beforeEach(async () => {
  const server = await startServer({
    port: 3001 + Math.floor(Math.random() * 999),
  })
  const url = `http://localhost:${server.port}`
  const axios = defaultAxios.create({
    baseURL: url,
  })
  global.fixture = {
    url,
    server,
    axios,
  }
})

afterEach(() => {
  global.fixture.server.stop()
})
