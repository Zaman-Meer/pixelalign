import React from "react"
import { Box, Input } from "@chakra-ui/react"

interface Props {
  search?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterContainer: React.FC<Props> = ({ search, onChange }) => {
  return (
    <Box
      margin={5}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Input
        placeholder="Search"
        value={search}
        onChange={onChange}
        color="gray.800"
        size="lg"
        height="50px"
        backgroundColor="gray.100"
        focusBorderColor="teal.500"
        maxWidth={600}
      />
    </Box>
  )
}

export default FilterContainer
