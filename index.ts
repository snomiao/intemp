#!/usr/bin/env bun

import "dotenv/config";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { glob } from "glob";

if (import.meta.main) await intemp();

export default async function intemp() {
  const files = await glob("./**/*.intemp.*");
  return await Promise.all(
    files.map(async (f) => {
      const cont = await readFile(f, "utf8");
      const outFile = f.replace(".intemp", "");
      await writeFile(
        outFile,
        cont.replace(/\${{(.*?)}}/g, (_, $1) => {
          const env = $1.trim().replace(/^env\./, '')
          return (
            (process.env as Record<string, string>)[env] ??
            (() => {
              throw new Error("Missing Env: " + env);
            })()
          );
        })
      );
      return outFile;
    })
  );
}
