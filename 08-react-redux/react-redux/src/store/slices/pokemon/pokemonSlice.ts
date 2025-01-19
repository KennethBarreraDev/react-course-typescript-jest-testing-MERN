import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PokemonState {
    page: number,
    pokemons: any[]
    isLoading: boolean
}

const initialState: PokemonState = {
    page: 0,
    pokemons: [],
    isLoading: false
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialState,
    reducers: {
        startLoadingPokemons: (state: PokemonState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setPokemons: (state: PokemonState, action: PayloadAction<any[]>) => {
            state.pokemons = [...action.payload]
        },
        changePage: (state: PokemonState, action: PayloadAction<number>) => {
            if(action.payload>0){
                state.page = action.payload
            }
        }
    },
})

export const { startLoadingPokemons, setPokemons, changePage } = pokemonSlice.actions