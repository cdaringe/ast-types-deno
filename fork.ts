import typesPlugin from "./lib/types.ts";
import pathVisitorPlugin from "./lib/path-visitor.ts";
import equivPlugin from "./lib/equiv.ts";
import pathPlugin from "./lib/path.ts";
import nodePathPlugin from "./lib/node-path.ts";
import { Def, Fork, Plugin } from "./types.ts";

export default function (defs: Def[]) {
  const fork = createFork();

  const types = fork.use(typesPlugin);

  defs.forEach(fork.use);

  types.finalize();

  const PathVisitor = fork.use(pathVisitorPlugin);

  return {
    Type: types.Type,
    builtInTypes: types.builtInTypes,
    namedTypes: types.namedTypes,
    builders: types.builders,
    defineMethod: types.defineMethod,
    getFieldNames: types.getFieldNames,
    getFieldValue: types.getFieldValue,
    eachField: types.eachField,
    someField: types.someField,
    getSupertypeNames: types.getSupertypeNames,
    getBuilderName: types.getBuilderName,
    astNodesAreEquivalent: fork.use(equivPlugin),
    finalize: types.finalize,
    Path: fork.use(pathPlugin),
    NodePath: fork.use(nodePathPlugin),
    PathVisitor,
    use: fork.use,
    visit: PathVisitor.visit,
  };
}

function createFork(): Fork {
  const used: Plugin<unknown>[] = [];
  const usedResult: unknown[] = [];

  function use<T>(plugin: Plugin<T>): T {
    var idx = used.indexOf(plugin);
    if (idx === -1) {
      idx = used.length;
      used.push(plugin);
      usedResult[idx] = plugin(fork);
    }
    return usedResult[idx] as T;
  }

  var fork: Fork = { use };

  return fork;
}
