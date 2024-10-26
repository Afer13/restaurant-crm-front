import React, { useState, useEffect } from "react";
import { OrderService } from "../services/orderService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { PresentServie } from "../services/presentService";
import { CandidateService } from "../services/candidateService";
import { MessageService } from "../services/messageService";

function CandidateDetalis() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumberMessages, setPageNumberMessage]= useState(0)
  const { id } = useParams();
  const [clickedButton, setClickedButton] = useState(false)
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [presents, setPresents] = useState([]);
  const [cashback, setCashback] = useState(0) 
  const [candidate, setCandidate] = useState({});
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [messageLogs, setMessageLogs] = useState([])

  const updatePresent = (presentId) =>{
    const presentService = new PresentServie()
    
    const data = {
      id: presentId,
      status: false
    }

    presentService.update(data)
  }

  const updateCashback = () => {
    const candidateService = new CandidateService();
    
    const data = {
      id: id,
      cashbackAmount: parseFloat(cashback)
    }
    console.log(data);
     candidateService.updateCashback(data).then(res => console.log(res.data.data))

     toggleOpen()
  }

  useEffect(() => {
    const orderService = new OrderService();
    if(clickedButton){
      orderService
      .findByCandidateIdOrderByOpenCheckAtCandidateDesc(id, pageNumber)
      .then((res) => {
        setOrders(res.data.data)
        console.log(res.data.data);
      }).catch(e => {
        navigate("/login")
      });
    }
    else{
      orderService
      .findByCandidateIdOrderByOpenCheckAtCandidateAsc(id, pageNumber)
      .then((res) => setOrders(res.data.data)).catch(e => {
        navigate("/login")
      });
    }
    
  }, [pageNumber, clickedButton]);

  useEffect(() =>{
    const orderService = new OrderService();

    orderService.getSumAmountsByCandidateId(id).then(res => setTotalAmount(res.data))

    const presentService = new PresentServie()
    presentService.findByIdAndStatusIsTrue(id).then(res => setPresents(res.data.data))

    const candidateService = new CandidateService();

    candidateService.findById(id).then(res => setCandidate(res.data.data))

  },[])

  useEffect(() =>{
    const messageService = new MessageService()

    messageService.findMessageLogsByCandidateId(id, pageNumberMessages).then(res => setMessageLogs(res.data.data))
  }, [pageNumberMessages])

  const handleButtonClick = () => {
    setClickedButton(!clickedButton)
  }

  return (
    <div>
      <h2>Candidate Detail</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last Name</th>
            <th>Cashback</th>
            <th>Cashback percent</th>
            <th>Edit cashback</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th><Link to={"/" + candidate.candidateId}>{candidate.candidateId}</Link></th>
              <td>{candidate.firstName}</td>
              <td>{candidate.lastName}</td>
              <td>{candidate.cashback}</td>
              <td>{candidate.cashbackPercent}%</td>
              <td><MDBBtn onClick={toggleOpen}>Edit cashback</MDBBtn></td>
            </tr>
        </tbody>
      </table>
      <h1>Orders List</h1>
      <div style={{display:"flex", gap:"10px"}}>
      <MDBBtn color="light" onClick={handleButtonClick} style={{backgroundColor: clickedButton ? "#606060" : "#C0C0C0", color:"white"}} disabled={!clickedButton}>
        Earliest
      </MDBBtn>
      <MDBBtn color="light" onClick={handleButtonClick} style={{backgroundColor: !clickedButton ? "#606060" : "#C0C0C0", color:"white"}} disabled={clickedButton}>
        Latest
      </MDBBtn>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Document Number</th>
            <th>Table Name</th>
            <th>Hall</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Count of Candidates</th>
            <th>Order Type</th>
          </tr>
        </thead>
        <tbody>
          {orders?.content?.map((order, i) => (
            <tr key={order.id}>
              <td>{i + 1 + 10 * pageNumber}</td>
              <td><Link to={"/candidateItms/"+order.id} >{order.docNumber}</Link></td>
              <td>{order.table}</td>
              <td>{order.hallName}</td>
              <td>{order.employeeName}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.amount}</td>
              <td>{order.countCandidateOrders}</td>
              <td>{order?.foodDepartments?.map(dep=>(
                 <p>{dep?.name}</p>)
              )}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>Total amount: {totalAmount}</tfoot>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
          </li>
          <li className={`page-item`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

          <h2>Active presents</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Present</th>
            <th>Count</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {presents.map((present, i) => (
            <tr key={present.id}>
              <td>{i + 1 + 10 * pageNumber}</td>
              <td>{present.name}</td>
              <td>{present.count}</td>
              <td><MDBBtn onClick={() => updatePresent(present.id)}>Deactivate</MDBBtn></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Message Logs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Sent at</th>
          </tr>
        </thead>
        <tbody>
          {messageLogs.map((message, i) => (
            <tr key={i}>
              <td>{i + 1 + 10 * pageNumberMessages}</td>
              <td>{message.message}</td>
              <td>{message.sentAtDate} {" "} {message.sentAtTime} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNumberMessages === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumberMessage(pageNumberMessages - 1)}
            >
              Previous
            </button>
          </li>
          <li className={`page-item ${ 10 > messageLogs.length ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumberMessage(pageNumberMessages + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

          {/* Modal */}
      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit cashback</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {" "}
              <MDBInput label="Cashback amount" id="form1" type="number" onChange={(e) => setCashback(e.target.value)}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn color="success" onClick={updateCashback}>
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default CandidateDetalis;
