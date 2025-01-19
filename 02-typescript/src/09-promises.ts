import { getHeroById } from "./08-exports";
import { Hero } from "./data/heroes";

export const getHeroByIdAsync = (id: number): Promise<Hero> => {
    const promise = new Promise<Hero>((resolve, reject) => {
        setTimeout(() => {
            try {
                const hero = getHeroById(id);
                resolve(hero)
            } catch (error) {
                reject(error)
            }
        }, 1000)
    })

    return promise
}

// getHeroByIdAsync(1).then((value) => {
//    console.log(value);
// }).catch((error) => {
//     throw error
// });
