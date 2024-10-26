import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { CandidateService } from "../services/candidateService";
import { Select } from "semantic-ui-react";

function OrdersList() {
  const [datas, setDatas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [candidateId, setCandidateId] =  useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shouldReceive, setShouldReceive] = useState();
  const [firstNameOrPhoneNumber, setFirstNameOrPhoneNumber] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [candidateFilter, setCandidateFilter] = useState("All");
  const [countCandidates, setCountCandidates] = useState(0)


  const shouldReceives = [
    { key: 'yes', value: true, text: 'YES' },
    { key: 'no', value: false, text: 'NO' },
  ];
  

  useEffect(() => {
    const candidateService = new CandidateService();
    
    if(candidateFilter === "OrderLess"){     
        candidateService.findByOrderIsNullAndFullNameContainsIgnoreCase(firstNameOrPhoneNumber, pageNumber, 100).then(res => {
          setDatas(res.data.data)
        }).catch(e => navigate("/login"))

        candidateService.countCandidatesByOrderIsNull().then(res => setCountCandidates(res.data))
    }
    else if(candidateFilter === "HavingOrder"){  
        candidateService.findByOrderIsNotNullAndFullNameContainsIgnoreCase(firstNameOrPhoneNumber, pageNumber, 100).then(res => {
        setDatas(res.data.data)
        }).catch(e => navigate("/login"))

        candidateService.countCandidatesByOrderIsNotNull().then(res => setCountCandidates(res.data))
    }
    else{
      candidateService.getAll(pageNumber, firstNameOrPhoneNumber, 100).then(res => {
        setDatas(res.data.data)
      }).catch(e => navigate("/login"))

      candidateService.countAllCandidate().then(res => setCountCandidates(res.data))
    }
    

    candidateService.getCount().then(res => setCount(res.data))
  }, [pageNumber, firstNameOrPhoneNumber, candidateFilter]);

  const handleModal = (data) => {
     toggleOpen();
     setCandidateId(data.id)
     setFirstName(data.firstName)
     setLastName(data.lastName);
     setPhoneNumber(data.phoneNumber);
     setShouldReceive(data.shouldReceive);
     
  }

  const handleSubmit = () => {
    const candidateService = new CandidateService();
    const data = {
      id: candidateId,
      firstName: firstName,
      lastName: lastname,
      phoneNumber: phoneNumber,
      shouldReceive: shouldReceive
    }
    candidateService.update(data).then(res => console.log(res.data)).catch(err => navigate("/login"));

    toggleOpen();

    window.location.reload();
  }

  const handleClickOrderless = (value) =>{
    setPageNumber(0)
    setCandidateFilter(value);
  }

  return (
    <div>
      <h1>Candidates List</h1>
      <MDBBtn style={{backgroundColor: candidateFilter === "All" ? "#606060" : "#C0C0C0", color:"white", marginBottom:"10px"}} disabled={candidateFilter === "All"} className="me-1" color="light" onClick={() => handleClickOrderless("All")}>All Candidate</MDBBtn>
      <MDBBtn style={{backgroundColor: candidateFilter === "HavingOrder" ? "#606060" : "#C0C0C0", color:"white", marginBottom:"10px"}} disabled={candidateFilter === "Order"} className="me-1" color="light" onClick={() => handleClickOrderless("HavingOrder")}>Having Order Candidate</MDBBtn>
      <MDBBtn style={{backgroundColor: candidateFilter === "OrderLess" ? "#606060" : "#C0C0C0", color:"white", marginBottom:"10px"}} disabled={candidateFilter === "OrderLess"} className="me-1" color="light" onClick={() => handleClickOrderless("OrderLess")}>Orderless Candidate</MDBBtn>
      <MDBInput
        onChange={(e) => setFirstNameOrPhoneNumber(e.target.value)}
        label="Find By Fist Name or Phone number"
        id="form1"
        type="text"
      />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cashback</th>
            <th>Rank</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <td>Should receive</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, i) => (
            <tr key={data.id}>
              <td>{i + 1 + 100 * pageNumber}</td>
              <td>{data.cashback}</td>
              <td>{data.rank}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.phoneNumber}</td>
              <td>{data.shouldReceive? "YES" : "NO"}</td>
              <td>
                <MDBBtn onClick={() => handleModal(data)} className='me-1' color='warning'>
                  Update
                </MDBBtn>
              </td>
              <td>
              <Link to={"/candidateDetalis/"+data.id}>
                <MDBBtn className="me-1" color="info">
                  Info
                </MDBBtn>
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>Count Candidate: {countCandidates}</tfoot>
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
          <li className={`page-item ${(pageNumber + 1) * 100 > count ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Modal */}
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{display:"flex", flexDirection:"column", gap:"20px"}}>
              <MDBInput onChange={(e) => setFirstName(e.target.value)} value={firstName} label="First name" id="form1" type="text" />
              <MDBInput onChange={(e) => setLastName(e.target.value)} value={lastname} label="Last name" id="form1" type="text" />
              <MDBInput onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} label="Phone number" id="form1" type="text" />
              <Select  onChange={(e, data) => setShouldReceive(data.value)} placeholder='Should Receives' options={shouldReceives} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default OrdersList;
