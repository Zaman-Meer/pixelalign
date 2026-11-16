import { createRoot } from "react-dom/client"
import "material-icons/iconfont/material-icons.css"
import reportWebVitals from "./reportWebVitals"
import CreateRoutes from "@/routes"
import "focus-visible/dist/focus-visible"
import "./i18n/index"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container!)

root.render(<CreateRoutes />)

reportWebVitals()
