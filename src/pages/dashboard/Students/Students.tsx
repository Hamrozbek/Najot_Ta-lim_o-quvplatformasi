import { Button, Input, Select } from "antd"
import { CustomTable, PageCaption } from "../../../components"
import { useEffect, useState, type ChangeEvent } from "react"
import { instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import type { StudentType } from "../../../@types/StudentType"
import { MoreOutlined } from "@ant-design/icons"
import debounce from "../../../hooks/debounce"
import { useNavigate } from "react-router-dom"

const Students = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Ismi", dataIndex: "name" },
    { title: "Familiya", dataIndex: "surname" },
    { title: "Guruh", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ]

  const [stacks, setStacks] = useState<{ label: string; value: number }[]>([])

  // search
  const [searchName, setSearchName] = useState<string>("")
  const name = debounce(searchName, 700)
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
    setLoading(true)
  }

  // group / stack filter
  const [groupId, setGroupId] = useState<number | null>(null)
  function handleChooseStack(value: number | null) {
    setGroupId(value)
    setLoading(true)
  }
  // guruhlarni olish
  useEffect(() => {
    instance().get("/groups").then((res) => {
      setStacks(
        res.data.data.map((item: StackType) => ({
          label: item.name,
          value: item.id,
        }))
      )
    }).finally(() => setLoading(false))
  }, [])

  const [students, setStudents] = useState<any[]>([])

  // studentlarni olish
  useEffect(() => {
    setLoading(true)
    instance().get("/students", { params: { name, groupId, status } }).then((res) => {
      const data = res.data.data.map((item: StudentType, index: number) => {
        return {
          ...item,
          key: index + 1,
          stackName: item.group.name,
          statusName: item.status ? "Faol" : "Nofaol",
          action: (<Button onClick={() => handleMore(item.id)} size="middle" icon={<MoreOutlined className="!text-[18px]" />} type="primary" className="!bg-[#bc8e5b] !p-0" />),
        }
      })
      setStudents(data)
    }).finally(() => setLoading(false))
  }, [name, groupId, status])

  function handleMore(id: number) {
    setLoading(true)
    navigate(`/students/${id}`)
  }

  return (
    <div className="p-5 overflow-y-auto h-[100vh]">
      <PageCaption title="Students" count={students.length} />

      <div className="mt-5 flex items-center gap-5">
        <Input onChange={handleSearch} className="!w-[300px]" placeholder="Qidirish" size="large" allowClear />
        <Select onChange={handleChooseStack} className="!w-[300px]" size="large" showSearch placeholder="Guruh tanlang" optionFilterProp="label" allowClear options={stacks} />
      </div>

      <div className="mt-5">
        <CustomTable loading={loading} columns={columns} data={students} />
      </div>
    </div>
  )
}

export default Students
