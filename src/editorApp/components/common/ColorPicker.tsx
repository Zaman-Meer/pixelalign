import React from "react"
import Sketch from "@uiw/react-color-sketch"
import { Box, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

interface ColorPickerProps {
  color: string
  onChange: (color: any) => void
  size?: number
  disabled?: boolean
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  size = 25,
  disabled = false,
}) => {
  const handlePickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }
  return (
    <Popover placement="left" closeOnBlur={true}>
      <PopoverTrigger>
        <Box
          width={`${size}px`}
          height={`${size}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor={color}
          borderColor="gray.400"
          borderWidth="2px"
          borderRadius="5px"
          position="relative"
          _hover={{
            borderColor: "gray.500",
          }}
        />
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent
          width="auto"
          onClick={handlePickerClick}
          zIndex={10}
          position="absolute"
          top="0"
          right="0"
        >
          <Sketch color={color} onChange={onChange} />
        </PopoverContent>
      )}
    </Popover>
  )
}

export default ColorPicker
