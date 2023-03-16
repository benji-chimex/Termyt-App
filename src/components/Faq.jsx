import local from '@next/font/local'
import { Righteous } from '@next/font/google'
import road_map from '../../public/images/roadmap.svg'
import logo from '../../public/images/logo.png'
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

const bgImg = {
    backgroundImage: `url(${road_map.src})`,
}

export default function Faq() {
    return (
        <div style={bgImg} className="bg-gray-800 p-10">
            <div className="text-center pb-5">
                <h1 style={cold} className="text-white text-5xl md:text-7xl my-2">FAQs</h1>
                <span style={right} className="text-white text-xl md:text-2xl my-2">All your questions are answerd here...</span>
            </div>
            <div className="grid grid-rows-10 gap-12 justify-center p-5 w-full">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 1</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is Termyt NFT project?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                            The Termyt NFT project is a collection of 5000 unique digital assets that have five levels of rarity
                            and robust utility features. They can be used for governance, staking, and art upgrades.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 2</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is the Total Supply of the Termyt Collection?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                The Total Supply of the Termyt Collection is 5000. There are 1500 available for 
                                Pre-Sale while the remaining 3500 is available for Public mint.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 3</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is the price of a Termyt NFT?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                The Price of a Termyt NFT is 1 AVAX. The cost of gas for minting is variable 
                                but gas fees on the avalanche blockchain is low.  
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 4</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is Tri-Token Liquidity?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                Tri-Token Liquidity is a liquidity efficient system in the Termyt ecosystem
                                consisting of three tokens : The Termyt Collection, the $DUNG token and the
                                $LAVA token.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 5</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">Are there any giveaways like airdrops?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                There are airdrops for the $DUNG token. To be eligible
                                for the airdrop, you must mint at least 2 Termyt NFTs. To multiply your airdrop rewards,
                                you have to refer people to mint the Termyt NFT.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 6</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What blockchain is Termyt built on?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                Termyt is built on the Avalanche network, which is a fast and efficient blockchain ecosystem that provides a secure platform for NFT ownership and utility.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 7</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What are the different levels of rarity for Termyt NFTs?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                            Termyt NFTs are divided into five levels of rarity: Queen, Kings, Royals, Soldiers, and Workers. Each level has a distinct visual design and unique characteristics.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 8</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What are the utility features of Termyt NFTs?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                Termyt NFTs have several utility features, including governance rights, staking, and the Art Upgrade process.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 9</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is the Art Upgrade process?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                The Art Upgrade process allows Termyt NFT holders to enhance the visual design of their NFTs, making them more valuable and collectible. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-5xl text-white mt-10">FAQ - 10</h1>
                            <div className="grid justify-center">
                                <Image src={logo} alt="Logo" width={450}/>
                            </div>
                        </div>
                        <div className="flip-card-back rounded-lg bg-amber-500 p-5">
                            <h1 style={cold} className="text-xl md:text-2xl text-center mt-6 mb-5">What is the play-to-earn game?</h1>
                            <p style={right} className="text-sm md:text-xl mx-4 my-2">
                                The play-to-earn game is a game that utilizes Termyt NFTs as in-game assets and provides rewards and incentives for players. Players can also earn Termyt tokens by participating in the game.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}