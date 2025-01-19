import React from "react"
import { AllowedHeroPublisher } from "../data/heroes"
import { HeroList } from "../components/HeroList"

export const MarvelPage = React.memo(() => {
  return (
    <>
      <h1>
        Marvel comics
      </h1>
      <hr />
       <HeroList publisher={AllowedHeroPublisher.MARVEL_COMICS}/>
    </>
  )
}
)