import React from "react"
import { Box, Image } from "@chakra-ui/react"

interface Props {
  src: string
  onClick: (event: any) => void
}

const TemplateCard: React.FC<Props> = ({ src, onClick }) => {
  return (
    <Box
      width={150}
      height={150}
      margin={3}
      border={1}
      borderColor="gray.200"
      _hover={{
        border: 1,
        borderColor: "teal.500",
        boxShadow: "8px 7px 5px -5px rgba(0,0,0,0.21)",
      }}
      onClick={onClick}
    >
      <Image src={src} alt="template" fit="contain" />
    </Box>
  )
}

export default TemplateCard
