import React, { useState, useEffect } from "react"
import {
  Stack,
  Text,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
import ColorPicker from "@/editorApp/components/common/ColorPicker"

interface ValueProps {
  value: number
  color: string
}

interface Props {
  tLabel?: string
  defaultValue: number
  value: ValueProps
  onChange: (value: ValueProps) => void
  step: number
  min: number
  max: number
  textWidth?: number
  isNegative?: boolean
  filterSlider?: boolean
}

const SliderWithColorPicker: React.FC<Props> = (props) => {
  const {
    tLabel,
    textWidth,
    defaultValue = 0,
    value,
    onChange,
    step,
    min,
    max,
    filterSlider = false,
  } = props

  const [inputValue, setInputValue] = useState<number>(value.value)
  const [color, setColor] = useState<string>(value.color)

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex as string)
    if (onChange) {
      onChange({ value: inputValue, color: newColor.hex as string })
    }
  }

  const handleSliderChange = (sliderValue: number) => {
    setInputValue(sliderValue)
    if (onChange) {
      onChange({ value: sliderValue, color: color })
    }
  }

  useEffect(() => {
    setInputValue(value.value)
    setColor(value.color)
  }, [value])
  return (
    <Stack
      direction={["row"]}
      spacing={3}
      padding={0}
      width="100%"
      height={7}
      align="center"
    >
      {tLabel && (
        <Text
          fontSize="sm"
          fontWeight={500}
          textAlign="left"
          color="gray.600"
          minWidth={textWidth ? `${textWidth}px` : "auto"}
        >
          {tLabel}
        </Text>
      )}
      <Slider
        aria-label="slider-ex-5"
        defaultValue={defaultValue}
        value={inputValue as number}
        min={min}
        max={max}
        step={step}
        className="slider"
        focusThumbOnChange={false}
        onChange={handleSliderChange}
      >
        <SliderTrack bg="gray.400" margin={0}>
          <Box position="relative" />
          <SliderFilledTrack bg={filterSlider ? "none" : "teal"} />
        </SliderTrack>
        <SliderThumb boxSize={4} bg="teal.400" />
      </Slider>
      <Box width="60px" display="flex" justifyContent="center">
        <ColorPicker
          position="up"
          size={30}
          color={color || "#ff0000"}
          onChange={handleColorChange}
        />
      </Box>
    </Stack>
  )
}

export default SliderWithColorPicker
