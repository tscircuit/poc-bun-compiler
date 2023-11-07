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

// TODO dynamic import so we can check for error more easily
import { ${target_export} } from "./${target_filepath}"

console.log("we did it!", ${target_export})



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
  })

  const evalResult = eval(fs.readFileSync(out.outputs[0].path, "utf-8"))

  // const transpiler = new Bun.Transpiler()
  // console.log("running transpiler...")
  // console.log(transpiler.transformSync(typescript_filesystem[target_filepath]))
  // console.log(testDir)
  // const importedFile = await import(`./${testDir}/${target_filepath}`)

  // const fsServer = Bun.serve({
  //   port: availablePort,
  //   fetch(req: Request) {
  //     const url = new URL(req.url)
  //     return new Response(typescript_filesystem[url.pathname], {
  //       status: 200,
  //     })
  //   },
  // })
  // const fsUrl = `http://localhost:${availablePort}`
  // console.log(fsUrl)

  // const importedFile = await import(
  //   `${fsUrl}/${target_filepath.replace(/^\//, "")}`
  // )

  // console.log(importedFile)

  return new Response(JSON.stringify({}), { status: 200 })
}
