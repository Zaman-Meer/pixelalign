import React from "react"
import { Stack } from "@chakra-ui/react"
import { ReactComponent as LayersIcon } from "@/assets/icons/layers-icon.svg"
import { ReactComponent as MoveForwardIcon } from "@/assets/icons/bring-forward.svg"
import { ReactComponent as MoveToFrontIcon } from "@/assets/icons/bring-to-front.svg"
import { ReactComponent as SendBackwardIcon } from "@/assets/icons/send-backward.svg"
import { ReactComponent as SendToBackIcon } from "@/assets/icons/send-to-back.svg"
import IconButtonWrapper from "@/editorApp/components/common/IconButtonWrapper"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"

const LayerManager: React.FC = () => {
  const { activeObject } = useCanvasContext()
  const { setLayer } = useCoreHandler()

  return (
    <IconMenuWrapper
      tLabel="Layers"
      Icon={LayersIcon}
      disabled={!activeObject}
      minMenuW={142}
    >
      <Stack
        direction={["column", "row"]}
        spacing={1}
        width={150}
        padding={0}
        align="center"
      >
        <IconButtonWrapper
          tLabel="Bring Forward"
          tPosition="bottom-end"
          colorScheme="gray"
          onClick={() => setLayer("bringForward")}
        >
          <MoveForwardIcon width={24} height={24} />
        </IconButtonWrapper>
        <IconButtonWrapper
          tLabel="Bring To Front"
          onClick={() => setLayer("bringToFront")}
        >
          <MoveToFrontIcon width={24} height={24} />
        </IconButtonWrapper>
        <IconButtonWrapper
          tLabel="Send Backward"
          onClick={() => setLayer("sendBackwards")}
        >
          <SendBackwardIcon width={24} height={24} />
        </IconButtonWrapper>
        <IconButtonWrapper
          tLabel="Send To Back"
          tPosition="bottom-start"
          onClick={() => setLayer("sendToBack")}
        >
          <SendToBackIcon width={24} height={24} />
        </IconButtonWrapper>
      </Stack>
    </IconMenuWrapper>
  )
}

export default LayerManager
