import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { useContext } from "react";
import { store } from "@/store";
import Ref from "@/components/Ref";
import Referral from "@/components/Referral";

export default function Referrals() {
    const { state } = useContext(store)
    const { sideBarActive } = state.animation

    return (
        <>
            <div>
                <Header/>
                <Referral/>
                <Ref/>
                {sideBarActive && <SideNav/>}
            </div>
        </>
    )
}