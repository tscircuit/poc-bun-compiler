import { startServer } from "."
import minimist from "minimist"

const args = minimist(Bun.argv)

const port = args.port ? parseInt(args.port) : 3000

console.log(`[tsci-compiler] Starting on http://localhost:${port}`)
startServer({ port })
