import { expect, test } from "bun:test"

test("/health", async () => {
  const { axios } = global.fixture

  const res = await axios.post("/soup_compiler/compile_to_soup", {
    typescript_filesystem: {
      "test.tsx": `
      export const Test = () => (
        <resistor resistance="10kohm" name="R1" />
      )
      `,
    },
    target_filepath: "test.tsx",
    target_export: "Test",
  })

  expect(res.status).toBe(200)
  console.log(res.data.tscircuit_soup)
  expect(res.data.tscircuit_soup).toBeTruthy()
})
