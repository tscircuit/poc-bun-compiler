import { expect, test } from "bun:test"

test("[soup-01] /soup_compiler/compile_to_soup", async () => {
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
  expect(res.data.tscircuit_soup).toBeArray()
})

test("[soup-01] /soup_compiler/get_available_exports", async () => {
  const { axios } = global.fixture

  const res = await axios.post("/soup_compiler/get_available_exports", {
    typescript_filesystem: {
      "test.tsx": `
      export const Test = () => (
        <resistor resistance="10kohm" name="R1" />
      )

      export const Another = () => (
        <resistor resistance="10kohm" name="R1" />
      )
      `,
    },
  })

  expect(res.status).toBe(200)
  const { available_exports_by_filepath } = res.data
  expect(available_exports_by_filepath["test.tsx"]).toBeArrayOfSize(2)
  expect(available_exports_by_filepath["test.tsx"]).toContain("Test")
  expect(available_exports_by_filepath["test.tsx"]).toContain("Another")
})
