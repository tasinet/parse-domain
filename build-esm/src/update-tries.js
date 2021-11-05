var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { fetchPsl } from "./psl/fetch-psl";
import { buildTries } from "./psl/build-tries";
import { serializeTrie } from "./trie/serialize-trie";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
const findIcannOverridePath = () => {
  for (let i = 1; i < 4; i++) {
    const upPaths = new Array(i).fill(1).map((x) => "..");
    const pathParts = [__dirname, ...upPaths, "data", "icann-override.json"];
    const path = resolve(...pathParts);
    if (existsSync(path)) return path;
  }
  throw new Error("Could not find icann-override.json");
};
export const fetchBuildSerializeTries = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const psl = yield fetchPsl();
    const icannOverridePath = findIcannOverridePath();
    const icannOverride = JSON.parse(
      readFileSync(icannOverridePath).toString()
    );
    const { icannTrie, privateTrie } = buildTries(psl, icannOverride);
    const serializedIcannTrie = serializeTrie(icannTrie);
    const serializedPrivateTrie = serializeTrie(privateTrie);
    return {
      serializedIcannTrie,
      serializedPrivateTrie,
    };
  });
//# sourceMappingURL=update-tries.js.map
