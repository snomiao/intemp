import { expect, it } from "bun:test";
import { readFile, rm } from "fs/promises";
import intemp from "./index.ts";

it("convert correctly", async () => {
  await rm("./config.yaml").catch(() => null);
  // const intemp = (await import(".")).default;
  await intemp();

  expect(await readFile("./config.yaml", "utf8")).toEqual(
    await readFile("./config.expected.yaml", "utf8")
  );
});
it("throw when missing env", async () => {
  await rm("./tests/missing/config.yaml").catch(() => null);
  // const intemp = (await import(".")).default;
  await intemp({ dir: "./tests/missing" });

  expect(await readFile("./tests/missing/config.yaml", "utf8")).toEqual(
    await readFile("./tests/missing/config.expected.yaml", "utf8")
  );
});
