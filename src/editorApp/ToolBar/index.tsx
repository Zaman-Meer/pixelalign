import { Box, HStack, Button } from "@chakra-ui/react"
import React from "react"
import { useCanvasContext } from "@components/Canvas/hooks"
import AlignManager from "@tools/AlignManager"
import BorderManager from "@tools/BorderManager"
import CopyManager from "@tools/CopyManager"
import DeleteManager from "@tools/DeleteManager"
import FlipManager from "@tools/FlipManager"
import GroupManager from "@tools/GroupManager"
import LayerManager from "@tools/LayerManager"
import ObjectLockManager from "@tools/ObjectLockManager"
import OpacityManager from "@tools/OpacityManager"
import ShadowManager from "@tools/ShadowManager"

const ToolBar = () => {
  const { setOpenSettingPanelType, activeObject, setSettingPanel } =
    useCanvasContext()
  const objectType =
    activeObject?.type !== "activeSelection" &&
    activeObject?.type !== "group" &&
    activeObject?.type

  const handleOpenSettingPanel = (type: string) => {
    if (activeObject) {
      setOpenSettingPanelType(type)
      setSettingPanel(activeObject?.type as string)
    }
  }

  const objectToolsOption =
    objectType === "image" ? (
      <Button
        colorScheme="gray"
        variant="ghost"
        size="m"
        padding="5px"
        marginLeft="5px"
        marginRight="5px"
        fontSize="sm"
        onClick={() => handleOpenSettingPanel("image")}
      >
        Edit Image
      </Button>
    ) : objectType === "text" ? (
      <Button
        colorScheme="gray"
        variant="ghost"
        size="m"
        padding="5px"
        marginLeft="5px"
        marginRight="5px"
        fontSize="sm"
        onClick={() => handleOpenSettingPanel("text")}
      >
        Text properties
      </Button>
    ) : null

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      backgroundColor="#ffffff"
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        Tools
        {objectToolsOption}
      </Box>
      <HStack spacing="5px">
        <GroupManager />
        <BorderManager />
        <ShadowManager />
        <OpacityManager />
        <AlignManager />
        <LayerManager />
        <FlipManager />
        <ObjectLockManager />
        <CopyManager />
        <DeleteManager />
      </HStack>
    </Box>
  )
}

export default ToolBar
