import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API, instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { toast } from "react-toastify"
import { CustomTable } from "../../../components"
import type { GroupsType } from "../../../@types/GroupsType"

const StackMore = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [stackData, setStackData] = useState<StackType>()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    // Delete part
    const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
    const [deletLoading, setDeleteLoading] = useState<boolean>(false)

    function handleDelete() {
        setDeleteModal(true)
        setDeleteId(id)
    }

    function handleDeleteStack() {
        setDeleteLoading(true)
        instance().delete(`/stacks/${deleteId}`).then(() => {
            toast.success("O'chirildi!", {
                onClose: () => {
                    setDeleteLoading(false)
                    setDeleteModal(false)
                    navigate(-1)
                },
                autoClose: 1000,
            })
        }).catch(() => {
            toast.error("Bu yonalish ichida guruh mavjud!", {
                onClose: () => {
                    setDeleteLoading(false)
                    setDeleteModal(false)
                },
                autoClose: 1000,
            })
        })
    }
    // Delete part


    useEffect(() => {
        instance().get(`/stacks/${id}`).then(res => {
            setStackData(res.data)
        })
    }, [])

    // shu stack guruh 
    const [stackGroups, setStackGroups] = useState([])
    const column = [
        { title: "ID", dataIndex: "id" },
        { title: "Guruh nomi", dataIndex: "name" },
        { title: "Xona", dataIndex: "roomName" },
        { title: "Yonalish", dataIndex: "stackName" },
        { title: "Batafsil", dataIndex: "action" }
    ]

    // handleMoreBtn part 
    const [selectedGroup, setSelectedGroup] = useState<GroupsType | null>(null)
    const [groupModal, setGroupModal] = useState<boolean>(false)
    function handleMoreBtn(group: GroupsType) {
        setSelectedGroup(group)
        setGroupModal(true)
    }
    // handleMoreBtn part 

    // shu stackdagai guruhlar 
    useEffect(() => {
        instance().get("/groups", { params: { stackId: id } }).then(res => {
            setStackGroups(res.data.data.map((item: GroupsType, index: number) => {
                item.key = index + 1
                item.roomName = item.room.name
                item.stackName = item.stack.name
                item.action = <Button onClick={() => handleMoreBtn(item)} size="middle" type="primary" className="!bg-[#bc8e5b] !text-[20px]" icon={<MoreOutlined />}></Button>
                return item
            }));
        })
    }, [])

    return (
        <div className="p-5 overflow-y-auto h-[100vh]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)}><ArrowLeftOutlined className="!text-[20px] cursor-pointer duration-300 hover:scale-[1.1]" /> </button>
                    <h2 className="font-bold text-[22px]">{stackData?.name}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={() => handleDelete()} className="!bg-red-500" size="large" type="primary" icon={<DeleteOutlined className="!text-[20px]" />}></Button>
                    <Button onClick={() => navigate("update")} className="!bg-green-600" size="large" type="primary" icon={<EditOutlined className="!text-[20px]" />}>O'zgartirish</Button>
                </div>
            </div>
            <div className="mt-[40px] flex justify-center gap-5">
                <ul className="p-5 space-y-5 rounded-md border-[2px] border-gray-400 w-[40%]">
                    <li>
                        <span className="text-slate-500">#</span>
                        <p className="text-[18px] font-semibold">{id}</p>
                    </li>
                    <li>
                        <span className="text-slate-500">Yonalish nomi</span>
                        <p className="text-[18px] font-semibold">{stackData?.name}</p>
                    </li>
                    <li>
                        <span className="text-slate-500">Yaratilgan vaqti</span>
                        <p className="text-[18px] font-semibold">{stackData?.createdAt?.split("T")[0]} & {stackData?.createdAt?.split("T")[1].split(".")[0]}</p>
                    </li>
                </ul>
                <img className="rounded-md object-cover" src={`${API}/file/${stackData?.image}`} alt="stack img" width={350} height={250} />
            </div>
            <div className="mt-10 mb-10">
                <CustomTable columns={column} data={stackGroups} />
            </div>

            <Modal open={groupModal} onCancel={() => setGroupModal(false)} footer={false} title="Guruh haqida ma'lumot">
                <ul className="space-y-3">
                    <li><b>ID:</b> {selectedGroup?.id}</li>
                    <li><b>Nomi:</b> {selectedGroup?.name}</li>
                    <li><b>Xona:</b> {selectedGroup?.roomName}</li>
                    <li><b>Yo‘nalish:</b> {selectedGroup?.stackName}</li>
                    <li><b>Yaratilgan vaqti:</b> {selectedGroup?.createdAt?.split("T")[0]} & {selectedGroup?.createdAt?.split("T")[1]?.split(".")[0]}</li>
                </ul>
            </Modal>

            <Modal confirmLoading={deletLoading} okText="O'chirish" cancelText="Bekor qilish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleDeleteStack} title={"O'chirmoqchimisiz ?"}></Modal>
        </div>
    )
}

export default StackMore
