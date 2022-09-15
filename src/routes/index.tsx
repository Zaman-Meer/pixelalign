import Editor from "@/pages/editor"
import TemplatesList from "@/pages/templatesList"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { CanvasProvider } from "@/editorApp/components/Canvas"
import { QueryClient, QueryClientProvider } from "react-query"
import "focus-visible/dist/focus-visible"
import TemplateProvider from "@/editorApp/context/templateContext"

const queryClient = new QueryClient()

const CreateRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CanvasProvider>
        <TemplateProvider>
          <ChakraProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Editor />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/templates" element={<TemplatesList />} />
                <Route path="/templates/:format" element={<TemplatesList />} />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </TemplateProvider>
      </CanvasProvider>
    </QueryClientProvider>
  )
}

export default CreateRoutes
