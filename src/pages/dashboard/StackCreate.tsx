import { useState, type FormEvent } from "react"
import { UploadFile } from "../../components"
import CreateCaption from "../../components/CreateCaption"
import { Input, message } from "antd"
import { instance } from "../../hooks"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const StackCreate = () => {
    const [image, setImage] = useState<string>("")
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log(image);
    function handleCreateStack(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(!image || !name.trim()){
            message.error("Iltimos barcha maydonlarni to'ldiring!")
            return
        }

        setIsLoading(true)
        const data = { image, name }
        console.log(data);
        instance().post("/stacks", data).then(() => {
            toast.success("Muvoffaqiyatli saqandi", {
                onClose: () => {
                    setIsLoading(false)
                    navigate(-1)
                },
                autoClose: 1000
            })
        })
    }


    return (
        <form onSubmit={handleCreateStack} className="p-5">
            <CreateCaption isLoading={isLoading} title="Yo'nalish" />
            <div className="mt-[30px]">
                <div className="max-h-[250px] overflow-hidden">
                    <UploadFile setImage={setImage} />
                </div>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="!mt-5 !w-[450px]" size="large" placeholder="Yo'nalish nomini kiriting" />
            </div>
        </form>
    )
}

export default StackCreate
