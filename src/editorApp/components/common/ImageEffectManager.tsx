import React, { useState, useEffect } from "react"
import { fabric } from "fabric"
import { Box, Text } from "@chakra-ui/react"
import SliderWithInput from "./SliderWithInput"
import { useCoreHandler } from "../Canvas/handlers"
import { useCanvasContext } from "../Canvas/hooks"

interface Props {
  label: string
  filterType: string
  min: number
  max: number
  defaultValue: number
  step: number
}

const ImageEffectManager: React.FC<Props> = ({
  label,
  filterType,
  min,
  max,
  defaultValue,
  step,
}) => {
  const { activeObject, canvas } = useCanvasContext()
  const { getProperty } = useCoreHandler()
  const [inputValue, setInputValue] = useState<
    string | number | undefined | null
  >(0)
  const filters = fabric.Image.filters

  const handleFilterChange = (value: number) => {
    if (filterType?.trim()?.toLocaleLowerCase() === "brightness") {
      //@ts-ignore
      activeObject.filters[0] = new filters.Brightness({
        brightness: value,
      })
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "contrast") {
      //@ts-ignore
      activeObject.filters[1] = new filters.Contrast({
        contrast: value,
      })
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    }
  }

  const initializeObjectFilter = () => {
    //@ts-ignore
    const filter = activeObject?.filters?.filter(
      (filter: any) => filter[filterType?.trim()?.toLocaleLowerCase()]
    )[0]
    console.log("GetFilter", filter, activeObject)
    if (filter) {
      const filterValue = Object?.values(filter)[0]
      setInputValue(filterValue as number)
    } else setInputValue(defaultValue)
  }

  useEffect(() => {
    initializeObjectFilter()
  }, [activeObject])
  return (
    <Box
      onClick={initializeObjectFilter}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Text fontSize="sm" fontWeight="600" color="gray.600">
        {label}
      </Text>
      <SliderWithInput
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        value={inputValue as number}
        onChange={handleFilterChange}
        filterSlider={true}
      />
    </Box>
  )
}

export default ImageEffectManager
