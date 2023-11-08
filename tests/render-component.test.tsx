import { createRoot } from "@tscircuit/react-fiber"
import { createProjectBuilder } from "@tscircuit/builder"
import { test, expect } from "bun:test"

test("rendering tscircuit components should work", async () => {
  const projectBuilder = createProjectBuilder()
  const elements = await createRoot().render(
    <resistor resistance="10kohm" />,
    projectBuilder
  )
  expect(elements).toBeArray()
})
