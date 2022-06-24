//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Charity{
    
    struct User{
        address wallet;
        string name;
        string username;
        string usertype;
    }

    mapping(address => string) public usernames;
    mapping(string => User) public users;
    mapping(address => string) beneficiaryLinks;

    function getValidatorSecret() public pure returns(string memory){
        return "AUCZ";
    }

    function register(string memory _username,string memory _name,string memory _usertype) public {
        require(bytes(usernames[msg.sender]).length==0,"User exists");
        require(users[_username].wallet == address(0),"Username taken");

        users[_username] = User({
            wallet:msg.sender,
            name:_name,
            username:_username,
            usertype:_usertype
        });
        usernames[msg.sender] = _username;
    }

    function registerB(string memory _username,string memory _name,string memory _usertype,string memory link) public {
        require(bytes(usernames[msg.sender]).length==0,"User exists");
        require(users[_username].wallet == address(0),"Username taken");

        users[_username] = User({
            wallet:msg.sender,
            name:_name,
            username:_username,
            usertype:_usertype
        });
        usernames[msg.sender] = _username;
           require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("beneficiary"))));
        beneficiaryLinks[msg.sender]=link;
    }

    function getUser(address _wallet) public view returns (User memory){
        return users[usernames[_wallet]];
    }

    struct Project{
        string title;
        string description;
        address creator;
        address[] donors;
        uint amt;
        uint projectId;
        mapping(address=>uint) contributions;
    }

    struct ProjDetails{
        string title;
        string description;
        uint amt;
        uint donorCount;
    }

    mapping(uint=>Project) public projs;
    uint public numProjs;

    ProjDetails[] public projDetails;

    function createProject(string memory d,string memory t) public {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("beneficiary"))));
        Project storage newProj = projs[numProjs];
        numProjs++;
        newProj.title=t;
        newProj.description=d;
        newProj.creator = msg.sender;
        newProj.donors = new address[](0);
        newProj.amt=0;
        newProj.projectId=block.number;
        ProjDetails memory temp = ProjDetails(t,d,0,0);
        projDetails.push(temp);
    }

    function getProjects() public view returns(ProjDetails[] memory){
        return projDetails;
    }

    function donateMoney(uint projId) public payable {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("donor"))));
        projs[projId].donors.push(msg.sender);
        projs[projId].contributions[msg.sender]+=msg.value;
        projs[projId].amt+=msg.value;
        projDetails[projId].amt+=msg.value;
        projDetails[projId].donorCount++;   
    }

     struct Request{
        string reason;
        address payable recepient;
        string requestor;
        uint amount;
        uint reqId;
        string reqLink;
        string projTitle;
        uint projId;
        string phno;
    }

    Request[] public requests;

    function createRequest(string memory r,uint amount,uint projId,string memory phno) public {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("beneficiary"))));
        Request memory temp = Request(r,payable(msg.sender),usernames[msg.sender],amount,block.number,beneficiaryLinks[msg.sender],projs[projId].title,projId,phno);   
        requests.push(temp);
    }

    function getRequests() public view returns (Request[] memory){
        return requests;
    }

    Request[] public delRequests;

    function reqDel(uint index) internal {
        require(index < requests.length);
        requests[index] = requests[requests.length-1];
        requests.pop();
    }

    function getDelRequests() public view returns (Request[] memory){
        return delRequests;
    }

    function rejectRequest(uint reqId) public {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("validator"))));
        delRequests.push(requests[reqId]);
        reqDel(reqId);
    }

    struct voteRequest{
        string reason;
        address payable recepient;
        string recepientLink;
        uint amount;
        string projTitle;
        uint projId;
        uint noOfVoters;
        mapping(address => bool)votes;
    }

    mapping(uint=>voteRequest) public voteRequests;
    uint public numVoteRequests;

    struct voteRequestDetail{
        string reason;
        string recepientLink;
        uint amount;
        string projTitle;
        bool verified;
        bool approved;
    }

    voteRequestDetail[] public voteRequestDetails;

    function approveRequest(uint reqId) public {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("validator"))));
        voteRequest storage newVoteReq = voteRequests[numVoteRequests];
        numVoteRequests++;
        newVoteReq.reason=requests[reqId].reason;
        newVoteReq.recepient=requests[reqId].recepient;
        newVoteReq.recepientLink=requests[reqId].reqLink;
        newVoteReq.amount = requests[reqId].amount;
        newVoteReq.projTitle=requests[reqId].projTitle;
        newVoteReq.projId = requests[reqId].projId;
        newVoteReq.noOfVoters=0;
        voteRequestDetail memory temp = voteRequestDetail(requests[reqId].reason,requests[reqId].reqLink,requests[reqId].amount,requests[reqId].projTitle,false,false);
        voteRequestDetails.push(temp);
        reqDel(reqId);
    }

    function getVoteRequests() public view returns(voteRequestDetail[] memory){
        return voteRequestDetails;
    }

    function donorVoteRequest(uint _reqNo) public{
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("donor"))));
        require(projs[voteRequests[_reqNo].projId].contributions[msg.sender]>0,"You did'nt donate");
        voteRequest storage thisRequest=voteRequests[_reqNo];
        require(thisRequest.votes[msg.sender]==false,"You voted");
        thisRequest.votes[msg.sender]=true;
        thisRequest.noOfVoters++;
    }

    function makePayment(uint _reqNo) public {
        require(keccak256(abi.encodePacked((users[usernames[msg.sender]].usertype))) 
        == keccak256(abi.encodePacked(("validator"))));
        voteRequest storage thisRequest=voteRequests[_reqNo];
        voteRequestDetails[_reqNo].verified=true;
        if(thisRequest.noOfVoters > (projs[thisRequest.projId].donors.length)/2){
            if(thisRequest.amount<=projs[thisRequest.projId].amt){
                uint256 e = uint256(10)**uint256(18);
                voteRequestDetails[_reqNo].approved=true;
                thisRequest.recepient.transfer(thisRequest.amount*e);
            }   
        }
    }
}