import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TransactionService from './transactionService'

const initialState = {
  transactions: [],
  transaction: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPaginatedTransactions = createAsyncThunk(
  'transactions/paginated',
  async (page, thunkAPI) => {
    try {
      return await TransactionService.getPaginatedTransactions(page)
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

export const singleTransaction = createAsyncThunk(
  'single/transaction',
  async (id, thunkAPI) => {
    try {
      return await TransactionService.singleTransaction(id)
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

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactionState: (state) => {
      state.transactions = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    resetTransactionStatus: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedTransactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPaginatedTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transactions = action.payload
      })
      .addCase(getPaginatedTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(singleTransaction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(singleTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transaction = action.payload
      })
      .addCase(singleTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetTransactionState, resetTransactionStatus } =
  transactionSlice.actions
export default transactionSlice.reducer
