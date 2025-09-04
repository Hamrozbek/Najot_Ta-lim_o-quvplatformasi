import { useEffect, useState } from "react"
import { PageCaption, StackSkeleton } from "../../components"
import { API, instance } from "../../hooks"
import { Button, Card, message } from "antd"
import type { StackType } from "../../@types/StackType"
import { DeleteFilled, EditFilled } from "@ant-design/icons"

const Stacks = () => {
  const [stacks, setStacks] = useState<StackType[]>([])
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    setLoading(true)
    instance().get("/stacks").then(res => {
      setStacks(res.data.data);
      setLoading(false)
    })
  }, [])
  console.log(stacks);

  
 const handleDelete = (id: number) => {
    instance().delete(`/stacks/${id}`).then(() => {
      setStacks(prev => prev.filter(item => item.id !== id))
      message.success("Stack muvaffaqiyatli o‘chirildi")
    }).catch(err => {
      console.error(err)
      message.error("O'chirishda xato")
    })
  }


  return (
    <div className="p-5">
      <div className="bg-white overflow-y-auto h-[100vh] p-5 rounded-md">
        <PageCaption title="Yo'nalishlar" count={stacks.length} />
        <div className="flex justify-between flex-wrap gap-8 mt-[20px] pb-20">
          {loading ? <StackSkeleton /> : stacks.map(item => (
            <Card key={item.id} hoverable style={{ width: 300 }} cover={<img className="h-[180px] w-[300px] object-cover" alt="example" src={`${API}/file/${item.image}`} />}>
              <Card.Meta title={item.name} description={`Yaratilgan sana: ${item.createdAt.split("T")[0]}`} />
              <div className="flex justify-between mt-4">
                <Button className="!bg-green-600 !w-[15%]" type="primary" icon={<EditFilled className="!text-[18px]" />} size="large"></Button>
                <Button onClick={() => handleDelete(item.id)} className="!bg-red-500 !w-[15%]" type="primary" icon={<DeleteFilled className="!text-[18px]" />} size="large"></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stacks
