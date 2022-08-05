import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import { Button } from "@chakra-ui/react"

const PagesToggleButton = () => {
  const { isPagesPanelOpen, togglePagesPanel } = useCanvasContext()
  const handleClosePagePanel = () => togglePagesPanel()
  return (
    <Button
      bg="white"
      color="gray.600"
      border="1px"
      borderColor="gray.200"
      borderTopRightRadius="0"
      borderBottomRightRadius="0"
      size="md"
      display={isPagesPanelOpen ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
      padding={2}
      position="absolute"
      right="0"
      bottom="20px"
      onClick={handleClosePagePanel}
      _hover={{
        color: "teal.600",
      }}
      transition={"all 0.3s"}
    >
      <i className="material-icons">keyboard_double_arrow_left</i> Pages
    </Button>
  )
}
export default PagesToggleButton
