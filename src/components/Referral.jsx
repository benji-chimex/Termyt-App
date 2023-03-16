import button from '../../public/images/button.svg'
import road_map from '../../public/images/roadmap.svg'
import local from '@next/font/local'
import Image from 'next/image'
import { useEffect, useRef, useContext, useState } from 'react'
import Typed from 'typed.js'
import { store } from '@/store'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
    fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function Intro() {
    const span_el = useRef(null)
    const span_typed = useRef(null)
    const header_el = useRef(null)
    const header_typed = useRef(null)
    const main = useRef(null)

    const [breath, setBreath] = useState()

    const { dispatch } = useContext(store)
    
    useEffect(() => {
        const breath = {
            height : main.current.clientWidth < 640 ? "82vh" : "89vh",
            backgroundImage: `url(${road_map.src})`
        }

        setBreath(breath)

        const options = {
            strings : ["Refer your Friends and multiply your airdrop."],
            typeSpeed : 100
        }

        span_typed.current = new Typed(span_el.current, options)
        header_typed.current = new Typed(header_el.current, { strings : ["Referrals"], typeSpeed : 100 })

        return () => {
            span_typed.current.destroy()
            header_typed.current.destroy()
        }
    }, [])

    const handleRef = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Ref",
            payload : {
                refActive : true
            }
        })
    }

    return (
      <>
        <main style={breath} className="bg-gray-800" ref={main}>
            <div className="absolute md:inset-1/4 top-1/4 px-2">
                <div className="grid grid-rows-2">
                    <div className="flex flex-col justify-center">
                        <h1 className='my-2 text-white text-center md:text-center text-5xl lg:text-6xl' style={cold} ref={header_el}/>
                        <span className='text-white text-center my-2 md:text-center text-xl lg:text-2xl' style={cold} ref={span_el}/>
                    </div>
                    <div className="justify-self-center relative animate-bounce cursor-pointer self-center"
                     onClick={handleRef}>
                        <Image src={button} alt="Let's Go"/>
                        <h1 className="absolute text-3xl top-5 left-5" style={cold}>
                            Referrals
                        </h1>
                    </div>
                </div>
            </div>
        </main>
      </>
    )
}