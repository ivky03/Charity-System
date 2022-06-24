import { Link } from 'react-router-dom'

const bannerStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 4%, rgba(20,20,20,0.7) 100%),url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height:'100vh'
}

function Banner() {
  return (
    <div style={bannerStyle}>
        <div className="px-16 py-48 h-full w-2/3">
          <h1 className="text-white text-4xl font-bold">Interested in a transparent charity system?</h1>
          <p className="mt-10 text-white text-2xl">
            If you feel you are someone who wants to donate to charity foundations but are not able to trust them enough
            and would appreciate all the activities done by the foundation to be more transparent, then Charity Zone is the
            right spot for you. Charity Zone is a decentralized charity application where all the transactions and activities 
            are recorded on the blockchain and hence can be tracked by anyone. There is no one central authority which makes
            decisions, on the other hand it provides the donors with a say in where the money is donated to.
          </p>
          <button className="mt-10 bg-gray-800 rounded-md bg-opacity-60 hover:bg-opacity-90 px-4 py-2 w-max">
            <Link to="/viewprojects" className="text-white hover:text-gray-300 text-2xl font-semibold">View Charity Projects</Link>
          </button>
        </div>
    </div>
  );
}

export default Banner;
