import { useEffect, useState, type ChangeEvent } from "react"
import { CustomTable, PageCaption } from "../../../components"
import type { GroupsType } from "../../../@types/GroupsType"
import { instance } from "../../../hooks"
import { Button, Input, Select } from "antd"
import { MoreOutlined } from "@ant-design/icons"
import type { StackType } from "../../../@types/StackType"
import debounce from "../../../hooks/debounce"
import type { TeacherType } from "../../../@types/Teachertype"


const Grops = () => {
  const column = [
    { title: "Id", dataIndex: "key" },
    { title: "Guruh nomi", dataIndex: "name" },
    { title: "Xona", dataIndex: "roomName" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ]
  const [groups, setGroups] = useState<GroupsType[]>([])
  const [teachers, setTeachers] = useState<{ label: string, value: string }[]>([])
  const [stacks, setStacks] = useState<{ label: string, value: string }[]>([])

  // search part 
  const [loading, setLoading] = useState<boolean>(true)
  const [searchName, setSearchName] = useState<string | undefined>("")
  const name = debounce(searchName, 700)
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
    setLoading(true)
  }
  // search part 
 
  // stack change part 
  const [stackId, setStackId] = useState<string | null>(null)
  function handleChooseStack(e: string) {
    setStackId(e)
    setLoading(true)
  }
  // stack change part

  // teacher part 
  const [mainTeacherId, setMainTeacherId] = useState<string | null>(null)
  function handleChooseTeacher(e: string) {
    setMainTeacherId(e)
    setLoading(true)
  }
  // teacher part 

  // groups get all 
  useEffect(() => {
    instance().get("/groups", {
      params: { name, mainTeacherId, stackId }
    }).then(res => {
      setGroups(res.data.data.map((item: GroupsType, index: number) => {
        item.key = index + 1
        item.roomName = item.room.name
        item.stackName = item.stack.name
        item.action = <Button size="middle" icon={<MoreOutlined className="!text-[18px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      }))
    }).finally(() => {
      setLoading(false)
    })
  }, [name, mainTeacherId, stackId])
  // groups get all 

  // stack get all
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  // stack get all 

  // teacher get all 
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 1, stackId }
    }).then(res => {
      setTeachers(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      })) 
    }).finally(() => {
      setLoading(false)
    })
  }, [stackId])
  // teacher get all 


  return (
    <div className="p-5">
      <PageCaption title="Guruhlar" count={groups.length} />
      <div className="flex items-center gap-[10px] mt-5">
        <Input onChange={handleSearch} className="!w-[300px]" placeholder="Qidirish" size="large" allowClear />
        <Select onChange={handleChooseStack} className="!w-[300px]" size="large" showSearch placeholder="Yo'nalish tanlang" optionFilterProp="lable" allowClear options={stacks} />
        <Select onChange={handleChooseTeacher} className="!w-[300px]" size="large" showSearch placeholder="Ustoz tanlang" optionFilterProp="lable" allowClear options={teachers} />
      </div>
      <div className="mt-5">
        <CustomTable loading={loading} columns={column} data={groups}/>
      </div>
    </div>
  )
}

export default Grops
