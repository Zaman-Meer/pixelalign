export interface TemplateType {
  id: string
  categories: string[]
  no_of_pages: number
  thumbnail: string
}
export interface PageType {
  id: string
  size: {
    width: number
    height: number
  }
  content: string
}

export interface TemplateDesignType {
  id: string
  categories: string[]
  no_of_pages: number
  pages: PageType[]
  thumbnail: string
}
