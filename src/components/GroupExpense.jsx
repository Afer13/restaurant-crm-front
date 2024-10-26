import React, { useEffect, useState } from "react";
import { GroupExpenseService } from "../services/gruopExpenseService";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { Select } from "semantic-ui-react";

const GroupExpense = () => {
  const [datas, setDatas] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("")
  const [response, setResponse] = useState({})
  const navigate = useNavigate()
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);
  const toggleOpenUpdate = () => setBasicModalUpdate(!basicModalUpdate);
  const [id, setId] = useState(0)


  const handleSubmit = () => {
    const groupExpensesService = new GroupExpenseService(); 

    groupExpensesService.save({name: name}).then(res => {
      if(res.status === 200){
        setResponse(res.data)
        alert("Successfuly saved")
        toggleOpen()
        setName("")
      }
    }).catch(e => navigate("/login"))

  }

  const setDatasAndOpenToggle = (data) => {
    setId(data.id)
    setName(data.name)
    toggleOpenUpdate();
  }

  const handleUpdate = () => {
    const groupExpenseService = new GroupExpenseService();
    const data = {
      id,
      name
    }
    groupExpenseService.update(data).then(res => {
      setResponse(res.data);
      if(res.status === 200){
        toggleOpenUpdate();
      }
    }).catch(e => {
      navigate("/login")
    })
    
  }

  useEffect(() => {
    const groupExpensesService = new GroupExpenseService();

    groupExpensesService.getAll(pageNumber).then((res) => {
      setDatas(res.data.data);
    });
  }, [pageNumber, response]);

  return (
    <div>
      <h2>Category</h2>
      <div style={{display:"flex", justifyContent:"end"}}>
        <MDBBtn onClick={toggleOpen} className="me-1" color="success">
          Add Category
        </MDBBtn>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {datas.content?.map((data, i) => (
            <tr key={data.id}>
              <td>{i + 1 + 50 * pageNumber}</td>
              <td>{data?.name}</td>
              <td><MDBBtn onClick={() => setDatasAndOpenToggle(data)} color="warning">Update</MDBBtn></td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>Count Candidate: {countCandidates}</tfoot> */}
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
          <li
            className={`page-item ${
              (pageNumber + 1) * 50 > datas.totalElements ? "disabled" : ""
            }`}
          >
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
              <MDBInput onChange={(e) => setName(e.target.value)} value={name} label="Name" id="form1" type="text" />
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


      {/* Modal for update */}

      <MDBModal open={basicModalUpdate} onClose={() => setBasicModalUpdate(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpenUpdate}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{display:"flex", flexDirection:"column", gap:"20px"}}>
              <MDBInput onChange={(e) => setName(e.target.value)} value={name} label="Name" id="form1" type="text" />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpenUpdate}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleUpdate}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default GroupExpense;
