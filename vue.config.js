const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
// 配置端口
module.exports = defineConfig({
  devServer: {
    port: 3000,
  },
});
