import { store } from '@/store'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { useContext } from 'react'
import Image from 'next/image'
import { Web3Button } from '@web3modal/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function SideNav () {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state.animation

    const router = useRouter()

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              sideBarActive : false
            }
        })
        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })
    }

    const handleHome = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              sideBarActive : false
            }
        })
        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })

        router.push("/")
    }

    const handleWhitepaper = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              sideBarActive : false
            }
        })
        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })

        router.push("/api/whitepaper")
    }

    const handleFaq = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              sideBarActive : false
            }
        })
        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })

        router.push("/faq")
    }

    return (
        <div className={showSideBar ? "entrance-side absolute top-0 left-0 bg-gray-900 opacity-90 w-full h-screen"
            : "hidden"}>
            <nav className="w-full h-full z-10 relative">
                <div className="grid grid-rows-2 gap-2 items-center h-full justify-center">
                    <div className="grid grid-rows-3 gap-6 mt-6">
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                        <a className={router.pathname == "/" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                            <span onClick={handleHome}>HOME</span>
                        </a>
                        </div>
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                        <a className={router.pathname == "/whitepaper" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                            <span onClick={handleWhitepaper}>WHITEPAPER</span>
                        </a>
                        </div>
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                        <a className={router.pathname == "/faq" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                            <span onClick={handleFaq}>FAQ</span>
                        </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Web3Button/>
                    </div>
                </div>
                <div className="absolute right-10 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={25} height={25}/>
                </div>
            </nav>
        </div>
    )
}