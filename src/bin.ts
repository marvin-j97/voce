import { resolve } from "path";

import args from "./args";
import log from "./log";
import { runTests } from "./runner";
import { checkFiles } from "./util";

if (args.register.length) {
  for (const pkg of args.register) {
    log(`Register ${pkg}`);
    require(pkg);
  }
}

async function main() {
  log("Entry point");
  let files = <Array<string>>args._;

  log(args);

  if (!Array.isArray(files) || !files.length) {
    console.error("No input files");
    process.exit(1);
  }

  files = files.map((f) => resolve(f));

  {
    const notFound = checkFiles(files);
    if (notFound.length) {
      console.error("Some input files were not found:", notFound);
      process.exit(1);
    }
  }

  log(files);

  await runTests(files);

  log("Ran all tests");
  process.exit(0);
}

main();
