import button from '../../public/images/button.svg'
import local from '@next/font/local'
import Image from 'next/image'
import { useEffect, useRef, useContext } from 'react'
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

const Termyt = {
    height: "88vh"
}

export default function Intro() {
    const header_el = useRef(null)
    const header_typed = useRef(null)
    const span_el = useRef(null)
    const span_typed = useRef(null)

    const { dispatch } = useContext(store)
    
    useEffect(() => {
        const options = {
            strings : ["The Termyt NFT collection mimicking a termite colony."],
            typeSpeed : 100
        }

        header_typed.current = new Typed(header_el.current, { strings : ["Termyt"], typeSpeed : 200 })
        span_typed.current = new Typed(span_el.current, options)

        return () => {
            header_typed.current.destroy()
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
        }, 2000)
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

    return (
      <>
        <main style={Termyt} className="">
            <div className="absolute inset-1/4">
                <div className="grid grid-rows-2 gap-16">
                    <div className="">
                        <h1 className='text-white text-9xl text-center my-2' style={robus} ref={header_el}/>
                        <span className='text-white text-2xl' style={cold} ref={span_el}/>
                    </div>
                    <div className="justify-self-center relative animate-bounce cursor-pointer" onClick={handleHeader}>
                        <Image src={button} alt="Let's Go"/>
                        <h1 className="absolute text-3xl top-5 left-10" style={cold}>Let's Go</h1>
                    </div>
                </div>
            </div>
        </main>
      </>
    )
}