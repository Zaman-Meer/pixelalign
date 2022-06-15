import { Box } from '@chakra-ui/react'


function ScrollContainer({ children }: any) {
  return (
    <Box
    display="flex"
    flex="1"
    color="white"   
     >
     <Box
    flex="1"
    position="relative"
    >
        <Box
          position="absolute"
          width="full"
          height="full"
          overflow="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default ScrollContainer
