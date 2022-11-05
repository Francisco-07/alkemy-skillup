import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import accountService from './accountService'

const initialState = {
  accounts: [],
  myAccount: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create account
export const createAccount = createAsyncThunk(
  'account/create',
  async (thunkAPI) => {
    try {
      return await accountService.createAccount()
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

export const getAllAccounts = createAsyncThunk(
  'accounts/get',
  async (thunkAPI) => {
    try {
      return await accountService.getAllAccounts()
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

export const getMyAccount = createAsyncThunk(
  'myaccount/get',
  async (thunkAPI) => {
    try {
      return await accountService.getMyAccount()
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

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountsState: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.accounts = action.payload
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyAccount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myAccount = action.payload
      })
      .addCase(getMyAccount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetAccountsState } = accountSlice.actions
export default accountSlice.reducer
