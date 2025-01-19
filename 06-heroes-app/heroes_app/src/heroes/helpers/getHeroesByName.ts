import { heroes } from "../data/heroes"

export const getHeroesByName= (filter: string)=>{
    const hero = heroes.find((hero)=>hero.superhero.toUpperCase().trim().includes(filter.toUpperCase().trim()));
    return hero;
}