import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPaginatedUsers = createAsyncThunk(
  'users/paginated',
  async (page, thunkAPI) => {
    try {
      return await userService.getPaginatedUsers(page)
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.users = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    resetUserStatus: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPaginatedUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getPaginatedUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetUsertState, resetUserStatus } = userSlice.actions
export default userSlice.reducer
