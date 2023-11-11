# @tscircuit/compiler

The standard transpiler for tscircuit with other utilities and a server.

tscircuit has a standard transpilation system (basically React + Typescript babel presets)

The package encapsulates the transpilation system so that it can easily be used in different
contexts, e.g. the browser, vs code extensions, local development.

The compiler can also output [tscircuit soup](https://tscircuit.com/soup) which is the result
of rendering tscircuit code, allowing browsers or other clients to avoid unsafe eval.

The compiler supports imports of [community tscircuit repos](https://tscircuit.com/repos) without
any additional configuration.


## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run cli.ts
```

