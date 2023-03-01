import { store } from '@/store'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { useContext } from 'react'
import Image from 'next/image'
import { Web3Button } from '@web3modal/react'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function SideNav () {
    const { state, dispatch } = useContext(store)
    const { showSideBar, footerActive } = state.animation

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })
        if(!footerActive) {
            dispatch({
                type : "Display/Hide Footer",
                payload : {
                  footerActive : true
                }
            })
        }
    }

    return (
        <div className={showSideBar ? "entrance-side absolute top-0 left-0 bg-gray-900 opacity-90 w-full h-full"
            : "hidden"}>
            <nav className="w-full h-full z-10 relative">
                <div className="grid grid-rows-2 gap-2 items-center h-full justify-center">
                    <div className="grid grid-rows-3 gap-6 mt-6">
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                            <a>HOME</a>
                        </div>
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                            <a>WHITEPAPER</a>
                        </div>
                        <div className="text-4xl py-6 text-white text-center cursor-pointer" style={cold}>
                            <a>FAQ</a>
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