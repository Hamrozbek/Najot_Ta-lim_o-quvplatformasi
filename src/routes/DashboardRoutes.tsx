import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboarHome, Grops, StackCreate, StackMore, Stacks, Students, Teachers } from "../pages"
import { Header, Navbar } from "../modules"
import { useState } from "react"
import GroupCreate from "../pages/dashboard/GroupCreate"
import TeacherCreate from "../pages/dashboard/TeacherCreate"
import StudentsCreate from "../pages/dashboard/StudentsCreate"

const DashboardRoutes = () => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const routList = [
    {id:1, path:PATH.stacks, element:<Stacks/>},
    {id:2, path:PATH.gropus, element:<Grops/>},
    {id:3, path:PATH.teachers, element:<Teachers/>},
    {id:4, path:PATH.students, element:<Students/>},
    {id:5, path:PATH.home, element:<DashboarHome/>},
    {id:6, path:PATH.stacksCreate, element:<StackCreate/>},
    {id:7, path:PATH.stacksUpdate, element:<StackCreate/>},
    {id:8, path:PATH.stacksMore, element:<StackMore/>},
    {id:9, path:PATH.groupsCreate, element:<GroupCreate/>},
    {id:10, path:PATH.teachersCreate, element:<TeacherCreate/>},
    {id:11, path:PATH.studentsCreate, element:<StudentsCreate/>}
  ] 

  return (
    <div className="flex">
      <Navbar collapse={collapse} />
      <div className={`${collapse ? "w-full" : "w-[82%]"}`}>         
        <Header setCollapse={setCollapse} collapse={collapse} />
        <Routes>{routList.map(item => <Route key={item.id} path={item.path} element={item.element}/>)}</Routes>
      </div>
    </div>
  )
}

export default DashboardRoutes
