import React, { useMemo } from "react";
import { AllowedHeroPublisher } from "../data/heroes";
import { getHeroesByPublisher } from "../helpers/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

type HeroListProps = {
    publisher: AllowedHeroPublisher
}

export const HeroList = React.memo(({ publisher }: HeroListProps) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-3">
            {heroes.map((hero) => 
              <HeroCard key={hero.id} hero={hero}/>
            )}
        </div>
    );
});
