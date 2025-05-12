import { getUserProfile } from "@/api/user";
import { useEffect, useState } from "react";

function test() {
    const [profileData, setProfileData] = useState<>();

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
        <div></div>
    );
}

export default test;