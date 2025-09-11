import { Input, Select } from "antd"
import CreateCaption from "../../../components/CreateCaption"
import { useEffect, useState, type FormEvent } from "react"
import { instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import type { RegionType } from "../../../@types/RegionType"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const TeacherForm = () => {
  const navigate = useNavigate()
  const { id } = useParams() 

  const [loading, setLoading] = useState<boolean>(false)

  // Form state
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [age, setAge] = useState("")
  const [stackId, setStackId] = useState<string>()
  const [regionId, setRegionId] = useState<string>()
  const [district, setDistrict] = useState("")
  const [statusId, setStatusId] = useState<string>()
  const [experience, setExperience] = useState("")
  const [gender, setGender] = useState()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [study, setStudy] = useState("")
  const [isMerried, setIsMerried] = useState()
  const [workCompanyIds, setWorkCompanyIds] = useState<string[]>([])


  // Dropdownlar
  const [stacks, setStacks] = useState<{ label: string, value: string }[]>([])
  const [regions, setRegions] = useState<{ label: string, value: string }[]>([])
  const [status, setStatus] = useState<{ label: string, value: string }[]>([])
  const [workList, setWorkList] = useState<{ label: string, value: string }[]>([])

  useEffect(() => {
    instance().get("/stacks").then(res => setStacks(res.data.data.map((item: StackType) => ({ label: item.name, value: item.id }))))
    instance().get("/regions").then(res => setRegions(res.data.data.map((item: RegionType) => ({ label: item.name, value: item.id }))))
    instance().get("/status").then(res => setStatus(res.data.data.map((item: any) => ({ label: item.name, value: item.id }))))
    instance().get("/work-lists").then(res => setWorkList(res.data.data.map((item: any) => ({ label: item.name, value: item.id }))))
  }, [])

  // Update rejimida ma’lumotlarni olish
  useEffect(() => {
    if (!id) return
    setLoading(true)
    instance().get(`/teachers/${id}`).then(res => {
        const t = res.data
        setName(t.name)
        setSurname(t.surname)
        setAge(t.age?.toString())
        setStackId(t.stackId?.toString())
        setRegionId(t.regionId?.toString())
        setDistrict(t.district)
        setStatusId(t.statusId?.toString())
        setExperience(t.experience)
        setGender(t.gender)
        setEmail(t.email)
        setPhone(t.phone)
        setStudy(t.study)
        setIsMerried(t.isMerried)
        setWorkCompanyIds(t.workCompanyIds?.[0]?.toString())
      })
      .finally(() => setLoading(false))
  }, [id])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = {
      name,
      surname,
      age: Number(age),
      stackId: Number(stackId),
      regionId: Number(regionId),
      district,
      statusId: Number(statusId),
      experience,
      gender,
      email,
      phone,
      study,
      isMerried,
      workCompanyIds: workCompanyIds ? [Number(workCompanyIds)] : []
    }

    const request = id ? instance().patch(`/teachers/${id}`, data) : instance().post("/teachers", data)

    request
      .then(() => {
        toast.success(id ? "O‘qituvchi" : "O‘qituvchi", { autoClose: 1000, onClose: () => navigate(-1) })
      })
      .finally(() => setLoading(false))
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="p-5 h-[calc(100vh-60px)] overflow-y-auto">
      <CreateCaption isLoading={loading} title={id ? "Ustozni" : "Ustoz"} />
      <div className="flex mt-5 justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ism" size="large" allowClear />
          <Input value={surname} onChange={e => setSurname(e.target.value)} placeholder="Familiya" size="large" allowClear />
          <Input value={age} onChange={e => setAge(e.target.value)} placeholder="Yosh" size="large" allowClear />
          <Select value={stackId} onChange={e => setStackId(e)} placeholder="Yo‘nalish" size="large" options={stacks} allowClear />
          <Select value={regionId} onChange={e => setRegionId(e)} placeholder="Viloyat" size="large" options={regions} allowClear />
          <Input value={district} onChange={e => setDistrict(e.target.value)} placeholder="Tuman" size="large" allowClear />
          <Select value={statusId} onChange={e => setStatusId(e)} placeholder="Lavozim" size="large" options={status} allowClear />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={experience} onChange={e => setExperience(e.target.value)} placeholder="Tajriba" size="large" allowClear />
          <Select value={gender} onChange={e => setGender(e)} placeholder="Jinsi" size="large" options={[{ label: "Erkak", value: "Erkak" }, { label: "Ayol", value: "Ayol" }]} allowClear />
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" size="large" allowClear />
          <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefon" size="large" allowClear />
          <Input value={study} onChange={e => setStudy(e.target.value)} placeholder="O‘qish joyi" size="large" allowClear />
          <Select value={isMerried} onChange={e => setIsMerried(e)} placeholder="Turmush qurgan?" size="large" options={[{ label: "Ha", value: "Ha" }, { label: "Yuq", value: "Yuq" }]} allowClear />
          <Select value={workCompanyIds} onChange={e => setWorkCompanyIds(e)} placeholder="Ish joyi" size="large" options={workList} allowClear />
        </div>
      </div>
    </form>
  )
}

export default TeacherForm
