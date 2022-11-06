import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import accountService from './accountService'

const initialState = {
  users: [],
  transactions: [],
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

// Get all accounts
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

export const getMyTransactions = createAsyncThunk(
  'transactions/get',
  async (thunkAPI) => {
    try {
      return await accountService.getMyTransactions()
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

export const getAllUsers = createAsyncThunk('users/get', async (thunkAPI) => {
  try {
    return await accountService.getAllUsers()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountState: (state) => {
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
      .addCase(getMyTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transactions = action.payload
      })
      .addCase(getMyTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetAccountState } = accountSlice.actions
export default accountSlice.reducer
