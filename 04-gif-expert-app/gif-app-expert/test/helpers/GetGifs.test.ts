import {getGifs} from '../../src/helpers/GetGifs'

describe('GetGifs.ts', () => {
  test('Should return an array of GifData', async () => {
    const category = 'cats'; 
    const result = await getGifs(category);
    expect(Array.isArray(result)).toBe(true);
    
    result.forEach((gif) => {
        expect(gif).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String),
          })
        );
      });
    expect(result.length).toBeGreaterThan(0);
  });
});
