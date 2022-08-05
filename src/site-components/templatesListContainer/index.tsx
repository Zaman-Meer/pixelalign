import React from "react"
import { Box } from "@chakra-ui/react"
import TemplateCard from "@/site-components/templateCard"
import AddTemplateCard from "../addTemplateCard"

interface Props {
  templates: any
}

const TemplatesListContainer: React.FC<Props> = ({ templates }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      <AddTemplateCard onClick={() => {}} />
      {templates &&
        templates?.map((template: any) => (
          <TemplateCard src={template?.src} onClick={() => {}} />
        ))}
    </Box>
  )
}

export default TemplatesListContainer
