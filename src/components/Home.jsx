import { useNavigate } from "react-router-dom";

import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";

function Home({className: classes}) {
    const navigate = useNavigate();

    return (
        <div className={`${classes} container mx-auto px-4 flex flex-col lg:flex-row`}>
            <div className="">
                <div className="absolute blur-2xl -z-50 bg-aggreen/30 h-[33%] w-[90%] md:w-[55%] rounded-tr-full top-0 left-0" id="#bg"></div>
                <div className="absolute blur-2xl -z-50 bg-gbblue/30 h-[33%] w-[90%] md:w-[60%] rounded-r-full top-[33%] left-0" id="#bg"></div>
                <div className="absolute blur-2xl -z-50 bg-gbgreen/30 h-[33%] w-[90%] md:w-[55%] rounded-br-full top-[66%] left-0" id="#bg"></div>
            </div>
            <div className="md:flex-1 flex flex-col items-center md:mt-28 mx-auto ">
                <h1 className="text-[40px] font-bold mb-4">Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happinesse</h1>
                <p className="text-white text-2xl font-bold mb-16">Get started to grow your career with mentorship from the experimental people from experienced</p>
                <button className="px-4 py-2 self-start rounded-xl font-bold text-white text-xl bg-gradient-to-r from-aggreen to-green-800"
                    onClick={()=>navigate('/feeds')}
                >
                    Get Feeds
                </button>
            </div>
            <div className="relative mt-20 lg:flex-1 flex flex-col md:flex-col space-y-5  items-center">
                <div className="h-56 w-56 space-y-4">

                    <img src={pic1} className="block lg:absolute relative mx-auto rounded-xl md:animate-bounce delay-300 lg:top-0 lg:left-20 h-[125px] w-[200px]"/>
                    <img src={pic2} className="block lg:absolute relative mx-auto rounded-xl md:animate-bounce delay-500 lg:top-36 lg:right-4 h-[150px] w-[300px]"/>
                    <img src={pic3} className="block lg:absolute relative mx-auto rounded-xl md:animate-bounce delay-700 lg:bottom-2 lg:left-4 h-[125px] w-[200px]"/>
                    <img src={pic4} className="block lg:absolute relative mx-auto rounded-xl md:animate-bounce delay-1000 50 lg:-bottom-36 lg:right-36 h-[125px] w-[250px]"/>

                </div>
            </div>
        </div>
    )
}

export default Home;