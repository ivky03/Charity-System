import React from 'react'
import {useLocation,Link} from 'react-router-dom';
import useCharity from '../contract/useCharity'
import Logo from '../assets/logo2.png'
import BeneficiaryImg from '../assets/ben.svg'
import { VscOrganization } from "react-icons/vsc";
import { IoCreateSharp } from "react-icons/io5";
import { BsFillQuestionSquareFill } from "react-icons/bs";

function Beneficiary() {
  const location = useLocation()

  const options = [{
    id:0,
    title:'Create Project',
    icon:VscOrganization,
    route:'/beneficiary/createproject'
  },{
    id:1,
    title:'Create Request',
    icon:IoCreateSharp,
    route:'/beneficiary/createrequest'
  },{
    id:2,
    title:'Request Status',
    icon:BsFillQuestionSquareFill,
    route:'/beneficiary/requestStatus'
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
            <h1 className="text-white text-4xl font-bold my-4">Beneficiary Dashboard</h1>
            <div className="flex flex-wrap items-center justify-center ">
            {
              options.map((op)=>(
                <Link to={op.route}  key={op.id}>
                  <div className="bg-gray-900 flex-wrap py-7 px-12 my-4 mx-6 rounded-md flex flex-col min-w-max min-h-max">
                    <op.icon className="text-white text-4xl font-bold self-center"/>
                    <span className="my-3 text-white text-2xl font-bold">{op.title}</span>
                  </div>
                </Link>
              ))
            }
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 px-16">
            <img src={BeneficiaryImg} className="h-3/4 w-3/4" alt="Beneficiary Img" />
          </div>
      </div>
    </div>
  )
}

export default Beneficiary