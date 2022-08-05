import React from "react"
import { Box, Image } from "@chakra-ui/react"
import AddCircleIcon from "@/assets/icons/add-circle.svg"

interface Props {
  onClick: (event: any) => void
}

const AddTemplateCard: React.FC<Props> = ({ onClick }) => {
  return (
    <Box
      width={180}
      height={180}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={3}
      borderWidth={1}
      borderColor="gray.100"
      borderRadius={10}
      cursor="pointer"
      _hover={{
        borderColor: "teal.400",
        boxShadow: "8px 7px 5px -5px rgba(0,0,0,0.21)",
      }}
      onClick={onClick}
      backgroundColor="gray.100"
    >
      <Image width="40%" src={AddCircleIcon} alt="Add Template" fit="contain" />
      Create a Blank Design
    </Box>
  )
}

export default AddTemplateCard
