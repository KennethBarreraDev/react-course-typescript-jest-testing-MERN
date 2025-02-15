import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui/UiSlice'
import { calendarSlice } from './calendar/CalendarSlice'
import { authSlice } from './auth/authSlice'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch