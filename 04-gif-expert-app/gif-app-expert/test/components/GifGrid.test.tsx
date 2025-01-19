import { render, screen } from '@testing-library/react';
import { GifGrid } from '@/components/GifGrid';
import { useFetchGifs } from '@/hooks/useFetchGifs';
jest.mock('@/hooks/useFetchGifs')

describe('GifGrid.test', () => {

    const category = 'Cats';
    test('Should show loading text on init', () => {
        (useFetchGifs as jest.Mock).mockReturnValue({
            images: [],
            isLoading: true
        });

        render(<GifGrid category={category} />)
        expect(screen.getByRole('heading', { level: 5 }).innerHTML).toContain('Loading...')
    })

    test('Should show items on gifs load', () => {
        (useFetchGifs as jest.Mock).mockReturnValue({
            images: [
                {
                    url: 'https://giphy.com/gifs/mtv-captain-america-chris-evans-gif-10JhviFuU2gWD6',
                    title: 'haha',
                    id: '10JhviFuU2gWD6',

                }
            ],
            isLoading: false
        });

        render(<GifGrid category={category} />)
        expect(screen.getAllByRole('img').length).toBe(1)

    })
})