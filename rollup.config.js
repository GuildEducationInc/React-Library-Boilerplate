
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
  input: "./src/index.ts",
  external: [
    "react",
    "react-dom",
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
  ],
  output: [
    {
      file: `./dist/${pkg.main}`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.module}`,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    postcss(),
    typescript(),
    terser(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    babel({
      presets: ["react"],
      exclude: "node_modules/**",
    }),
  ],
};
