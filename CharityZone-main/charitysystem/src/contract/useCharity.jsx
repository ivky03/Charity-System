import Charity from './Charity.json'
import {ethers,BigNumber} from 'ethers'
import { useEffect, useState } from 'react'

const ContractABI = Charity.abi
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const Ethereum = typeof window !== 'undefined' && window.ethereum

const getCharityContract = () => {
    const provider = new ethers.providers.Web3Provider(Ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(ContractAddress,ContractABI, signer)
}

const useCharity = () => {
    const [currentAccount,setCurrentAccount] = useState('')
    const [currentUser,setCurrentUser] = useState(null)

    useEffect(()=>{
        if(!Ethereum){
            console.log("Please install Metamask")
            return;
        }
        connect()
    },[])
    const connect = async () => {
        try{
            if(!Ethereum){
                alert("Please install Metamask")
                return;
            }
            const accounts = await Ethereum.request({
                method:'eth_requestAccounts',
            });
            if(accounts.length === 0){
                console.log("No Authorized Accounts")
                return;
            }
            const acc = accounts[0]
            console.log("Connected to ",acc)
            setCurrentAccount(acc)
        }
        catch(e){
            console.log(e)
        }
    }
    const getUser = async() => {
        const contract = getCharityContract();
        const user = await contract.getUser(currentAccount)
        const {wallet,name,username,usertype} = user
        setCurrentUser({wallet,name,username,usertype})
        return user
    }

    const getProjects = async() => {
        const contract = getCharityContract();
        const proj = await contract.getProjects()
        // console.log(proj)
        // const p = proj.wait()
        return proj
    }

    const getRequests = async() => {
        const contract = getCharityContract();
        const req = await contract.getRequests()
        return req
    }

    const getDelRequests = async() => {
        const contract = getCharityContract();
        const req = await contract.getDelRequests()
        return req
    }

    const getVoteRequests = async() => {
        const contract = getCharityContract();
        const req = await contract.getVoteRequests()
        return req
    }

    const createUser = async (username,uName,userType) => {
        const contract = getCharityContract();
        const user = await contract.register(username,uName,userType)
    }

    const createB = async(username,uName,userType,link) => {
        const contract = getCharityContract();
        const user = await contract.registerB(username,uName,userType,link)
    }

    const createProject = async (title,description) => {
        const contract = getCharityContract();
        const project = await contract.createProject(description,title)
    }

    const createRequest = async (reason,amount,projId,phNo) => {
        const contract = getCharityContract();
        const req = await contract.createRequest(reason,amount,projId,phNo)
    }

    const getValSecret = async () => {
        const contract = getCharityContract();
        const secret = await contract.getValidatorSecret()
        return secret
    }

    const acceptRequest = async (reqId) => {
        const contract = getCharityContract();
        // console.log(reqId);
        const r = await contract.approveRequest(reqId)
        return r;
    }

    const rejectRequest = async (reqId) => {
        const contract = getCharityContract();
        // console.log(reqId);
        const r = await contract.rejectRequest(reqId)
        return r;
    }

    const donate = async (projId,amt) => {
        const contract = getCharityContract();
        console.log(amt)
        const overrides = {
            value:ethers.utils.parseEther(amt)
        }
        const transaction = await contract.donateMoney(projId,overrides)
        console.log(transaction)
    }

    const showDonations = async () => {
        const contract = getCharityContract();
        const showDonations = await contract.showDonations(0)
        return showDonations
    }

    const donorVoteRequest = async (reqId) => {
        const contract = getCharityContract();
        const r = await contract.donorVoteRequest(reqId)
        return r;
    }

    const makePayment = async (reqId) => {
        const contract = getCharityContract();
        const r = await contract.makePayment(reqId)
        console.log(r)
        return r;
    }

    return {connect,account:currentAccount,user:currentUser,createUser,getValSecret,createB,donate,getVoteRequests,makePayment,
        getDelRequests,getUser,createProject,getProjects,getRequests,createRequest,acceptRequest,rejectRequest,showDonations,donorVoteRequest}
}

export default useCharity