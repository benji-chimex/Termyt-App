import Header from "@/components/Header";
import Faq from "@/components/Faq";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import { useContext } from "react";
import { store } from "@/store";

export default function Faqs() {
    const { state } = useContext(store)
    const { sideBarActive } = state.animation

    return (
        <>
            <div>
                <Header/>
                <Faq/>
                <Footer/>
                {sideBarActive && <SideNav/>}
            </div>
        </>
    )
}