import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import AddOrder from '../components/AddOrder';
import OrdersList from '../components/OrdersList';
import Candidates from '../components/Candidates';
import CandidateDetalis from '../components/CandidateDetalis';
import ListItems from '../components/ListItems';
import AddCanididate from '../components/AddCandidate';
import ListCandidate from '../components/ListCandidate';
import CandidateInfo from '../components/CandidateInfo';
import NotFound from '../components/NotFound';
import Messages from '../components/Messages';
import CreateMessageTemplate from '../components/CreateMessageTemplate';
import Items from '../components/Items';
import FilterAndSendMessage from '../components/FilterAndSendMessage';
import CandidateMessageQueue from '../components/CandidateMessageQueue';
import GroupExpense from '../components/GroupExpense';
import InnerGroupExpense from '../components/InnerGroupExpense';
import Expense from '../components/Expense';
import EmployeeDetails from '../components/EmployeeDetails';
import Report from '../components/Report';
import SearchOrders from '../components/SearchOrders';
import AllInnerGroupExpense from '../components/AllInnerGroupExpense';
import ItemExpense from '../components/ItemExpense';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<OrdersList/>}/>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/addCandidate' element={<AddCanididate/>}/>
        <Route path='/addOrder/:id' element={<AddOrder/>}/>
        <Route path='/candidates' element={<Candidates/>}/>
        <Route path='/candidateDetalis/:id' element={<CandidateDetalis/>}/>
        <Route path='/candidateItms/:id' element={<ListItems/>}/>
        <Route path='/listCanidates/:id' element={<ListCandidate/>}/>
        <Route path='/:id' element={<CandidateInfo />}/>
        <Route path='/messageTemplate' element={<Messages/>}/>
        <Route path='/createMessageTemplate' element={<CreateMessageTemplate/>}/>
        <Route path='/orders' element={<SearchOrders/>}/>
        <Route path='/items' element={<Items/>}/>
        <Route path='/filterAndSendMessage' element={<FilterAndSendMessage/>}/>
        <Route path='/candidateQueue/:id' element={<CandidateMessageQueue/>}/>
        <Route path='/expensesGroup' element = {<GroupExpense/>}/>
        <Route path='/expensesInnerGroup/:id' element = {<InnerGroupExpense/>}/>
        <Route path='/expenses' element = {<Expense/>}/>
        <Route path='/employeeDetails' element = {<EmployeeDetails/>} />
        <Route path='/report' element = {<Report/>} />
        <Route path='/allInnerGroupExpense' element = {<AllInnerGroupExpense/>}/>
        <Route path='/itemExpense' element = {<ItemExpense/>}/>
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routing;