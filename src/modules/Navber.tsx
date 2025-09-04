import { Menu } from "antd"
import { LogoIcon } from "../assets/icons"
import { OpenAIOutlined, StarOutlined, UngroupOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { PATH } from "../components"
import { useEffect, useState, type FC } from "react"
import { instance } from "../hooks"
import type { MeType } from "../@types/MeType"


const Navbar:FC<{collapse:boolean}> = ({collapse}) => {
  const [me, setMe] =useState<MeType>({})
  const items = [
    {key: "1", icon:<StarOutlined className="!text-[20px]"/>, label: <Link className="!text-[16px]" to={PATH.stacks}>Yo'nalishlar</Link> },
    {key: "2", icon:<UngroupOutlined className="!text-[20px]" />, label: <Link className="!text-[16px]" to={PATH.gropus}>Guruhlar</Link> },
    {key: "3", icon:<UserOutlined className="!text-[20px]" />, label: <Link className="!text-[16px]" to={PATH.teachers}>Ustozlar</Link> },
    {key: "4", icon:<OpenAIOutlined className="!text-[20px]" />, label: <Link className="!text-[16px]" to={PATH.students}>O'quvchilar</Link> }
  ] 
 
  useEffect(() => {
    instance().get("/user/me").then(res => setMe(res.data))
  },[])
  console.log(me);
  
  return (
    <div className={`${collapse ? "w-[80px]" : "w-[18%]"} overflow-y-auto duration-300 h-[100vh] bg-[#001529]`}>
      <div className="p-[8px] mb-[10px] border-b-[1px] flex items-center gap-[10px] border-white">
        <LogoIcon classList="!w-[55px]" />
        {collapse ? "" : <span className="font-medium text-[20px] text-white capitalize">{me.role?.toLowerCase()}</span>}
      </div>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={collapse}
       items={items}
      />
    </div>
  )
}

export default Navbar
