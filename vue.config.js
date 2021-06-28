module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局注入 相当于sass-resource-loader
        prependData: `
        @use "@/assets/scss/variable.scss" as *;
        @use "@/assets/scss/mixin.scss" as *;
        `,
      },
    },
  },
  devServer: {
    port: 8485,
    hot: true,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/v1/upload': {
        target: 'http://upload.yellow.boochat.cn',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/v1': {
        // target: 'http://192.168.7.224:8089',
        target: 'http://lemon-chat.boochat.cn/',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
};
