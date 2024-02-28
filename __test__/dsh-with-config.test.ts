import { describe, test, expect } from "bun:test"
import { defineConfig } from "../src/lib/setup"
import { $ } from "bun";

describe("this module handles base config", () => {
    test("should load env variables from custo config file", async () => {
        const config = await defineConfig({
            envFile: Bun.file(import.meta.dir + "/env.json"),
            async load(env$) {
                return {
                    NODE_ENV: env$.NODE_ENV
                }
            },
        });

        expect(config).toEqual({ NODE_ENV: "test" });
    });

    test("should execute bunshell code with given env variables", async () => {
        const config = await defineConfig({
            envFile: Bun.file(import.meta.dir + "/env.json"),
            async load(env$) {
                return {
                    NODE_ENV: env$.NODE_ENV,
                    PORT: 3111
                }
            },
        });
        const output = await $.env(config)`env`.text();
        expect(output).toEqual("NODE_ENV=test\nPORT=3111\n");
    })
})