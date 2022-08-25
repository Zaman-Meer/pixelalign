import CustomToolTip from "../../components/common/CustomToolTip"
import { IconButton } from "@chakra-ui/react"
import { ReactComponent as GroupIcon } from "@/assets/icons/ungroup-icon.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

const GroupManager = () => {
  const { activeObject } = useCanvasContext()
  const { cloneActiveObject } = useCoreHandler()

  return (
    <CustomToolTip label="Group">
      <IconButton
        aria-label="copy-icon"
        icon={<GroupIcon width={24} height={24} />}
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
        disabled={!activeObject}
      />
    </CustomToolTip>
  )
}

export default GroupManager
