import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import editConceptService from './editConceptService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const editConcept = createAsyncThunk(
  'transactions/edit',
  async (data, thunkAPI) => {
    try {
      return await editConceptService.editConcept(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const editConceptSlice = createSlice({
  name: 'editConcept',
  initialState,
  reducers: {
    resetEditConceptStatus: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(editConcept.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editConcept.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(editConcept.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetEditConceptStatus } = editConceptSlice.actions
export default editConceptSlice.reducer
