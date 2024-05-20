import { expect, it, test } from "bun:test";
import { readFile } from "fs/promises";
import { rm } from "fs/promises";
import { config } from "process";

import { writeFile } from "fs/promises";

it("convert correctly", async () => {
  await rm("./config.yaml").catch(() => null);
  const intemp = (await import(".")).default;
  await intemp();

  expect(await readFile("./config.yaml", "utf8")).toEqual(
    await readFile("./config.expected.yaml", "utf8")
  );
});
