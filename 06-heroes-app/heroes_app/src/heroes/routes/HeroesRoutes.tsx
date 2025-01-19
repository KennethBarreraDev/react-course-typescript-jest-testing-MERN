import { Route, Routes } from "react-router"
import { Navbar } from "../../globals/components/NavBar"
import { MarvelPage } from "../pages/MarvelPage"
import { DcPage } from "../pages/DcPage"
import { SearchPage } from "../pages/SearchPage"
import { HeroPage } from "../pages/HeroPage"
export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MarvelPage />} />
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />
        </Routes>
      </div>
    </>
  )
}
