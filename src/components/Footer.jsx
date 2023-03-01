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
            <footer className='h-10 pt-3'>
                <div className="flex flex-row items-center">
                    <div className="basis-1/4"></div>
                    <div className="basis-1/2">
                        <div className="grid grid-cols-3 items-center justify-center">
                            <h1 style={right} className="justify-self-center">&copy; 2023</h1>
                            <h1 style={right} className="justify-self-center">TechBlitz Ltd</h1>
                            <h1 style={right} className="justify-self-center">All Rights Reserved</h1>
                        </div>
                    </div>
                    <div className="basis-1/4"></div>
                </div>
            </footer>
        </>
    )
}