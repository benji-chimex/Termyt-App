import parallax from '../../public/images/parallax.svg'
import local from '@next/font/local'
import { Righteous } from '@next/font/google'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

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
  backgroundImage: `url(${parallax.src})`
}

export default function Story(props) {
  const header_el = useRef(null)
    const header_typed = useRef(null)
    const paragraph_el = useRef(null)
    const paragraph_typed = useRef(null)
    const div = useRef(null)
    const [_height, setHeight] = useState("")
    
    useEffect(() => {
      header_typed.current = new Typed(header_el.current, { strings : [props.header], typeSpeed : 100 })
      paragraph_typed.current = new Typed(paragraph_el.current, { strings : [props.paragraph], typeSpeed : 50 })

      div.current.clientWidth < 640 ? setHeight("120vh") : setHeight("100vh")

        return () => {
            header_typed.current.destroy()
            paragraph_typed.current.destroy()
        }
    }, [props])

    return (
      <div className="" ref={div}>
        <main style={{backgroundImage : `url(${parallax.src})`, height : _height}} className="bg-center bg-cover bg-no-repeat p-10 md:p-20">
            <div className="text-center">
              <h1 className="text-white leading-8 tracking-wide text-5xl md:text-7xl" style={cold} ref={header_el}/>
            </div>
            <div className="text-left">
                <p className="text-white leading-8 tracking-wide text-lg md:text-2xl" style={right} ref={paragraph_el}/>
            </div>
        </main>
      </div>
    )
}