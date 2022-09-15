import { useState } from "react"
import Masonry from "react-masonry-css"
import { Scrollbars } from "react-custom-scrollbars-2"
import { useCoreHandler } from "@/editorApp/components/Canvas/handlers"
import { Box, Input, Text, VStack, Image } from "@chakra-ui/react"
import PanelContainer from "@/editorApp/components/PanelContainer"
import { useQuery } from "react-query"
import { getTextStyles } from "@/services/textApi"

function PanelText() {
  const [query, setQuery] = useState("")
  const handleChange = (event: any) => setQuery(event.target.value)
  const { status, data, error, isFetching } = useQuery(
    "TextStyles",
    getTextStyles
  )
  const { addObject } = useCoreHandler()

  const addTextToCanvas = (json: string) => {
    if (!json) return false
    const data = JSON.parse(json)
    let options = {
      type: data.type,
      text: data.text,
      fontSize: data.fontSize,
      fontWeight: data.fontWeight,
      fontFamily: data.fontFamily,
      textAlign: data.textAlign,
      fill: data.fill,
      width: data.width,
      height: data.height,
      left: 450,
      top: 220,
      shadow: data.shadow,
    }
    addObject(options)
  }
  const textBaseOptions = {
    type: "textbox",
    width: 320,
    fontFamily: "Lexend",
    textAlign: "center",
  }
  const addHeading = () => {
    const options = {
      ...textBaseOptions,
      fontWeight: 700,
      text: "Add a heading",
      fontSize: 32,
    }
    addObject(options)
  }

  const addSubheading = () => {
    const options = {
      ...textBaseOptions,
      fontSize: 24,
      text: "Add a subheading",
      fontWeight: 500,
    }
    addObject(options)
  }

  const addTextBody = () => {
    const options = {
      ...textBaseOptions,
      text: "Add a little bit of body text",
      fontSize: 18,
      fontWeight: 300,
    }
    addObject(options)
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
          value={query}
          onChange={handleChange}
          placeholder="Search text"
        />
      </Box>
      <Scrollbars autoHide>
        <Box padding={7}>
          <VStack spacing={4} align="left">
            <Text
              onClick={addHeading}
              backgroundColor="gray.100"
              padding={2}
              borderRadius={6}
              fontSize="4xl"
              fontWeight="bold"
              color="black"
              fontFamily="Lexend"
              cursor="pointer"
            >
              Add a heading
            </Text>
            <Text
              onClick={addSubheading}
              backgroundColor="gray.100"
              padding={2}
              borderRadius={6}
              fontSize="2xl"
              fontWeight="bold"
              color="black"
              cursor="pointer"
            >
              Add a subheading
            </Text>
            <Text
              onClick={addTextBody}
              backgroundColor="gray.100"
              padding={2}
              borderRadius={6}
              fontSize="md"
              color="black"
              cursor="pointer"
            >
              Add a litle bit of body text
            </Text>
          </VStack>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="gray.700"
            align="left"
            paddingY={4}
          >
            Popular items
          </Text>
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.map((textStyle) => (
              <Box
                key={textStyle?.id}
                border="1px"
                borderColor="gray.200"
                cursor={"pointer"}
                backgroundColor="gray.50"
                onClick={() => addTextToCanvas(textStyle.json)}
                _hover={{
                  border: "1px",
                  borderColor: "teal.500",
                  boxShadow: "8px 7px 5px -5px rgba(0,0,0,0.21)",
                }}
              >
                <Image
                  boxSize="150px"
                  src={textStyle?.svg}
                  backgroundColor="white"
                  fallbackSrc="https://via.placeholder.com/150"
                />
              </Box>
            ))}
          </Masonry>
        </Box>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelText
