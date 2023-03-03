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
            <footer className='h-10 pt-3 px-5'>
                <div className="flex flex-row items-center">
                    <div className="basis-1/3 grid justify-center">
                        <h1 style={right} className="">&copy; 2023</h1>
                    </div>
                    <div className="basis-1/3 grid justify-center">
                        <h1 style={right} className="">TechBlitz Ltd</h1>
                    </div>
                    <div className="basis-1/3 grid justify-center">
                        <h1 style={right} className="">All Rights Reserved</h1>
                    </div>
                </div>
            </footer>
        </>
    )
}