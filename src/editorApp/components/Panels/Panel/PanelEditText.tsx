import { useEffect, useState } from "react"
import { fabric } from "fabric"
import { v4 as uuidv4 } from "uuid"
import { Scrollbars } from "react-custom-scrollbars-2"
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/react"
import PanelContainer from "../../PanelContainer/PanelContainer"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import ImageEffectManager from "@tools/ImageEffectManager"
import ImageFiltersManager from "@/editorApp/tools/ImageFiltersManager"

function PanelEditText() {
  const { canvas, isSidePanelOpen } = useCanvasContext()

  return <PanelContainer></PanelContainer>
}

export default PanelEditText
