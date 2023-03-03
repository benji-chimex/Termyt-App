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
                <div className="grid grid-rows-4 gap-12 justify-center p-5 w-full">
                    <div className="flip-card">
                        <div className="flip-card-inner ">
                            <div className="flip-card-front clip rounded-lg bg-amber-500 p-5">
                                <div className="grid justify-center">
                                    <Image src={logo} alt="Logo" width={120}/>
                                </div>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">MARCH 2023</h1>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">NFTs LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
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
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">APRIL 2023</h1>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">$DUNG LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
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
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">JUNE 2023</h1>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">$LAVA LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
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
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">AUG 2023</h1>
                                <h1 style={cold} className="text-2xl md:text-5xl my-10">GAME LAUNCH</h1>
                            </div>
                            <div className="flip-card-back clip rounded-lg bg-amber-500 p-5 grid place-content-center">
                                <p style={right} className="text-md md:text-2xl mx-4 my-2">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}