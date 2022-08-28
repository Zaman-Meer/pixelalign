import { useState, useEffect } from "react"
import CustomToolTip from "../../components/common/CustomToolTip"
import { IconButton } from "@chakra-ui/react"
import { ReactComponent as GroupIcon } from "@/assets/icons/group-icon.svg"
import { ReactComponent as UnGroupIcon } from "@/assets/icons/ungroup-icon.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

const GroupManager = () => {
  const { canvas } = useCanvasContext()
  const { unGroupObjects, groupedObjects } = useCoreHandler()
  const [isGrouped, setIsGrouped] = useState(
    canvas?.getActiveObject()?.type === "group"
  )
  const handleGroupUnGroup = () => {
    if (canvas?.getActiveObject()?.type !== "activeSelection") {
      unGroupObjects()
      setIsGrouped(false)
    } else {
      groupedObjects()
      setIsGrouped(true)
    }
  }
  useEffect(() => {
    if (canvas?.getActiveObject()?.type === "group") setIsGrouped(true)
  }, [canvas])

  return canvas?.getActiveObject()?.type === "activeSelection" ||
    canvas?.getActiveObject()?.type === "group" ? (
    <CustomToolTip label={isGrouped ? "UnGroup" : "Group"}>
      <IconButton
        onClick={handleGroupUnGroup}
        aria-label={isGrouped ? "unGroup-icon" : "group-icon"}
        icon={
          isGrouped ? (
            <UnGroupIcon width={24} height={24} />
          ) : (
            <GroupIcon width={24} height={24} />
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
  ) : null
}

export default GroupManager
