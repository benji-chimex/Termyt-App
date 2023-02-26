import { Righteous } from '@next/font/google'

const righteous = Righteous({
    weight : ["400"],
    subsets : [
        "latin"
    ]
  });
  
const right = {
    fontFamily: `${righteous.style.fontFamily}`
}

export default function Footer () {
    return (
        <>
            <footer className='bg-amber-500 clip'>
                <div className="flex flex-row">
                    <div className="basis-1/4"></div>
                    <div className="basis-1/2">
                        <div className="grid grid-cols-3">
                            <div className="">
                                <h1 style={right}>&copy; 2023</h1>
                            </div>
                            <div className="">
                                <h1 style={right}>TechBlitz Ltd</h1>
                            </div>
                            <div className="">
                                <h1 style={right}>All Rights Reserved</h1>
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/4"></div>
                </div>
            </footer>
        </>
    )
}