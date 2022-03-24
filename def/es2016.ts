import { Fork } from "../types.ts";
import { BinaryOperators, AssignmentOperators } from "./core-operators.ts";
import es6Def from "./es6.ts";
import typesPlugin from "../lib/types.ts";

export default function (fork: Fork) {
  fork.use(es6Def);

  const types = fork.use(typesPlugin);
  const def = types.Type.def;
  const or = types.Type.or;

  const BinaryOperator = or(...BinaryOperators, "**");

  def("BinaryExpression").field("operator", BinaryOperator);

  const AssignmentOperator = or(...AssignmentOperators, "**=");

  def("AssignmentExpression").field("operator", AssignmentOperator);
}
