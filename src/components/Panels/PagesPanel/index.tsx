import styled from "styled-components"
import { useCanvasContext } from "@/components/Canvas/hooks"
import { Box, SimpleGrid, Image, Button, CloseButton } from "@chakra-ui/react"
import { Scrollbars } from "react-custom-scrollbars-2"
import PageImageItem from "@/components/commen/PageImageItem"
import useTemplateContext from '@/hooks/useTemplateContext'
const imageUrlll =
  "https://images.unsplash.com/photo-1655644663701-014906c43860?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
interface ContainerProps {
  collapse: boolean
}
const Container = styled(Box)<ContainerProps>`
  display: ${(props) => (props.collapse ? "none" : "flex")};
  flex-direction: column;
  position: relative;
  background: #ffffff; //#29303a;
  transition: width 0.3s;
  width: ${(props) => (props.collapse ? "0px" : "200px")};
  border-left: 1px solid var(--chakra-colors-teal-600);
`

const PagesPanel = () => {
  const { isPagesPanelOpen, togglePagesPanel, pages, activePageId } =
    useCanvasContext()
    const  { handleAddNewPage } = useTemplateContext()
  const handleClosePagePanel = () => togglePagesPanel()
  return (
    <Container collapse={isPagesPanelOpen}>
      <CloseButton
        size="md"
        onClick={handleClosePagePanel}
        borderRadius="0"
        position="absolute"
        left="0"
        top="0"
        zIndex="docked"
        _hover={{
          backgroundColor: "teal.50",
        }}
      />
      <Button margin="auto" marginY="4" colorScheme="teal" onClick={handleAddNewPage}>
        Add Page
      </Button>
      <Scrollbars autoHide>
        <SimpleGrid padding={4} paddingTop={2} spacing="10px">
          {pages &&
            pages.map((pag, index) => <PageImageItem key={pag?.id + index} page={pag} />)}
        </SimpleGrid>
      </Scrollbars>
    </Container>
  )
}

export default PagesPanel
