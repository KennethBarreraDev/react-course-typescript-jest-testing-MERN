import {Hero, heroes} from './data/heroes'

export const getHeroById = (id: number): Hero=>{
    const hero = heroes.find((hero)=>hero.id===id);
    if(!hero){
        throw 'Hero not found';
    }
    return hero
}

export const getHeroByOwner = (owner: string): Hero[]=>{
    const heroesFilter = heroes.filter((hero)=>hero.owner===owner);
    if(!heroesFilter){
        throw 'Owner not found';
    }
    return heroesFilter
}


// console.log(getHeroById(1));
// console.log(getHeroByOwner('Marvel'));


