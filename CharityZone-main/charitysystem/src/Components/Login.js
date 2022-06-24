import React,{useState} from 'react'

function Login() {

  const [role,setRole] = useState('')
  const [description,setDescription] = useState('')
  const [minCGPA,setMinCGPA] = useState(0)
  const [minTenth,setMinTenth] = useState(0)
  const [minTwelfth,setMinTwelfth] = useState(0)
  const [checkedState, setCheckedState] = useState(
    new Array(4).fill(false)
  );
  const [selectedDepts,setSelectedDepts] = useState([])

  const depts = [
    { value: 'IT',key:0 },
    { value: 'CSE',key:1 },
    { value: 'ECE',key:2 },
    { value: 'EEE',key:3 },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    console.log(role,description,minCGPA,minTenth,minTwelfth,selectedDepts)
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    let tempDepts=[];
    updatedCheckedState.map((item, index) =>{
      if(item===true){
        tempDepts=[...tempDepts,depts[index].value]
      }
    })
    setSelectedDepts(tempDepts)
  };

  return (
      <div className="bg-black h-max w-screen">
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex-1 px-16">
            <div className="bg-gray-900 flex flex-col p-10 rounded-lg items-center">
                <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">Role : </label>
                  <input name="Role" type="text" value={role} onChange={(e)=>setRole(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Role"/>
                </div>
                <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">Description : </label>
                  <input name="Description" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Description"/>
                </div>
                <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">Minimum CGPA : </label>
                  <input name="MinimumCGPA" type="number" value={minCGPA} onChange={(e)=>setMinCGPA(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Minimum CGPA"/>
                </div>
                <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">Minimum Tenth Mark : </label>
                  <input name="MinimumTenth" type="number" value={minTenth} onChange={(e)=>setMinTenth(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Minimum Tenth Mark"/>
                </div>
                <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">Minimum Twelfth Mark : </label>
                  <input name="MinimumTwelfth" type="number" value={minTwelfth} onChange={(e)=>setMinTwelfth(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none" placeholder="Minimum Twelfth Mark"/>
                </div>
            
                {/* <div className="flex flex-col space-y-3 w-full my-3">
                  <label className="text-white text-lg font-semibold">User Type :</label>
                  <select className="w-1/3 bg-gray-600 text-white px-3 py-2" value={userType} onChange={(e)=>setUserType(e.target.value)}>
                    {userOptions.map((option) => (
                      <option className="px-4 py-2" key={option.key} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div> */}
                <div className="flex flex-col space-y-3 w-full my-3">
                <label className="text-white text-lg font-semibold">Choose Eligible Departments : </label>
                {depts.map((dept) => {
                  return (
                    <div key={dept.key}>
                        <div className="flex space-x-3 text-white items-center">
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${dept.key}`}
                            name={dept.value}
                            value={dept.value}
                            checked={checkedState[dept.key]}
                            onChange={() => handleOnChange(dept.key)}
                          />
                          <label htmlFor={`custom-checkbox-${dept.key}`}>{dept.value}</label>
                        </div>
                    </div>
                  );
                })}
                </div>
                <div className="w-full flex justify-center">
                  <button onClick={(e)=>handleClick(e)} className="mt-8 w-2/3 py-2 px-4 text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Login
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login