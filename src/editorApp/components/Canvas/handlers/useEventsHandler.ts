import { useCallback, useEffect } from "react"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import { isArrow, isCtrlShiftZ, isCtrlZ } from "../utils/keyboard"
import { fabric } from "fabric"
function useEventHandlers() {
  const {
    canvas,
    setActiveObject,
    activeObject,
    setZoomRatio,
    contextMenu,
    setContextMenu,
    setClipBoards,
    setClickedObject,
    setSettingPanel,
    setOpenSettingPanelType,
  } = useCanvasContext()

  /**
   * Canvas Mouse wheel handler
   */

  const onMouseDown = useCallback(
    (e: any) => {
      if (e.button === 3 && e.target) {
        if (e.target._objects) {
          setClipBoards(e.target._objects)
        } else {
          setClipBoards([e.target])
        }
        // @ts-ignore
        setContextMenu({
          ...contextMenu,
          visible: true,
          left: e.e.offsetX,
          top: e.e.offsetY,
        })
      } else {
        setContextMenu({ ...contextMenu, visible: false })
      }
    },
    [canvas, contextMenu]
  )

  useEffect(() => {
    if (canvas) {
      canvas.on("mouse:down", onMouseDown)
    }
    return () => {
      if (canvas) {
        canvas.off("mouse:down", onMouseDown)
      }
    }
  }, [canvas, contextMenu])

  /**
   * Canvas Mouse wheel handler
   */

  const onMouseWheel = useCallback(
    (event: fabric.IEvent<WheelEvent>) => {
      if (canvas && event.e.ctrlKey) {
        const delta = event.e.deltaY
        let zoomRatio = canvas.getZoom()
        if (delta > 0) {
          zoomRatio -= 0.04
        } else {
          zoomRatio += 0.04
        }
        //zoomRatio *= 0.99 ** delta;
        if (zoomRatio > 3) zoomRatio = 20
        if (zoomRatio < 0.01) zoomRatio = 0.01
        //@ts-ignore
        canvas.zoomToPoint(
          new fabric.Point(event.e.offsetX, event.e.offsetY),
          parseFloat(zoomRatio.toFixed(2))
        )
        setZoomRatio(zoomRatio)
        event.e.preventDefault()
        event.e.stopPropagation()
      } else {
        if (canvas) {
          var e = event.e
          var vpt = canvas.viewportTransform
          //@ts-ignore
          vpt[4] -= e.deltaX
          //@ts-ignore
          vpt[5] -= e.deltaY

          canvas?.requestRenderAll()
          event.e.preventDefault()
          event.e.stopPropagation()
        }
      }
    },
    [canvas]
  )

  useEffect(() => {
    if (canvas) {
      canvas.on("mouse:wheel", onMouseWheel)
    }
    return () => {
      if (canvas) {
        canvas.off("mouse:wheel", onMouseWheel as any)
      }
    }
  }, [canvas])

  /**
   * Canvas selection handlers
   */

  const onSelect = useCallback(
    (event: fabric.IEvent) => {
      const selected = event.selected
      if (selected) {
        if (canvas) {
          setActiveObject(canvas.getActiveObject())
          if (
            canvas?.getActiveObject()?.type !== "activeSelection" &&
            canvas?.getActiveObject()?.type !== "group"
          ) {
            setSettingPanel(canvas?.getActiveObject()?.type as string)
          }
        }
      } else {
        setActiveObject(null)
        setSettingPanel(null)
        setOpenSettingPanelType(null)
      }
    },
    [canvas]
  )

  /**
   * Canvas object clicked
   */

  const onObjectClicked = useCallback(
    (event: fabric.IEvent) => {
      const target = event.target as any
      if (target?.objectId) {
        if (canvas) {
          setClickedObject(target)
        }
      } else {
        //setActiveObject(null)
        setClickedObject(null)
      }
    },
    [canvas]
  )

  useEffect(() => {
    canvas?.on("mouse:down", onObjectClicked)
    canvas?.on("selection:created", onSelect)
    canvas?.on("selection:cleared", onSelect)
    canvas?.on("selection:updated", onSelect)

    return () => {
      if (canvas) {
        canvas.off("selection:cleared", onSelect)
        canvas.off("selection:created", onSelect)
        canvas.off("selection:updated", onSelect)
      }
    }
  }, [canvas])

  /**
   * Keyboard Events Handler
   */

  const undo = useCallback(() => {
    //@ts-ignore
    console.log("History", canvas?.historyUndo)
    // @ts-ignore
    canvas?.undo()
  }, [canvas])

  const redo = useCallback(() => {
    // @ts-ignore
    canvas?.redo()
  }, [canvas])

  const moveUp = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top! - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveDown = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.top = activeObject.top! + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveRight = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left! + 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const moveLeft = useCallback(() => {
    if (activeObject && canvas) {
      activeObject.left = activeObject.left! - 2
      activeObject.setCoords()
      canvas.requestRenderAll()
    }
  }, [activeObject, canvas])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      isCtrlZ(e) && undo()
      isCtrlShiftZ(e) && redo()
      if (isArrow(e)) {
        e.code === "ArrowLeft" && moveLeft()
        e.code === "ArrowRight" && moveRight()
        e.code === "ArrowDown" && moveDown()
        e.code === "ArrowUp" && moveUp()
      }
    },
    [canvas, activeObject]
  )
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [canvas, activeObject])
}

export default useEventHandlers
