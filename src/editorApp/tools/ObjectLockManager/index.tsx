import { useState, useEffect } from "react"
import CustomToolTip from "../../components/common/CustomToolTip"
import { IconButton } from "@chakra-ui/react"
import { ReactComponent as Lock } from "@/assets/icons/lock-on.svg"
import { ReactComponent as Unlock } from "@/assets/icons/lock-off.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

const ObjectLockManager = () => {
  const {
    activeObject,
    clickedObject,
    canvas,
    nonSelectableObjectsIds,
    setNonSelectableObjectsIds,
  } = useCanvasContext()
  const { setProperty } = useCoreHandler()
  const [isLocked, setIsLock] = useState(false)

  const handleLock = () => {
    if (!nonSelectableObjectsIds?.includes(clickedObject?.objectId)) {
      //@ts-ignore
      setNonSelectableObjectsIds([
        ...nonSelectableObjectsIds,
        //@ts-ignore
        activeObject?.objectId,
      ])
      setProperty("selectable", false)
      setIsLock(true)
      canvas?.discardActiveObject()
    } else if (nonSelectableObjectsIds?.includes(clickedObject?.objectId)) {
      //@ts-ignore
      const newIds = nonSelectableObjectsIds?.filter(
        (id) => id !== clickedObject?.objectId
      )
      setNonSelectableObjectsIds(newIds)
      clickedObject?.set("selectable", true)
      clickedObject?.setCoords()
      canvas?.requestRenderAll()
      canvas?.setActiveObject(clickedObject)

      canvas?.requestRenderAll()
    }
  }

  useEffect(() => {
    //@ts-ignore
    setIsLock(
      nonSelectableObjectsIds?.includes(
        //@ts-ignore
        activeObject?.objectId || clickedObject?.objectId
      )
    )
  }, [nonSelectableObjectsIds, clickedObject, activeObject])

  return (
    <CustomToolTip label={isLocked ? "UnLock" : "Lock"}>
      <IconButton
        onClick={handleLock}
        disabled={
          !activeObject &&
          !nonSelectableObjectsIds?.includes(clickedObject?.objectId)
        }
        aria-label="copy-icon"
        icon={
          isLocked ? (
            <Unlock width={24} height={24} />
          ) : (
            <Lock width={24} height={24} />
          )
        }
        padding={0}
        color="gray.400"
        variant="outline"
        border="2px"
        borderColor="teal.200"
        _hover={{ bg: "teal.50", borderColor: "teal.400" }}
        _active={{
          bg: "teal.50",
          border: "2px",
          borderColor: "teal.400",
          color: "teal.400",
        }}
        _disabled={{
          cursor: "default",
          bg: "white",
          opacity: "0.4",
          borderColor: "gray.300",
          color: "gray.400",
        }}
        size="sm"
        fontSize={24}
      />
    </CustomToolTip>
  )
}

export default ObjectLockManager
