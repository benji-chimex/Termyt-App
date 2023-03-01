import parallax from '../../public/images/parallax.svg'
import local from '@next/font/local'
import Image from 'next/image'
import { Righteous } from '@next/font/google'
import button from '../../public/images/button.svg'
import { useContext, useEffect, useRef } from 'react'
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

const story = {
  backgroundImage: `url(${parallax.src})`,
  height: "100vh"
}

export default function Story(props) {
    const header_el = useRef(null)
    const header_typed = useRef(null)
    const paragraph_el = useRef(null)
    const paragraph_typed = useRef(null)

    const { state, dispatch } = useContext(store)
    const { showStoryA, storyBActive } = state.animation
    
    useEffect(() => {
        header_typed.current = new Typed(header_el.current, { strings : [props.header], typeSpeed : 50 })
        paragraph_typed.current = new Typed(paragraph_el.current, { strings : [props.paragraph], typeSpeed : 50 })

        return () => {
            header_typed.current.destroy()
            paragraph_typed.current.destroy()
        }
    }, [props])

    const handleStoryA = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove("animate-bounce")

        setTimeout(() => {
            dispatch({
                type : "Display/Hide StoryA",
                payload : {
                    storyAActive : false
                }
            })
        }, 1000)
        dispatch({
            type : "Display/Hide StoryB",
            payload : {
                storyBActive : true
            }
        })
        dispatch({
            type : "Display/Hide StoryB Animation",
            payload : {
              showStoryB : true
            }
        })
    }

    return (
      <div className={showStoryA ? "entrance-in" : "hidden"}>
        <main style={story} className={storyBActive ? "entrance-out bg-cover bg-center bg-no-repeat" 
        : "relative bg-cover bg-no-repeat bg-center"}>
            <div className="absolute top-10 left-20 max-w-min">
              <h1 className="text-white text-5xl md:text-7xl" style={cold} ref={header_el}/>
            </div>
            <div className="absolute top-32 left-24">
                <p className="text-white text-lg md:text-2xl max-w-sm md:max-w-lg" style={right} ref={paragraph_el}/>
            </div>
            <div className="absolute bottom-20 md:bottom-8 right-6 md:right-8 animate-bounce" onClick={handleStoryA}>
                <div className="relative">
                    <Image src={button} alt="Next"/>
                    <h1 className="absolute text-2xl top-4 left-8 cursor-pointer text-black" style={right}>
                      Next Story
                    </h1>
                </div>
            </div>
        </main>
      </div>
    )
}