import { GifGridItem } from '../../src/components/GifGridItem'
import { render, screen } from '@testing-library/react'

describe('GifGridItem', () => {
  const url: string = 'https://giphy.com/gifs/mtv-captain-america-chris-evans-gif-10JhviFuU2gWD6';
  const title: string = 'haha';
  const id: string = '10JhviFuU2gWD6';

  test('Should match snapshot', () => {   
    const gifGridItem = render(<GifGridItem id={id} title={title} url={url} />)
    expect(gifGridItem).toMatchSnapshot()
  })

  test("Should render argument url", () => {
   render(<GifGridItem id={id} title={title} url={url} />)
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', url);
    expect(imgElement).toHaveAttribute('alt', title);

  })

  test("Should render title in component", () => {
    render(<GifGridItem id={id} title={title} url={url} />)
    const paragraphElement = screen.getByRole('paragraph');
    expect(paragraphElement).toHaveAttribute('id', id);
    expect(paragraphElement.innerHTML).toContain(title);

  })
})