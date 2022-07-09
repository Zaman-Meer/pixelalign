import { FC, createContext, useState } from "react"
import { PageType } from "@/types/template"
interface FabricObject extends fabric.Object {
  groupType?: string
  _objects?: fabric.Object[]
}

export const defaultGrid = {
  size: 60,
  enabled: true,
  color: "#e2e2e2",
  name: "bgGrid",
  snap: true,
}

interface Grid {
  size: number
  enabled: boolean
  color: string
  name: string
  snap: boolean
}

interface ICanvasContext {
  zoomRatio: number
  setZoomRatio: (value: number) => void
  zoomFitRatio: number
  setZoomFitRatio: React.Dispatch<React.SetStateAction<number>>
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: FabricObject | null
  setActiveObject: (object: FabricObject | null) => void
  formatSize: FormatSize
  setFormatSize: (option: FormatSize) => void
  areaDimension: AreaDimension
  setAreaDimension: (option: AreaDimension) => void
  contextMenu: ContextMenu
  setContextMenu: (option: ContextMenu) => void
  clipBoards: fabric.Object[]
  setClipBoards: (options: fabric.Object[]) => void
  grid: Grid
  setGrid: (option: Grid) => void

  //zoomRatio: number
  //setZoomRatio: (value: number) => void
  // canvas: fabric.Canvas | null
  // setCanvas: (canvas: fabric.Canvas) => void
  //activeObject: fabric.Object | null
  //setActiveObject: (object: fabric.Object | null) => void
  workArea: fabric.Rect | null
  setWorkArea: (workArea: fabric.Rect) => void
  nonSelectableObjects: fabric.Object[]
  setNonSelectableObjects: (objects: fabric.Object[] | []) => void
  removeActiveObject: (object?: fabric.Object) => void
  removeSelectedObjects: () => void
  togglePagesPanel: () => void
  isPagesPanelOpen: boolean
  isSidePanelOpen: boolean
  toggleSidePanel: (open: boolean) => void
  activePageId: string | null
  setActivePageId: (id: string) => void
  pages: PageType[]
  setPages: (pages: PageType[]) => void
  addPage: (page: PageType, oldPage?: any) => void
  removePage: (page: PageType) => void
  togglePage: (page: PageType) => void
  setFormatType: (type: string) => void
  formatType: string | null
  setCanvasContainerDem : (width: number, height: number) => void
  canvasContainer: { width: number, height: number }
}

type ContextMenuType = "canvas" | "object"
export interface ContextMenu {
  type: ContextMenuType
  visible: boolean
  top: number
  left: number
}
interface Dimension {
  width: number
  height: number
}
export type FormatSize = Dimension
export type AreaDimension = Dimension

export const CanvasContext = createContext<ICanvasContext>({
  zoomRatio: 1,
  setZoomRatio: () => {},
  zoomFitRatio: 1,
  setZoomFitRatio: () => {},
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  formatSize: { width: 0, height: 0 },
  setFormatSize: () => {},
  areaDimension: { width: 0, height: 0 },
  setAreaDimension: () => {},
  contextMenu: { top: 0, left: 0, visible: false, type: "canvas" },
  setContextMenu: () => {},
  clipBoards: [],
  setClipBoards: () => {},
  grid: defaultGrid,
  setGrid: () => {},
  workArea: null,
  setWorkArea: () => {},
  nonSelectableObjects: [] as fabric.Object[],
  setNonSelectableObjects: () => {},
  removeActiveObject: () => {},
  removeSelectedObjects: () => {},
  togglePagesPanel: () => {},
  isPagesPanelOpen: false,
  isSidePanelOpen: false,
  toggleSidePanel: () => {},
  activePageId: null,
  setActivePageId: () => {},
  pages: [],
  setPages: () => {},
  addPage: () => {},
  removePage: () => {},
  togglePage: () => {},
  setFormatType: () => {},
  formatType: null,
  setCanvasContainerDem: () => {},
  canvasContainer: { width: 0, height: 0 },
})

export const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [zoomFitRatio, setZoomFitRatio] = useState(1)
  const [nonSelectableObjects, setNonSelectableObjects] = useState<
    fabric.Object[] | []
  >([])
  const [workArea, setWorkArea] = useState<fabric.Object | null>(null)
  const [clipBoards, setClipBoards] = useState<fabric.Object[]>([])
  const [grid, setGrid] = useState(defaultGrid)
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    top: 0,
    left: 0,
    visible: false,
    type: "canvas",
  })
  const [formatSize, setFormatSize] = useState<FormatSize>({
    height: 400,
    width: 600,
  })
  const [areaDimension, setAreaDimension] = useState<AreaDimension>({
    height: 400,
    width: 600,
  })
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)
  const [isPagesPanelOpen, setPagesPanelOpen] = useState(true)
  const [pages, setPages] = useState<PageType[]>([])
  const [activePageId, setActivePageId] = useState<string | null>(null)
  const [formatType, setFormatType] = useState<string | null>(null)
  const [canvasContainer, setCanvasContainer] = useState({
    width: 0,
    height: 0,
  })
const setCanvasContainerDem =(width: number, height: number) => {
  setCanvasContainer({width, height})
}

  const toggleSidePanel = (open: boolean) => setIsSidePanelOpen(open)
  const togglePagesPanel = () => setPagesPanelOpen(!isPagesPanelOpen)


  const addPage = (newPage: any, oldPage?: any) => {
    // if (oldPage?.id) {
    //   const index = pages.findIndex((page) => page.id === oldPage.id)
    //   const newPages = [...pages]
    //   newPages[index] = oldPage
    //   setPages(
    //     Array.from(
    //       new Set([
    //         ...newPages,
    //         {
    //           id: newPage.id,
    //           name: `Page ${pages?.length + 1}`,
    //           jsonData: newPage.json,
    //         },
    //       ])
    //     )
    //   )
    // } else {
    //   setPages(Array.from(new Set([...pages, newPage])))
    // }
    // setActivePageId(newPage)
    // canvas?.loadFromJSON(newPage.json, canvas.renderAll.bind(canvas), () => {})
  }

  const removePage = (page: any) => {
    setPages(pages.filter((p) => p.id !== page.id))
  }

  const togglePage = (page: any) => {
    // canvas?.loadFromJSON(page.json, canvas.renderAll.bind(canvas), () => {})
    // const canvasObjects: any = canvas?.toJSON()
    // console.log("TTT", canvasObjects)
    // const canvasPage: any = canvasObjects?.objects?.filter(
    //   (object: any) => object.type === "rect"
    // )
    // // const oldCanvasObjects = canvasObjects?.objects?.filter(object => object.type !== 'rect');
    // canvasPage[0].selectable = false
    // canvasPage[0].absolutePositioned = true
    // canvasPage[0].hoverCursor = false
    // const oldPages = pages?.filter((p) => p.id !== activePageId)
    // setPages([
    //   ...oldPages,
    //   {
    //     id: activePageId,
    //     json: { objects: canvasObjects?.objects },
    //   },
    // ])
    // setActivePageId(page)
  }

  const removeActiveObject = (object?: fabric.Object) => {
    if (canvas) {
      if (object && activeObject) canvas.remove(activeObject)
      else activeObject && canvas.remove(activeObject)
      activeObject && setActiveObject(null)
    }
  }
  const removeSelectedObjects = () => {
    if (canvas) {
      const activeObjects = canvas?.getActiveObjects()
      if (activeObjects) {
        canvas?.discardActiveObject()
        activeObjects.forEach((object) => {
          canvas?.remove(object)
        })
      }
    }
  }

  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    setZoomRatio,
    zoomFitRatio,
    setZoomFitRatio,
    formatSize,
    setFormatSize,
    areaDimension,
    setAreaDimension,
    contextMenu,
    setContextMenu,
    clipBoards,
    setClipBoards,
    grid,
    setGrid,
    removeActiveObject,
    removeSelectedObjects,
    nonSelectableObjects,
    setNonSelectableObjects,
    workArea,
    setWorkArea,
    isPagesPanelOpen,
    togglePagesPanel,
    isSidePanelOpen,
    toggleSidePanel,
    pages,
    setPages,
    addPage,
    removePage,
    activePageId,
    setActivePageId,
    togglePage,
    setFormatType,
    formatType,
    setCanvasContainerDem,
    canvasContainer
  }

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  )
}
