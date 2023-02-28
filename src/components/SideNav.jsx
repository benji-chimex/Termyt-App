import { store } from '@/store'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { useContext } from 'react'
import Image from 'next/image'
import { useAccount, useConnect } from 'wagmi'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function SideNav () {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state.animation

    const { isConnected, connector: activeConnector } = useAccount()
    const { connect, error, isLoading } = useConnect()

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
          type : "Display/Hide SideBar Animation",
          payload : {
            showSideBar : false
          }
        })
    }

    return (
        <div className={showSideBar ? "entrance-side absolute top-0 left-0 bg-gray-900 opacity-90"
            : "hidden"}>
            <nav className="w-full h-screen z-10 relative">
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
                        {!isLoading ? <div className="text-center text-lg" style={cold}>
                            <a href="#" className='bg-amber-300 p-5 rounded-lg' 
                                onClick={() => !isConnected ? "" : connect({ connector })}>
                                { isConnected ? "Connected" : "Connect Wallet" }
                            </a>
                        </div> : <div className="text-center text-lg" style={cold}>
                            <svg className="animation-spin h-5 w-5 mr-3" viewBox='0 0 24 24'></svg>
                                <a href="#" className='bg-amber-300 p-5 rounded-lg'>
                                    Connecting
                                </a>
                        </div>}
                    </div>
                </div>
                <div className="absolute right-10 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={25} height={25}/>
                </div>
            </nav>
        </div>
    )
}