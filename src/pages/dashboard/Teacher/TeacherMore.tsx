import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { toast } from "react-toastify";
import { CustomTable } from "../../../components";
import type { TeacherType } from "../../../@types/Teachertype";
import type { GroupsType } from "../../../@types/GroupsType";

const TeacherMore = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacherData, setTeacherData] = useState<TeacherType | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [teacherGroups, setTeacherGroups] = useState<GroupsType[]>([]);

  // Table columns
  const groupColumns = [
    { title: "ID", dataIndex: "key" },
    { title: "Guruh nomi", dataIndex: "name" },
    { title: "Yo‘nalish", render: (record: GroupsType) => record.stack?.name || "" },
    { title: "Xona", render: (record: GroupsType) => record.room?.name || "" },
    { title: "Status", render: (record: GroupsType) => record.status ? "Faol" : "Nofaol"},
    { title: "Yaratilgan sana", render: (record: GroupsType) => record.createdAt?.split("T")[0] || "" },
  ];

  // Fetch teacher info
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    instance().get(`/teachers/${id}`).then(res => setTeacherData(res.data))
      .catch(() => toast.error("O'qituvchi ma'lumotini olishda xatolik"))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch teacher groups
  useEffect(() => {
    if (!id) return;
    Promise.all([
      instance().get(`/groups?mainTeacherId=${id}`),
      instance().get(`/groups?assistantTeacherId=${id}`)
    ]).then(([mainRes, assistantRes]) => {
      const allGroups = [...mainRes.data.data, ...assistantRes.data.data].map((item, index) => ({
        ...item,
        key: index
      }));
      setTeacherGroups(allGroups);
    })
      .catch(() => toast.error("Ustoz guruhlarini olishda xatolik"));
  }, [id]);

  // Delete teacher
  const handleDeleteTeacher = () => {
    setDeleteLoading(true);
    instance().delete(`/teachers/${id}`).then(() => {
      toast.success("O‘qituvchi o‘chirildi!", {
        onClose: () => navigate(-1),
        autoClose: 800
      });
    })
      .catch(() => toast.error("O‘chirishda xatolik"))
      .finally(() => setDeleteLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-5 overflow-y-auto h-[100vh]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="!text-[20px] cursor-pointer hover:scale-110 duration-200" />
          </button>
          <h2 className="font-bold text-[22px]">
            {teacherData?.name} {teacherData?.surname}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setDeleteModal(true)} className="!bg-red-500" size="large" type="primary" icon={<DeleteOutlined className="!text-[20px]" />} />
          <Button onClick={() => navigate(`/teachers/${id}/update`)} className="!bg-green-600" size="large" type="primary" icon={<EditOutlined className="!text-[20px]" />}>
            O‘zgartirish
          </Button>
        </div>
      </div>

      {/* Teacher info */}
      {teacherData && (
        <div className="mt-10 flex justify-center gap-10">
          <div className="p-5 space-y-5 border-2 border-gray-400 rounded-md w-[40%]">
            <p><b>ID:</b> {teacherData.id}</p>
            <p><b>Ismi:</b> {teacherData.name}</p>
            <p><b>Familiyasi:</b> {teacherData.surname}</p>
            <p><b>Yo‘nalish:</b> {teacherData.stack?.name}</p>
            <p><b>Yosh:</b> {teacherData.age} Yosh</p>
            <p><b>Status:</b> {teacherData.status?.name}</p>
          </div>
          <div className="p-5 space-y-5 border-2 border-gray-400 rounded-md w-[40%]">
            <p><b>Telefon:</b> {teacherData.phone}</p>
            <p><b>Email:</b> {teacherData.email}</p>
            <p><b>Tuman:</b> {teacherData.district}</p>
            <p><b>Tajriba:</b> {teacherData.experience} Yil</p>
            <p><b>Jinsi:</b> {teacherData.gender}</p>
            <p><b>Yaratilgan sana:</b> {teacherData.createdAt?.split("T")[0]}</p>
          </div>
        </div>
      )}

      {/* Groups table */}
      <div className="mt-10">
        <h2 className="font-bold text-[20px] mb-4">Bog‘langan guruhlar</h2>
        <CustomTable loading={loading} columns={groupColumns} data={teacherGroups} />
      </div>

      {/* Delete modal */}
      <Modal open={deleteModal} onCancel={() => setDeleteModal(false)} confirmLoading={deleteLoading} onOk={handleDeleteTeacher} okText="O‘chirish" cancelText="Bekor qilish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} title="O‘qituvchini o‘chirmoqchimisiz ?" />
    </div>
  );
};

export default TeacherMore;
