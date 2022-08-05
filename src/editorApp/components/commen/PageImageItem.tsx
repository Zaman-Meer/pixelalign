import React, { useEffect, useState, memo } from "react"
import { Box, SimpleGrid, Image, Button, CloseButton } from "@chakra-ui/react"
import BG from "@/assets/images/bgt.png"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import { PageType } from "@/types/template"
import useTemplateContext from "@/hooks/useTemplateContext"

interface PageImageItemType {
  page: PageType
}

const ImageComponent: React.FC<PageImageItemType> = ({ page }) => {
  const { canvas, activePageId } = useCanvasContext()
  const { generateThumbnail, handleTogglePage } = useTemplateContext()
  const [imageUrl, setImageUrl] = useState("")
  // useEffect(() => {
  //   if (activePageId === page?.id) {
  //     canvas?.on("object:added", (e) => {
  //       const image = generateThumbnail()
  //       //@ts-ignore
  //       setImageUrl(image)
  //     })
  //     canvas?.on("object:modified", (e) => {
  //       const image = generateThumbnail()
  //       //@ts-ignore
  //       setImageUrl(image)
  //     })
  //   }
  // }, [canvas])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="1px solid"
      borderColor={activePageId === page?.id ? "blue.500" : "gray.300"}
      padding={2}
      width="full"
      height="100px"
      backgroundColor="gray.100"
      cursor="pointer"
      onClick={() => page.id && handleTogglePage(page.id)}
    >
      <img src={imageUrl} alt="" width="full" height="auto" />
    </Box>
  )
}
const PageImageItem = memo(ImageComponent)

export default PageImageItem
