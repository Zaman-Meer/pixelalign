import ReactDOM from "react-dom"
import "material-icons/iconfont/material-icons.css"
import reportWebVitals from "./reportWebVitals"
import CreateRoutes from "@/routes"
import "focus-visible/dist/focus-visible"
import "./i18n/index"
import "./index.css"

ReactDOM.render(<CreateRoutes />, document.getElementById("root"))

reportWebVitals()
