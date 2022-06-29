import React, { createContext, useCallback, useEffect } from "react"
import { fabric } from "fabric"
import { v4 as uuidv4 } from "uuid"
import { PageType } from "@/types/template"
import { useCanvasContext } from "@/components/Canvas/hooks"
import propertiesToInclude from "@/constants/workspace"
interface ContextType {
  saveTemplate: () => void
  loadTemplate: () => void
  getTemplates: (category: string) => void
  addWorkspace: (width: number, height: number) => void
  generateThumbnail: () => void
  convertCanvasToPage: () => void
}

export const TemplateContext = createContext<ContextType>({
  saveTemplate: () => {},
  loadTemplate: () => {},
  getTemplates: () => {},
  addWorkspace: () => {},
  generateThumbnail: () => {},
  convertCanvasToPage: () => {},
})

const TemplateProvider: React.FC = ({ children }) => {
  const { canvas, activePageId, pages, setPages, setActivePageId } =
    useCanvasContext()

  const convertCanvasToPage = () => {
    const jsonData = canvas?.toJSON(propertiesToInclude)
    return jsonData
  }

  const handleAddPages = useCallback(() => {
    const staticCanvas = new fabric.StaticCanvas("staticCanvas1")
    staticCanvas.setDimensions({
      width: 900,
      height: 600,
    })
    const defaultWorkArea = new fabric.Rect({
      //@ts-ignore
      id: "workarea",
      width: 900,
      height: 600,
      absolutePositioned: true,
      fill: "#ffffff",
      selectable: false,
      hoverCursor: "default",
    })
    staticCanvas?.add(defaultWorkArea)
    defaultWorkArea.center()
    const newPage: PageType = {
      id: uuidv4(),
      size: {
        width: 940,
        height: 788,
      },
      content: staticCanvas?.toJSON(propertiesToInclude),
    }
    console.log("default", staticCanvas?.toJSON(propertiesToInclude))
    setPages([newPage])
    setActivePageId(newPage?.id)
  }, [canvas])
  useEffect(() => {
    handleAddPages()
  }, [])

  const addWorkspace = (width: number, height: number) => {
    canvas?.clear()
    // const workspace = new fabric.Rect({
    //   //@ts-ignore
    //   id: "workarea",
    //   width: width,
    //   height: height,
    //   fill: "#ffffff",
    //   selectable: false,
    //   hoverCursor: "default",
    // })
    // canvas?.add(workspace)
    // workspace.center()
    canvas?.requestRenderAll()
  }
  const generateThumbnail = (): string | undefined => {
    // const activePageData = pages?.filter((page) => page.id === activePageId)
    // const staticCanvas = new fabric.StaticCanvas("staticCanvas")
    // staticCanvas.setDimensions({
    //   width: 900,
    //   height: 600,
    // })
    // staticCanvas?.loadFromJSON(activePageData?.[0]?.content, () => {
    //   const image = staticCanvas?.toDataURL({
    //     format: "png",
    //     quality: 1,
    //   })
    const activeObject = canvas
      ?.getObjects()
      //@ts-ignore
      ?.find((obj) => obj?.id === "workarea")

    const dataImage = canvas?.toDataURL({
      format: "png",
      top: activeObject?.top,
      left: activeObject?.left,
      width: activeObject?.width,
      height: activeObject?.height,
    })
    console.log(dataImage)
    return dataImage
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
        generateThumbnail,
        convertCanvasToPage,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}

export default TemplateProvider
