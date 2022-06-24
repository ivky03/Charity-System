import React from 'react'
import {useLocation,Link} from 'react-router-dom';
import Logo from '../assets/logo2.png'

function ValidationCriteria() {
  const location = useLocation()

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
      <div className="flex h-full w-screen mx-auto">
          <div className="flex-1 px-16 py-28">
            <h1 className="text-white text-4xl font-bold my-4">Some Criterion to check for every request</h1>
            <ol className="list-decimal text-white text-2xl px-12 flex flex-col space-y-5 mt-10">
                <li>The requested money should not be more than 10.</li>
                <li>Visit the website of the benficiary and check the authencity of the organization.</li>
                <li>Look at things like past activities, certifications, active members, etc.</li>
                <li>Try reaching out to the beneficiary using the links present on the website.</li>
                <li>If you are still unclear and require more information then contact them using their phone no.</li>
                <li>If you find some holes in what they say or if you feel that things are not adding up, then reject the request.</li>
                <li>If you feel everything is in order and are satisfied with the request, then approve the request.</li>
            </ol>
          </div>
      </div>
    </div>
  )
}

export default ValidationCriteria