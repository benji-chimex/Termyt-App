import Header from "@/components/Header"
import Intro from "@/components/Intro"
import Roadmap from "@/components/Roadmap"
import StoryA from "@/components/StoryA"
import StoryB from "@/components/StoryB"
import StoryC from "@/components/StoryC"
import { store } from "@/store"
import { useContext } from "react"
import termyt from "../../public/images/termyt-colony.jpg"
import road_map from '../../public/images/roadmap.svg'
import Footer from "@/components/Footer"
import SideNav from "@/components/SideNav"
import Mint from "@/components/Mint"

const Termyt = {
  backgroundImage: `url(${termyt.src})`,
}

const footer = {
  backgroundImage: `url(${road_map.src})`,
}

  const story = [
    { 
      header : "Intro",
      paragraph : ` Welcome to Termyt, the unique NFT gamefi project that is inspired by the intricate system of termite colonies.
      Our NFT collection consists of a variety of fascinating and intricately designed characters, including Queens, Kings, Royals, Soldiers, and Workers.
      When you purchase a Termyt NFT, you'll receive a special NFT placeholder that contains a hidden surprise. The placeholder is just a teaser of what's to come, as the actual content of the NFT will be revealed after the public minting.
      Our goal is to create a community of dedicated and passionate Termyt collectors and Gamers who appreciate the artistry and complexity of these fascinating creatures.
      Whether you're a seasoned NFT collector or a newcomer to the space, we believe you'll be captivated by the intricate details and unique design of each Termyt NFT.`
    },
    {
      header : "Creation",
      paragraph : `Minting a Termyt NFT is the first step to joining the Termyt Colony, a decentralized community of collectors and gamers who are passionate about building a better world for Termyts
      A Termyt Colony consists of various roles, including 1 Queen, 1-5 Kings, 1-20 Royals, and a significant amount of soldiers and workers, each with unique abilities and benefits.
      To mint a Termyt NFT, you need to have some $DUNG tokens, which are the tokens used in the Termyt ecosystem.
      Once you have the tokens, you can use them to mint a Termyt NFT and become a part of the Colony. The Termyt NFT's are unique and cannot be duplicated, ensuring its authenticity and rarity.
      Don't miss the opportunity to become a part of the Termyt Colony and help shape the future of the Termyt world. Mint your Termyt NFT today and join the adventure!`
    },
    {
      header : "Existence",
      paragraph : `The Termyt NFT game-fi project is one where you can join a colony and reap the rewards of collaboration! One of the key benefits of joining a Termyt Colony is the potential to make profits, just as TERMYT LAY EGGS [$LAVA].
      Joining a Termyt Colony can be profitable. Queens can lay EGGS [$LAVA tokens] and third-party NFTs each day, depending on their structure. $LAVA tokens have many uses, including trading and staking.
      Third-party NFTs can give players unique advantages and can be traded for profit.
      Join a Termyt Colony to start earning rewards!`
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
    sideBarActive,
    showHeader
  } = state.animation

  return (
    <>
      <div className="relative">
        {headerActive && <div className="relative w-full overflow-hidden">
          <div style={Termyt} className={showHeader ? "entrance-out bg-cover bg-no-repeat bg-center" 
          : "entrance bg-cover bg-no-repeat bg-center"}>
            <Header/>
            <Intro/>
          </div>
          <Mint/>
        </div>}
        {storiesActive && <div>
          {storyAActive && <StoryA header={story[0].header} paragraph={story[0].paragraph}/>}
          {storyBActive && <StoryB header={story[1].header} paragraph={story[1].paragraph}/>}
          {storyCActive && <StoryC header={story[2].header} paragraph={story[2].paragraph}/>}
        </div>}
        {footerActive && <div style={{backgroundImage : footer.backgroundImage}} 
          className="bg-contain bg-repeat bg-gray-900">
          <Roadmap/>
        </div>}
        {footerActive && <Footer/>}
        {sideBarActive && <SideNav/>}
      </div>
    </>
  )
}
