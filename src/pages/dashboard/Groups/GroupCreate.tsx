import { Input, Select } from "antd"
import CreateCaption from "../../../components/CreateCaption"
import { useEffect, useState, type FormEvent } from "react"
import { instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import type { RoomType } from "../../../@types/RoomType"
import type { TeacherType } from "../../../@types/Teachertype"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const GroupCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [stackId, setStackId] = useState<string | null>(null)
  const [roomId, setRoomId] = useState<string | null>(null)
  const [teacherId, setTeacherId] = useState<string>("")
  const [supportTeacherId, setSupportTeacherId] = useState<string>("")


  // stack get all
  const [stacts, setStacks] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])
  // stack get all 

  // rooms get part 
  const [rooms, setRooms] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    instance().get("/rooms").then(res => {
      setRooms(res.data.data.map((item: RoomType) => {
        item.label = item.name
        item.value = item.id
        return item
      }))
    })
  }, [])
  // rooms get part 

  // teacher get all 
  const [teachers, setTeachers] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 1, stackId }
    }).then(res => {
      setTeachers(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      }))
    })
  }, [stackId])
  // teacher get all 

  // support get all 
  const [supportTeacher, setSupportTeacher] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 2, stackId }
    }).then(res => {
      setSupportTeacher(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      }))
    })
  }, [stackId])
  // support get all 

  function handleCreateGroup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = {
      name, stackId, roomId, status: true, 
      mainTeacherIds: [teacherId], 
      supportTeacherIds: [supportTeacherId]
    }
    instance().post("/groups", data).then(() =>{
      toast.success("Muvoffaqiyatli qo'shildi!", {
        onClose: () => {
          setLoading(false)
          navigate(-1)
        }, 
        autoClose: 1000
      })

    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleCreateGroup} autoComplete="off" className="p-4">
      <CreateCaption title="Guruh" isLoading={loading} />
      <div className="flex justify-between w-[80%] mx-auto mt-5">
        <div className="w-[45%] flex flex-col gap-5">
          <Select onChange={(e) => setStackId(e)} className="!w-full" size="large" showSearch placeholder="Yo'nalish tanlang" optionFilterProp="lable" allowClear options={stacts} />
          <Select onChange={(e) => setTeacherId(e)} className="!w-full" size="large" showSearch placeholder="Ustoz tanlang" optionFilterProp="lable" allowClear options={teachers} />
          <Select onChange={(e) => setSupportTeacherId(e)} className="!w-full" size="large" showSearch placeholder="Yordamchi ustoz tanlang" optionFilterProp="lable" allowClear options={supportTeacher} />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={name} onChange={(e) => setName(e.target.value)} size="large" allowClear placeholder="Guruh nomini kiriting" />
          <Select onChange={(e) => setRoomId(e)} className="!w-full" size="large" showSearch placeholder="Xona tanlang" optionFilterProp="lable" allowClear options={rooms} />
        </div>
      </div>
    </form>
  )
}

export default GroupCreate
