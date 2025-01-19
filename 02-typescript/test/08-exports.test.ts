import { getHeroById, getHeroByOwner } from '../src/08-exports'

describe('08-export.ts', () => {
    test('getHeroById should return a hero', () => {

        const heroId = 1
        const hero = getHeroById(heroId)

        expect(hero).toEqual({
            id: heroId,
            name: expect.any(String),
            owner: expect.any(String)
        })
    })

    test('getHeroById should return error on missing hero', () => {

        try {
            const heroId = 9990
            const hero = getHeroById(heroId)
        } catch (error) {
            expect(error).toBe('Hero not found');
        }
    })

    test('getHeroByOwner should return an array of heroes with the given owner', () => {
        const owner = 'DC';
        const result = getHeroByOwner(owner);
    
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              owner: owner,
            }),
          ])
        );
      });

      test('Should throw an error if no heroes match the owner and the input is invalid', () => {
        try {
            const invalidOwner = '';
            const result = getHeroByOwner(invalidOwner)  
        } catch (error) {
            expect(error).toBe('Owner not found')
        }
      });
    
})