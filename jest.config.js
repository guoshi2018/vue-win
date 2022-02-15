module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    "^do-jest\/(.+)$": "<rootDir>/tests/examples/do/$1.ts",

    "^target-vue\/(.+)$": "<rootDir>/tests/examples/target/vue/$1.vue",
    "^target-ts\/(.+)$": "<rootDir>/tests/examples/target/ts/$1.ts",
  },
}
