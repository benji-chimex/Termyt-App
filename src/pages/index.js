import Header from "@/components/Header"
import Intro from "@/components/Intro"
import Roadmap from "@/components/Roadmap"
import StoryA from "@/components/StoryA"
import StoryB from "@/components/StoryB"
import StoryC from "@/components/StoryC"
import { store } from "@/store"
import { useContext, useEffect, useRef, useState } from "react"
import termyt from "../../public/images/termyt-colony.jpg"
import road_map from '../../public/images/roadmap.svg'
import Footer from "@/components/Footer"
import SideNav from "@/components/SideNav"
import { Italiana } from "@next/font/google"

const Termyt = {
  backgroundImage: `url(${termyt.src})`,
}

const footer = {
  backgroundImage: `url(${road_map.src})`,
}

  const story = [
    { 
      header : "Intro",
      paragraph : `The Termyt NFT collection is a one of a kind collection which mimicks the termite colony system.
      It consists of Queens, Kings, Royals, Soldiers and Workers. When you mint a Termyt NFT, you will
      receive a NFT placeholder. After public mint, the content of the placeholder will be revealed.`
    },
    {
      header : "Creation",
      paragraph : `The Importance of minting a Termyt NFT is to join in the formation of a Termyt Colony. A 
      Termyt Colony consists of 1 Queen, 1-5 Kings, 1-20 Royals, any amount of soldiers and any amount of workers.
      You can join a Termyt colony if you have any of the Termyt NFTs and also have some $MOLD tokens.`
    },
    {
      header : "Existence",
      paragraph : `The Importance of joining a Termyt Colony is to make PROFITS. A Termyt Colony is able to mint
      a variable amount of the $LAVA token and 3rd party NFts per day after its creation. The amount of $LAVA 
      tokens to be minted depends on the structure of the colony. 3rd party NFTs will useful in the Termyt Game.`
    }
  ]

export default function Home() {
  const { state } = useContext(store)
  const { 
    headerActive, 
    storiesActive, 
    storyAActive, 
    storyBActive, 
    storyCActive, 
    footerActive,
    showHeader
  } = state.animation

  const [breath, setBreath] = useState({})

  const div = useRef(null)

  useEffect(() => {
    if(footerActive) {
      let width = {}
      if(div.current.clientWidth < 640) {
        width = {
          height : "200vh"
        }
      } else if(div.current.clientWidth < 1024) {
        width = {
          height : "215vh"
        } 
      } else if(div.current.clientWidth > 1024) {
        width = {
          height : "135vh"
        } 
      }
  
      setBreath(width)
    }
  }, [footerActive])

  return (
    <>
      {headerActive && <div className="relative w-full">
        <div style={Termyt} className={showHeader ? "entrance-out bg-cover bg-no-repeat bg-center" 
        : "entrance bg-cover bg-no-repeat bg-center"}>
          <Header/>
          <Intro/>
        </div>
        <SideNav/>
      </div>}
      {storiesActive && <div>
        {storyAActive && <StoryA header={story[0].header} paragraph={story[0].paragraph}/>}
        {storyBActive && <StoryB header={story[1].header} paragraph={story[1].paragraph}/>}
        {storyCActive && <StoryC header={story[2].header} paragraph={story[2].paragraph}/>}
      </div>}
      {footerActive && <div style={{backgroundImage : footer.backgroundImage, height : breath.height}} 
        className="bg-contain bg-repeat bg-center bg-gray-900" ref={div}>
        <Roadmap/>
      </div>}
      {footerActive && <Footer/>}
    </>
  )
}
