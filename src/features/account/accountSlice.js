import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import accountService from './accountService'

const initialState = {
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

export const chargeMoney = createAsyncThunk(
  'charge/account',
  async (deposit, thunkAPI) => {
    try {
      return await accountService.chargeMoney(deposit)
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

export const sendMoney = createAsyncThunk(
  'send/account',
  async (payment, thunkAPI) => {
    try {
      return await accountService.sendMoney(payment)
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
    resetAccountState: (state) => {
      state.users = []
      state.transactions = []
      state.myAccount = {}
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    resetAccountStatus: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(chargeMoney.pending, (state) => {
        state.isLoading = true
      })
      .addCase(chargeMoney.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(chargeMoney.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(sendMoney.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendMoney.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(sendMoney.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetAccountState, resetAccountStatus } = accountSlice.actions
export default accountSlice.reducer
