import { fetchPsl } from "./psl/fetch-psl";
import { buildTries } from "./psl/build-tries";
import { serializeTrie } from "./trie/serialize-trie";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const findIcannOverridePath = (): string => {
  for(let i=1; i<4; i++) {
    const upPaths = new Array(i).fill(1).map(x => '..');
    const pathParts = [__dirname, ...upPaths, 'data', 'icann-override.json'];
    const path = resolve(...pathParts);
    if (existsSync(path))
      return path;
  }
  throw new Error('Could not find icann-override.json');
}

export const fetchBuildSerializeTries = async () => {
  const psl = await fetchPsl();

  const icannOverridePath = findIcannOverridePath();
  const icannOverride = JSON.parse(readFileSync(icannOverridePath).toString());

  const { icannTrie, privateTrie } = buildTries(psl, icannOverride);
  const serializedIcannTrie = serializeTrie(icannTrie);
  const serializedPrivateTrie = serializeTrie(privateTrie);

  return {
    serializedIcannTrie,
    serializedPrivateTrie,
  };
};
