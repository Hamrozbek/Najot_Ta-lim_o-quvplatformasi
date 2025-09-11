import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Spin, Modal } from "antd"
import { toast } from "react-toastify"
import { CustomTable } from "../../../components"
import type { GroupsType } from "../../../@types/GroupsType"

const GroupsMore = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [groupData, setGroupData] = useState<GroupsType>()
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Bog'langan ma'lumotlar
  const [groupStudents, setGroupStudents] = useState<GroupsType[]>([])

  // Guruh ma'lumotini olish
  useEffect(() => {
    if (!id) return
    setLoading(true)
    instance().get(`/groups/${id}`).then(res => {
      setGroupData(res.data)
      setGroupStudents(res.data.students || [])
    })
      .catch(() => toast.error("Guruh ma'lumotini olishda xatolik"))
      .finally(() => setLoading(false))
  }, [id])

  function handleDelete() {
    setDeleteModal(true)
  }

  const handleDeleteGroup = () => {
    setDeleteLoading(true)
    instance().delete(`/groups/${id}`)
      .then(() => {
        toast.success("Guruh o‘chirildi!", {
          onClose: () => navigate(-1),
          autoClose: 800
        })
      })
      .catch(() => toast.error("O‘chirishda xatolik"))
      .finally(() => setDeleteLoading(false))
  }

  // O'quvchilar jadvali uchun ustunlar
  const studentColumns = [
    { title: "ID", dataIndex: "key" },
    { title: "Ism", dataIndex: "name" },
    { title: "Familiya", dataIndex: "surname" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Status", dataIndex: "status" },
  ]

  return (
    <div className="p-5 overflow-y-auto h-[100vh]">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="default" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)}>
                <ArrowLeftOutlined className="!text-[20px] cursor-pointer duration-300 hover:scale-[1.1]" />
              </button>
              <h2 className="font-bold text-[22px]">{groupData?.name}</h2>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleDelete} className="!bg-red-500" size="large" type="primary" icon={<DeleteOutlined />} />
              <Button onClick={() => navigate(`/groups/${id}/update`)} className="!bg-green-600" size="large" type="primary" icon={<EditOutlined />}>
                O‘zgartirish
              </Button>
            </div>
          </div>

          {/* Guruh asosiy info */}
          <div className="mt-10 flex justify-center gap-10">
            <div className="p-5 space-y-5 rounded-md border-[2px] border-gray-400 w-[50%]">
              <p><b>ID:</b> {groupData?.id}</p>
              <p><b>Guruh nomi:</b> {groupData?.name}</p>
              <p><b>Yo‘nalish:</b> {groupData?.stack?.name}</p>
              <p><b>Xona:</b> {groupData?.room?.name}</p>
              <p><b>Status:</b> {groupData?.status ? "Aktiv" : "Aktiv emas"}</p>
              <p><b>Yaratilgan sana:</b> {groupData?.createdAt?.split("T")[0]}</p>
            </div>
          </div>

          {/* Bog'langan o'quvchilar jadvali */}
          <div className="mt-10">
            <h2 className="font-bold text-[20px] mb-4">Guruhdagi o‘quvchilar</h2>
            <CustomTable loading={loading} columns={studentColumns} data={groupStudents} />
          </div>
        </>
      )}

      {/* Delete modal */}
      <Modal open={deleteModal} confirmLoading={deleteLoading} title="Guruhni o‘chirmoqchimisiz?" onCancel={() => setDeleteModal(false)} onOk={handleDeleteGroup} okText="O‘chirish" cancelText="Bekor qilish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} />
    </div>
  )
}

export default GroupsMore
