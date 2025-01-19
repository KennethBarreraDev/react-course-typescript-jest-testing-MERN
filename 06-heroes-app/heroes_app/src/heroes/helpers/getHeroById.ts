import { heroes } from "../data/heroes";

export const getHeroById = (id: string)=>{
    const hero = heroes.find((hero)=>hero.id==id)
    return hero;
}