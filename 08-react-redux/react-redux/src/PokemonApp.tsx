import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store/store"
import { getPokemons } from "./store/slices/pokemon/pokemonThunks"
import { changePage } from "./store/slices/pokemon/pokemonSlice"

export const PokemonApp = () => {
  const page = useSelector((state: RootState) => state.pokemon.page)
  const loading = useSelector((state: RootState) => state.pokemon.isLoading)
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons)
  const dispatch = useDispatch()


  useEffect(() => {
    const pokemonsThunks = getPokemons(page);
    pokemonsThunks(dispatch)
  }, [page])

  return (
    <>
      <h1>Pokemon app</h1>
      {loading ? <h1>Loading...</h1> : 
           <>
           <hr />
            {
              pokemons.map((pokemon) => <li key={pokemon['name']}>{pokemon['name']}</li>)
            }
            
            <button style={{marginTop: 20, marginRight: 10}} onClick={()=>dispatch(changePage(page-1))}>
              Last
            </button>
            <button onClick={()=>dispatch(changePage(page+1))}>
              Next
            </button>
           </>
      }
    </>
  )
}
