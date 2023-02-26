import local from '@next/font/local'
import HeaderImg from '../../public/images/header.svg'
import Glow from '../../public/images/header-glowing.webp'
import Image from 'next/image'

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
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "12vh"
}

export default function Header() {
  return (
    <>
      <header className="bg-gray-900" style={header_img}>
        <div className="flex flex-row items-center px-10 py-4">
          <div className="basis-1/4">
            <h1 className="text-5xl text-start text-white" style={robus}>
              <a>Termyt</a>
            </h1>
          </div>
          <div className="basis-1/2">
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
          <div className="basis-1/4">
            <div className="text-center text-lg" style={cold}>
              <a href="#" className='bg-amber-300 p-3 rounded-lg shadow-xl'>Connect Wallet</a>
            </div>
          </div>
        </div>
        <div className='' style={{ marginTop : "-30px" }}>
          <Image src={Glow} alt="Glowing header"/>
        </div>
      </header>
    </>
  )
}