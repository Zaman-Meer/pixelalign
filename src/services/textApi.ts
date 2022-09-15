import axios from "axios"
import { ITextStyle } from "@/types/textTypes"

const API_URL = "http://165.227.50.244:1337"

export function getTextStyles(): Promise<ITextStyle[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/textstyles`)
      .then((response) => {
        const items = response.data
        const textStyles = items.map((item: any) => ({
          id: item.id,
          json: item.json,
          svg: item.svg,
          updatedAt: item.updated_at,
          createdAt: item.created_at,
        }))
        resolve(textStyles)
      })
      .catch((err) => reject(err))
  })
}
