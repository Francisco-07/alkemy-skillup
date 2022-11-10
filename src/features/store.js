import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import accountReducer from './account/accountSlice'
import transactionReducer from './transaction/transactionSlice'
import userReducer from './user/userSlice'
import editConceptReducer from './editConcept/editConceptSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    user: userReducer,
    editConcept: editConceptReducer,
  },
})
