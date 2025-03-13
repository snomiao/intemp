import { expect, it } from "bun:test";
import { readFile, rm } from "fs/promises";
import intemp from "./index.ts";

it("convert web data correctly", async () => {
  const dir = "tests/web";
  await rm(dir + "/myip.txt").catch(() => null);
  await intemp({ dir });

  const myip = await (await fetch("https://ifconfig.me/ip")).text();
  console.log(myip)
  expect(await readFile(dir + "/myip.txt", "utf8")).toEqual(
    myip
  );
});
it("convert env correctly", async () => {
  const dir = "tests/env";
  await rm(dir + "/config.yaml").catch(() => null);
  await intemp({ dir });

  expect(await readFile(dir + "/config.yaml", "utf8")).toEqual(
    await readFile(dir + "/config.expected.yaml", "utf8")
  );
});
it("throw when missing env", async () => {
  const dir = "tests/missing";
  await rm("/config.yaml").catch(() => null);
  expect(() => intemp({ dir })).toThrowError(Error);
});
