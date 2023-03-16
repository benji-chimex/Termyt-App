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
                    <div className="md:basis-1/3 basis-1/2 grid justify-center">
                        <h1 style={right} className="text-sm md:text-lg">&copy; 2023</h1>
                    </div>
                    <div className="md:basis-1/3 basis-1/2 grid justify-center">
                        <h1 style={right} className="text-sm md:text-lg">TechBlitz Ltd</h1>
                    </div>
                    <div className="hidden basis-1/3 md:grid justify-center">
                        <h1 style={right} className="text-sm md:text-lg">All Rights Reserved</h1>
                    </div>
                </div>
            </footer>
        </>
    )
}