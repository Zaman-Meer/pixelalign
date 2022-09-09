import React, { useState, useEffect } from "react"
import { fabric } from "fabric"
import { Box, Text } from "@chakra-ui/react"
import SliderWithInput from "@components/common/SliderWithInput"
import { useCanvasContext } from "@components/Canvas/hooks"
import SliderWithColorPicker from "@/editorApp/components/common/SliderWithColorPicker"

type FilterType =
  | "brightness"
  | "contrast"
  | "saturation"
  | "emboss"
  | "hue"
  | "vibrance"
  | "sharpen"
  | "noise"
  | "blur"
  | "pixelate"
  | "tint"

interface Props {
  label: string
  filterType: FilterType
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
  const [inputValue, setInputValue] = useState<
    string | number | undefined | null
  >(0)
  const [color, setColor] = useState("#ff0000")
  const filters = fabric.Image.filters

  const handleFilterChange = (value: number) => {
    if (filterType?.trim()?.toLocaleLowerCase() === "brightness") {
      if (value) {
        //@ts-ignore
        activeObject.filters[0] = new filters.Brightness({
          brightness: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 0
        )
      }
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "contrast") {
      if (value) {
        //@ts-ignore
        activeObject.filters[1] = new filters.Contrast({
          contrast: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => filter !== 1
        )
      }
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "saturation") {
      if (value) {
        //@ts-ignore
        activeObject.filters[2] = new filters.Saturation({
          saturation: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 2
        )
      }
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "emboss") {
      if (value) {
        //@ts-ignore
        activeObject.filters[3] = new filters.Convolute({
          matrix: [1, 1, 1, 1, value, -1, -1, -1, -1],
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 3
        )
      }

      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "hue") {
      if (value) {
        //@ts-ignore
        activeObject.filters[4] = new filters.HueRotation({
          rotation: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 4
        )
      }

      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "vibrance") {
      if (value) {
        //@ts-ignore
        activeObject.filters[5] = new filters.Vibrance({
          vibrance: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 5
        )
      }

      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "sharpen") {
      if (value) {
        const sharpenValue: any = {
          1: 5,
          2: 6,
          3: 7,
          4: 8,
          5: 9,
        }
        //@ts-ignore
        activeObject.filters[6] = new filters.Convolute({
          matrix: [0, -1, 0, -1, sharpenValue[value], -1, 0, -1, 0],
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 6
        )
      }

      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "noise") {
      if (value) {
        //@ts-ignore
        activeObject.filters[7] = new filters.Noise({
          noise: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 7
        )
      }

      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "blur") {
      if (value) {
        //@ts-ignore
        activeObject.filters[8] = new filters.Blur({
          blur: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 8
        )
      }
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    } else if (filterType?.trim()?.toLocaleLowerCase() === "pixelate") {
      if (value) {
        //@ts-ignore
        activeObject.filters[9] = new filters.Pixelate({
          blocksize: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 9
        )
      }
      //@ts-ignore
      activeObject.applyFilters()
      canvas?.requestRenderAll()
    }
    //@ts-ignore
    //console.log("Filters", activeObject?.filters)
  }

  const handleTintFilterChange = ({
    value,
    color,
  }: {
    value: number
    color: string
  }) => {
    if (filterType?.trim()?.toLocaleLowerCase() === "tint") {
      if (value) {
        //@ts-ignore
        activeObject.filters[10] = new filters.BlendColor({
          color: color,
          mode: "tint",
          alpha: value,
        })
      } else {
        //@ts-ignore
        activeObject.filters = activeObject?.filters?.filter(
          (filter: any, index: number) => index !== 10
        )
      }
    }
    //@ts-ignore
    console.log("Filters", activeObject?.filters)
  }

  const initializeObjectFilter = () => {
    let filterValue: any
    if (filterType === "brightness") {
      //@ts-ignore
      const filter =
        //@ts-ignore
        activeObject?.filters[0]
      filterValue = filter?.brightness
    } else if (filterType === "contrast") {
      //@ts-ignore
      const filter =
        //@ts-ignore
        activeObject?.filters[1]
      filterValue = filter?.contrast
    } else if (filterType === "saturation") {
      //@ts-ignore
      const filter =
        //@ts-ignore
        activeObject?.filters[2]
      filterValue = filter?.saturation
    } else if (filterType === "emboss") {
      //@ts-ignore
      const filter = activeObject?.filters?.[3]
      const embossFilterValue = filter?.matrix
      filterValue = embossFilterValue && embossFilterValue[4]
    } else if (filterType === "hue") {
      //@ts-ignore
      const filter = activeObject?.filters?.[4]
      filterValue = filter?.rotation
    } else if (filterType === "vibrance") {
      //@ts-ignore
      const filter = activeObject?.filters?.[5]
      filterValue = filter?.vibrance
    } else if (filterType === "sharpen") {
      //@ts-ignore
      const filter = activeObject?.filters[6]

      const sharpenFilterValue = filter && Object?.values(filter)[0]
      filterValue = sharpenFilterValue && sharpenFilterValue[4]
    } else if (filterType === "noise") {
      //@ts-ignore
      const filter = activeObject?.filters[7]

      filterValue = filter?.noise
    } else if (filterType === "blur") {
      //@ts-ignore
      const filter = activeObject?.filters[8]

      filterValue = filter?.blur
    } else if (filterType === "pixelate") {
      //@ts-ignore
      const filter = activeObject?.filters[9]

      filterValue = filter?.blocksize
    }

    console.log("GetFilter", filterValue, activeObject)
    if (filterValue) {
      setInputValue(filterValue as number)
    } else setInputValue(undefined)
  }

  useEffect(() => {
    initializeObjectFilter()
  }, [activeObject])
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Text fontSize="sm" fontWeight="600" color="gray.600">
        {label}
      </Text>
      {filterType === "tint" ? (
        <SliderWithColorPicker
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          value={{ value: inputValue as number, color: color }}
          onChange={handleTintFilterChange}
          filterSlider={true}
        />
      ) : (
        <SliderWithInput
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          value={inputValue as number}
          onChange={handleFilterChange}
          filterSlider={true}
        />
      )}
    </Box>
  )
}

export default ImageEffectManager
