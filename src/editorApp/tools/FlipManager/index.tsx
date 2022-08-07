import { useRef } from "react"
import { Stack } from "@chakra-ui/react"
import { ReactComponent as FlipHIcon } from "@/assets/icons/flip-h.svg"
import { ReactComponent as FlipVIcon } from "@/assets/icons/flip-v.svg"
import IconButtonWrapper from "@/editorApp/components/common/IconButtonWrapper"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"

const FlipManager = () => {
  const { activeObject } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()
  const isFlipX = useRef(getProperty("flipX"))
  const isFlipY = useRef(getProperty("flipY"))
  const toggleFlipX = () => {
    setProperty("flipX", !isFlipX.current)
    isFlipX.current = !isFlipX.current
  }
  const toggleFlipY = () => {
    setProperty("flipY", !isFlipY.current)
    isFlipY.current = !isFlipY.current
  }
  return (
    <IconMenuWrapper
      tLabel="Flip"
      Icon={FlipHIcon}
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
          onClick={toggleFlipX}
          tLabel="Flip Horizontally"
          tPosition="bottom-end"
          colorScheme="gray"
        >
          <FlipHIcon width={20} height={20} />
        </IconButtonWrapper>

        <IconButtonWrapper
          onClick={toggleFlipY}
          tLabel="Flip Vertically"
          tPosition="bottom-start"
        >
          <FlipVIcon width={20} height={20} />
        </IconButtonWrapper>
      </Stack>
    </IconMenuWrapper>
  )
}

export default FlipManager
