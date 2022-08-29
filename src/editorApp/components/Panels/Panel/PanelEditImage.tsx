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
} from "@chakra-ui/react"
import PanelContainer from "../../PanelContainer/PanelContainer"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import ImageEffectManager from "@components/common/ImageEffectManager"

function PanelEditImage() {
  const { canvas, isSidePanelOpen } = useCanvasContext()

  return (
    <PanelContainer>
      <Tabs variant="unstyled">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          padding={5}
        >
          <Text fontSize="2xl" fontWeight="bold" marginBottom="10px">
            Edit Image
          </Text>
          <TabList width="100%">
            <Tab
              _selected={{ color: "white", bg: "gray.600" }}
              width="100%"
              color="gray.600"
              backgroundColor="gray.100"
              fontWeight="600"
              borderTopLeftRadius="2px"
              borderBottomLeftRadius="2px"
            >
              Effect
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "gray.600" }}
              width="100%"
              color="gray.600"
              backgroundColor="gray.100"
              fontWeight="600"
              borderTopRightRadius="2px"
              borderBottomRightRadius="2px"
            >
              Filters
            </Tab>
          </TabList>
        </Box>

        <Scrollbars autoHide>
          <Box padding={5} overflow="auto">
            <TabPanels>
              <TabPanel
                padding={0}
                margin={2}
                boxSizing="border-box"
                gap="10px"
              >
                <ImageEffectManager
                  label="Brightness"
                  filterType="brightness"
                  min={-0.5}
                  max={0.5}
                  step={0.1}
                  defaultValue={0}
                />
                <ImageEffectManager
                  label="Contrast"
                  filterType="contrast"
                  min={-0.5}
                  max={0.5}
                  step={0.01}
                  defaultValue={0}
                />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Box>
        </Scrollbars>
      </Tabs>
    </PanelContainer>
  )
}

export default PanelEditImage
