import React, { useState, useEffect } from "react"
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

interface Props {
  tLabel?: string
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  step: number
  min: number
  max: number
  isNegative?: boolean
}

const SliderWithInput: React.FC<Props> = (props) => {
  const {
    tLabel,
    defaultValue = 0,
    value,
    onChange,
    step,
    min,
    max,
    isNegative = false,
  } = props

  const [inputValue, setInputValue] = useState(value)
  const handleChange = (sliderValue: number) => {
    let calValue: number
    if (isNegative) {
      calValue = -sliderValue
    } else {
      calValue = sliderValue
    }
    if (onChange) {
      onChange(inputValue as number)
    }
  }

  return (
    <Stack
      direction={["row"]}
      spacing={3}
      padding={0}
      height={7}
      align="center"
    >
      {tLabel && (
        <Text fontSize="xs" fontWeight={500}>
          {tLabel}
        </Text>
      )}
      <Slider
        aria-label="slider-ex-5"
        defaultValue={defaultValue}
        value={inputValue}
        min={min}
        max={max}
        step={step}
        className="slider"
        focusThumbOnChange={false}
        onChange={handleChange}
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
        value={inputValue}
        onChange={handleChange}
        focusBorderColor="none"
        width={70}
        padding={2}
        borderRadius={5}
        style={{ textAlign: "center" }}
      />
    </Stack>
  )
}
