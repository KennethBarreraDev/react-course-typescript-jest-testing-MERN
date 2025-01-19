import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice.test'
import { journalSlice } from './journal/journalSlice.test'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch