export default {
  global: {
    version: "v26.4.0",
    minify: true,
    repository: "zhcndoc/node",
    ref: "main",
    baseURL: "https://node.zhcndoc.com",
    input: ["doc/api/*.md"],
    output: "out",
    ignore: [],
    changelog: "doc/changelogs/CHANGELOG_V26.md",
    index: "doc/api/index.md",
  },

  target: [
    "addon-verify",
    "json-simple",
    "llms-txt",
    "man-page",
    "orama-db",
    "sitemap",
    "web",
  ],

  "jsx-ast": {
    generateIndexPage: false,
  },

  metadata: {
    typeMap: "doc/type-map.json",
  },

  sitemap: {
    indexURL: "{baseURL}/",
    pageURL: "{baseURL}{path}.html",
  },

  "llms-txt": {
    pageURL: "{baseURL}{path}.html",
  },

  web: {
    pageURL: "{baseURL}{path}.html",
    pathsToCopy: [{ "doc/api": "." }],
  },

  threads: 4,
  chunkSize: 8,
};
