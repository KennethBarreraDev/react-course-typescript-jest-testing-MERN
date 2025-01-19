import { useCounter } from "../01-useState/hooks/useCounter"
import { useFetch } from "../03-examples/hooks/useFetch";
import { LoadingMessage } from "../03-examples/LoadingMessage";
import { PokemonCard } from "../03-examples/PokemonCard";

export const LayoutPage = () => {

    const {increment, decrement, counter} = useCounter(1);
    const { data, isLoading, hasError } = useFetch(counter)

    return (
        <>
            <div>MultipleCustomHooks</div>
            <hr />
            {
                hasError ?
                    <pre>An erro has occurred while loading pokemon</pre> :
                    isLoading ?
                        <LoadingMessage/>
                        :<PokemonCard id={data.id} name={data.name} sprites={[
                            data.sprites.front_default,
                            data.sprites.front_shiny,
                            data.sprites.back_default,
                            data.sprites.back_shiny,
                        ]}/>
            }
            <button className="btn btn-primary me-2" onClick={()=>decrement()}>Last</button>
            <button className="btn btn-primary me-2" onClick={()=>increment()}>Next</button>
        </>
    )
}
