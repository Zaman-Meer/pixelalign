import { useEffect, useState } from "react"
import { fabric } from "fabric"
import Masonry from "react-masonry-css"
import { Scrollbars } from "react-custom-scrollbars-2"
import { getPixabayImages } from "@services/pixabay"
import { Box, Input, Image } from "@chakra-ui/react"
import { useDebounce } from "use-debounce"
import PanelContainer from "../../PanelContainer/PanelContainer"
import useCoreHandler from "@/editorApp/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

interface ImageType {
  id: string
  preview: string
  original: string
}
function PanelImage() {
  const { canvas, isSidePanelOpen } = useCanvasContext()
  const [images, setImages] = useState<ImageType[]>([])
  const [query, setQuery] = useState("")
  const [value] = useDebounce(query, 1500)
  const { addObject } = useCoreHandler()

  useEffect(() => {
    if (value) {
      getImages(value)
    } else getImages("flowers")
  }, [value])

  const handleChange = (event: any) => setQuery(event.target.value)

  const getImages = async (query: string) => {
    const dataImages = await getPixabayImages(query)
    const images = dataImages.map((di) => ({
      id: di.id,
      preview: di.previewURL,
      original: di.webformatURL,
    }))
    setImages(images)
  }

  const addObjectToCanvas = (url: string) => {
    const options = {
      type: "image",
      url,
    }
    fabric?.Image.fromURL(
      url,
      (objectsImage) => {
        //@ts-ignore
        const workarea = canvas.getObjects()[0]
        objectsImage.scale(0.4)
        canvas?.add(objectsImage)
        objectsImage.clipPath = workarea
        objectsImage.center()
        canvas?.setActiveObject(objectsImage)
        console.log("objectsImage", canvas?.getActiveObject())
        canvas?.renderAll()
      },
      { crossOrigin: "anonymous" }
    )
    //  addObject(options)
    // fabric.Image.fromURL(url, (img) => {
    //   if (canvas) {
    //     img.scaleToHeight(200)
    //     canvas.add(img)
    //     img.center()
    //   }
    // })
  }

  return (
    <PanelContainer>
      <Box display="flex" flexDirection="row" alignItems="center" padding={7}>
        <Input
          color="gray.800"
          backgroundColor="gray.100"
          focusBorderColor="teal.500"
          value={query}
          onChange={handleChange}
          placeholder="Search images"
          display={isSidePanelOpen ? "block" : "none"}
        />
      </Box>

      <Scrollbars autoHide>
        <Box padding={7} overflow="auto">
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((img) => (
              <Box
                key={img.id}
                border="1px"
                borderColor="none"
                cursor={"pointer"}
                display={isSidePanelOpen ? "block" : "none"}
                onClick={() => addObjectToCanvas(img.original)}
                _hover={{
                  border: "1px",
                  borderColor: "teal.500",
                  boxShadow: "8px 7px 5px -5px rgba(0,0,0,0.21)",
                }}
              >
                <Image
                  boxSize="full"
                  src={img?.preview}
                  fallbackSrc="https://via.placeholder.com/150"
                />
                {/* <img width="100%" src={img.preview} alt="preview" /> */}
              </Box>
            ))}
          </Masonry>
        </Box>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelImage
