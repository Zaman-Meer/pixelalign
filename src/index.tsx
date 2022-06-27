import ReactDOM from "react-dom"
import "material-icons/iconfont/material-icons.css"
import reportWebVitals from "./reportWebVitals"
import Editor from "@components/Editor"
import { ChakraProvider } from "@chakra-ui/react"
import { CanvasProvider } from "@components/Canvas"

import "focus-visible/dist/focus-visible"
import "./i18n/index"
import "./index.css"
import TemplateProvider from "@context/templateContext"

ReactDOM.render(
  <CanvasProvider>
    <TemplateProvider>
      <ChakraProvider>
        <Editor />
      </ChakraProvider>
    </TemplateProvider>
  </CanvasProvider>,
  document.getElementById("root")
)

reportWebVitals()
