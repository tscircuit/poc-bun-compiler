import { expect, test } from "bun:test"

test("/health", async () => {
  const { axios } = global.fixture

  const res = await axios.get("/health")
  expect(res.status).toBe(200)
})
