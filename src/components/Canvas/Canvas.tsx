import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useCanvasContext } from "./hooks"
import { Scrollbars } from "react-custom-scrollbars"
import ResizeObserver from "resize-observer-polyfill"
import styled from "@emotion/styled"
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

const Container = styled.div`
  display: flex;
  flex: 1;
`

function Canvas() {
  const { setCanvas, setAreaDimension, canvas } = useCanvasContext()
  const { updateCanvasSize } = useCoreHandler()
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
    setCanvas(canvas)
    const initialHeight = containerRef.current?.clientHeight
    const initialWidth = containerRef.current?.clientWidth
    setAreaDimension({ width: initialWidth! - 32, height: initialHeight! - 32 })
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const { width = initialWidth, height = initialHeight } =
          (entries[0] && entries[0].contentRect) || {}

        updateCanvasSize({ nextWidth: width, nextHeight: height, canvas })
        // setAreaDimension({ width: width! - 32, height: height! - 32 })
      }
    )
    resizeObserver.observe(containerRef.current!)
    return () => {
      resizeObserver.unobserve(containerRef.current!)
    }
  }, [])

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
      id="xdsakcasncasncjxx"
      onContextMenu={(e) => e.preventDefault()}
      ref={containerRef}
      style={{ position: "relative", flex: 1, backgroundColor: "pink" }}
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
