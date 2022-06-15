const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@state": path.join(path.resolve(__dirname, "./src/state")),
      "@assets": path.join(path.resolve(__dirname, "./src/assets")),
      "@components": path.join(path.resolve(__dirname, "./src/components")),
      "@pages": path.join(path.resolve(__dirname, "./src/pages")),
      "@utils": path.join(path.resolve(__dirname, "./src/utils")),
      "@routes": path.join(path.resolve(__dirname, "./src/routes")),
      "@modules": path.join(path.resolve(__dirname, "./src/modules")),
      "@permissions": path.join(path.resolve(__dirname, "./src/permissions")),
      "@hooks": path.join(path.resolve(__dirname, "./src/hooks")),
      "@apiUrl": path.join(path.resolve(__dirname, "./src/api-url")),
    },
  },
};
