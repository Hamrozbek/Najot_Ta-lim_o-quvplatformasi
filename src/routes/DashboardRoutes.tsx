import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboarHome, Grops } from "../pages"

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.home} element={<DashboarHome/>} />
        <Route path={PATH.gropus} element={<Grops />} />
      </Routes>
    </div>
  )
}

export default DashboardRoutes
