import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import TemplateCard from "@/site-components/templateCard"
import AddTemplateCard from "../addTemplateCard"
import Formats from "@/constants/formats"
interface Props {
  templates: any
}

const TemplatesListContainer: React.FC<Props> = ({ templates }) => {
  const { format } = useParams()
  const navigate = useNavigate()
  const handleAddBlankTemplate = () => {
    const templateFormat = Formats?.find((form) => form?.type === format)
    if (templateFormat) {
      navigate(
        `/editor?width=${templateFormat?.size?.width}&height=${templateFormat?.size?.height}&format=${templateFormat?.type}`
      )
    }
  }

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      <AddTemplateCard onClick={handleAddBlankTemplate} />
      {templates &&
        templates?.map((template: any) => (
          <TemplateCard src={template?.src} onClick={() => {}} />
        ))}
    </Box>
  )
}

export default TemplatesListContainer
