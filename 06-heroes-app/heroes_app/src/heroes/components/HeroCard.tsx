import React, { useMemo } from "react"
import { Hero } from "../data/heroes"
import { Link } from "react-router"

type HeroCardProps = {
    hero: Hero
}

export const HeroCard = React.memo(({ hero }: HeroCardProps) => {

    const heroImageUrl = useMemo(() => `/assets/heroes/${hero.id}.jpg`, [hero])
    return (
        <div className="col" key={hero.id}>
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={heroImageUrl} alt={hero.superhero} className="card-img" />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {hero.superhero}
                            </h5>
                            {
                                hero.alter_ego != hero.characters ?
                                    <div>
                                        <p>{hero.alter_ego}</p>
                                        <p>{hero.characters}</p>
                                    </div> :
                                    <div>
                                        <p>{hero.alter_ego}</p>
                                    </div>
                            }

                            <p className="card-text">
                                <small className="text-muted">{hero.first_appearance}</small>
                            </p>

                            <Link to={`/hero/${hero.id}`}>
                                More...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
)