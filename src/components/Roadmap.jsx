import local from '@next/font/local'
import { Righteous } from '@next/font/google'
import { useEffect, useRef, useContext } from 'react'
import Typed from 'typed.js'
import { store } from '@/store'

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
        <div className="block">
            <main className="relative">
                <div className="absolute top-10 left-20 max-w-min">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-white" style={cold} ref={header_el}/>
                </div>
                <div className="absolute top-32 left-24">
                    <p className="text-lg md:text-xl lg:text-2xl text-white max-w-sm md:max-w-md :max-w-lg" style={right} ref={paragraph_el}/>
                </div>
                <div className="absolute top-60 w-full">
                    <div className="lg:relative grid grid-rows-4 gap-2 justify-center">
                        <div className="hover:animate-bounce lg:absolute lg:top-0 lg:left-20 w-80 h-56 
                            clip bg-amber-500 border-4 border-black m-5">
                            <div className="px-6 py-4">
                                <h1 style={cold} className="text-sm">MARCH 2023</h1>
                                <h1 style={cold} className="text-xl">NFTs LAUNCH</h1>
                                <p style={right} className="">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
                                </p>
                            </div>
                        </div>
                        <div className="hover:animate-bounce lg:absolute lg:top-8 lg:right-20 w-80 h-56
                         clip bg-amber-500 border-4 border-black m-5">
                            <div className="px-6 py-4">
                                <h1 style={cold} className="text-sm">APRIL 2023</h1>
                                <h1 style={cold} className="text-xl">$MOLD LAUNCH</h1>
                                <p style={right} className="">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
                                </p>
                            </div>
                        </div>
                        <div className="hover:animate-bounce lg:absolute lg:top-56 lg:left-96 w-80 h-56 clip
                         bg-amber-500 border-4 border-black m-5">
                            <div className="px-6 py-4">
                                <h1 style={cold} className="text-sm">JUNE 2023</h1>
                                <h1 style={cold} className="text-xl">$LAVA LAUNCH</h1>
                                <p style={right} className="">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
                                </p>
                            </div>
                        </div>
                        <div className="hover:animate-bounce lg:absolute lg:top-80 lg:right-48 w-80 h-56 clip
                         bg-amber-500 border-4 border-black m-5">
                            <div className="px-6 py-4">
                                <h1 style={cold} className="text-sm">AUG 2023</h1>
                                <h1 style={cold} className="text-xl">GAME LAUNCH</h1>
                                <p style={right} className="">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis odit mollitia optio 
                                    perspiciatis. Aspernatur quasi a odit.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}