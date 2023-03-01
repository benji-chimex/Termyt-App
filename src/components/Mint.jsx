import { store } from '@/store'
import { useContext, useState } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
import Image from 'next/image'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import ABI from '../../public/abi/Termyt.json'
import { ethers } from 'ethers'

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

export default function Mint () {
    const { state, dispatch } = useContext(store)
    const { mintActive } = state.animation

    const [value, setValue] = useState(1)

    const abi = JSON.stringify(ABI)
    const termytABI = JSON.parse(abi).abi

    const { config } = usePrepareContractWrite({
        address : "0x550935599A5a645F25DE404F6F0BBb171E603765",
        abi : termytABI,
        functionName : "mint",
        args : [value],
        overrides : {
            value : ethers.utils.parseEther("1")
        },
        onSuccess(data) {
            console.log(data)
            setValue("")
        },
        onError(error) {
            console.log(error)
            setValue("")
        }
    })

    const { write } = useContractWrite(config)

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Mint",
            payload : {
                mintActive : false
            }
        })
    }

    const handleMint = (e) => {
        e.preventDefault()
        
        write?.()
    }

    return (
        <div className={mintActive ? "entrance absolute md:inset-1/4 top-10 left-10 w-4/5 h-1/2 md:w-1/2 bg-gray-900 opacity-90" 
        : "hidden"}>
            <main className='relative p-5'>
                <div className="grid grid-rows-3 gap-2 justify-center">
                    <div className="">
                        <h1 style={cold} className="text-white text-xl md:text-2xl m-3">Mint your Termyt NFT</h1>
                        <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">***The Maximum mint amount is five</span>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="input" className='text-sm md:text-lg text-white' style={right}>Enter Mint Amount</label>
                        <input onChange={(e) => setValue(e.target.value)} style={right} id='input' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='Mint Amount should be less than 5'/>
                    </div>
                    <div className="justify-self-center mt-5">
                        <a onClick={handleMint} className='text-2xl p-3 bg-amber-500 rounded-lg cursor-pointer shadow-2xl' style={cold}>Mint</a>
                    </div>
                </div>
                <div className="absolute right-5 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={12} height={12}/>
                </div>
            </main>
        </div>
    )
}