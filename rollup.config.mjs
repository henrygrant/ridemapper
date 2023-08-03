import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import "dotenv/config";

export default {
  input: "src/client/supabaseAuthModule.ts",
  output: {
    dir: "out",
    format: "iife",
  },
  plugins: [
    typescript({ module: "ESNext" }),
    json(),
    commonjs(),
    resolve({
      include: ["node_modules/**"],
      browser: true,
    }),
    replace({
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    }),
    terser(),
  ],
};
