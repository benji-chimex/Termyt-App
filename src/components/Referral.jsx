import button from '../../public/images/button.svg'
import road_map from '../../public/images/roadmap.svg'
import local from '@next/font/local'
import Image from 'next/image'
import { useEffect, useRef, useContext, useState } from 'react'
import { store } from '@/store'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
    fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function Referral() {
    const main = useRef(null)

    const [breath, setBreath] = useState()

    const { dispatch } = useContext(store)
    
    useEffect(() => {
        const breath = {
            height : main.current.clientWidth < 640 ? "82vh" : "89vh",
            backgroundImage: `url(${road_map.src})`
        }

        setBreath(breath)
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
            <div className="absolute md:inset-1/3 top-1/4">
                <div className="grid grid-rows-2">
                    <div className="flex flex-col justify-center">
                        <h1 className='my-4 text-white text-center md:text-center text-5xl lg:text-6xl' style={cold}>Referrals</h1>
                        <span className='text-white text-center my-4 md:text-center text-xl lg:text-2xl' style={cold}>Refer your Friends and multiply your airdrop.</span>
                    </div>
                    <div className="justify-self-center relative animate-bounce cursor-pointer self-center my-4"
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