import { z } from "zod"
import { plugin } from "bun"
import fs from "fs"
import path from "path"
import os from "os"

const jsonBody = z.object({
  typescript_filesystem: z.record(z.string()),
})

export default async (req: Request) => {
  const { typescript_filesystem } = jsonBody.parse(await req.json())

  return new Response(
    JSON.stringify({
      available_exports: [],
    }),
    { status: 200 }
  )
}
