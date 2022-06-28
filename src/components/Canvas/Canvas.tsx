import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "./hooks"
import ResizeObserver from "resize-observer-polyfill"
import { v4 as uuidv4 } from "uuid"
import {
  useCoreHandler,
  useCustomizationHandler,
  useEventsHandler,
  useGridHandler,
  useGuidelinesHandler,
  useZoomHandler,
} from "./handlers"
import ContextMenu from "@components/ContextMenu/ContextMenu"
import "fabric-history"

function Canvas() {
  const { setCanvas, setAreaDimension, canvas, pages, activePageId } =
    useCanvasContext()
  const { updateCanvasSize, updateWorkAreaZoom } = useCoreHandler()
  const containerRef = useRef<any>(null)
  useCustomizationHandler()
  useEventsHandler()
  useZoomHandler()
  useGuidelinesHandler()
  // useGridHandler()
  // useEffect(() => {
  //   setCanvas(
  //     new fabric.Canvas("canvas", {
  //       height: containerRef.current?.clientHeight,
  //       width: containerRef.current?.clientWidth,
  //       backgroundColor: "#dbd0d0",
  //       // fireRightClick: true,
  //     })
  //   )
  // }, [setCanvas])

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: containerRef.current?.clientHeight,
      width: containerRef.current?.clientWidth,
      backgroundColor: "#E1E3E9",
      fireRightClick: true,
    })
    const defaultWorkArea = new fabric.Rect({
      //@ts-ignore
      id: "workarea",
      width: 600,
      height: 600,
      absolutePositioned: true,
      fill: "#ffffff",
      selectable: false,
      hoverCursor: "default",
    })
    canvas?.add(defaultWorkArea)
    defaultWorkArea.center()
    setCanvas(canvas)
    const initialHeight = containerRef.current?.clientHeight
    const initialWidth = containerRef.current?.clientWidth
    updateWorkAreaZoom({ width: initialWidth, height: initialHeight, canvas })
    setAreaDimension({ width: initialWidth! - 32, height: initialHeight! - 32 })

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { width = initialWidth, height = initialHeight } =
          (entries[0] && entries[0].contentRect) || {}

        updateCanvasSize({ nextWidth: width, nextHeight: height, canvas })
        updateWorkAreaZoom({ width, height, canvas })
        // setAreaDimension({ width: width! - 32, height: height! - 32 })
      }
    )
    resizeObserver.observe(containerRef?.current!)
    return () => {
      containerRef?.current && resizeObserver.unobserve(containerRef?.current!)
    }
  }, [])

  useEffect(() => {
    if (pages.length > 0) {
      const pageData = pages?.filter((page) => page.id === activePageId)[0]
      const defaultWorkArea =
        pageData?.content &&
        //@ts-ignore
        pageData.content?.objects?.filter(
          (item: any) => item.id === "workarea"
        )[0]
      console.log("Work", defaultWorkArea)
      // canvas?.add(defaultWorkArea)
      // defaultWorkArea?.center()
      canvas?.loadFromJSON(pageData?.content, () => {})
      const initialHeight = containerRef.current?.clientHeight
      const initialWidth = containerRef.current?.clientWidth
      canvas &&
        updateWorkAreaZoom({
          width: initialWidth,
          height: initialHeight,
          canvas,
        })
      setAreaDimension({
        width: initialWidth! - 32,
        height: initialHeight! - 32,
      })
    }
  }, [activePageId])

  useEffect(() => {
    containerRef.current.addEventListener("mousedown", (e: any) => {
      if (e.target.localName === "div") {
        if (canvas) {
          canvas.discardActiveObject().renderAll()
        }
      }
    })
  }, [canvas])

  return (
    <div
      id="editor-container"
      onContextMenu={(e) => e.preventDefault()}
      ref={containerRef}
      style={{ position: "relative", flex: 1 }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}

export default Canvas
