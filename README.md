# @gyoza-labs/dbs

define bun scripts.

Run shell scripts and workflow tasks using `filename`

```ts
// bun.repl.--sloppy.ts
import { dsh } from "./src/lib/dsh.ts"
await dsh(import.meta.file)

// Will attach the bun-repl to process.
```

```ts
// node.--help.ts
import { dsh } from "./src/lib/dsh.ts"
await dsh(import.meta.file)
// your current $NODE_VERSION
```

> This is an experiment using the [bun shell module](https://bun.sh/docs/runtime/shell) as filename parser to valid shell command
