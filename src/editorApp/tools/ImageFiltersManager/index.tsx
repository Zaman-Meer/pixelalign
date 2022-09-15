import React, { useState, useEffect, memo, useCallback } from "react"
import { fabric } from "fabric"
import useCustomFilters from "./useCustomFilters"
import { Grid, Image, Box, Text, IconButton } from "@chakra-ui/react"
import NormalFilter from "@/assets/images/base-filter-image.jpg"
import { ReactComponent as SettingIcon } from "@/assets/icons/setting-icon.svg"
import { ReactComponent as BackArrowLeft } from "@/assets/icons/left-arrow-icon.svg"
import { useCanvasContext } from "@components/Canvas/hooks"
import SliderWithInput from "@/editorApp/components/common/SliderWithInput"
import CustomToolTip from "@/editorApp/components/common/CustomToolTip"

interface filterType {
  filter: string
  code: number | null
  mode?: string
  min?: number
  max?: number
  step?: number
  default?: number
}

const filterTypes: filterType[] = [
  { filter: "Normal", code: null },
  { filter: "Grayscale", code: 12 },
  { filter: "Sepia", code: 13 },
  { filter: "Blackwhite", code: 14 },
  { filter: "Brownie", code: 15 },
  { filter: "Vintage", code: 16 },
  { filter: "Kodachrome", code: 17 },
  { filter: "Technicolor", code: 18 },
  { filter: "Invert", code: 19 },
  { filter: "Redify", code: 20 },
  { filter: "Greenify", code: 21 },
  { filter: "Blueify", code: 22 },
  {
    filter: "Vignette",
    code: 23,
    mode: "edit",
    min: 0,
    max: 1,
    default: 0.5,
    step: 0.01,
  },
]

const ImageFiltersManager: React.FC = () => {
  useCustomFilters()
  const { activeObject, canvas } = useCanvasContext()
  const [selectedFilter, setSelectedFilter] = useState<filterType>({
    filter: "Normal",
    code: null,
  })
  const [editModeFilter, setEditModeFilter] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [radius, setRadius] = useState(0.5)
  const [smooth, setSmooth] = useState(0.5)
  const filters = fabric.Image.filters

  const handleFilterCLicked = (filter: {
    filter: string
    code: number | null
    mode?: string
  }) => {
    setSelectedFilter(filter)
    handleFilterChange(filter?.filter)
    if (filter.mode) {
      setEditMode(true)
    } else {
      editMode && setEditMode(false)
    }
  }

  const handleFilterChange = useCallback((newFilter: string) => {
    //@ts-ignore
    activeObject?.filters?.forEach((_, index) => {
      //@ts-ignore
      if (filterTypes.find((filter) => filter.code && filter.code === index)) {
        //@ts-ignore
        if (activeObject?.filters) {
          //@ts-ignore
          activeObject.filters[index] = null
        }
      }
    })

    if (newFilter === "Grayscale") {
      //@ts-ignore
      activeObject.filters[12] = new filters.Grayscale()
    } else if (newFilter === "Sepia") {
      //@ts-ignore
      activeObject.filters[13] = new filters.Sepia()
    } else if (newFilter === "Blackwhite") {
      //@ts-ignore
      activeObject.filters[14] = new filters.BlackWhite({
        matrix: [1, 1, 1, 0, -1, 1, 1, 1, 0, -1, 1, 1, 1, 0, -1, 0, 0, 0, 1, 0],
      })
    } else if (newFilter === "Brownie") {
      //@ts-ignore
      activeObject.filters[15] = new filters.Brownie()
    } else if (newFilter === "Vintage") {
      //@ts-ignore
      activeObject.filters[16] = new filters.Vintage()
    } else if (newFilter === "Kodachrome") {
      //@ts-ignore
      activeObject.filters[17] = new filters.Kodachrome()
    } else if (newFilter === "Technicolor") {
      //@ts-ignore
      activeObject.filters[18] = new filters.Technicolor()
    } else if (newFilter === "Invert") {
      //@ts-ignore
      activeObject.filters[19] = new filters.Invert()
    } else if (newFilter === "Redify") {
      //@ts-ignore
      activeObject.filters[20] = new filters.Redify({
        threshold: 100,
      })
    } else if (newFilter === "Greenify") {
      //@ts-ignore
      activeObject.filters[21] = new filters.Greenify({
        threshold: 100,
      })
    } else if (newFilter === "Blueify") {
      //@ts-ignore
      activeObject.filters[22] = new filters.Blueify({
        threshold: 100,
      })
    } else if (newFilter === "Vignette") {
      //@ts-ignore
      activeObject.filters[23] = new filters.Vignette({
        radius: radius,
        smoothness: smooth,
      })
    }
    //@ts-ignore
    activeObject.applyFilters()
    canvas?.requestRenderAll()
    //@ts-ignore
  }, [])

  const initializeObjectFilter = () => {
    //@ts-ignore
    const currentImageFilter = filterTypes?.filter((filter) =>
      //@ts-ignore
      activeObject?.filters?.find((_, index) => index === filter.code)
    )[0]
    setSelectedFilter(currentImageFilter)
  }

  useEffect(() => {
    initializeObjectFilter()
  }, [activeObject])
  return (
    <>
      {editMode ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          position="relative"
        >
          <Box position="absolute" right="0" top="-5">
            <CustomToolTip label="back" position="left">
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="Back Icon"
                fontSize="16px"
                icon={<BackArrowLeft width={18} height={18} />}
                onClick={() => setEditMode(false)}
              />
            </CustomToolTip>
          </Box>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.600"
            marginBottom="10px"
          >
            {selectedFilter?.filter}
          </Text>
          <SliderWithInput
            tLabel="Size"
            textWidth={60}
            defaultValue={selectedFilter?.default as number}
            min={selectedFilter?.min as number}
            max={selectedFilter?.max as number}
            step={selectedFilter?.step as number}
            value={radius as number}
            onChange={(value) => setRadius(value)}
            filterSlider={true}
          />
          <SliderWithInput
            tLabel="Intensity"
            defaultValue={selectedFilter?.default as number}
            min={selectedFilter?.min as number}
            max={selectedFilter?.max as number}
            step={selectedFilter?.step as number}
            value={smooth as number}
            onChange={(value) => setSmooth(value)}
            filterSlider={true}
          />
        </Box>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap="10px" rowGap="15px">
          {filterTypes?.map((filterType, index) => (
            <Box
              cursor="pointer"
              key={index}
              onClick={() => handleFilterCLicked(filterType)}
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              boxSizing="border-box"
              onMouseEnter={() => setEditModeFilter(filterType?.filter)}
              onMouseLeave={() => setEditModeFilter("")}
            >
              <Box
                boxSizing="border-box"
                borderRadius="5px"
                borderWidth="3px"
                borderColor={
                  selectedFilter?.filter !== "Normal" &&
                  selectedFilter?.filter === filterType?.filter
                    ? "gray.500"
                    : "gray.50"
                }
                overflow="hidden"
                position="relative"
              >
                <Box
                  display={
                    editModeFilter === filterType?.filter && filterType?.mode
                      ? "flex"
                      : "none"
                  }
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  width="100%"
                  height="100%"
                  top="0"
                  left="0"
                  color="gray.700"
                  backgroundColor="white"
                  opacity="0.5"
                >
                  <SettingIcon width={35} height={35} />
                </Box>
                <Image
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  src={NormalFilter}
                  alt="filter image"
                />
              </Box>
              <Text
                marginTop="3px"
                fontSize="sm"
                fontWeight="bold"
                color="gray.600"
              >
                {filterType.filter}
              </Text>
            </Box>
          ))}
        </Grid>
      )}
    </>
  )
}

export default memo(ImageFiltersManager)
