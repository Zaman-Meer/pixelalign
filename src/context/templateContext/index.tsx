import React, { createContext } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "@/components/Canvas/hooks"
interface ContextType {
  saveTemplate: () => void
  loadTemplate: () => void
  getTemplates: (category: string) => void
  addWorkspace: (width: number, height: number) => void
}

export const TemplateContext = createContext<ContextType>({
  saveTemplate: () => {},
  loadTemplate: () => {},
  getTemplates: () => {},
  addWorkspace: () => {},
})

const TemplateProvider: React.FC = ({ children }) => {
  const { canvas, activePageId, pages } = useCanvasContext()

  const addWorkspace = (width: number, height: number) => {
    canvas?.clear()
    const workspace = new fabric.Rect({
      //@ts-ignore
      id: "workspace",
      width: width,
      height: height,
      fill: "#ffffff",
      selectable: false,
      hoverCursor: "default",
    })
    canvas?.add(workspace)
    workspace.center()
  }
  const generateThumnail = () => {
    const staticCanvas = new fabric.StaticCanvas("staticCanvas")
    staticCanvas.setDimensions({
      width: 900,
      height: 600,
    })
  }
  const saveTemplate = () => {}
  const loadTemplate = () => {}
  const getTemplates = (category: string) => {}
  return (
    <TemplateContext.Provider
      value={{
        saveTemplate,
        loadTemplate,
        getTemplates,
        addWorkspace,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}

export default TemplateProvider
