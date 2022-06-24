import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import RegisterImg from '../assets/Register.PNG'
import useCharity from '../contract/useCharity'
import Logo from '../assets/logo2.png'

function CreateProject() {

  const [description,setDescription] = useState('')
  const [title,setTitle] = useState('')

  const {account,createProject} = useCharity()

  const handleClick = (e) => {
    e.preventDefault();
    createProject(title,description)
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
          <div className="flex-1 px-16">
          <img src={RegisterImg} className="" alt="Charity Logo" />
          </div>
          <div className="flex-1 px-16">
            <div className="bg-gray-900 flex flex-col p-6 rounded-lg items-center">
                <label className="text-white font-bold mb-3 text-3xl">Enter Project Details</label>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Title : </label>
                  <input name="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Title"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Description : </label>
                  <input name="Description" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Description"/>
                </div>
                <div className="w-full flex flex-col items-center">
                  {!account?<button className="mt-8 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Connect to MetaMask
                  </button>:
                  <button onClick={(e)=>handleClick(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create Project
                  </button>
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CreateProject