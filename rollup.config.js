import pkg from "./package.json";
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.js",
    external: ["react", "immer"],
    plugins: [babel({ exclude: "node_modules/**" })],
    output: [
      {
        file: pkg.module,
        format: "es"
      },
      {
        file: pkg.main,
        format: "cjs",
        exports: "named"
      }
    ]
  }
];
