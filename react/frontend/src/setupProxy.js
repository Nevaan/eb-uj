const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:9000',
          changeOrigin: true,
          pathRewrite: (path) => {
              var newPath=  path.replace("/api", "")
              console.log("proxying::", path, " => ", newPath);

              return newPath;
          } 
        })
      );
};