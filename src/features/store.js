import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import accountReducer from './account/accountSlice'

export default configureStore({
  reducer: { auth: authReducer, account: accountReducer },
})
