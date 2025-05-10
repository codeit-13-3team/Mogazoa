import Textarea from "@/components/Textarea";
import Input from "./input/input";

function EditProfileModal() {
    return (
        <div className="p-5 md:p-10">
            <div className="flex flex-col gap-5 md:gap-10">
                <span className="mt-5 text-[20px] font-semibold text-gray-50 lg:text-[24px]">프로필 편집</span>
                <div className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-[20px]">
                    <div>이미지 업로더</div>
                    <Input label=""/>
                    <Textarea />
                </div>
                <div className="w-full h-[50px] bg-main-blue"></div>
            </div>
        </div>
    );
}

export default EditProfileModal;