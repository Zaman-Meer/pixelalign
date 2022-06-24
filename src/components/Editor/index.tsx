import styled from "styled-components"
import { Box } from "@chakra-ui/react"
import Header from "@components/Header"
import Panels from "@components/Panels"
import PagesPanel from "@components/Panels/PagesPanel"
import PagesToggleButton from "@components/Panels/PagesPanel/PagesToggleButton"
import Menu from "@components/Menu"
import Canvas from "@components/Canvas"
import Footer from "@components/Footer"
import WebFont from "webfontloader"
import { useEffect, useState } from "react"

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
`

const SectionOne = styled.div`
  flex: 1;
  display: flex;
  background: #ecf0f1;
`

const SectionThree = styled.div`
  flex: 1;
  display: flex;
  background: #ecf0f1;
  flex-direction: column;
`

function Editor() {
  const [loading] = useState(false)

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Satisfy",
          "VT323",
          "Pacifico",
          "Quicksand",
          "Inconsolata",
          "Montserrat",
          "Lobster",
          "Dancing Script",
          "New Tegomin",
          "Train One",
        ],
      },
    })
  }, [])

  return (
    <Container>
      <Header />
      <SectionOne>
        <Panels />
        <SectionThree>
          <Menu />
          <Box display="flex" flex="1">
            <Canvas />
            <PagesPanel />
          </Box>
          <PagesToggleButton />
          {/* <Footer /> */}
        </SectionThree>
      </SectionOne>
    </Container>
  )
}

export default Editor
