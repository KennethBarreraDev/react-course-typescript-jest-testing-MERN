import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isModalOpen: boolean
}

const initialState: UiState = {
  isModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    shouldOpenModal: (state: UiState, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
  },
})

export const { shouldOpenModal } = uiSlice.actions
export default uiSlice.reducer