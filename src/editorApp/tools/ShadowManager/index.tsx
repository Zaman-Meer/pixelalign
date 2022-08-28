import { useState, useEffect } from "react"
import { VStack, Text, Box, StackDivider } from "@chakra-ui/react"
import { ReactComponent as ShadowIcon } from "@/assets/icons/square-shadow.svg"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import IconMenuWrapper from "@/editorApp/components/common/IconMenuWrapper"
import SliderWithInput from "@/editorApp/components/common/SliderWithInput"
import ColorPicker from "@/editorApp/components/common/ColorPicker"

const ShadowManager = () => {
  const { activeObject } = useCanvasContext()
  const { setProperty, getProperty } = useCoreHandler()
  const [color, setColor] = useState<string>("#000000")
  const [xShadow, setXShadow] = useState(0)
  const [yShadow, setYShadow] = useState(0)
  const [blur, setBlur] = useState(0)

  const handleShadow = () => {
    setProperty("shadow", {
      color,
      offsetX: xShadow,
      offsetY: yShadow,
      blur,
    })
  }

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex)
  }

  const handleXShadow = (value: number) => {
    setXShadow(value)
  }

  const handleYShadow = (value: number) => {
    setYShadow(value)
  }
  const handleBlur = (value: number) => {
    setBlur(value)
  }
  const handleInitialShadow = () => {
    const shadow = getProperty("shadow")
    if (shadow) {
      setColor(shadow.color)
      setXShadow(shadow.offsetX)
      setYShadow(shadow.offsetY)
      setBlur(shadow.blur)
    } else {
      setColor("#000000")
      setXShadow(0)
      setYShadow(0)
      setBlur(0)
    }
  }

  useEffect(() => {
    handleShadow()
  }, [color, blur, xShadow, yShadow])

  useEffect(() => {
    handleInitialShadow()
  }, [activeObject])

  return (
    <IconMenuWrapper
      tLabel="Shadow"
      Icon={ShadowIcon}
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
            Add Shadow
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
              Shadow Color
            </Text>

            <ColorPicker color={color} onChange={handleColorChange} />
          </Box>
          <SliderWithInput
            tLabel="x"
            textWidth={30}
            step={1}
            min={-100}
            max={100}
            defaultValue={0}
            value={xShadow}
            onChange={handleXShadow}
          />
          <SliderWithInput
            tLabel="y"
            textWidth={30}
            step={1}
            min={-100}
            max={100}
            defaultValue={0}
            value={yShadow}
            onChange={handleYShadow}
          />
          <SliderWithInput
            tLabel="Blur"
            textWidth={30}
            step={1}
            min={0}
            max={100}
            defaultValue={0}
            value={blur}
            onChange={handleBlur}
          />
        </VStack>
      </VStack>
    </IconMenuWrapper>
  )
}
export default ShadowManager
