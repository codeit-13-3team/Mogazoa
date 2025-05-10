import { getFollowersList } from "@/api/user";
import FollowUserListModal from "@/components/FollowUserListModal";
import { FollowUserItem } from "@/types/user";
import { useState } from "react";

function test () {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<FollowUserItem[]>([]);

    async function click() {
        setOpen(true);
        const { list } = await getFollowersList(5);
        setData(list);
    } 

    return (
        <div>
            <div onClick={click}>버튼</div>
            { open ? <FollowUserListModal userName="딩동" followUserListData={data} onClose={() => setOpen(false)}/> : null }
        </div>
    );
}

export default test;