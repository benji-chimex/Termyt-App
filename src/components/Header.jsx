import local from '@next/font/local'
import HeaderImg from '../../public/images/header.svg'
import menu from '../../public/images/menu.png'
import logo from '../../public/images/logo.png'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { store } from '@/store'
import { Web3Button } from '@web3modal/react'

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
  const { footerActive } = state.animation

  const header = useRef(null)
  const [width, setWidth] = useState()

  useEffect(() => {
    const value = header.current.clientWidth < 640 ? 300 : 150

    setWidth(value)
  }, [width])

  const handleOpen = (e) => {
    e.preventDefault()

    if(footerActive) {
      dispatch({
        type : "Display/Hide Footer",
        payload : {
          footerActive : false
        }
      })
    }
    dispatch({
      type : "Display/Hide SideBar Animation",
      payload : {
        showSideBar : true
      }
    })
  }

  return (
    <>
      <header className="bg-gray-900 md:bg-cover md:bg-no-repeat" style={header_img} ref={header}>
        <div className="flex flex-row items-center px-3 lg:px-5">
          <div className="basis-1/4 justify-self-start">
            <Image src={logo} alt="Logo" width={width} height={130}/>
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
          <div className="hidden basis-1/4 lg:flex justify-center">
            <Web3Button/>
          </div>
          <div className="basis-1/4 lg:hidden flex justify-end cursor-pointer" onClick={handleOpen}>
            <Image src={menu} alt="Menu" width={60} height={60}/>
          </div>
        </div>
      </header>
    </>
  )
}