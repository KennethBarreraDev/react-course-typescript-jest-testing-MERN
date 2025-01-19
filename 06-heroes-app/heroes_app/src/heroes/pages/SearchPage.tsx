import React, { useMemo } from "react";
import { useCustomForm } from "../../globals/hooks/useForm";
import { useNavigate, useSearchParams } from "react-router";
import { getHeroesByName } from "../helpers/getHeroesByName";
import { HeroCard } from "../components/HeroCard";


export const SearchPage = React.memo(() => {
 
 const navigate = useNavigate()
 
 let [searchParams] = useSearchParams();
 const query = searchParams.get("q") ?? '';
 const {formState, onInputChange} = useCustomForm({searchText: query})
 
 const foundHero = useMemo(() => getHeroesByName(query), [query])

 const onSearchSumbit = (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  if((formState?.searchText ?? '').trim()===''){
    return;
  }
  navigate(`/search?q=${formState?.searchText}`)
 }
  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        
      <div className="col-5">
        <form onSubmit={(event)=>onSearchSumbit(event)} role="form">
          <input 
          type="text" 
          placeholder="search a hero"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={formState?.searchText || ''}
          onChange={(event)=>onInputChange(event)}
          />
          <button className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      <div className="col-7">
        <h4>Results</h4>
        <hr />

        {
          !foundHero && <div className="alert alert-danger">
          No results for {query}
        </div>
        }

       {
        foundHero &&  <HeroCard hero={foundHero}/>
       }
      </div>
      </div>
    </>

  )
}
)