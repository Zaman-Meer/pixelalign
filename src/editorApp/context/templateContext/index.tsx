import React, { createContext, useCallback, useEffect } from "react"
import { fabric } from "fabric"
import { v4 as uuidv4 } from "uuid"
import { PageType } from "@/types/template"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import propertiesToInclude from "@/constants/workspace"

import { cloneDeep } from "lodash"
interface ContextType {
  saveTemplate: () => void
  loadTemplate: () => void
  getTemplates: (category: string) => void
  addWorkspace: (width: number, height: number) => void
  handleAddNewPage: () => void
  handleTogglePage: (pageId: string) => void
  generateThumbnail: () => void
  convertCanvasToPage: () => void
  handleAddInitialPages: () => void
  handleAddBlankTemplatePage: (
    width: number,
    height: number,
    format: string
  ) => void
}

export const TemplateContext = createContext<ContextType>({
  saveTemplate: () => {},
  loadTemplate: () => {},
  getTemplates: () => {},
  addWorkspace: () => {},
  handleAddNewPage: () => {},
  handleTogglePage: () => {},
  generateThumbnail: () => {},
  convertCanvasToPage: () => {},
  handleAddInitialPages: () => {},
  handleAddBlankTemplatePage: () => {},
})

const TemplateProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    canvas,
    setCanvas,
    isLoading,
    setIsLoading,
    setFormatType,
    setFormatSize,
    canvasContainer,
    activePageId,
    pages,
    setPages,
    setActivePageId,
  } = useCanvasContext()

  const convertCanvasToPage = () => {
    const jsonData = canvas?.toJSON(propertiesToInclude)
    return jsonData
  }

  const saveCurrentPage = useCallback(() => {
    const activePageData = pages?.filter((page) => page.id === activePageId)[0]
    //@ts-ignore
    const modifiedPage: PageType = {
      ...activePageData,
      //@ts-ignore
      content: canvas?.toJSON(propertiesToInclude),
    }
    const activePageIndex = pages?.findIndex((page) => page.id === activePageId)
    const newPages = [...pages]
    newPages[activePageIndex] = modifiedPage
    setPages(newPages)
    console.log("Updated")
  }, [])

  const handleAddInitialPages = useCallback(() => {
    const staticCanvas = new fabric.StaticCanvas("staticCanvas1")
    staticCanvas.setDimensions({
      width: 940,
      height: 788,
    })
    const defaultWorkArea = new fabric.Rect({
      //@ts-ignore
      id: "workarea",
      width: 940,
      height: 788,
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
    setPages([newPage])
    setActivePageId(newPage?.id)
  }, [canvas])

  // useEffect(() => {
  //   handleAddInitialPages()
  // }, [])

  // Add a blank template page to the canvas
  const handleAddBlankTemplatePage = (
    width: number,
    height: number,
    format: string
  ) => {
    const staticCanvas = new fabric.StaticCanvas("staticCanvas1")
    staticCanvas.setDimensions({
      width: 900,
      height: 600,
    })
    const defaultWorkArea = new fabric.Rect({
      //@ts-ignore
      id: "workarea",
      width,
      height,
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
        width,
        height,
      },
      content: staticCanvas?.toJSON(propertiesToInclude),
    }
    setFormatType(format)
    setFormatSize({ width, height })
    setPages([newPage])
    setActivePageId(newPage?.id)
  }

  // add new page
  const handleAddNewPage = () => {
    setIsLoading(true)
    const activePageData = pages?.filter((page) => page.id === activePageId)[0]
    //@ts-ignore
    const modifiedPage: PageType = {
      ...activePageData,
      //@ts-ignore
      content: canvas?.toJSON(propertiesToInclude),
    }
    const activePageIndex = pages?.findIndex((page) => page.id === activePageId)
    const newPages = cloneDeep(pages)
    newPages[activePageIndex] = modifiedPage
    const newPage: PageType = {
      id: uuidv4(),
      size: {
        //@ts-ignore
        width: activePageData?.size?.width,
        //@ts-ignore
        height: activePageData?.size?.height,
      },
      //@ts-ignore
      content: {
        //@ts-ignore
        ...canvas?.toJSON(propertiesToInclude),
        //@ts-ignore
        objects: [canvas?.toJSON(propertiesToInclude)?.objects[0]],
      },
    }

    canvas?.clear()
    setPages([...newPages, newPage])

    setActivePageId(newPage?.id)
    setIsLoading(false)
  }

  const handleTogglePage = (pageId: string) => {
    if (activePageId !== pageId) {
      const activePageData = pages?.filter(
        (page) => page.id === activePageId
      )[0]
      //@ts-ignore
      const modifiedPage: PageType = {
        ...activePageData,
        //@ts-ignore
        content: canvas?.toJSON(propertiesToInclude),
      }
      const activePageIndex = pages?.findIndex(
        (page) => page.id === activePageId
      )
      const newPages = [...pages]
      newPages[activePageIndex] = modifiedPage
      setPages(newPages)
      setActivePageId(pageId)
    }
  }

  const addWorkspace = (width: number, height: number) => {
    const staticCanvas = new fabric.StaticCanvas("staticCanvas1")
    staticCanvas.setDimensions({
      width: 900,
      height: 600,
    })
    const workArea = new fabric.Rect({
      //@ts-ignore
      id: "workarea",
      width: width,
      height: height,
      absolutePositioned: true,
      fill: "#ffffff",
      selectable: false,
      hoverCursor: "default",
    })
    staticCanvas?.add(workArea)
    workArea.center()
    canvas?.clear()
    canvas?.requestRenderAll()
    canvas?.loadFromJSON(staticCanvas?.toJSON(propertiesToInclude), () => {})
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
    // console.log(dataImage)
    return dataImage
  }

  useEffect(() => {
    // canvas?.on("object:added", saveCurrentPage)
    // canvas?.on("object:modified",  saveCurrentPage)
    // canvas?.on("object:rotating", saveCurrentPage)
    // canvas?.on("object:scaling", saveCurrentPage)
    // canvas?.on("object:moving", saveCurrentPage)
    // canvas?.on("object:resizing", saveCurrentPage)
    // canvas?.on("object:skewing", saveCurrentPage)
    // canvas?.on("selection:updated", saveCurrentPage)
    // canvas?.on("path:created", saveCurrentPage)
    // canvas?.on("event:drop", saveCurrentPage)
    // canvas?.on("event:dragover", saveCurrentPage)
  }, [canvas, saveCurrentPage])

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
        handleAddNewPage,
        handleTogglePage,
        generateThumbnail,
        convertCanvasToPage,
        handleAddInitialPages,
        handleAddBlankTemplatePage,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}

export default TemplateProvider
