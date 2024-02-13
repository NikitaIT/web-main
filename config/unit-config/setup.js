import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const { readConfigFile, sys } = ts; // it's an object, not a module
/**
 *
 * @param {string} currentFileMetaUrl
 * @returns {import('ts-jest').JestConfigWithTsJest} config
 */
export default function setupTsJestConfigFromModuleUrl(
  currentFileMetaUrl,
  useTsJest
) {
  const modulePath = fileURLToPath(currentFileMetaUrl);

  const tsconfigPath = path.resolve(modulePath, "../tsconfig.json");

  /** @type {{ compilerOptions: import('typescript').CompilerOptions }} */
  const config = readConfigFile(tsconfigPath, sys.readFile).config;

  const rootDir = config.compilerOptions.rootDir;

  if (!rootDir) {
    throw new Error(`Set compilerOptions.rootDir in ${tsconfigPath}`);
  }

  return {
    ...(useTsJest
      ? { preset: "ts-jest" }
      : {
          //https://amitd.co/blog/swc-jest-with-typescript-react-and-esm-modules
          moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
          transformIgnorePatterns: [],
        }),
    testEnvironment: "node",
    rootDir,
    transform: {
      // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
      // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
      "^.+\\.m?[tj]sx?$": useTsJest
        ? [
            "ts-jest",
            {
              // <rootDir> not supported
              tsconfig: "./tsconfig.json",
            },
          ]
        : [
            "@swc/jest",
            {
              //for react https://amitd.co/blog/swc-jest-with-typescript-react-and-esm-modules
              jsc: {
                transform: {
                  react: {
                    runtime: "automatic",
                  },
                },
              },
            },
          ],
    },
  };
}
