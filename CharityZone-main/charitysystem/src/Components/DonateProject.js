import { useEffect,useState } from 'react';
import Logo from '../assets/logo2.png'
import { Link } from 'react-router-dom'
import useCharity from '../contract/useCharity'

function DonateProjects() {

  const {getProjects,donate,showDonations} = useCharity()
  const [projects,setProjects] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [amt,setAmt] = useState("")
  const [mainId,setMainId] = useState()

//    const showDonations = async () => {
//     const contract = getCharityContract();
//     const showDonations = await contract.showDonations(2)
//     return showDonations
// }

  const getP = async () => {
    const proj = await getProjects()
    setProjects(proj)
  }

  const handleClick = (e,id) => {
    e.preventDefault()
    // donate(1,"0.0000003")
    setMainId(id)
    setShowModal(true)
  }

  const handleConfirmClick = (e) => {
    e.preventDefault();
    donate(mainId,amt)
    // donate(id,String(amt))
  }

  const getDets = async(e) => {
    e.preventDefault()
    const d = await showDonations()
    console.log(d.toNumber())
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
        <>
        <div className="w-full px-16 py-32">
          <h1 className="text-white mb-8 font-bold text-4xl">Charity Projects</h1>
          <div className="grid grid-cols-3 gap-6">
           {projects.length==0?
           <span className="text-white font-bold text-4xl">No Projects Yet</span>
           :
            projects.map((proj,id)=>(
                <div className="p-6 rounded-lg border shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700" key={id}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{proj.title}</h5>
                    <p className="font-normal text-gray-400">{proj.description}</p>
                    <button onClick={(e)=>handleClick(e,id)} className="text-white mt-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl">Donate</button>
                    {
                      showModal?
                      id===mainId?
                      <div className="mt-5 flex flex-col">
                        <label className="text-white text-lg font-semibold">Amount : </label>
                        <input name="Amount" type="text" value={amt} onChange={(e)=>setAmt(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Amount"/>
                        <button onClick={(e)=>handleConfirmClick(e)} className="mt-6 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Confirm transaction
                        </button>
                      </div>:null:null
                    }
                </div>
            ))
           }
           </div>
        </div> 
        </>   
    </div>
  );
}

export default DonateProjects;
