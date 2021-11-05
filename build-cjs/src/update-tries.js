"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBuildSerializeTries = void 0;
const fetch_psl_1 = require("./psl/fetch-psl");
const build_tries_1 = require("./psl/build-tries");
const serialize_trie_1 = require("./trie/serialize-trie");
const fs_1 = require("fs");
const path_1 = require("path");
const findIcannOverridePath = () => {
    for (let i = 1; i < 4; i++) {
        const upPaths = new Array(i).fill(1).map(x => '..');
        const pathParts = [__dirname, ...upPaths, 'data', 'icann-override.json'];
        const path = (0, path_1.resolve)(...pathParts);
        if ((0, fs_1.existsSync)(path))
            return path;
    }
    throw new Error('Could not find icann-override.json');
};
const fetchBuildSerializeTries = () => __awaiter(void 0, void 0, void 0, function* () {
    const psl = yield (0, fetch_psl_1.fetchPsl)();
    const icannOverridePath = findIcannOverridePath();
    const icannOverride = JSON.parse((0, fs_1.readFileSync)(icannOverridePath).toString());
    const { icannTrie, privateTrie } = (0, build_tries_1.buildTries)(psl, icannOverride);
    const serializedIcannTrie = (0, serialize_trie_1.serializeTrie)(icannTrie);
    const serializedPrivateTrie = (0, serialize_trie_1.serializeTrie)(privateTrie);
    return {
        serializedIcannTrie,
        serializedPrivateTrie,
    };
});
exports.fetchBuildSerializeTries = fetchBuildSerializeTries;
//# sourceMappingURL=update-tries.js.map