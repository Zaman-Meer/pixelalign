import { Box, Heading } from "@chakra-ui/react"

const TemplatesListHeader = () => {
  return (
    <header>
      <Box
        maxW="100%"
        mx="auto"
        height={320}
        padding={5}
        margin={5}
        borderRadius={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="teal.400"
      >
        <Heading as="h1" size="2xl" mb={5}>
          Fully Customizable Templates
        </Heading>
        <Box
          maxW={580}
          textAlign="center"
          fontSize={18}
          lineHeight="24px"
          color="white"
        >
          Browse through our selection of professionally curated free ready-made
          templates online to find the perfect one for your next marketing
          campaign, or customize any design easily in just a few clicks!
        </Box>
      </Box>
    </header>
  )
}

export default TemplatesListHeader
