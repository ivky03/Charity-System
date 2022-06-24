import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import App from './App';
import Register from './Components/Register';
import Beneficiary from './Components/Beneficiary';
import Donor from './Components/Donor';
import Validator from './Components/Validator';
import CreateProject from './Components/CreateProject';
import ViewProjects from './Components/ViewProjects';
import CreateRequest from './Components/CreateRequest';
import ViewRequests from './Components/ViewRequests';
import DonateProjects from './Components/DonateProject';
import ValidationCriteria from './Components/ValidationCriteria';
import CloseVoting from './Components/CloseVoting';
import VoteRequest from './Components/VoteRequest';
import RequestStatus from './Components/RequestStatus';
import VoteStatus from './Components/VoteStatus';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="viewprojects" element={<ViewProjects />}/>
        <Route path="register" element={<Register />} />
        <Route path="beneficiary" element={<Beneficiary />} />
        <Route path="beneficiary/createproject" element={<CreateProject />} />
        <Route path="beneficiary/createrequest" element={<CreateRequest />} />
        <Route path="beneficiary/requestStatus" element={<RequestStatus />} />
        <Route path="donor" element={<Donor />} />
        <Route path="donor/donateProject" element={<DonateProjects />} />
        <Route path="donor/voteRequest" element={<VoteRequest />} />
        <Route path="donor/voteStatus" element={<VoteStatus />} />
        <Route path="validator" element={<Validator />} />
        <Route path="validator/viewRequests" element={<ViewRequests />} />
        <Route path="validator/closeVoting" element={<CloseVoting />} />
        <Route path="validator/validationCriteria" element={<ValidationCriteria />} />
    </Routes>
  </BrowserRouter>
);


