import { store } from '@/store'
import { useContext } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
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

const style = {
    height : "50vh",
    width : "50vw"
}

export default function Mint () {
    const { state, dispatch } = useContext(store)
    const { mintActive } = state.animation

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Mint",
            payload : {
                mintActive : false
            }
        })
    }

    return (
        <div className={mintActive ? "entrance absolute inset-1/4 bg-gray-900 opacity-90" : "hidden"} style={style}>
            <main className='relative p-5'>
                <div className="grid grid-rows-3 gap-2 justify-center">
                    <div className="">
                        <h1 style={cold} className="text-white text-2xl m-3">Mint your Termyt NFT</h1>
                        <span style={right} className="text-amber-500 text-sm mx-4">***The Maximum mint amount is five</span>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="input" className='text-xl text-white' style={right}>Enter Mint Amount</label>
                        <input style={right} id='input' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='Mint Amount should be less than 5'/>
                    </div>
                    <div className="justify-self-center mt-5">
                        <a className='text-2xl p-3 bg-amber-500 rounded-lg shadow-2xl' style={cold}>Mint</a>
                    </div>
                </div>
                <div className="absolute right-5 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={12} height={12}/>
                </div>
            </main>
        </div>
    )
}