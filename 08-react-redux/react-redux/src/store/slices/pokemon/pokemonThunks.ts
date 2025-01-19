import { Dispatch } from "@reduxjs/toolkit"
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"
import axios from 'axios';

export const getPokemons = (page:number=0)=>{
    return  async  (dispatch: Dispatch)=>{

        try {
            dispatch(startLoadingPokemons(true))
            const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${10*page}`)
             dispatch(setPokemons(pokemons.data['results']))
             dispatch(startLoadingPokemons(false))
        } catch (error) {
            dispatch(setPokemons([]))
             dispatch(startLoadingPokemons(false))
        }
    }
}