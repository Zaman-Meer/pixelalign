import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup,
  Input,
} from "@chakra-ui/react"
import Resizer from "react-image-file-resizer"
import { v4 as uuidv4 } from "uuid"
import styled from "styled-components"
import { Button } from "@chakra-ui/react"
import { useCanvasContext } from "../Canvas/hooks"
import axios from "axios"
import Formats from "@constants/formats"
import propertiesToInclude from "@constants/workspace"
import useTemplateContext from "@/hooks/useTemplateContext"
const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`

const resizeFile = (file: any, width: number, height: number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "JPEG",
      300,
      0,
      (uri: unknown) => {
        resolve(uri)
      },
      "base64",
      500,
      400
    )
  })

function Header() {
  const { canvas, formatSize } = useCanvasContext()
  const { addWorkspace } = useTemplateContext()

  const downloadImage = () => {
    if (canvas) {
      const view = canvas.viewportTransform
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
      const activeObject = canvas
        ?.getObjects()
        //@ts-ignore
        ?.find((obj) => obj?.id === "workarea")
        ?.getBoundingRect()

      const dataImage2 = canvas?.toDataURL({
        format: "jpeg",
        multiplier: 1,
        quality: 1,
        top: activeObject?.top,
        left: activeObject?.left,
        width: activeObject?.width,
        height: activeObject?.height,
      })

      //@ts-ignore
      canvas.setViewportTransform(view)

      const a = document.createElement("a")
      a.href = dataImage2
      a.download = "image.jpeg"
      a.click()
    }
  }

  const onSave = async () => {
    console.log("H")
    //@ts-ignore
    const activeObject = canvas
      ?.getObjects()
      //@ts-ignore
      ?.find((obj) => obj?.id === "workarea")
      ?.getBoundingRect()
    //@ts-ignore
    const height = activeObject?.width * activeObject?.scaleX
    //@ts-ignore
    const width = activeObject?.height * activeObject?.scaleY
    const dataImage = canvas?.toDataURL({
      format: "jpeg",
      multiplier: 1,
      quality: 1,
      top: activeObject?.top,
      left: activeObject?.left,
      width: activeObject?.width,
      height: activeObject?.height,
    })
    //@ts-ignore
    fetch(dataImage)
      .then((response) => response.blob())
      .then(async (blob) => {
        console.log("Blob", blob)
        const image = await resizeFile(blob, width, height)
        console.log("Images", image)
        const EDITOR_SERVER_URL = "http://localhost:8000/api/template"
        const template = {
          title: "facebook post",
          categories: ["facebook-post"],
          thumbnail: image,
          // @ts-ignore
          pages: [
            {
              id: uuidv4(),
              content: JSON.stringify(canvas?.toJSON(propertiesToInclude)),
            },
          ],
        }
        try {
          const response = axios.post(EDITOR_SERVER_URL, template)
        } catch (error) {
          console.log(error)
        }
      })

    //  dispatch(getTemplates)
    // let base64 = btoa(JSON.stringify(canvas?.toJSON()))
    // let baseParsed = `data:image/png;base64,${base64}`

    // const savedJson = (await saveCanvas(baseParsed)) as any
  }

  return (
    <Container>
      <div>
        <ButtonGroup>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "2rem",
            }}
          >
            Pixel
          </div>
          <Menu>
            <MenuButton variant="outline" as={Button}>
              Formats
            </MenuButton>
            <MenuList height={300} overflow="scroll">
              {Formats?.map((format, index) => (
                <MenuItem
                  textTransform="capitalize"
                  borderBottom="1px solid"
                  borderColor="gray.100"
                  fontWeight="bold"
                  color="gray.600"
                  _hover={{
                    backgroundColor: "rgba(57, 76, 96, 0.15)",
                  }}
                  key={index}
                  onClick={() =>
                    addWorkspace(format?.size?.width, format?.size?.height)
                  }
                >{`${format?.label}-${format?.size?.width}x${format?.size?.height}`}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* <Button onClick={onSave}>Save</Button> */}
          <Menu>
            <MenuButton
              variant="outline"
              as={Button}
              leftIcon={
                <i style={{ fontSize: "16px" }} className="material-icons">
                  save
                </i>
              }
            >
              Save
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 100px",
          alignItems: "center",
        }}
      >
        <Input size={"sm"} placeholder="Template name" />
        <div
          style={{
            paddingLeft: "1rem",
            fontSize: "0.9rem",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          {formatSize.height}x{formatSize.width}
        </div>
      </div>
      <ButtonGroup>
        {/* <Menu>
          <MenuButton
            variant="outline"
            as={Button}
            leftIcon={
              <i style={{ fontSize: "16px" }} className="material-icons">
                share
              </i>
            }
          >
            &nbsp;Share
          </MenuButton>
          <MenuList>
            <MenuItem>Facebook'da paylaş</MenuItem>
            <MenuItem>Twitter'da Paylaş</MenuItem>
            <MenuItem>Instagram'da Paylaş</MenuItem>
            <MenuItem>Pinterest'de Paylaş</MenuItem>
            <MenuItem>Linkedin'de Paylaş</MenuItem>
          </MenuList>
        </Menu> */}
        <Button
          variant="outline"
          leftIcon={
            <i style={{ fontSize: "16px" }} className="material-icons">
              cloud_download
            </i>
          }
          onClick={downloadImage}
        >
          {" "}
          &nbsp;Download
        </Button>

        {/* <Button
          leftIcon={
            <i
              style={{ fontSize: "16px" }}
              className="material-icons md-16 spanicon"
            >
              stars
            </i>
          }
          colorScheme="red"
          onClick={downloadImage}
        >
          &nbsp;Y
        </Button> */}
      </ButtonGroup>
    </Container>
  )
}

export default Header
