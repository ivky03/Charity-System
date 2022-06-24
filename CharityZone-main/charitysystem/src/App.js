import { useEffect,useState } from 'react';
import Banner from './Components/Banner'
import Logo from './assets/logo2.png'
import { Link } from 'react-router-dom'
import useCharity from './contract/useCharity'
import { useNavigate } from "react-router-dom";

function App() {

  const {connect,getUser} = useCharity()
  const navigate = useNavigate()
  const [showErr,setShowErr]=useState(false)

  async function handleClick(){
    connect()
    const user = await getUser()
    console.log(user)
    if(user.usertype === ''){
      setShowErr(true)
      setTimeout(() =>setShowErr(false),3000)
    }
    if(user.usertype === 'beneficiary' || user.usertype === 'donor' || user.usertype === 'validator'){
      navigate(user.usertype,{state:{name:user.name}})
    }
    // if(user.)
  }
  return (
    <div>
      <nav className="border-gray-200 px-10 py-2.5 fixed w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto px-6 py-2">
            <div className="flex items-center">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Charity Zone Logo" />
                <Link to="/" className="self-center text-4xl font-bold whitespace-nowrap text-white hover:text-gray-300 cursor-pointer">Charity Zone</Link>
            </div>
            <div className="hidden w-full md:block md:w-auto">
            <ul className="flex space-x-8 mt-0 text-xl font-medium">
                <li className="bg-gray-800 rounded-md bg-opacity-60 hover:bg-opacity-90 px-4 py-1">
                <div onClick={handleClick} className="cursor-pointer block text-white md:hover:text-gray-300 md:bg-transparent md:p-0" aria-current="page">Login</div>
                </li>
                <li className="bg-gray-800 rounded-md bg-opacity-60 hover:bg-opacity-90 px-4 py-1">
                <Link to="/register" className="block text-white md:hover:text-gray-300 md:bg-transparent md:p-0" aria-current="page">Register</Link>
                </li>
            </ul>
            </div>
        </div>
        {showErr?
        <div className="absolute flex items-center w-full max-w-sm p-4 rounded-lg shadow top-15 right-5 bg-red-600" role="alert">
          <div className="text-lg font-bold text-white">User not registered. Please register and try again</div>
        </div>:null}
      </nav>
      <Banner/>
    </div>
  );
}

export default App;
