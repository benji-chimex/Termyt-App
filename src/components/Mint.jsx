import { store } from '@/store'
import { useContext, useEffect, useState } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
import Image from 'next/image'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import ABI from '../../public/abi/Termyt.json'
import { ethers, BigNumber } from 'ethers'

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

    const abi = JSON.stringify(ABI)
    const termytABI = JSON.parse(abi).abi

    const [value, setValue] = useState("")
    const [isMinted, setIsMinted] = useState(false)
    const [_error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [amount, setAmount] = useState(0)
    const [minted, setMinted] = useState(false)

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Mint",
            payload : {
                mintActive : false
            }
        })
        if(isMinted) {
            setIsMinted(false)
        }
        if(_error) {
            setError(false)
            setErrMsg("")
        }
        setValue("")
        setLoading(false)
    }

    const { config } = usePrepareContractWrite({
        address : "0x72C49a20378dEC1cc152aB888c5C088DbbA8cfD6",
        abi : termytABI,
        functionName : "mint",
        args : [BigNumber.from(amount)],
        overrides : {
            value : ethers.utils.parseEther("0")
        }
    })

    const { write, data, error, status } = useContractWrite(config)
    const { isConnected } = useAccount()

    useContractEvent({
        address : "0x72C49a20378dEC1cc152aB888c5C088DbbA8cfD6",
        abi : termytABI,
        eventName : "Minted",
        listener(owner, amount) {
            console.log(owner, amount)
            if(status == "success") {
                console.log(data)
                console.log(status)
                setValue("")
                setIsMinted(true)
                setMinted(true)
            } else if(status == "error") {
                console.log(error.name, error.message)
                console.log(status)
                setValue("")
                setIsMinted(true)
                setError(true)
                setErrMsg(error.message)
            }
        }
    })

    const handleMint = (e) => {
        e.preventDefault()
        
        write?.()

        setLoading(true)

        setTimeout(() => {
            if(!minted) {
                setValue("")
                setIsMinted(true)
                setError(true)
                setErrMsg("Transaction Timed Out")
            }
        }, 60000)
    }

    const handleChange = (e) => {
        e.preventDefault()

        setValue(e.target.value)
        setAmount(e.target.value)
    }

    return (
        <div className={mintActive ? "entrance absolute md:inset-1/4 top-1/4 left-10 w-4/5 h-1/3 md:h-1/2 md:w-1/2 bg-gray-900 opacity-90" 
        : "hidden"}>
            <main className='relative p-5 h-full'>
                {!isMinted && isConnected && <div className="grid grid-rows-3 gap-2 justify-center">
                    <div className="">
                        <h1 style={cold} className="text-white text-xl md:text-2xl m-3">Mint your Termyt NFT</h1>
                        <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">***The Maximum mint amount is five</span>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="input" className='text-sm md:text-lg text-white' style={right}>Enter Mint Amount</label>
                        <input onChange={handleChange} value={value} style={right} id='input' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='Mint Amount should be less than 5'/>
                    </div>
                    <div className="justify-self-center mt-5">
                        <button onClick={handleMint} className='text-2xl p-3 bg-amber-500 rounded-lg cursor-pointer shadow-2xl' style={cold}>
                            {loading ? "Minting..." :"Mint"}
                        </button>
                    </div>
                </div>}
                <div className="absolute right-5 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={12} height={12}/>
                </div>
                {isMinted && !_error && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-4xl lg:text-5xl">
                        Thank You for Minting
                    </h1>
                    <span style={right} className="text-amber-500 text-xs md:text-sm mt-3">
                        {`Transaction Hash : ${data.hash}`}
                    </span>
                </div>}
                {_error && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-3xl lg:text-5xl">
                        Error during Minting
                    </h1>
                    <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">
                        {`***${errMsg}`}
                    </span>
                </div>}
                {!isConnected && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-3xl lg:text-5xl">
                        Connect your Wallet
                    </h1>
                    <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">
                        ***Click the Connect Wallet button
                    </span>
                </div>}
            </main>
        </div>
    )
}