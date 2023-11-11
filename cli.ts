import { startServer } from "."
import minimist from "minimist"
import packageJson from "./package.json"

const args = minimist(Bun.argv)

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
