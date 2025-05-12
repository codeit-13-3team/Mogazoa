import { getUserProfile } from "@/api/user";
import Profile from "@/components/Profile";
import { GetMeResponse } from "@/types/user";
import { useEffect, useState } from "react";

function test() {
    const [profileData, setProfileData] = useState<GetMeResponse>();

    async function setProfile() {
        const data = await getUserProfile(); 
        setProfileData(data);
    }

    useEffect(() => { 
        localStorage.setItem(
        'accessToken',
        //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzU4LCJ0ZWFtSWQiOiIxMy0zIiwiaWF0IjoxNzQ1OTE1NDAxLCJpc3MiOiJzcC1tb2dhem9hIn0.E-JV9Vc5A-Hk3fL6iF7-D2mN5mrVUhtc0-FE7SBZ_pA',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYxLCJ0ZWFtSWQiOiIxMy0zIiwiaWF0IjoxNzQ1OTE1MjA4LCJpc3MiOiJzcC1tb2dhem9hIn0.LI6K9y5vlvvWSKtGsSgfC-pzOAZJI3kkJUb_q-rfT8o',
        );
        setProfile();
    }, []);

    return(
        <div>
            { profileData ? <Profile profileData={profileData} isMyProfile={true} /> : "프로필 없음"}
        </div>
    );
}

export default test;