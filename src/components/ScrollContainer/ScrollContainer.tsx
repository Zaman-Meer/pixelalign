import { Box } from "@chakra-ui/react"

function ScrollContainer({ children }: any) {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      {children}
    </Box>
  )
}

export default ScrollContainer
