import { useState, useEffect } from "react"
import { VStack, Text, Box, StackDivider } from "@chakra-ui/react"
import { ReactComponent as BorderIcon } from "@/assets/icons/border-icon.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"
import SliderWithInput from "@/editorApp/components/common/SliderWithInput"
import ColorPicker from "@/editorApp/components/common/ColorPicker"

const BorderManager = () => {
  const { activeObject } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()
  const [color, setColor] = useState<string>("#000000")
  const [border, setBorder] = useState(0)

  const handleAddBorder = () => {
    setProperty("stroke", color)
    setProperty("strokeWidth", border)
  }

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex)
  }

  const handleBorder = (value: number) => {
    setBorder(value)
  }
  const handleInitialShadow = () => {
    const stroke = getProperty("stroke")
    console.log("Stroke", stroke)
    // if (shadow) {
    //   setColor(shadow.color)
    //   setBorder(shadow.offsetX)
    // } else {
    //   setColor("#000000")
    //   setBorder(0)
    // }
  }

  useEffect(() => {
    handleAddBorder()
  }, [color, border])

  useEffect(() => {
    handleInitialShadow()
  }, [activeObject])

  return (
    <IconMenuWrapper
      tLabel="shadow"
      Icon={BorderIcon}
      disabled={!activeObject}
      minMenuW={"auto"}
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="start"
        padding="10px"
        width="280px"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text fontSize="md" fontWeight={600}>
            Add Border
          </Text>
        </Box>
        <VStack spacing={2} align="start" width="100%">
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="sm" color="gray.600" fontWeight={500}>
              Border Color
            </Text>

            <ColorPicker color={color} onChange={handleColorChange} />
          </Box>
          <SliderWithInput
            tLabel="Border"
            step={1}
            min={0}
            max={100}
            defaultValue={0}
            value={border}
            onChange={handleBorder}
          />
        </VStack>
      </VStack>
    </IconMenuWrapper>
  )
}
export default BorderManager
