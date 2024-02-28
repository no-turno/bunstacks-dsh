import { $ } from "bun";

const customEnvFile = Bun.env.CUSTOM_ENV_FILE !== undefined ? Bun.file(Bun.env.CUSTOM_ENV_FILE) : null;

declare namespace globalThis {
    var ENV_FILE: Record<string, string> | import("bun").Env;
}

if (customEnvFile) {
    Bun.write(customEnvFile, JSON.stringify(await customEnvFile.json(),))
    globalThis['ENV_FILE'] = await customEnvFile.json();
} else {
    globalThis['ENV_FILE'] = process.env as Record<string, string>;
}

export async function dsh(filename: string) {
    const [runner, command, ...args] = filename.split(".");

    const context = {
        runner: Bun.which(runner),
        command: command,
        args: args.at(0)?.replaceAll("_", "/*") ?? "",
    };

    await $`${context.runner} ${context.command} ${context.args}`;
}
