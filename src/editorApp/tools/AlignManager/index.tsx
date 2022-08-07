import { Stack } from "@chakra-ui/react"

import { ReactComponent as AlignTop } from "@/assets/icons/align-top.svg"
import { ReactComponent as AlignBottom } from "@/assets/icons/align-bottom.svg"
import { ReactComponent as AlignLeft } from "@/assets/icons/align-left.svg"
import { ReactComponent as AlignRight } from "@/assets/icons/align-right.svg"
import { ReactComponent as AlignVerticallyCenter } from "@/assets/icons/align-v-center.svg"
import { ReactComponent as AlignHorizontallyCenter } from "@/assets/icons/align-h-center.svg"
import IconButtonWrapper from "@/editorApp/components/common/IconButtonWrapper"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"

type Align = "left" | "right" | "top" | "bottom" | "vertically" | "horizontally"
const AlignManager = () => {
  const { activeObject, canvas } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()

  const handleAlign = (align: Align) => {
    //@ts-ignore
    const workarea: any = canvas
      .getObjects()
      //@ts-ignore
      .find((obj) => obj?.id === "workarea")
    console.log("ActiveObject: ", activeObject?.width, activeObject?.height)
    console.log("Canvas: ", canvas?.width, canvas?.height)
    console.log("workspace: ", workarea?.width, workarea?.height)

    if (align === "left") {
      setProperty("left", workarea?.left)
    } else if (align === "horizontally") {
      const workspaceWidth = workarea?.left + workarea?.width / 2
      setProperty(
        "left",
        //@ts-ignore
        workspaceWidth - (activeObject?.width * activeObject?.scaleX) / 2
      )
    } else if (align === "right") {
      const workspaceWidth = workarea?.left + workarea?.width
      setProperty(
        "left",
        //@ts-ignore
        workspaceWidth - activeObject?.width * activeObject?.scaleX
      )
    } else if (align === "top") {
      setProperty("top", workarea?.top)
    } else if (align === "vertically") {
      const workspaceTop = workarea?.top + workarea?.height / 2
      setProperty(
        "top",
        //@ts-ignore
        workspaceTop - (activeObject?.height * activeObject?.scaleY) / 2
      )
    } else if (align === "bottom") {
      const workspaceBottom = workarea?.top + workarea?.height
      setProperty(
        "top",
        //@ts-ignore
        workspaceBottom - activeObject?.height * activeObject?.scaleY
      )
    }
  }
  return (
    <IconMenuWrapper
      tLabel="Alignment"
      Icon={AlignVerticallyCenter}
      disabled={!activeObject}
      minMenuW={"auto"}
    >
      <Stack
        direction={["column", "row"]}
        spacing={1}
        padding={0}
        align="center"
      >
        <IconButtonWrapper
          onClick={() => handleAlign("left")}
          tLabel="Align Left"
          tPosition="bottom-end"
          colorScheme="gray"
        >
          <AlignLeft width={22} height={22} />
        </IconButtonWrapper>

        <IconButtonWrapper
          onClick={() => handleAlign("horizontally")}
          tLabel="Align Horizontally"
          tPosition="bottom-end"
        >
          <AlignHorizontallyCenter width={22} height={22} />
        </IconButtonWrapper>
        <IconButtonWrapper
          onClick={() => handleAlign("right")}
          tLabel="Align Right"
          tPosition="bottom-end"
        >
          <AlignRight width={22} height={22} />
        </IconButtonWrapper>
        <IconButtonWrapper
          onClick={() => handleAlign("top")}
          tLabel="Align Top"
          tPosition="bottom-end"
        >
          <AlignTop width={22} height={22} />
        </IconButtonWrapper>
        <IconButtonWrapper
          onClick={() => handleAlign("vertically")}
          tLabel="Align Vertically"
          tPosition="bottom-end"
        >
          <AlignVerticallyCenter width={22} height={22} />
        </IconButtonWrapper>
        <IconButtonWrapper
          onClick={() => handleAlign("bottom")}
          tLabel="Align Bottom"
          tPosition="bottom-end"
        >
          <AlignBottom width={22} height={22} />
        </IconButtonWrapper>
      </Stack>
    </IconMenuWrapper>
  )
}
export default AlignManager
