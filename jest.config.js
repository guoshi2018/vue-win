module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    "^target-vue\/(.+)$": "<rootDir>/tests/examples/target/vue/$1.vue",
    "^do-jest\/(.+)$": "<rootDir>/tests/examples/do/$1.ts",
  },
}
