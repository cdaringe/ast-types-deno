import { Fork } from "../types.ts";
import es2018Def from "./es2018.ts";
import typesPlugin from "../lib/types.ts";
import sharedPlugin from "../lib/shared.ts";

export default function (fork: Fork) {
  fork.use(es2018Def);

  const types = fork.use(typesPlugin);
  const def = types.Type.def;
  const or = types.Type.or;
  const defaults = fork.use(sharedPlugin).defaults;

  def("CatchClause").field("param", or(def("Pattern"), null), defaults["null"]);
}
