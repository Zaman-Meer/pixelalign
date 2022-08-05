import React from "react"
import { Box } from "@chakra-ui/react"
import FilterContainer from "@/site-components/filterContainer"
import TemplatesListHeader from "@/site-components/header"
import TemplatesListContainer from "@/site-components/templatesListContainer"

const TemplatesList: React.FC<any> = (props) => {
  return (
    <Box>
      <TemplatesListHeader />

      <main>
        <FilterContainer onChange={() => {}} />
        <TemplatesListContainer templates={[]} />
      </main>
    </Box>
  )
}

export default TemplatesList
