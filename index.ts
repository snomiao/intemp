#!/usr/bin/env bun
import path from "path";
import { sleep } from "bun";
import "dotenv/config";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { glob } from "glob";

if (import.meta.main) await intemp();

export default async function intemp() {
  const files = await glob("./**/*.intemp.*");
  const outFiles = files.map((f) => outpath(f));
  console.log(outFiles);
  const outPromises = Object.fromEntries(
    outFiles.map((outFile) => [outFile, SolvablePromise()])
  );
  return await Promise.all(
    files.map(async (f) => {
      const cont = await readFile(f, "utf8");
      const outFile = outpath(f);
      let c = 0;
      const replaced = await replaceAsync(
        cont,
        /\${{(.*?)}}/g,
        async (_, $1) => {
          const env = $1.trim().replace(/^env\./, "");
          c++;
          if (env.startsWith("file://")) {
            const inputFile = path.relative(
              process.cwd(),
              env.slice("file://".length)
            );
            await outPromises[inputFile];
            return await readFile(inputFile, "utf8");
          }
          if (env.startsWith("https://") || env.startsWith("http://")) {
            return await (await fetch(env)).text();
          }
          return (
            (process.env as Record<string, string>)[env] ??
            (() => {
              throw new Error("Missing Env: " + env + " in " + f);
            })()
          );
        }
      );
      await writeFile(outFile, replaced);
      outPromises[outFile].resolve();
      console.log(`${outFile} ${c}`);
      return outFile;
    })
  );
}

function outpath(f: string): string {
  return path.relative(process.cwd(), f.replace(".intemp", ""));
}

// - [javascript : Async/await in .replace - Stack Overflow]( https://stackoverflow.com/questions/33631041/javascript-async-await-in-replace )
async function replaceAsync(
  str: string,
  regex: RegExp,
  asyncFn: (...args: any[]) => Promise<string>
) {
  const promises: Promise<string>[] = [];
  str.replace(regex, (full, ...args) => {
    promises.push(asyncFn(full, ...args));
    return full;
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift()!);
}
function SolvablePromise() {
  const resolver = {
    resolve: () => {
      throw new Error("not initilized");
      return;
    },
  };
  const p = new Promise<void>((resolve) => (resolver.resolve = resolve));
  return Object.assign(p, resolver);
}
