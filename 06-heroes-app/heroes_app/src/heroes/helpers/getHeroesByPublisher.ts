import { AllowedHeroPublisher, Hero, heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher: AllowedHeroPublisher): Hero[]=>{
    const filterHeroes = heroes.filter((hero)=>hero.publisher==publisher);
    return filterHeroes;
}