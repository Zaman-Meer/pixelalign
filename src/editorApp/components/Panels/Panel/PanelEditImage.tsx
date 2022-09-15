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

        <Scrollbars autoHide autoHeight autoHeightMin={`calc(100vh - 186px)`}>
          <Box padding={5} overflow="auto">
            <TabPanels>
              <TabPanel padding={0} margin={2}>
                <VStack spacing="8px">
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
                  <ImageEffectManager
                    label="Saturation"
                    filterType="saturation"
                    min={-1}
                    max={1}
                    step={0.001}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Emboss"
                    filterType="emboss"
                    min={0}
                    max={1}
                    step={0.5}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Hue"
                    filterType="hue"
                    min={-1}
                    max={1}
                    step={0.01}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Vibrance"
                    filterType="vibrance"
                    min={-1}
                    max={1}
                    step={0.01}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Sharpen"
                    filterType="sharpen"
                    min={0}
                    max={5}
                    step={1}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Noise"
                    filterType="noise"
                    min={0}
                    max={200}
                    step={1}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Blur"
                    filterType="blur"
                    min={0}
                    max={2}
                    step={0.01}
                    defaultValue={0}
                  />
                  <ImageEffectManager
                    label="Pixelate"
                    filterType="pixelate"
                    min={0}
                    max={200}
                    step={1}
                    defaultValue={0}
                  />
                  {/* <ImageEffectManager
                    label="Tint"
                    filterType="tint"
                    min={0}
                    max={1}
                    step={0.1}
                    defaultValue={0}
                  /> */}
                </VStack>
              </TabPanel>
              <TabPanel padding={0}>
                <ImageFiltersManager />
              </TabPanel>
            </TabPanels>
          </Box>
        </Scrollbars>
      </Tabs>
    </PanelContainer>
  )
}

export default PanelEditImage
