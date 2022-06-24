import {useLocation,Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import Logo from '../assets/logo2.png'
import useCharity from '../contract/useCharity'
import { FaPeopleArrows } from "react-icons/fa";

function RequestStatus() {

  const {getVoteRequests,getDelRequests} = useCharity()
  const [requests,setRequests] = useState([])
  const [delRequests,setDelRequests] = useState([])

  const getR = async () => {
    const r = await getVoteRequests()
    setRequests(r)

    const d = await getDelRequests()
    setDelRequests(d)

    console.log(r,d)
  }

  useEffect(()=>{
    getR()
  },[])

  return (
    <div className="bg-black h-screen w-screen">
      <nav className="border-gray-200 px-10 py-2.5 fixed w-full">
          <div className="container flex flex-wrap justify-between items-center mx-auto px-6 py-2">
              <div className="flex items-center">
                  <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Charity Zone Logo" />
                  <Link to="/" className="self-center text-4xl font-bold whitespace-nowrap text-white hover:text-gray-300 cursor-pointer">Charity Zone</Link>
              </div>
          </div>
      </nav>
      <div className="w-full px-16 py-32">
            <h1 className="text-white mb-8 font-bold text-4xl">Charity Vote Requests</h1>
            <div className="grid grid-cols-3 gap-6">
            {
                delRequests?.map((req,id)=>(
                    <div key={id} className="flex flex-col divide-y divide-gray-600 rounded-xl shadow-md bg-gray-800 border-gray-700">
                        <div className="flex items-center justify-left space-x-4 py-4 px-6">
                            <FaPeopleArrows className="text-white text-xl"/>
                            <h5 className="text-xl font-bold text-white">{req.reason}</h5>
                        </div>
                        <div className="py-4 flex flex-col justify-center items-between px-6">
                            <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Beneficiary Link : </span><a className="text-blue-400" href={req.reqLink}>{req.reqLink}</a></p>
                        </div>
                        <div className="py-4 flex items-center justify-between px-6">
                            <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Amount : </span>{req.amount.toNumber()} ether</p>
                            <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Project : </span>{req.projTitle}</p>
                        </div>
                        <div className="flex items-center w-full">
                            <p className="font-semibold text-center text-lg flex-1 py-2 px-4 bg-red-500 hover:bg-red-700 rounded-b-xl">Rejected</p>
                        </div>
                    </div>  
                ))
            }
           {requests?.length==0?
           <span className="text-white font-bold text-4xl">No requests Yet</span>
           :
            requests.map((req,id)=>(
                req.verified===true?
                <div key={id} className="flex flex-col divide-y divide-gray-600 rounded-xl shadow-md bg-gray-800 border-gray-700">
                  <div className="flex items-center justify-left space-x-4 py-4 px-6">
                    <FaPeopleArrows className="text-white text-xl"/>
                    <h5 className="text-xl font-bold text-white">{req.reason}</h5>
                  </div>
                  <div className="py-4 flex flex-col justify-center items-between px-6">
                    <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Beneficiary Link : </span><a className="text-blue-400" href={req.recepientLink}>{req.recepientLink}</a></p>
                  </div>
                  <div className="py-4 flex items-center justify-between px-6">
                    <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Amount : </span>{req.amount.toNumber()} ether</p>
                    <p className="font-normal text-gray-400"><span className="font-semibold text-gray-200">Project : </span>{req.projTitle}</p>
                  </div>
                  <div className="flex items-center w-full">
                    <p className={`font-semibold text-center text-lg flex-1 py-2 px-4 ${req.approved===true?"bg-green-500 hover:bg-green-700":"bg-red-500 hover:bg-red-700"} rounded-b-xl`}>{req.approved===true?"Approved":"Rejected"}</p>
                  </div>
                </div>:null
            ))
           }
           </div>
       </div>  
    </div>
  )
}

export default RequestStatus