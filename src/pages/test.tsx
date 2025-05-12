import EditProfileModal from "@/components/EditProfileModal";
import { useState } from "react";

function test () {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
        <div className="text-gray-50 hover:cursor-pointer" onClick={() => setOpen(!open)}>버튼</div>
        { open ? <EditProfileModal onClose={() => setOpen(!open)} /> : null}
        </>
    );
}

export default test;