import path from "path.ts";
import fs from "fs.ts";
import { parse } from "esprima.ts";
// @ts-ignore Cannot find module 'ast-types'. [2307]
import { visit } from "ast-types.ts";

var backbone = fs.readFileSync(
  path.join(__dirname, "data", "backbone.js"),
  "utf-8"
);

var ast = parse(backbone);

var names: any[] = [];
var start = +new Date();

visit(ast, {
  visitNode: function (path: any) {
    names.push(path.name);
    this.traverse(path);
  },
});

console.log(names.length);
console.log(+new Date() - start, "ms");
