import { useEffect, useState, type FormEvent } from "react"
import { UploadFile } from "../../../components"
import CreateCaption from "../../../components/CreateCaption"
import { Input, message } from "antd"
import { API, instance } from "../../../hooks"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const StackCreate = () => {
    const { id } = useParams()
    const [image, setImage] = useState<string>("")
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleCreateStack(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!image || !name.trim()) {
            message.error("Iltimos barcha maydonlarni to'ldiring!")
            return
        }

        setIsLoading(true)
        const data = { image, name }

        if (id) {
            if (data.image.includes("http")) {
                data.image = data.image.split(`${API}/file/`)[1]
                console.log(data);
            }
            instance().patch(`/stacks/${id}`, data).then(() => {
                toast.success("Muvoffaqiyatli o'zgartirildi!", {
                    onClose: () => {
                        setIsLoading(false)
                        navigate(-1)
                    },
                    autoClose: 1000
                })
            })
        } else {
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

    }

    useEffect(() => {
        if (id) {
            instance().get(`/stacks/${id}`).then(res => {
                setName(res.data.name)
                setImage(`${API}/file/${res.data.image}`)
            })
        }
    }, [])

    return (
        <form onSubmit={handleCreateStack} className="p-5">
            <CreateCaption isLoading={isLoading} title="Yo'nalish" />
            <div className="mt-[30px]">
                <div className="max-h-[250px] overflow-hidden">
                    <UploadFile image={image} setImage={setImage} />
                </div>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="!mt-5 !w-[450px]" size="large" placeholder="Yo'nalish nomini kiriting" />
            </div>
        </form>
    )
}

export default StackCreate
