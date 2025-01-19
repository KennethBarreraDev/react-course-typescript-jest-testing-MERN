import { SearchPage } from "@/heroes/pages/SearchPage"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router"


jest.mock('react-router', () => (
  {
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn()
  }
))

describe('SearchPage.test.tsx', () => {
  const navigateFunction = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateFunction)
  })

  test('Should show hero in screen and input', () => {
    const heroName = 'Batman';
    render(<MemoryRouter initialEntries={[`/search?q=${heroName}`]}>
      <SearchPage />
    </MemoryRouter>)
    expect(screen.getByRole('heading', { level: 5 }).innerHTML).toContain(heroName)
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(heroName)
  })


  test('Should show an error if hero is not found', () => {
    const heroName = 'Gold buster';
    render(<MemoryRouter initialEntries={[`/search?q=${heroName}`]}>
      <SearchPage />
    </MemoryRouter>)
    expect(screen.getByText(`No results for ${heroName}`)).toBeInTheDocument()
  })

  test('Should navigate to hero search', () => {
    const heroName = 'Gold buster';
    render(<MemoryRouter initialEntries={[`/search?q=${heroName}`]}>
      <SearchPage />
    </MemoryRouter>)
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: heroName } }) 

    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement)

    expect(navigateFunction).toHaveBeenCalled()
  })


})
