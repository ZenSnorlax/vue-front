module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "warn", // 将错误级别调低为警告
    "@typescript-eslint/no-unused-vars": [
      "warn", // 调低为警告
      { argsIgnorePattern: "^_" }, // 忽略下划线开头的参数
    ],
    "no-redeclare": "warn", // 禁止变量重新声明，调低为警告
    "no-undef": "warn", // 禁止未定义变量的使用，调低为警告
  },
};
