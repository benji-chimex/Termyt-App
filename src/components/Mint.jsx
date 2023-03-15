import { store } from '@/store'
import { useContext, useEffect, useState } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
import Image from 'next/image'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent, useContractRead } from 'wagmi'
import TermytABI from '../../public/abi/Termyt.json'
import WhitelistABI from '../../public/abi/Whitelist.json'
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

    const termyt_abi = JSON.stringify(TermytABI)
    const termytABI = JSON.parse(termyt_abi).abi

    const whitelist_abi = JSON.stringify(WhitelistABI)
    const whitelistABI = JSON.parse(whitelist_abi).abi

    const [value, setValue] = useState("")
    const [ID, setID] = useState("")
    const [refLink, setRefLink] = useState("")
    const [isMinted, setIsMinted] = useState(false)
    const [_error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [amount, setAmount] = useState(0)
    const [minted, setMinted] = useState(false)
    const [mintingOver, setMintingOver] = useState(false)

    const { isConnected, address } = useAccount()

    useEffect(() => {
        setID(state.ID)
    }, [])

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

    const _mint = !isConnected ? undefined : usePrepareContractWrite({
        address : "0xe25b0D245d3dF37BAA7c6500CaD18A4Bfc8e6f59",
        chainId: 43114,
        abi : termytABI,
        functionName : "mint",
        args : [BigNumber.from(amount)],
        overrides : {
            from : address,
            value : ethers.utils.parseEther(`${amount}`)
        }
    })

    const _whitelist = !isConnected ? undefined : usePrepareContractWrite({
        address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
        chainId: 43114,
        abi : whitelistABI,
        functionName : "whitelist",
        args : [isConnected ? address.slice(6, 13) : address, BigNumber.from(amount)]
    })

    const _referral = !isConnected ? undefined : usePrepareContractWrite({
        address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
        chainId: 43114,
        abi : whitelistABI,
        functionName : "referral",
        args : [ID]
    })

    const mint = !isConnected ? undefined : useContractWrite(_mint.config)
    const whitelist = !isConnected ? undefined : useContractWrite(_whitelist.config)
    const referral = !isConnected ? undefined : useContractWrite(_referral.config)

    !isConnected ? undefined : useContractEvent({
        address : "0xe25b0D245d3dF37BAA7c6500CaD18A4Bfc8e6f59",
        abi : termytABI,
        eventName : "Minted",
        listener(owner, amount) {
            console.log(owner, amount)
            if(mint.status == "success") {
                whitelist.write?.()
                ID == "" ? undefined : referral.write?.()
                setValue("")
                setIsMinted(true)
                setMinted(true)
            } else if(mint.status == "error") {
                setValue("")
                setIsMinted(true)
                setError(true)
                setErrMsg(mint.error.message)
            }
        },
        chainId: 43114
    })

    const supply = !isConnected ? undefined : useContractRead({
        address : "0xe25b0D245d3dF37BAA7c6500CaD18A4Bfc8e6f59",
        chainId: 43114,
        abi : termytABI,
        functionName : "totalSupply"
    })

    // const whitelisted = !isConnected ? undefined : useContractRead({
    //     address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
    //     chainId : 43114,
    //     abi : whitelistABI,
    //     functionName : "whitelisted",
    //     args : [isConnected ? address.slice(6, 13) : address]
    // })

    !isConnected ? undefined : useContractEvent({
        address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
        abi : whitelistABI,
        eventName : "Whitelisted",
        listener(user, amount) {
            console.log(user, amount)
            if(whitelist.status == "success") {
                setRefLink(`https://termyt.com/referral/${address.slice(6, 13)}`)
            }
        },
        chainId: 43114
    })

    // !isConnected ? undefined : useContractEvent({
    //     address : "0xC0934B8f9EC3E18C79E308CA03b7198Ce43BD77C",
    //     abi : whitelistABI,
    //     eventName : "Referral",
    //     listener(user, referrals) {
    //         console.log(user, referrals)
    //         if(referral.status == "success") {
                
    //         }
    //     },
    //     chainId: 43114
    // })

    const handleMint = (e) => {
        e.preventDefault()
        
        if(supply.data.toNumber() >= 300) {
            setMintingOver(true)
        } else {
            mint.write?.()

            setLoading(true)

            setTimeout(() => {
                if(!minted) {
                    setValue("")
                    setIsMinted(true)
                    setError(true)
                    errMsg == "Maximum minting is five" ? setErrMsg(errMsg) : setErrMsg("Transaction Timed Out")
                }
            }, 60000)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()

        if(e.target.value == "") {
            setValue(e.target.value)
            setAmount(0)
        } else if(e.target.value > 5) {
            setValue(e.target.value)
            setAmount(e.target.value)
            setErrMsg("Maximum minting is five")
        } else {
            setValue(e.target.value)
            setAmount(e.target.value)
        }
    }

    return (
        <div className={mintActive ? "entrance absolute md:inset-1/4 top-1/4 left-10 w-4/5 h-1/2 md:h-1/2 md:w-1/2 bg-gray-900 opacity-90" 
        : "hidden"}>
            <main className='relative p-10 md:p-5 h-full'>
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
                        {`Referral Link : ${refLink}`}
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
                {mintingOver && <div className="absolute inset-y-1/3 inset-x-14">
                    <h1 style={cold} className="text-white text-center text-3xl md:text-3xl lg:text-5xl">
                        Phase I PreSale Minting is Over
                    </h1>
                    <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">
                        ***Phase II PreSale Minting is coming soon
                    </span>
                </div>}
            </main>
        </div>
    )
}