import { useState, useEffect, useContext } from "react"
import { Righteous } from '@next/font/google'
import local from "@next/font/local";
import { store } from "@/store";

const righteous = Righteous({
    weight : ["400"],
    subsets : [
        "latin"
    ]
  });
  
const right = {
    fontFamily: `${righteous.style.fontFamily}`
}

const Cold_Warm = local({ src : "../../public/fonts/Cold_Warm.otf" })

const cold = {
  fontFamily : `${Cold_Warm.style.fontFamily}`
}

export default function Timer ({ deadline }) {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [mintues, setMintues] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const { dispatch } = useContext(store)

    useEffect(() => {
        const interval = setInterval(() => {
            const time = Date.parse(deadline) - Date.now()

            if(Date.parse(deadline) < Date.now()) {
                dispatch({
                    type : "Display/Hide Timer",
                    payload : {
                        timerActive : false
                    }
                })
            }

            setSeconds(Math.floor((time / 1000) % 60))
            setMintues(Math.floor((time / (1000 * 60)) % 60))
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <>
            <div className="m-4 text-center">
                <h1 style={right} className="text-2xl md:text-4xl text-white">Phase I PreSale Minting Starts In:</h1>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="py-3 px-4 md:px-0 animate-pulse rounded-lg bg-amber-400">
                    <p style={cold} className="text-center text-2xl md:text-4xl">{days}</p>
                    <p style={right} className="text-center text-md md:text-2xl">Days</p>
                </div>
                <div className="py-3 px-4 md:px-0 animate-pulse rounded-lg bg-amber-400">
                    <p style={cold} className="text-center text-2xl md:text-4xl">{hours}</p>
                    <p style={right} className="text-center text-md md:text-2xl">Hours</p>
                </div>
                <div className="py-3 px-4 md:px-0 animate-pulse rounded-lg bg-amber-400">
                    <p style={cold} className="text-center text-2xl md:text-4xl">{mintues}</p>
                    <p style={right} className="text-center text-md md:text-2xl">Minutes</p>
                </div>
                <div className="py-3 px-4 md:px-0 animate-pulse rounded-lg bg-amber-400">
                    <p style={cold} className="text-center text-2xl md:text-4xl">{seconds}</p>
                    <p style={right} className="text-center text-md md:text-2xl">Seconds</p>
                </div>
            </div>
        </>
    )
}