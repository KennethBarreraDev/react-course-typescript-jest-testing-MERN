import { getHeroByIdAsync } from '../src/09-promises'
import { Hero } from '../src/data/heroes'

describe('09-promises.ts', () => {
    test('Should return a promise', () => {
        const heroId = 1;
        const hero = getHeroByIdAsync(heroId);
        console.log(hero);
        expect(hero).toBeInstanceOf(Promise<Hero>);
    })

    test('Should resolve to a Hero object',(done) => {
        const heroId = 1;
        getHeroByIdAsync(heroId).then((hero) => {
            expect(hero).toEqual({
                id: heroId,
                name: expect.any(String),
                owner: expect.any(String),
            })
            done();
        })

    })

    test('Should return an error on missing hero', (done) => {
        const heroId = 1;
        getHeroByIdAsync(heroId).then((hero) => {
            done();
        }).catch((error) => {
            expect(error).toBe('Hero not found');
            done();
        })

    })
})
