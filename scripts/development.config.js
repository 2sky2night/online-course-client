export default {
  outDir: "dist",
  title: "react app", // 网页标题
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3000/api",
      },
    },
  },
};
