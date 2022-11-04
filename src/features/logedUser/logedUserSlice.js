// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import getLogedUser from './logedUserService'

// const initialState = {
//   user: {},
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// }

// export const logedUser = createAsyncThunk('get/user', async (thunkAPI) => {
//   try {
//     return await getLogedUser()
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()
//     return thunkAPI.rejectWithValue(message)
//   }
// })

// export const logedUserSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false
//       state.isSuccess = false
//       state.isError = false
//       state.message = ''
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(logedUser.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(logedUser.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload
//       })
//       .addCase(logedUser.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//         state.user = null
//       })
//   },
// })

// export const { reset } = logedUserSlice.actions
// export default logedUserSlice.reducer
