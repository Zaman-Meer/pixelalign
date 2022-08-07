import React, { useState, useEffect } from "react"
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Stack,
  Text,
  Input,
} from "@chakra-ui/react"
import { ReactComponent as OpacityIcon } from "@/assets/icons/opacity-icon.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"

const OpacityManager: React.FC = () => {
  const { activeObject, canvas } = useCanvasContext()
  const { getProperty, setProperty } = useCoreHandler()
  const [elementOpacity, setElementOpacity] = useState(0)
  const [inputOpacity, setInputOpacity] = useState(0)

  const handleChangeOpacity = (opacity: number) => {
    if (opacity >= 0 && opacity <= 100) {
      setElementOpacity(opacity)
      setProperty("opacity", (opacity / 100).toFixed(2))
    }
    setInputOpacity(opacity)
  }
  const handleOpacity = (value: number) => {
    handleChangeOpacity(value)
  }
  const handleOpacityInput = (event: any) => {
    handleChangeOpacity(event.target.value)
  }

  useEffect(() => {
    if (getProperty("opacity")) {
      setElementOpacity(getProperty("opacity") * 100)
      setInputOpacity(getProperty("opacity") * 100)
    }
  }, [activeObject])
  console.log("Active", activeObject, canvas?.getActiveObject())
  return (
    <IconMenuWrapper tLabel="Opacity" Icon={OpacityIcon} disabled={false}>
      <Stack
        direction={["column", "row"]}
        spacing={3}
        padding={0}
        height={7}
        align="center"
      >
        <Text fontSize="xs" fontWeight={500}>
          Opacity
        </Text>
        <Slider
          aria-label="slider-ex-5"
          defaultValue={0}
          value={elementOpacity}
          min={0}
          max={100}
          step={1}
          className="slider"
          focusThumbOnChange={false}
          onChange={handleOpacity}
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
          value={inputOpacity}
          onChange={handleOpacityInput}
          focusBorderColor="none"
          width={70}
          padding={2}
          borderRadius={5}
          style={{ textAlign: "center" }}
        />
      </Stack>
    </IconMenuWrapper>
  )
}

export default OpacityManager
