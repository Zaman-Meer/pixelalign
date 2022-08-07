import { Box } from "@chakra-ui/react"
import React from "react"
import AlignManager from "../tools/AlignManager"
import FlipManager from "../tools/FlipManager"
import LayerManager from "../tools/LayerManager"
import OpacityManager from "../tools/OpacityManager"

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
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap="2">
        <OpacityManager />
        <AlignManager />
        <LayerManager />
        <FlipManager />
      </Box>
    </Box>
  )
}

export default ToolBar
