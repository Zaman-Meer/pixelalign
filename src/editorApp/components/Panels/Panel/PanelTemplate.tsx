import { useState, useRef } from "react"
import { Scrollbars } from "react-custom-scrollbars-2"
import { useCoreHandler } from "@/editorApp/components/Canvas/handlers"
import { Box, Input, Text, SimpleGrid, Image } from "@chakra-ui/react"
import { getTemplateObject } from "@services/api"
import PanelContainer from "../../PanelContainer/PanelContainer"
import { fabric } from "fabric"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"

function PanelTemplate() {
  const [query, setQuery] = useState("")
  const inputFile = useRef<HTMLInputElement>(null)
  const handleChange = (event: any) => setQuery(event.target.value)
  const templates: any = []
  const { importTemplate, calculateZoomFitRatio, updateFormatSize } =
    useCoreHandler()
  const { canvas } = useCanvasContext()
  const addTemplateToCanvas = async (template: any, path: string) => {
    const [options, canvasJSON] = (await getTemplateObject(
      template,
      path
    )) as any
    importTemplate({ options, canvasJSON })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL(e.target.files![0])
    //@ts-ignore
    loadSVGImage(url)
  }

  const loadSVGImage = (url: string) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      canvas?.clear()
      const zoomRatio = calculateZoomFitRatio({
        width: options.width,
        height: options.height,
      })
      updateFormatSize({
        width: options.width,
        height: options.height,
        zoomRatio: zoomRatio,
      })

      objects.forEach((object) => {
        canvas?.add(object)
      })
      canvas?.requestRenderAll()
    })
  }

  const onButtonClick = () => {
    inputFile.current?.click()
  }

  const isFiltered = (element: string) => {
    const ele = element.toLowerCase()
    const res = query.toLowerCase()
    return ele.includes(res) || ele === res
  }

  return (
    <PanelContainer>
      <Box display="flex" flexDirection="row" alignItems="center" padding={7}>
        <Input
          color="gray.800"
          backgroundColor="gray.100"
          focusBorderColor="teal.500"
          onChange={handleChange}
          placeholder="Search templates"
        />
      </Box>
      <Scrollbars autoHide>
        {/* <div
          style={{
            padding: "0.8rem 2rem 0",
          }}
        >
          <div
            style={{
              margin: "1rem 0 0",
              border: "1px solid rgba(255,255,255,0.6)",
              padding: "0.5rem",
              cursor: "pointer",
              color: "rgba(255,255,255,0.8)",
            }}
            onClick={onButtonClick}
            className="import-button"
          >
            Import SVG Format
          </div>
          <input
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
          />
        </div> */}
        <SimpleGrid columns={2} spacing={2} padding={7}>
          {templates
            .filter((template: any) => isFiltered(template.name))
            .map((template: any) => (
              <Box
                key={template.id}
                border="1px"
                borderColor="none"
                cursor={"pointer"}
                onClick={() => addTemplateToCanvas(template.id, template.path)}
                _hover={{
                  border: "1px",
                  borderColor: "teal.500",
                  boxShadow: "8px 7px 5px -5px rgba(0,0,0,0.21)",
                }}
              >
                <Image
                  boxSize="full"
                  src={template.image}
                  fallbackSrc="https://via.placeholder.com/150"
                />
              </Box>
            ))}
        </SimpleGrid>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelTemplate
