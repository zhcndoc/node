export default {
  extends: "@node-core/doc-kit/config",

  target: [
    "html",
    "legacy-json",
    "legacy-json-all",
    "orama-db",
    "llms-txt",
    "sitemap",
  ],

  global: {
    version: "v26.4.0",
    repository: "zhcndoc/node",
    ref: "main",
    baseURL: "https://node.zhcndoc.com",
    input: ["doc/api/*.md"],
    output: "out",
    changelog: "doc/changelogs/CHANGELOG_V26.md",
    index: "doc/api/index.md",
  },

  "jsx-ast": {
    generateIndexPage: false,
  },

  metadata: {
    typeMap: "doc/type-map.json",
  },

  sitemap: {
    indexURL: "{baseURL}/",
  },

  "llms-txt": {
    pageURL: "{baseURL}{path}.html",
  },

  html: {
    pageURL: "{baseURL}{path}.html",
    pathsToCopy: [{ "doc/api": "." }],
  },
};
