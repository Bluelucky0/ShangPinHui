module.exports = {
    //关闭eslint
    lintOnSave:false,
    //跨域代理   webpack.config.js文件就相当于vue.config.js文件
    devServer: {
        proxy: {
            //所有请求时看到路径里面有api时，代理服务器就会去向服务器要数据 配置完请重启！！
          '/api': {
            target: 'http://39.98.123.211',
            // pathRewrite: { '^/api': '' },
          },
        },
      },
}