import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import RegisterImg from '../assets/Register.PNG'
import useCharity from '../contract/useCharity'
import Logo from '../assets/logo2.png'

function CreateRequest() {

  const [reason,setReason] = useState('')
  const [amount,setAmount] = useState(0)
  const [projId,setProjId] = useState(-1)
  const [phNo,setPhNo] = useState('')
  const [projects,setProjects] = useState([])

  const {account,createRequest,getProjects,getRequests} = useCharity()

  const handleClick = (e) => {
    e.preventDefault();
    if(projId===-1){
      alert("Please Select a Project")
      return;
    }
    createRequest(reason,amount,projId,phNo)
  }

  const getProj = async() => {
    const p = await getProjects()
    setProjects(p) 
    console.log(p)
    // const r = await getRequests()
    // console.log(r)
  }

  useEffect(()=>{
    getProj()
  },[])


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
                <label className="text-white font-bold mb-3 text-3xl">Enter Request Details</label>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Reason : </label>
                  <input name="Reason" type="text" value={reason} onChange={(e)=>setReason(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Reason"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Contact No : </label>
                  <input name="PhoneNo" type="text" value={phNo} onChange={(e)=>setPhNo(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Contact No"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                  <label className="text-white text-lg font-semibold">Amount : </label>
                  <input name="Amount" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Amount"/>
                </div>
                <div className="flex flex-col space-y-2 w-full my-2">
                {
                    projects.length!=0?
                    <>
                    <label className="text-white text-lg font-semibold">Project :</label>
                    <select className="w-1/3 bg-gray-600 text-white px-3 py-2" value={projId} onChange={(e)=>setProjId(e.target.value)}>
                    <option className="px-4 py-2" key={0} value={-1}>Select Project</option>
                    {projects?.map((proj,id)=>(
                      <option className="px-4 py-2" key={id+1} value={id}>{proj.title}</option>
                    ))}
                    </select>
                    </> 
                    :<span className="text-white text-xl">No Projects Created by Beneficiary</span>
                    }
                </div>
                <div className="w-full flex flex-col items-center">
                  {!account?<button className="mt-8 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Connect to MetaMask
                  </button>:
                  <button onClick={(e)=>handleClick(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create Request
                  </button>
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CreateRequest