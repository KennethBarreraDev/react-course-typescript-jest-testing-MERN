import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter/counter-slice'
import { pokemonSlice } from './slices/pokemon/pokemonSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemon: pokemonSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch