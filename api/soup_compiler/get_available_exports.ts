import { z } from "zod"

const jsonBody = z.object({
  typescript_filesystem: z.record(z.string()),
})

export default async (req: Request) => {
  const { typescript_filesystem } = jsonBody.parse(await req.json())

  const transpiler = new Bun.Transpiler()

  const available_exports_by_filepath = {}

  for (const [path, fileContent] of Object.entries(typescript_filesystem)) {
    if (path.endsWith("ts") || path.endsWith("tsx")) {
      available_exports_by_filepath[path] = transpiler.scan(fileContent).exports
    }
  }

  return new Response(
    JSON.stringify({
      available_exports_by_filepath,
    }),
    { status: 200 }
  )
}
