const path = require("path")

const resloveSrc = (...paths) => path.join(__dirname, "src", ...paths)

module.exports = {
  webpack: {
    alias: {
      "@": resloveSrc(),
      "@assets": resloveSrc("assets"),
      "@constants": resloveSrc("constants"),
      "@components": resloveSrc("editorApp/components"),
      "@scenes": resloveSrc("scenes"),
      "@store": resloveSrc("store"),
      "@services": resloveSrc("services"),
      "@utils": resloveSrc("utils"),
      "@context": resloveSrc("context"),
      "@hooks": resloveSrc("hooks"),
      "@pages": resloveSrc("pages"),
      "@routes": resloveSrc("routes"),
      "@icons": resloveSrc("icons"),
      "@site-components": resloveSrc("site-components"),
      "@tools": resloveSrc("editorApp/tools"),
      "@types": resloveSrc("src/types"),
    },
  },
}
