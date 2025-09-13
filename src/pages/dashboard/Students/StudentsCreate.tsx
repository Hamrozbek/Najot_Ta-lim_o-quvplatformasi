import { Input, Select } from "antd"
import CreateCaption from "../../../components/CreateCaption"
import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import type { RegionType } from "../../../@types/RegionType"
import type { StudentType } from "../../../@types/StudentType"
import { toast } from "react-toastify"

const StudentsCreate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false)

  const [studentId, setStudentId] = useState<number | undefined>()
  const [name, setName] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [age, setAge] = useState<number | undefined>()
  const [groupId, setGroupId] = useState<number | undefined>()
  const [regionId, setRegionId] = useState<number | undefined>()
  const [district, setDistrict] = useState<string>("")
  const [study, setStudy] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [status, setStatus] = useState<boolean>(true) 

  const [groups, setGroups] = useState<{ label: string; value: string }[]>([])
  const [regions, setRegions] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    instance().get("/groups").then(res => {
      setGroups(res.data.data.map((item: { id: number; name: string }) => ({
        label: item.name,
        value: item.id
      })))
    })
    instance().get("/regions").then(res => {
      setRegions(res.data.data.map((item: RegionType) => ({
        label: item.name,
        value: item.id
      })))
    })
  }, [])

  useEffect(() => {
    if (!id) return
    setLoading(true)
    instance().get(`/students/${id}`).then((res) => {
      const data: StudentType = res.data
      setStudentId(data.studentId)
      setName(data.name)
      setSurname(data.surname)
      setAge(data.age)
      setGroupId(data.groupId)
      setRegionId(data.regionId)
      setDistrict(data.district)
      setStudy(data.study)
      setPhone(data.phone)
      setEmail(data.email)
      setStatus(data.status)
    })
      .catch(() => toast.error("Student ma’lumotini olishda xatolik"))
      .finally(() => setLoading(false))
  }, [id])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const data = { 
      studentId, name, surname, age, groupId, regionId, district, study, phone, email, status}

    const request = id ? instance().patch(`/students/${id}`, data) : instance().post(`/students`, data)

    request.then(() => {
      toast.success(id ? "Ma’lumotlar yangilandi" : "Student qo‘shildi", {
        onClose: () => navigate(-1),
        autoClose: 1000,
      })
    }).catch(() => toast.error("Xatolik yuz berdi"))
      .finally(() => setLoading(false))
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="p-5 h-[calc(100vh-60px)] overflow-y-auto">
      <CreateCaption isLoading={loading} title={id ? "O'quvchi yangilash" : "O'quvchi qo‘shish"} />
      <div className="flex mt-5 justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={studentId ?? ''} onChange={(e) => setStudentId(Number(e.target.value))} allowClear placeholder="Student ID kiriting" size="large" />
          <Input value={name} onChange={(e) => setName(e.target.value)} allowClear placeholder="Ism" size="large" />
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} allowClear placeholder="Familiya" size="large" />
          <Input value={age ?? ''} onChange={(e) => setAge(Number(e.target.value))} allowClear placeholder="Yosh" size="large" />
          <Select value={groupId} onChange={(v) => setGroupId(Number(v))} className="!w-full" size="large" showSearch placeholder="Guruh tanlang" optionFilterProp="label" allowClear options={groups} />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Select value={regionId} onChange={(v) => setRegionId(Number(v))} className="!w-full" size="large" showSearch placeholder="Viloyat tanlang" optionFilterProp="label" allowClear options={regions} />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} allowClear placeholder="Telefon" size="large" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} allowClear placeholder="Email" size="large" />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} allowClear placeholder="Tuman" size="large" />
          <Input value={study} onChange={(e) => setStudy(e.target.value)} allowClear placeholder="O‘qish joyi" size="large" />
          <Select
            value={status}
            onChange={(v) => setStatus(v)}
            className="!w-full"
            size="large"
            placeholder="Status tanlang"
            options={[
              { label: "Faol", value: true },
              { label: "Nofaol", value: false }
            ]}
          />
        </div>
      </div>
    </form>
  )
}

export default StudentsCreate
