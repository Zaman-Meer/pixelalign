import { useState } from "react"
import {
  Stack,
  VStack,
  Text,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  StackDivider,
  Input,
} from "@chakra-ui/react"
import { ReactComponent as ShadowIcon } from "@/assets/icons/square-shadow.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"

const ShadowManager = () => {
  const { activeObject, canvas } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()
  const [inputShadow, setInputShadow] = useState(0)

  const handleShadow = () => {
    if (getProperty("shadow")) {
      setProperty("shadow", false)
    } else {
      setProperty("shadow", true)
    }
  }

  return (
    <IconMenuWrapper
      tLabel="shadow"
      Icon={ShadowIcon}
      disabled={!activeObject}
      minMenuW={"auto"}
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="start"
      >
        <Stack
          direction={["row"]}
          spacing={3}
          padding={0}
          height={7}
          align="center"
        >
          <Text fontSize="xs" fontWeight={500}>
            x
          </Text>
          <Slider
            aria-label="slider-ex-5"
            defaultValue={0}
            value={inputShadow}
            min={0}
            max={100}
            step={1}
            className="slider"
            focusThumbOnChange={false}
            onChange={handleShadow}
          >
            <SliderTrack bg="gray.400" margin={0}>
              <Box position="relative" />
              <SliderFilledTrack bg="teal" />
            </SliderTrack>
            <SliderThumb boxSize={4} bg="teal.400" />
          </Slider>
          <Input
            placeholder=""
            size="xs"
            type="number"
            value={inputShadow}
            onChange={handleShadow}
            focusBorderColor="none"
            width={70}
            padding={2}
            borderRadius={5}
            style={{ textAlign: "center" }}
          />
        </Stack>
      </VStack>
    </IconMenuWrapper>
  )
}
export default ShadowManager
