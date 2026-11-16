const path = require("path")
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware")
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware")
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware")
const paths = require("react-scripts/config/paths")

const resloveSrc = (...paths) => path.join(__dirname, "src", ...paths)

/**
 * CRA 5 ships a webpack-dev-server 4 config. We use webpack-dev-server 5 to
 * pick up the security fixes, so translate the removed WDS 4 options
 * (`https`, `onBeforeSetupMiddleware`, `onAfterSetupMiddleware`) to their
 * WDS 5 equivalents.
 *
 * If a `src/setupProxy.js` file is ever added, mount it from
 * `setupMiddlewares` here as well.
 */
function adaptDevServerForWds5(devServerConfig) {
  const { https, onBeforeSetupMiddleware, onAfterSetupMiddleware, ...rest } =
    devServerConfig

  const server = https
    ? {
        type: "https",
        options: typeof https === "object" ? https : {},
      }
    : "http"

  return {
    ...rest,
    server,
    setupMiddlewares: (middlewares, devServer) => {
      // Equivalent of CRA's onBeforeSetupMiddleware.
      middlewares.unshift({
        name: "eval-source-map",
        middleware: evalSourceMapMiddleware(devServer),
      })

      // Equivalent of CRA's onAfterSetupMiddleware.
      middlewares.push({
        name: "redirect-served-path",
        middleware: redirectServedPath(paths.publicUrlOrPath),
      })
      middlewares.push({
        name: "noop-service-worker",
        middleware: noopServiceWorkerMiddleware(paths.publicUrlOrPath),
      })

      return middlewares
    },
  }
}

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
  devServer: (devServerConfig) => adaptDevServerForWds5(devServerConfig),
}
