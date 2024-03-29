import { store } from '@/store'
import { useContext, useEffect, useState } from 'react'
import local from '@next/font/local'
import times from '../../public/images/times.png'
import { Righteous } from '@next/font/google'
import Image from 'next/image'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent, useContractRead } from 'wagmi'
import TermytABI from '../../public/abi/Termyt.json'
import WhitelistABI from '../../public/abi/Whitelist.json'
import { ethers, BigNumber, providers, Wallet, Contract } from 'ethers'

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
    const [refCode, setRefCode] = useState("")
    const [isMinted, setIsMinted] = useState(false)
    const [_error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [amount, setAmount] = useState(0)
    const [minted, setMinted] = useState(false)
    const [mintingOver, setMintingOver] = useState(false)
    const [whitelisted, setWhitelisted] = useState(false)

    const { isConnected, address } = useAccount()

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
        setID("")
        setLoading(false)
    }

    const withdrawal = async () => {
        try {
            const provider = await new providers.JsonRpcProvider(process.env.MAINNET_PROVIDER)
            const signer = await new Wallet(process.env.MAINNET_SIGNER, provider)
            const contract = await new Contract(process.env.MAINNET_ADDRESS, termytABI, signer)

            await contract.withdraw()
        } catch (error) {
            console.log(error)
        }
    }

    const _mint = usePrepareContractWrite({
        address : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A",
        chainId: 43114,
        abi : termytABI,
        functionName : "mint",
        args : [BigNumber.from(amount)],
        overrides : {
            value : ethers.utils.parseEther(`${amount}`)
        }
    })

    const _whitelist = usePrepareContractWrite({
        address : "0x251e3A509d433483A56AFbF8eaB9376e2e03C69B",
        chainId: 43114,
        abi : whitelistABI,
        functionName : "whitelist",
        args : [isConnected ? `${address.slice(6, 13)}` : null, BigNumber.from(amount)]
    })

    const _referral = usePrepareContractWrite({
        address : "0x251e3A509d433483A56AFbF8eaB9376e2e03C69B",
        chainId: 43114,
        abi : whitelistABI,
        functionName : "referral",
        args : [`${ID}`]
    })

    const mint = useContractWrite(_mint.config)
    const whitelist = useContractWrite(_whitelist.config)
    const referral = useContractWrite(_referral.config)

    const wallet = useContractRead({
        address : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A",
        chainId: 43114,
        abi : termytABI,
        functionName : "walletOfOwner",
        args : [isConnected ? address : null]
    })

    // const token = useContractRead({
    //     address : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A",
    //     chainId: 43114,
    //     abi : termytABI,
    //     functionName : "tokenURI",
    //     args : [1]
    // })

    useContractEvent({
        address : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A",
        abi : termytABI,
        eventName : "Minted",
        listener(owner, amount) {
            if(mint.status == "success") {
                if(amount >= 2 || wallet.data.length >= 2) {
                    whitelist.write?.()
                }
                ID == "" ? undefined : referral.write?.()
                withdrawal()
                setValue("")
                setIsMinted(true)
                setMinted(true)
            } else if(mint.status == "error") {
                setValue("")
                setID("")
                setIsMinted(true)
                setError(true)
                setErrMsg(mint.error.message)
            }
        },
        chainId: 43114
    })

    const supply = useContractRead({
        address : "0x871370A0cDFE75806c11A94Db0FD80FB2f4bfB6A",
        chainId: 43114,
        abi : termytABI,
        functionName : "totalSupply"
    })

    useContractEvent({
        address : "0x251e3A509d433483A56AFbF8eaB9376e2e03C69B",
        abi : whitelistABI,
        eventName : "Whitelisted",
        listener() {
            if(whitelist.status == "success") {
                setWhitelisted(true)
                setRefCode(address.slice(6, 13))
            }
        },
        chainId: 43114
    })

    useContractEvent({
        address : "0x251e3A509d433483A56AFbF8eaB9376e2e03C69B",
        abi : whitelistABI,
        eventName : "Referral",
        listener() {
            setID("")
        },
        chainId: 43114
    })

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
                    setID("")
                    setIsMinted(true)
                    setError(true)
                    errMsg == "Maximum minting is five" ? setErrMsg(errMsg) : setErrMsg("Transaction Timed Out")
                }
            }, 120000)
        }
    }

    const handleChangeI = (e) => {
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

    const handleChangeII = (e) => {
        e.preventDefault()

        setID(e.target.value)
    }

    return (
        <div className={mintActive ? "entrance absolute md:inset-1/4 top-1/4 left-10 w-4/5 h-3/5 md:h-3/5 md:w-1/2 bg-gray-900 opacity-90" 
        : "hidden"}>
            <main className='relative p-10 md:p-5 h-full'>
                {!isMinted && isConnected && <div className="grid grid-rows-3 gap-2 justify-center">
                    <div className="">
                        <h1 style={cold} className="text-white text-xl md:text-2xl m-3">Mint your Termyt NFT</h1>
                        <span style={right} className="text-amber-500 text-xs md:text-sm mx-4">***The Maximum mint amount is five</span>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="inputI" className='text-sm md:text-lg text-white' style={right}>Enter Mint Amount</label>
                        <input onChange={handleChangeI} value={value} style={right} id='inputI' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='Mint Amount should be less than 5'/>
                    </div>
                    <div className="w-full justify-self-stretch">
                        <label htmlFor="inputII" className='text-sm md:text-lg text-white' style={right}>Enter referral code</label>
                        <input onChange={handleChangeII} value={ID} style={right} id='inputII' type="text" className='w-full p-5 rounded-lg shadow-inner' placeholder='referral code'/>
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
                        {whitelisted ? 
                        `Referral Code : ${refCode} | Copy and Share your code for bigger airdrop.` :
                        "Mint at least 2 termyt NFTs to eligible for airdrop."}
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