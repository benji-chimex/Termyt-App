import local from '@next/font/local'
import HeaderImg from '../../public/images/header.svg'
import menu from '../../public/images/menu.png'
import logo from '../../public/images/logo.png'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { store } from '@/store'
import { Web3Button } from '@web3modal/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function Header() {
  const { dispatch } = useContext(store)

  const header = useRef(null)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [length, setLength] = useState()

  const router = useRouter()

  useEffect(() => {
    const width = header.current.clientWidth < 640 ? 200 : 150
    const height = header.current.clientWidth < 640 ? 160 : 130
    const length = header.current.clientWidth < 640 ? "9vh" : "11vh"

    setWidth(width)
    setHeight(height)
    setLength(length)
  }, [width])

  const handleOpen = (e) => {
    e.preventDefault()

    dispatch({
      type : "Display/Hide SideBar",
      payload : {
        sideBarActive : true
      }
    })
    dispatch({
      type : "Display/Hide SideBar Animation",
      payload : {
        showSideBar : true
      }
    })
  }

  return (
    <>
      <header className="bg-gray-900 md:bg-cover md:bg-no-repeat shadow-xl"
       style={{backgroundImage: `url(${HeaderImg.src})`, height: length}} ref={header}>
        <div className="flex flex-row items-center px-3 lg:px-5">
          <div className="basis-1/4 justify-self-start">
            <Image src={logo} alt="Logo" width={width} height={height}/>
          </div>
          <div className="basis-1/2 lg:hidden"></div>
          <div className="hidden basis-1/2 lg:block">
            <div className="grid grid-cols-4 gap-2">
              <div className="text-2xl text-center cursor-pointer" style={cold}>
                <div className={router.pathname == "/" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                  <Link href="/">HOME</Link>
                </div>
              </div>
              <div className="text-2xl text-center cursor-pointer" style={cold}>
                <div className={router.pathname == "/whitepaper" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                  <Link href="/whitepaper">
                    WHITEPAPER
                  </Link>
                </div>
              </div>
              <div className="text-2xl text-center cursor-pointer" style={cold}>
                <div className={router.pathname == "/faq" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                  <Link href="/faq">FAQ</Link>
                </div>
              </div>
              <div className="text-2xl text-center cursor-pointer" style={cold}>
                <div className={router.pathname == "/referrals" ? "text-amber-300" : "text-white hover:text-amber-300"}>
                  <Link href="/referrals">
                    REFERRALS
                  </Link>
                </div>
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