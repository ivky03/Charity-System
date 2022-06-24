import React from 'react'
import {useLocation,Link} from 'react-router-dom';
import useCharity from '../contract/useCharity'
import Logo from '../assets/logo2.png'
import { GrOverview,GrValidate } from "react-icons/gr";
import {IoCloseCircleSharp} from "react-icons/io5"


function Validator() {
  const location = useLocation()

  const options = [{
    id:0,
    title:'Handle Requests',
    icon:GrOverview,
    route:'/validator/viewRequests'
  },{
    id:1,
    title:'Close Voting',
    icon:IoCloseCircleSharp,
    route:'/validator/closeVoting'
  },{
    id:2,
    title:'Validation Criteria',
    icon:GrValidate,
    route:'/validator/validationCriteria'
  }]

  return (
    <div className="bg-black h-screen w-screen">
      <nav className="border-gray-200 px-10 py-2.5 fixed w-full">
          <div className="container flex flex-wrap justify-between items-center mx-auto px-6 py-2">
              <div className="flex items-center">
                  <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Charity Zone Logo" />
                  <Link to="/" className="self-center text-4xl font-bold whitespace-nowrap text-white hover:text-gray-300 cursor-pointer">Charity Zone</Link>
              </div>
              <div className="text-white">
                <span className="mx-4 font-semibold text-lg">Welcome {location.state.name}</span>
                <Link to="/" className="text-lg mx-4 px-3 py-2 rounded-lg cursor-pointer font-bold hover:text-gray-300 bg-gray-800 bg-opacity-80 hover:bg-opacity-90">
                  Logout
                </Link>
              </div>
          </div>
      </nav>
      <div className="flex justify-center items-center h-full w-screen mx-auto">
          <div className="flex-1 px-16">
            <h1 className="text-white text-4xl font-bold my-4">Validator Dashboard</h1>
            <div className="flex flex-wrap items-center justify-center ">
            {
              options.map((op)=>(
                <Link to={op.route} key={op.id}>
                  <div className="bg-gray-900 flex-wrap py-7 px-12 my-4 mx-6 rounded-md flex flex-col min-w-max min-h-max">
                    <op.icon className="bg-white text-4xl font-bold self-center"/>
                    <span className="my-3 text-white text-2xl font-bold">{op.title}</span>
                  </div>
                </Link>
              ))
            }
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 px-16">
          <svg width="510" height="500" viewBox="0 0 693 684" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.17 100.911L41.1837 141.445C41.6143 146.089 42.0448 151.578 42.4753 157.911C42.4753 158.756 42.4753 159.178 42.4753 160.022C48.0721 220.4 59.6963 335.667 100.166 420.111C183.257 594.489 316.29 631.222 343.843 639.667C371.397 630.8 504.86 593.645 587.521 420.111C632.726 325.533 642.628 193.378 646.503 141.445C621.963 141.022 579.772 138.911 519.498 129.2C439.42 116.533 372.258 72.2001 343.413 52.7778C314.568 72.6223 247.406 116.533 167.328 129.2C126.428 135.533 93.7079 138.911 69.1679 140.178L64.8627 97.9556L38.17 100.911Z" fill="white"/>
            <path d="M668.46 99.2222C668.029 99.2222 620.241 103.022 527.248 88.2444C436.407 73.8889 358.481 11.4 357.62 10.5556L344.274 0L330.928 10.1333C330.067 10.5556 252.572 73.0444 161.301 87.8222C120.831 94.1556 88.9722 97.1111 65.7238 98.3778L70.0291 140.6C94.569 139.333 127.289 135.956 168.189 129.622C248.267 116.956 315.429 72.6222 344.274 53.2C373.119 73.0444 440.281 116.956 520.359 129.622C580.633 139.333 622.824 141.444 647.364 141.867C643.489 194.222 633.157 326.378 588.382 420.533C505.721 594.067 372.258 631.222 344.705 640.089C317.151 631.644 184.118 594.911 101.027 420.533C60.5575 336.089 49.3638 220.822 43.3365 160.444C43.3365 159.6 43.3365 159.178 43.3365 158.333C42.9059 152.422 42.4754 146.933 42.0449 141.867L39.0312 101.333C18.7965 107.667 -2.72981 126.244 0.283866 162.133C5.8807 224.622 17.9354 346.222 61.8491 438.689C163.453 651.067 332.219 681.044 339.538 682.733L344.705 684L349.871 682.733C357.19 681.044 526.386 651.067 627.56 438.689C688.264 311.6 691.708 128.778 692.139 121.178L693 97.5333L668.46 99.2222Z" fill="#07A14A"/>
            <path d="M387.327 171C404.978 179.022 427.796 188.733 449.753 195.066C494.097 207.733 534.997 214.911 558.245 218.288C554.371 255.022 543.177 325.533 512.179 390.133C467.404 464.444 421.338 505.399 387.327 527.777V171ZM344.274 100.911V594.488C344.274 594.488 451.906 574.222 550.065 410.4L550.496 409.555C596.562 313.711 602.59 206.888 603.02 202.244L604.742 181.133L583.216 179.022C582.785 179.022 525.956 173.111 461.377 154.533C421.338 143.133 376.563 118.644 376.133 118.222L344.274 100.911Z" fill="#95C93D"/>
            </svg>

          </div>
      </div>
    </div>
  )
}

export default Validator