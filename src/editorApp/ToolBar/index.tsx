import { Box, HStack } from "@chakra-ui/react"
import React from "react"
import AlignManager from "../tools/AlignManager"
import BorderManager from "../tools/BorderManager"
import CopyManager from "../tools/CopyManager"
import DeleteManager from "../tools/DeleteManager"
import FlipManager from "../tools/FlipManager"
import GroupManager from "../tools/GroupManager"
import LayerManager from "../tools/LayerManager"
import ObjectLockManager from "../tools/ObjectLockManager"
import OpacityManager from "../tools/OpacityManager"
import ShadowManager from "../tools/ShadowManager"

const ToolBar = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      backgroundColor="#ffffff"
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        Tool
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
