import local from '@next/font/local'
import HeaderImg from '../../public/images/header.svg'
import menu from '../../public/images/menu.png'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { store } from '@/store'
import { useAccount, useConnect } from 'wagmi'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })
const Robus = local({ src : "../../public/fonts/Robus.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

const robus = {
  fontFamily : `${Robus.style.fontFamily}`
}

const header_img = {
  backgroundImage: `url(${HeaderImg.src})`,
  height: "11vh"
}

export default function Header() {
  const { state, dispatch } = useContext(store)
  const { isConnected, connector: activeConnector } = useAccount()
  const { connect, error, isLoading } = useConnect()

  const handleOpen = (e) => {
    e.preventDefault()

    dispatch({
      type : "Display/Hide SideBar Animation",
      payload : {
        showSideBar : true
      }
    })
  }

  return (
    <>
      <header className="bg-gray-900 bg-center bg-contain bg-no-repeat" style={header_img}>
        <div className="flex flex-row items-center px-3 lg:px-5 lg:py-3 py-2">
          <div className="basis-1/4">
            <h1 className="text-5xl text-start text-white" style={robus}>
              <a>Termyt</a>
            </h1>
          </div>
          <div className="basis-1/2 lg:hidden"></div>
          <div className="hidden basis-1/2 lg:block">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-2xl text-white text-center" style={cold}>
                <a>HOME</a>
              </div>
              <div className="text-2xl text-white text-center" style={cold}>
                <a>WHITEPAPER</a>
              </div>
              <div className="text-2xl text-white text-center" style={cold}>
                <a>FAQ</a>
              </div>
            </div>
          </div>
          <div className="hidden basis-1/4 lg:block">
            {!isLoading ? <div className="text-center text-lg" style={cold}>
              <a className='bg-amber-300 p-3 rounded-lg cursor-pointer'
                onClick={() => !isConnected ? "" : connect({ connector })}>
                { isConnected ? "Connected" : "Connect Wallet" }
              </a>
            </div> : <div className="text-center text-lg" style={cold}>
              <svg className="animation-spin h-5 w-5 mr-3" viewBox='0 0 24 24'></svg>
                <a className='bg-amber-300 p-3 rounded-lg cursor-pointer'>
                  Connecting
                </a>
            </div>}
          </div>
          <div className="basis-1/4 lg:hidden flex justify-end cursor-pointer" onClick={handleOpen}>
            <Image src={menu} alt="Menu" width={60} height={60}/>
          </div>
        </div>
      </header>
    </>
  )
}