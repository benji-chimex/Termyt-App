import local from '@next/font/local'
import { Righteous } from '@next/font/google'
import { useEffect, useRef, useContext } from 'react'
import Typed from 'typed.js'
import { store } from '@/store'
import logo from '../../public/images/logo.png'
import Image from 'next/image'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

const righteous = Righteous({
  weight : ["400"],
  subsets : [
      "latin"
  ]
});

const right = {
  fontFamily: `${righteous.style.fontFamily}`
}

export default function Roadmap () {
    const header_el = useRef(null)
    const header_typed = useRef(null)
    const paragraph_el = useRef(null)
    const paragraph_typed = useRef(null)

    const { state } = useContext(store)
    
    useEffect(() => {
        header_typed.current = new Typed(header_el.current, { strings : ["Roadmap"], typeSpeed : 100 })
        paragraph_typed.current = new Typed(paragraph_el.current, 
            { strings : ["Information about our Upcoming Roadmap"], typeSpeed : 50 }
        )

        return () => {
            header_typed.current.destroy()
            paragraph_typed.current.destroy()
        }
    }, [])
    
    return (
        <>
            <div className="p-10 w-full">
                <div className="text-center pb-5">
                    <h1 style={cold} className="text-white text-5xl md:text-7xl my-2" ref={header_el}/>
                    <span style={right} className="text-white text-xl md:text-2xl my-2" ref={paragraph_el}/>
                </div>
                <div className="grid grid-rows-5 gap-12 justify-center p-5 w-full">
                    <div className="flip-card">
                        <div className="flip-card-inner ">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">NFTs LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Launch the Termyt NFT collection and distribute NFTs to early
                                    supporters and investors via airdrop. We'll also sell NFTs to the public, and provide details on
                                    the pricing, the number of NFTs available, and the platform(s) where they'll be sold.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">SOCIALS LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lauching our community in different social platforms. Here we will be focusing on expanding the Termyt community and interacting with our NFT
                                    holders by offering exclusive events and experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">TOKEN LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lauching the $DUNG token and distribute its airdrop. In this phase, we will be making some useful additional features to Termyt NFTs, such as
                                    staking, governance rights, and an Art Upgrade process.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">GAME LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lauching the Termyt Game. In this phase, the Termyt NFT game will be fully launched and players can start utilizing their
                                    Termyt NFTs as in-game assets.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">MECHANDISE LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lauching the Mechandise. We'll be launching a range of merchandise featuring unique Termyt NFT designs, which will
                                    include clothing, accessories, and collectibles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}