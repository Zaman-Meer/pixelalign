import { useCallback, useEffect } from "react"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import { loadImageFromURL } from "@/editorApp/components/Canvas/utils/canvas"
import { FormatSize } from "@/editorApp/components/Canvas/CanvasContext"
import CanvasObjects, {
  CanvasObjectType,
} from "@/editorApp/components/Canvas/CanvasObjects"
import { fabric } from "fabric"

interface WorkAreaZoomProps {
  width: number
  height: number
  canvas?: any
}

function useCoreHandler() {
  const {
    canvas,
    activeObject,
    setActiveObject,
    setFormatSize,
    areaDimension,
    clipBoards,
    setZoomRatio,
  } = useCanvasContext()

  // Get object properties
  const getProperty = useCallback(
    (property) => {
      if (activeObject) {
        return activeObject?.get(property)
      }
    },
    [activeObject, canvas]
  )

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas?.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  // Update object layer in canvas
  type layer = "sendToBack" | "sendBackwards" | "bringToFront" | "bringForward"
  const setLayer = useCallback(
    (layer: layer) => {
      if (activeObject && canvas) {
        if (layer === "bringToFront") {
          canvas.bringToFront(activeObject)
        } else if (layer === "bringForward") {
          canvas.bringForward(activeObject)
        } else if (layer === "sendToBack") {
          canvas.sendToBack(activeObject)
        } else if (layer === "sendBackwards") {
          canvas.sendBackwards(activeObject)
        }
      }
      //ts-ignore
      const workArea = canvas
        ?.getObjects()
        ?.find((obj) => obj.type === "workarea")
      workArea && canvas?.sendToBack(workArea)
      canvas?.requestRenderAll()
    },
    [activeObject, canvas]
  )

  // Clone active object
  const cloneActiveObject = useCallback(() => {
    let cloneObject = fabric.util.object.clone(canvas?.getActiveObject())
    if (cloneObject.type === "activeSelection") {
      return
    } else {
      cloneObject.set("top", cloneObject.top + 20)
      cloneObject.set("left", cloneObject.left + 20)
      canvas?.add(cloneObject)
      canvas?.setActiveObject(cloneObject)
    }

    canvas?.requestRenderAll()
  }, [canvas])

  /**
   * Update Canvas size
   */
  const updateCanvasSize = useCallback(
    ({
      nextWidth,
      nextHeight,
      canvas,
    }: {
      nextWidth: any
      nextHeight: any
      canvas?: any
    }) => {
      if (canvas) {
        // const width = nextWidth * zoomRatio
        // const height = nextHeight * zoomRatio

        // canvas.setHeight(height).setWidth(width)
        // canvas.setZoom(zoomRatio)
        // canvas.setDimensions({
        //   width: nextWidth,
        //   height: nextHeight,
        // })
        //@ts-ignore
        const diffWidth = nextWidth / 2 - canvas?.getWidth() / 2
        //@ts-ignore
        const diffHeight = nextHeight / 2 - canvas?.getHeight() / 2
        canvas?.setWidth(nextWidth).setHeight(nextHeight)
        canvas?.renderAll()

        const deltaPoint = new fabric.Point(diffWidth, diffHeight)
        canvas?.relativePan(deltaPoint)
      }
    },
    [canvas]
  )

  /**
   * Update WorkAreaZoom
   */

  const updateWorkAreaZoom = ({ width, height, canvas }: WorkAreaZoomProps) => {
    //@ts-ignore
    const workArea = canvas?.getObjects().find((obj) => obj.id === "workarea")
    if (workArea) {
      //@ts-ignore
      const workAreaHeight = workArea?.height + 100
      //@ts-ignore
      const workAreaWidth = workArea?.width - 50

      const ratio =
        parseFloat((height / workAreaHeight).toFixed(2)) /
        parseFloat((width / workAreaWidth).toFixed(2))

      ratio && setZoomRatio(parseFloat((height / workAreaHeight).toFixed(2)))
    }
  }

  /**
   * Convert objects to group
   */
  const groupedObjects = () => {
    if (!canvas?.getActiveObject()) {
      return
    }
    if (canvas?.getActiveObject().type !== "activeSelection") {
      return
    }
    //@ts-ignore
    canvas?.getActiveObject()?.toGroup()
    canvas?.requestRenderAll()
  }

  /**
   * Convert objects to group
   */
  const unGroupObjects = () => {
    if (!canvas?.getActiveObject()) {
      return
    }
    if (canvas?.getActiveObject().type !== "group") {
      return
    }
    //@ts-ignore
    canvas?.getActiveObject()?.toActiveSelection()
    canvas?.requestRenderAll()
  }

  /**
   * Update format size
   */
  const updateFormatSize = useCallback(
    (options: FormatSize & { zoomRatio: number }) => {
      setFormatSize({ width: options.width, height: options.height })
      if (canvas) {
        const width = options.width * options.zoomRatio
        const height = options.height * options.zoomRatio

        canvas.setHeight(height).setWidth(width)
        canvas.setZoom(options.zoomRatio)
      }
    },
    [canvas]
  )

  /**
   * Calculate zoom fit ratio
   */
  const calculateZoomFitRatio = useCallback(
    (formatSize: FormatSize) => {
      const { width: areaWidth, height: areaHeight } = areaDimension
      const { width: canvasWidth, height: canvasHeight } = formatSize

      const isHeightGreater = canvasHeight > areaHeight
      const isWidthGreater = canvasWidth > areaWidth

      let fitZoomRatio = 1
      if (isHeightGreater && !isWidthGreater) {
        fitZoomRatio = areaHeight / canvasHeight
      } else if (isWidthGreater && !isHeightGreater) {
        fitZoomRatio = areaWidth / canvasWidth
      } else {
        const heightRatio = areaHeight / canvasHeight
        const widthRatio = areaWidth / canvasWidth
        fitZoomRatio = widthRatio < heightRatio ? widthRatio : heightRatio
      }
      return fitZoomRatio
    },
    [areaDimension]
  )

  /**
   * Add object to canvas
   */
  const addObject = useCallback(
    async (options) => {
      const { type, ...objectOptions } = options
      const object = await CanvasObjects[type as CanvasObjectType].create(
        objectOptions
      )
      //@ts-ignore
      const workArea = canvas?.getObjects().find((obj) => obj.id === "workarea")
      object.clipPath = workArea
      if (canvas) {
        if (object.type != "textbox") {
          object.scaleToHeight(160)
        }
        canvas.add(object)
        object.center()
        canvas.setActiveObject(object)
        setActiveObject(object)
      }
    },
    [canvas]
  )

  /**
   * Clone the selected object
   */

  const cloneOject = useCallback(() => {
    if (canvas) {
      let objects: fabric.Object[] = []
      if (activeObject) {
        objects = [activeObject]
      } else if (!!clipBoards.length) {
        objects = clipBoards
      }
      objects.forEach((object) => {
        object.clone((clone: fabric.Object) => {
          clone.set({
            left: object?.left! + 10,
            top: object?.top! + 10,
          })
          canvas.add(clone)
          canvas.setActiveObject(clone)
          canvas.requestRenderAll()
        })
      })
    }
  }, [canvas, activeObject, clipBoards])

  const deleteObject = useCallback(() => {
    if (activeObject?._objects) {
      activeObject?._objects?.forEach((value) => canvas?.remove(value))
    } else canvas?.remove(activeObject as fabric.Object)
    canvas?.discardActiveObject()
  }, [canvas, activeObject])
  /**
   * Update selected object
   */
  const updateObject = useCallback(
    (key, value) => {
      if (canvas && activeObject) {
        activeObject.set(key, value)
        canvas.requestRenderAll()
      }
    },
    [canvas, activeObject]
  )

  /**
   * Import template
   */
  const isValidCanvasOption = (options: any) => {
    if (
      options.width &&
      typeof options.width === "number" &&
      options.height &&
      typeof options.height === "number"
    ) {
      return true
    }
    return false
  }
  const importTemplate = useCallback(
    async ({ options, canvasJSON }: any) => {
      try {
        const canvasOptions = JSON.parse(options)
        if (canvas && isValidCanvasOption(canvasOptions)) {
          canvas.clear()
          canvas.setBackgroundColor("#ffffff", () => canvas.requestRenderAll())
          if (options && canvasJSON) {
            const dimension = {
              width: canvasOptions.width,
              height: canvasOptions.height,
            }
            const zoomFitRatio = calculateZoomFitRatio(dimension)
            updateFormatSize({ ...dimension, zoomRatio: zoomFitRatio })
            for (const objectOption of canvasJSON.objects) {
              if (objectOption.type === "image") {
                const object = await loadImageFromURL(objectOption.src)
                object.set({ ...objectOption })
                canvas?.add(object)
              }
              if (objectOption.type === "path") {
                fabric.util.enlivenObjects(
                  [objectOption],
                  (objects: fabric.Object[]) => {
                    for (const object of objects) {
                      canvas.add(object)
                    }
                  },
                  ""
                )
              }

              if (objectOption.type === "rect") {
                const object = new fabric.Rect(objectOption)
                canvas.add(object)
              }

              if (objectOption.type === "textbox") {
                const object = new fabric.Textbox(objectOption.text, {
                  ...objectOption,
                })
                canvas.add(object)
              }

              if (objectOption.type === "group") {
                fabric.util.enlivenObjects(
                  [objectOption],
                  (objects: fabric.Object[]) => {
                    for (const object of objects) {
                      canvas.add(object)
                    }
                  },
                  ""
                )
              }
            }
          }
        }
      } catch (err) {
        console.error("ERROR IMPORTING TEMPLATE")
      }
    },
    [canvas]
  )

  /**
   * setCanvasBackgroundColor
   */

  const setCanvasBackgroundColor = useCallback(
    (color) => {
      if (canvas) {
        canvas.setBackgroundColor(color, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  return {
    addObject,
    cloneOject,
    deleteObject,
    getProperty,
    setProperty,
    setLayer,
    groupedObjects,
    unGroupObjects,
    cloneActiveObject,
    setCanvasBackgroundColor,
    updateFormatSize,
    updateCanvasSize,
    updateWorkAreaZoom,
    calculateZoomFitRatio,
    importTemplate,
    updateObject,
  }
}

export default useCoreHandler
