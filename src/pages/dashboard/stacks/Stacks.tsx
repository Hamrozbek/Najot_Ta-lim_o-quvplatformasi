import { useEffect, useState } from "react"
import { PageCaption, StackSkeleton } from "../../../components"
import { API, instance } from "../../../hooks"
import { Card } from "antd"
import type { StackType } from "../../../@types/StackType"
import { useNavigate } from "react-router-dom"

const Stacks = () => {
  const [stacks, setStacks] = useState<StackType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    instance().get("/stacks").then(res => {
      setStacks(res.data.data);
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4">
      <div className="bg-white overflow-y-auto h-[100vh] p-4 rounded-md">
        <PageCaption title="Yo'nalishlar" count={stacks.length} />
        <div className="flex justify-between flex-wrap gap-3 mt-[20px] pb-20">

          {loading ? <StackSkeleton /> : stacks.map(item => (
            <Card onClick={() => navigate(`${item.id}`)} key={item.id} hoverable style={{ width: 250 }} cover={<img className="h-[150px] w-[250px] object-cover" alt="example" src={`${API}/file/${item.image}`} />}>
              <Card.Meta title={item.name} description={`Yaratilgan sana: ${item.createdAt.split("T")[0]}`} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stacks
