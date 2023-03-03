import button from '../../public/images/button.svg'
import termyt from '../../public/images/logo.png'
import local from '@next/font/local'
import Image from 'next/image'
import { useEffect, useRef, useContext, useState } from 'react'
import Typed from 'typed.js'
import { store } from '@/store'

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })
const Robus = local({ src : "../../public/fonts/Robus.otf" })

const cold = {
    fontFamily : `${Cold_Warm.style.fontFamily}`
}
  
const robus = {
    fontFamily : `${Robus.style.fontFamily}`
}

export default function Intro() {
    const span_el = useRef(null)
    const span_typed = useRef(null)
    const main = useRef(null)

    const [breath, setBreath] = useState()

    const { state, dispatch } = useContext(store)
    const { footerActive } = state.animation
    
    useEffect(() => {
        const breath = {
            height : main.current.clientWidth < 640 ? "81vh" : "88.5vh"
        }

        setBreath(breath)

        const options = {
            strings : ["The Termyt NFT collection mimicking a termite colony."],
            typeSpeed : 100
        }

        span_typed.current = new Typed(span_el.current, options)

        return () => {
            span_typed.current.destroy()
        }
    }, [])

    const handleHeader = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove("animate-bounce")

        dispatch({
            type : "Display/Hide Header Animation",
            payload : {
                showHeader : true
            }
        })
        setTimeout(() => {
            dispatch({
                type : "Display/Hide Header",
                payload : {
                    headerActive : false
                }
            })
        }, 500)
        dispatch({
            type : "Display/Hide Stories",
            payload : {
                storiesActive : true
            }
        })
        dispatch({
            type : "Display/Hide StoryA",
            payload : {
                storyAActive : true
            }
        })
        dispatch({
            type : "Display/Hide StoryA Animation",
            payload : {
                showStoryA : true
            }
        })
    }

    const handleMint = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Mint",
            payload : {
                mintActive : true
            }
        })
    }

    return (
      <>
        <main style={breath} className="" ref={main}>
            <div className="absolute inset-1/4">
                <div className="grid grid-rows-2 justify-center">
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center">
                            <Image src={termyt} alt="Logo" width={450} height={350}/>
                        </div>
                        <span className='text-white text-center text-xl lg:text-2xl' style={cold} ref={span_el}/>
                    </div>
                    <div className="justify-self-center relative animate-bounce cursor-pointer self-center"
                     onClick={footerActive ? handleMint : handleHeader}>
                        <Image src={button} alt="Let's Go"/>
                        <h1 className="absolute text-3xl top-5 left-14" style={cold}>
                            {footerActive ? "Mint" : "Start"}
                        </h1>
                    </div>
                </div>
            </div>
        </main>
      </>
    )
}