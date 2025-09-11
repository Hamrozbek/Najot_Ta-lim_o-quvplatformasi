import { Button, Input, Select } from "antd"
import { CustomTable, PageCaption } from "../../../components"
import { useEffect, useState, type ChangeEvent } from "react"
import { instance } from "../../../hooks"
import type { TeacherType } from "../../../@types/Teachertype"
import { MoreOutlined } from "@ant-design/icons"
import debounce from "../../../hooks/debounce"
import type { StackType } from "../../../@types/StackType"
import { useNavigate } from "react-router-dom"

const Teachers = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "Ismi", dataIndex: "name" },
    { title: "Familiya", dataIndex: "surname" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Lavozim", dataIndex: "statusName" },
    { title: "Batafsil", dataIndex: "action" },
  ]
  const [stacks, setStacks] = useState<{ label: string, value: string }[]>([])
  const [statusId, setStatusId] = useState<{ label: string, value: string }[]>([])

  // search part 
  const [searchName, setSearchName] = useState<string | undefined>("")
  const name = debounce(searchName, 700)
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
    setLoading(true)
  }

  // stack change part 
  const [stackId, setStackId] = useState<string | null>(null)
  function handleChooseStack(e: string) {
    setStackId(e)
    setLoading(true)
  }

  // status part
  const [status, setStatus] = useState<string | null>(null)
  function handleChooseStatus(e: string) {
    setStatus(e)
    setLoading(true)
  }

  // stack get all
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => ({
        label: item.name,
        value: item.id,
      })))
    }).finally(() => setLoading(false))
  }, [])

  // Status get all
  useEffect(() => {
    instance().get("/status").then(res => {
      setStatusId(res.data.data.map((item: { id: string; name: string }) => ({
        label: item.name,
        value: item.id,
      })))
    }).finally(() => setLoading(false))
  }, [])

  // Teacher get all
  const [teachers, setTeachers] = useState<TeacherType[]>([])
  useEffect(() => {
    setLoading(true)
    instance().get("/teachers", {
      params: { name, stackId, statusId: status || undefined },
    }).then(res => {
      const data = res.data.data.map((item: TeacherType, index: number) => {
        item.key = index + 1
        item.stackName = item.stack.name
        item.statusName = item.status.name
        item.action = <Button onClick={() => handleMore(item.id)}  size="middle" icon={<MoreOutlined className="!text-[18px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      })
      setTeachers(data)
    }).finally(() => setLoading(false))
  }, [name, stackId, status])

  function handleMore(id: number) {
    setLoading(true)
    navigate(`/teachers/${id}`)
  }


  return (
    <div className="p-5 overflow-y-auto h-[100vh]">
      <PageCaption title="Teachers" count={teachers.length} />
      <div className="mt-5 flex items-center gap-5">
        <Input onChange={handleSearch} className="!w-[300px]" placeholder="Qidirish" size="large" allowClear />
        <Select onChange={handleChooseStack} className="!w-[300px]" size="large" showSearch placeholder="Yo'nalish tanlang" optionFilterProp="label" allowClear options={stacks} />
        <Select onChange={handleChooseStatus} className="!w-[300px]" size="large" showSearch placeholder="Status tanlang" optionFilterProp="label" allowClear options={statusId} />
      </div>
      <div className="mt-5">
        <CustomTable loading={loading} columns={column} data={teachers} />
      </div>
    </div>
  )
}

export default Teachers
