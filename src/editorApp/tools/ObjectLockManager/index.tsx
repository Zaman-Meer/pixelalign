import { useState } from "react"
import CustomToolTip from "../../components/common/CustomToolTip"
import { Button } from "@chakra-ui/react"
import { ReactComponent as Lock } from "@/assets/icons/lock-icon.svg"
import { ReactComponent as Unlock } from "@/assets/icons/unlock-icon.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

const ObjectLockManager = () => {
  const {
    activeObject,
    canvas,
    nonSelectableObjects,
    setNonSelectableObjects,
  } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()
  const [isLocked, setIsLock] = useState(getProperty("selectable"))
  const handleLock = () => {
    if (nonSelectableObjects.length === 0) {
      setProperty("selectable", !isLocked)
      setIsLock(getProperty("selectable"))
      canvas?.discardActiveObject()
    } else {
      if (nonSelectableObjects.length > 0) {
        nonSelectableObjects[0]?.set("selectable", true)
        nonSelectableObjects[0].setCoords()
        setNonSelectableObjects([])
        canvas?.setActiveObject(nonSelectableObjects[0])
        canvas?.requestRenderAll()
      }
    }
  }
  return (
    <CustomToolTip label={isLocked ? "Lock" : "Unlock"}>
      <Button
        aria-label="Options"
        padding={0}
        color="gray.400"
        variant="outline"
        border="2px"
        borderColor={"gray.200"}
        _hover={{ bg: "gray.50", borderColor: "gray.400" }}
        _active={{
          bg: "gray.50",
          border: "2px",
          borderColor: "gray.400",
          color: "gray.400",
        }}
        _disabled={{
          cursor: "default",
          bg: "white",
          opacity: "0.4",
          borderColor: "gray.300",
          color: "gray.400",
        }}
        size="sm"
        fontSize={22}
        onClick={handleLock}
        disabled={nonSelectableObjects?.includes(activeObject as fabric.Object)}
      >
        {isLocked ? <Lock /> : <Unlock />}
      </Button>
    </CustomToolTip>
  )
}

export default ObjectLockManager
