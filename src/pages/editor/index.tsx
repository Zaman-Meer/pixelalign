import { useLayoutEffect } from "react"
import Editor from "@/editorApp/components/Editor"
import useTemplateContext from "@/hooks/useTemplateContext"
import { useSearchParams } from "react-router-dom"
const EditorPage = () => {
  const [searchParams] = useSearchParams()
  const { handleAddBlankTemplatePage, handleAddInitialPages } =
    useTemplateContext()
  const width = parseInt(searchParams?.get("width") as string)
  const height = parseInt(searchParams?.get("height") as string)
  const format = searchParams?.get("format")
  useLayoutEffect(() => {
    if (width && height && format) {
      handleAddBlankTemplatePage(width, height, format)
    } else handleAddInitialPages()
  }, [])
  return <Editor />
}

export default EditorPage
