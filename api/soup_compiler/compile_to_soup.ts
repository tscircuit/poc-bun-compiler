import { z } from "zod"

const jsonBody = z.object({
  typescript_filesystem: z.record(z.string()),
  target_filepath: z.string(),
  target_export_name: z.string(),
})

export default async (req: Request) => {
  const { typescript_filesystem, target_filepath, target_export_name } =
    jsonBody.parse(await req.json())
  return new Response("Hello World!", { status: 200 })
}
