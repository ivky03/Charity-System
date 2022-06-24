import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import RegisterImg from '../assets/Register.PNG'
import useCharity from '../contract/useCharity'
import Logo from '../assets/logo2.png'

function Register() {

  const [userType,setUserType] = useState('beneficiary')
  const [userName,setUserName] = useState('')
  const [uName,setName] = useState('')
  const [key,setKey] = useState(false)
  const [link,setLink] = useState(false)
  const [secret,setSecret] = useState('')
  const [linkV,setLinkV] = useState('')

  const {connect,account,createUser,getUser,getValSecret,createB} = useCharity()

  const userOptions = [
    { label: 'Beneficiary', value: 'beneficiary',key:1 },
    { label: 'Donor', value: 'donor',key:2 },
    { label: 'Validator', value: 'validator',key:3 },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    if(userType==="validator"){
      setKey(true)
    }
    else if(userType === "beneficiary"){
      setLink(true)
    }
    else{
      createUser(userName,uName,userType) 
    }
  }

  const registerUser = async(e) => {
    e.preventDefault()
    const s = await getValSecret()
    if(secret===s){
      createUser(userName,uName,userType)
    }
    else{
      alert("Wrong Secret Entered! Registration failed")
    }
  }

  const registerB = async(e) => {
    e.preventDefault()
    createB(userName,uName,userType,linkV)
  }

  const handleConnect = (e) => {
    e.preventDefault();
    connect()
  }

  const getUserHandler = async(e) => {
    e.preventDefault();
    const user = await getUser()
    console.log(user)
  }

  return (
      <div className="bg-black h-screen w-screen">
        <nav className="border-gray-200 px-10 py-2.5 fixed w-full">
            <div className="container flex flex-wrap items-center mx-auto px-6 py-2">
                <div className="flex items-center">
                    <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Charity Zone Logo" />
                    <Link to="/" className="self-center text-4xl font-bold whitespace-nowrap text-white hover:text-gray-300 cursor-pointer">Charity Zone</Link>
                </div>
            </div>
        </nav>
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex flex-1 justify-center items-center">
          <img src={RegisterImg} className="h-3/4" alt="Charity Logo" />
          </div>
          <div className="flex-1 px-16">
            <div className="bg-gray-900 flex flex-col p-6 rounded-lg items-center">
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">User Name : </label>
                  <input name="UserName" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="User Name"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Name : </label>
                  <input name="Name" type="text" value={uName} onChange={(e)=>setName(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Name"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">User Type :</label>
                  <select className="w-1/3 bg-gray-600 text-white px-3 py-2" value={userType} onChange={(e)=>setUserType(e.target.value)}>
                    {userOptions.map((option) => (
                      <option className="px-4 py-2" key={option.key} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {key?
                <>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Enter Validator Secret : </label>
                  <input name="text" type="text" value={secret} onChange={(e)=>setSecret(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Enter Secret"/>
                </div>
                <div className="w-full flex flex-col items-center">
                  <button onClick={(e)=>registerUser(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Verify Secret
                  </button>
                </div></>:null}
                {link?
                <>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Enter Website Link : </label>
                  <input name="text" type="text" value={linkV} onChange={(e)=>setLinkV(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Enter Link"/>
                </div>
                <div className="w-full flex flex-col items-center">
                  <button onClick={(e)=>registerB(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Register Beneficiary
                  </button>
                </div></>:null}
                <div className="w-full flex flex-col items-center">
                  {!account?<button onClick={(e)=>handleConnect(e)} className="mt-8 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Connect MetaMask
                  </button>:
                  (!key)?
                  (!link)?
                  <button onClick={(e)=>handleClick(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Register
                  </button>:null:null
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register