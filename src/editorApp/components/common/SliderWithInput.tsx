import React, { useState, useEffect } from "react"
import {
  Stack,
  Text,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
} from "@chakra-ui/react"

interface Props {
  tLabel?: string
  defaultValue: number
  value: number
  onChange: (value: number) => void
  step: number
  min: number
  max: number
  textWidth?: number
  isNegative?: boolean
}

const SliderWithInput: React.FC<Props> = (props) => {
  const {
    tLabel,
    textWidth,
    defaultValue = 0,
    value,
    onChange,
    step,
    min,
    max,
  } = props

  const [inputValue, setInputValue] = useState<number | string | undefined>(
    value
  )
  const handleSliderChange = (sliderValue: number) => {
    setInputValue(sliderValue)
    if (onChange) {
      onChange(sliderValue as number)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (newValue === "") {
      setInputValue(0)
      if (onChange) {
        onChange(0)
      }
    }
    if (parseInt(newValue) > max) {
      setInputValue(max)
      if (onChange) {
        onChange(max)
      }
    } else if (parseInt(newValue) < min) {
      setInputValue(min)
      if (onChange) {
        onChange(min)
      }
    } else {
      setInputValue(newValue)
      if (onChange) {
        onChange(parseInt(newValue))
      }
    }
  }
  useEffect(() => {
    setInputValue(value)
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
          <SliderFilledTrack bg="teal" />
        </SliderTrack>
        <SliderThumb boxSize={4} bg="teal.400" />
      </Slider>
      <Input
        placeholder=""
        size="xs"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        focusBorderColor="none"
        width="60px"
        padding={2}
        borderRadius={5}
        style={{ textAlign: "center" }}
      />
    </Stack>
  )
}

export default SliderWithInput
