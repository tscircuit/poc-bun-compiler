import { z } from "zod"
import { plugin } from "bun"
import fs from "fs"
import path from "path"
import os from "os"

const jsonBody = z.object({
  typescript_filesystem: z.record(z.string()),
  target_filepath: z.string(),
  target_export: z.string(),
})

export default async (req: Request) => {
  const { typescript_filesystem, target_export, target_filepath } =
    jsonBody.parse(await req.json())

  // Adding leading slashes
  // for (const key in typescript_filesystem) {
  //   if (!key.startsWith("/")) {
  //     typescript_filesystem["/" + key] = typescript_filesystem[key]
  //     delete typescript_filesystem[key]
  //   }
  // }

  // const availablePort = 4000 + Math.floor(Math.random() * 1000)

  // Add a file that does the thing
  typescript_filesystem["__ENTRYPOINT__.tsx"] = `

import { createRoot } from "@tscircuit/react-fiber"
import { createProjectBuilder } from "@tscircuit/builder"

// TODO dynamic import so we can check for error more easily
import { ${target_export} } from "./${target_filepath}"

const projectBuilder = createProjectBuilder()
const elements = await createRoot().render(
  <${target_export} />,
  projectBuilder
)

console.log(elements)



  `.trim()

  // create a temporary directory representing the filesystem
  const testDir = path.join(
    "./unsafe-usercode",
    `dump_${Math.random().toString(32).slice(2)}`
  )
  console.log(testDir)

  fs.mkdirSync(testDir, {
    recursive: true,
  })

  // create the files from the filesystem config
  for (const [filepath, contents] of Object.entries(typescript_filesystem)) {
    const fullPath = path.join(testDir, filepath)
    fs.mkdirSync(path.dirname(fullPath), { recursive: true })
    fs.writeFileSync(fullPath, contents)
  }

  const out = await Bun.build({
    root: testDir,
    entrypoints: [path.join(testDir, "__ENTRYPOINT__.tsx")],
    outdir: path.join(testDir, "__OUTPUT__"),
    splitting: false,
    format: "esm",
    target: "browser",
  })

  const evalResult = eval(fs.readFileSync(out.outputs[0].path, "utf-8"))

  return new Response(JSON.stringify({}), { status: 200 })
}
