import { Fork } from "../types.ts";
import es2016Def from "./es2016.ts";
import typesPlugin from "../lib/types.ts";
import sharedPlugin from "../lib/shared.ts";

export default function (fork: Fork) {
  fork.use(es2016Def);

  const types = fork.use(typesPlugin);
  const def = types.Type.def;
  const defaults = fork.use(sharedPlugin).defaults;

  def("Function").field("async", Boolean, defaults["false"]);

  def("AwaitExpression")
    .bases("Expression")
    .build("argument")
    .field("argument", def("Expression"));
}
