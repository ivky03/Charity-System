import { useEffect,useState } from 'react';
import Logo from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import useCharity from '../contract/useCharity'

function ViewProjects() {

  const {getProjects} = useCharity()
  const [projects,setProjects] = useState()

  const getP = async () => {
    const proj = await getProjects()
    setProjects(proj)
    console.log(proj)
  }

  useEffect(()=>{
    getP()
  },[])

  return (
    <div className="bg-black min-h-screen min-w-screen">
      <nav className="border-gray-200 px-10 py-2.5 fixed w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto px-6 py-2">
            <div className="flex items-center">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Charity Zone Logo" />
                <Link to="/" className="self-center text-4xl font-bold whitespace-nowrap text-white hover:text-gray-300 cursor-pointer">Charity Zone</Link>
            </div>
        </div>
      </nav>
       <div className="w-full px-16 py-32">
          <h1 className="text-white mb-8 font-bold text-4xl">Charity Projects</h1>
          <div className="grid grid-cols-3 gap-6">
           {projects?.length==0?
           <span className="text-white font-bold text-4xl">No Projects Yet</span>
           :
            projects?.map((proj,id)=>(
                <div className="p-6 rounded-lg border shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700" key={id}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{proj.title}</h5>
                  <p className="mb-2 font-normal text-gray-400">{proj.description}</p>
                  <p className="font-normal text-gray-300">Donor Count : {proj.donorCount.toNumber()}</p>
                </div>
            ))
           }
           </div>
       </div>     
    </div>
  );
}

export default ViewProjects;
