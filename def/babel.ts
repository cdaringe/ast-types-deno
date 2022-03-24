import { Fork } from "../types.ts";
import babelCoreDef from "./babel-core.ts";
import flowDef from "./flow.ts";

export default function (fork: Fork) {
  fork.use(babelCoreDef);
  fork.use(flowDef);
}
