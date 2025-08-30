import { BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Badge, Button, Modal } from "antd"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { useCookies } from "react-cookie"
import { toast } from "react-toastify"

const Header: FC<{ collapse: boolean, setCollapse: Dispatch<SetStateAction<boolean>> }> = ({ collapse, setCollapse }) => {
  const [, , removeCookie] = useCookies(['accessToken'])

  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  function handleLogOut() {
    setLoading(true)
    toast.success("Chiqib ketayapsiz...", {
      onClose: () => {
        setLoading(false);
        removeCookie('accessToken')
        location.pathname = "/"
      },
      autoClose: 1000 
    })
  }

  return (
    <div className="flex p-[11px] items-center justify-between bg-[#001529]">
      <button onClick={() => setCollapse(!collapse)} className="text-white cursor-pointer"> {collapse ? <MenuUnfoldOutlined className="!text-[22px]" /> : <MenuFoldOutlined className="!text-[22px]" />}</button>
      <div className="flex items-center gap-[20px]">
        <Badge overflowCount={9} count={10}>
          <Button size="middle" icon={<BellOutlined className="!text-[19px]" />}></Button>
        </Badge>
        <Button onClick={() => setShowModal(true)} className="!text-white hover:scale-[1.1] duration-300" iconPosition="end" icon={<LogoutOutlined />} size="large" type="text">
          Chiqish
        </Button>
      </div>
      <Modal cancelText="Bekor qilish" okText="Chiqish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} confirmLoading={loading} open={showModal} onCancel={() => setShowModal(false)} onOk={handleLogOut} title="Tizimdan chiqish">
        <p>Tizimdan chiqsangiz qaytib kira olmesiz, o'ylab ish qiling 🤨</p>
      </Modal>
    </div>
  )
}

export default Header
