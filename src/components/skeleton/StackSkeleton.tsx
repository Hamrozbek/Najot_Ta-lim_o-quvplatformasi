import { Skeleton } from "antd"

const StackSkeleton = () => {
    return (
        <div className="flex flex-wrap justify-between gap-[20px]">
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
            <div className="w-[300px] h-[355px]">
                <Skeleton.Button className="!w-full !h-full" active />
            </div>
        </div>
    )
}

export default StackSkeleton
