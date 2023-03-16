import { store } from '@/store'
import { useContext,useState } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
import Image from 'next/image'
import { useContractRead, useAccount } from 'wagmi'
import WhitelistABI from '../../public/abi/Whitelist.json'

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

export default function Ref () {
    const { state, dispatch } = useContext(store)
    const { refActive } = state.animation

    const whitelist_abi = JSON.stringify(WhitelistABI)
    const whitelistABI = JSON.parse(whitelist_abi).abi

    const [value, setValue] = useState("")
    const [isRef, setRef] = useState(false)
    const [referrals, setReferrals] = useState("")
    const [error, setError] = useState(false)
    

    const { isConnected, address } = useAccount()

    const handleClose = (e) => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide Ref",
            payload : {
                refActive : false
            }
        })
        if(isRef) {
            setRef(false)
        }
        if(error) {
            setError(false)
        }
        setValue("")
    }

    const whitelisted = !isConnected ? undefined : useContractRead({
        address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
        chainId : 43114,
        abi : whitelistABI,
        functionName : "whitelisted",
        args : [isConnected ? address.slice(6, 13) : address]
    })

    const handleRef = (e) => {
        e.preventDefault()

        if(whitelisted.status == "success") {
            setReferrals(whitelisted.data[2].toNumber())
            setRef(true)
        } else if(whitelisted.status == "error") {
            setError(true)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()

        setValue(e.target.value.slice(0, 29))
    }

    return (
        <div className={refActive ? "entrance absolute md:inset-1/4 top-1/4 left-10 w-4/5 h-1/2 md:h-1/2 md:w-1/2 bg-gray-900 opacity-90" 
        : "hidden"}>
            <main className='relative p-10 md:p-5 h-full'>
                {!isRef && !error && isConnected && <div className="grid grid-rows-3 gap-2 justify-center">
                    <div className="">
                        <h1 style={cold} className="text-white text-xl md:text-2xl m-3">Check your Referral Status</h1>
                        <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">***The More the referrals, the bigger your Airdrop</span>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="input" className='text-sm md:text-lg text-white' style={right}>Enter Referral Link</label>
                        <input onChange={handleChange} value={value} style={right} id='input' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='Enter Referral Link'/>
                    </div>
                    <div className="justify-self-center mt-5">
                        <button onClick={handleRef} className='text-2xl p-3 bg-amber-500 rounded-lg cursor-pointer shadow-2xl' style={cold}>
                            Referrals
                        </button>
                    </div>
                </div>}
                <div className="absolute right-5 top-5 cursor-pointer" onClick={handleClose}>
                    <Image src={times} alt="Menu" width={12} height={12}/>
                </div>
                {isRef && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-4xl lg:text-5xl">
                        {`You have ${referrals} Referrals.`}
                    </h1>
                </div>}
                {error && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-3xl lg:text-5xl">
                        You are not Eligible 
                    </h1>
                    <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">
                        Mint at least 2 ermyt NFTs to become eligible to participate in the Referrals Program.
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