module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: "@styles/variables.scss"
      }
    }
  }
};
