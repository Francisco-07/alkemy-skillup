import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  user: {},
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

export const getSingleUser = createAsyncThunk(
  'user/id',
  async (id, thunkAPI) => {
    try {
      return await userService.getSingleUser(id)
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
      state.user = {}
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
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetUsertState, resetUserStatus } = userSlice.actions
export default userSlice.reducer
