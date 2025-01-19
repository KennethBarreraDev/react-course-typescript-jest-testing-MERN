import React from "react"
import { HeroList } from "../components/HeroList"
import { AllowedHeroPublisher } from "../data/heroes"

export const DcPage = React.memo(
  () => {
    return (
     <>
     <h1>Dc comics</h1>
     <hr />
     <HeroList publisher={AllowedHeroPublisher.DC_COMICS}/>
     </>
    )
  }
)
