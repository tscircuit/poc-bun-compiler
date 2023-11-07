import { createRoot } from "@tscircuit/react-fiber"
import { createProjectBuilder } from "@tscircuit/builder"

const projectBuilder = createProjectBuilder()
const elements = await createRoot().render(
  <resistor resistance="10kohm" />,
  projectBuilder
)

console.log(elements)
