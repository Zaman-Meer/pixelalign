import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "@/services/api"
import { RootState } from "@store/root-reducer"

export const getTemplates = createAsyncThunk(
  "templates/getTemplates",
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      console.log("GETT")
      const { currentRequestId, loading } = (getState() as RootState).templates
      if (loading !== true || requestId !== currentRequestId) {
        return
      }
      const response = await api.getTemplates()
      return response
    } catch (err) {
      return rejectWithValue({ message: err.error })
    }
  }
)

export const addTemplate = createAsyncThunk(
  "templates/addTemplate",
  async (_, { rejectWithValue }) => {
    try {
      console.log("ADD")
      const response = await api.saveTemplate()
      return response
    } catch (error) {
      return rejectWithValue({ message: error.message })
    }
  }
)
