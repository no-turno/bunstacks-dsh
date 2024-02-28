import type { BunFile } from "bun";

export async function defineConfig(
    options: {
        envFile: BunFile,
        load(env$: import("bun").Env): any
    }
) {
    const { envFile, load } = options;
    const file = await envFile.json();
    return load(file);
};

export async function before(handler: any) {
    return Promise.resolve(handler()).then(context => {
        return {
            load: function () {
                return {
                    with() {
                        return {
                            context
                        }
                    }
                }
            }
        }
    })
}
