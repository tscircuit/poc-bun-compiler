import { startServer } from "."
import minimist from "minimist"
import packageJson from "./package.json"
// import { file } from "bun"
// import bunExe from "./bun.executable"

const args = minimist(Bun.argv)

if (args.bun) {
  // console.log(await file(bunExe).exists())
  // // console.log(await file(".bin/bun").exists())
  // await Bun.write(file("./unsafe-usercode/bun"), file(bunExe))
  // /* @ts-ignore */
  // // const bunPath = file((await import("bun/bin/bun")).default)
  // // console.log(await bunPath.text())
  // // // Bun.spawnSync({ cmd: [bunPath] })
  // process.exit(0)
}

if (args.version) {
  console.log(`tsci-compiler v${packageJson.version}`)
  process.exit(0)
}

if (args["usercode-dir"]) {
  process.env.TSCI_COMPILER_UNSAFE_USERCODE_DIR = args["usercode-dir"]
}

const port = args.port ? parseInt(args.port) : 3000

console.log(`[tsci-compiler] Starting on http://localhost:${port}`)
startServer({ port })
