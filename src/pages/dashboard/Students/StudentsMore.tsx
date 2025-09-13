import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, Spin } from "antd"
import { toast } from "react-toastify"
import type { StudentType } from "../../../@types/StudentType"
import type { TeacherType } from "../../../@types/Teachertype"

const StudentsMore = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [studentData, setStudentData] = useState<StudentType>()
    const [teacher, setTeacher] = useState<TeacherType>()
    const [loading, setLoading] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)


    // Student ma'lumotlarini olish
    useEffect(() => {
        if (!id) return
        setLoading(true)
        instance().get(`/students/${id}`)
            .then(async (res) => {
                setStudentData(res.data)
                if (res.data.teacherId) {
                    const teacherRes = await instance().get(`/teachers/${res.data.teacherId}`)
                    setTeacher(teacherRes.data)
                }
            })
            .catch(() => toast.error("Student ma'lumotini olishda xatolik"))
            .finally(() => setLoading(false))
    }, [id])


    // Delete
    function handleDelete() {
        setDeleteModal(true)
    }

    function handleDeleteStudent() {
        setDeleteLoading(true)
        instance().delete(`/students/${id}`).then(() => {
            toast.success("Student o‘chirildi!", {
                onClose: () => navigate(-1),
                autoClose: 800,
            })
        })
        .catch(() => toast.error("O‘chirishda xatolik"))
        .finally(() => setDeleteLoading(false))
    }

    return (
        <div className="p-5 overflow-y-auto h-[100vh]">
            {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                    <Spin size="default" />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate(-1)}>
                                <ArrowLeftOutlined className="!text-[20px] cursor-pointer duration-300 hover:scale-[1.1]" />
                            </button>
                            <h2 className="font-bold text-[22px]">
                                {studentData?.name} {studentData?.surname}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button onClick={handleDelete} className="!bg-red-500" size="large" type="primary" icon={<DeleteOutlined className="!text-[20px]" />} />
                            <Button onClick={() => navigate(`/students/${id}/update`)} className="!bg-green-600" size="large" type="primary" icon={<EditOutlined className="!text-[20px]" />}>
                                O‘zgartirish
                            </Button>
                        </div>
                    </div>

                    {/* Ma'lumotlar */}
                    <div className="flex justify-center gap-10 mt-5">
                        <div className="p-5 space-y-5 rounded-md border-[2px] border-gray-400 w-[40%]">
                            <div>
                                <span className="text-slate-500">ID</span>
                                <p className="text-[18px] font-semibold">{studentData?.studentId}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Ismi</span>
                                <p className="text-[18px] font-semibold">{studentData?.name}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Familiyasi</span>
                                <p className="text-[18px] font-semibold">{studentData?.surname}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Yosh</span>
                                <p className="text-[18px] font-semibold">{studentData?.age} Yosh</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Yo‘nalish</span>
                                <p className="text-[18px] font-semibold">{studentData?.study}</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-5 rounded-md border-[2px] border-gray-400 w-[40%]">
                            <div>
                                <span className="text-slate-500">Telefon</span>
                                <p className="text-[18px] font-semibold">{studentData?.phone}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Email</span>
                                <p className="text-[18px] font-semibold">{studentData?.email}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Tuman</span>
                                <p className="text-[18px] font-semibold">{studentData?.district}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Viloyat ID</span>
                                <p className="text-[18px] font-semibold">{studentData?.regionId}</p>
                            </div>
                            <div>
                                <span className="text-slate-500">Guruh ID</span>
                                <p className="text-[18px] font-semibold">{studentData?.groupId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-slate-600 pt-5">
                        <h2 className="text-[20px] font-bold mb-3">Ustoz ma’lumotlari</h2>
                        {teacher ? (
                            <div className="space-y-3">
                                <p><span className="text-slate-500">Ismi:</span> {teacher.name}</p>
                                <p><span className="text-slate-500">Familiyasi:</span> {teacher.surname}</p>
                                <p><span className="text-slate-500">Email:</span> {teacher.email}</p>
                                <p><span className="text-slate-500">Telefon:</span> {teacher.phone}</p>
                            </div>
                        ) : (
                            <p className="text-slate-500">Ustoz topilmadi</p>
                        )}
                    </div>
                </>
            )}

            {/* Delete modal */}
            <Modal confirmLoading={deleteLoading} okText="O‘chirish" cancelText="Bekor qilish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleDeleteStudent} title={"Studentni o‘chirmoqchimisiz ?"} />
        </div>
    )
}

export default StudentsMore
