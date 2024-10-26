import React, { useState, useEffect } from "react";
import { OrderService } from "../services/orderService";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(false)
  const [isEarly, setIsEarly] = useState(false);
  const [ignoreOrder, setIgnoreOrder] = useState({})



  useEffect(() => {
    const orderService = new OrderService();
    if(clickedButton){
      orderService
      .findByOpenCheckAtIsNotNullOrderByOpenCheck(pageNumber, isEarly)
      .then((res) => setOrders(res.data.data)).catch(e => {
        navigate("/login")
      });
    }
    else{
      orderService
      .findByOpenCheckAtIsNullOrderByOpenCheck(pageNumber, isEarly)
      .then((res) => setOrders(res.data.data)).catch(e => {
        navigate("/login")
      });
    }
    

  }, [pageNumber, clickedButton, isEarly, ignoreOrder]);

  useEffect(() =>{
    const orderService = new OrderService();

    orderService.getCount().then(res => {
      setCount(res.data)
    })
  },[])

  const handleButtonClickIsEarly = () => {
    setIsEarly(!isEarly)
  }

  const handleButtonClick = () => {
    setClickedButton(!clickedButton)
  }

  const updateIsIgnore = (id) => {
      const orderService = new OrderService()
      const data = {
        id: id
      }
      orderService.updateIsIgnoreToTrue(data).then(res => {
        setIgnoreOrder(res.data)
      })
  }

  return (
    <div>
      <h1>Orders List</h1>
      <div style={{display:"flex", gap:"10px"}}>
      <MDBBtn color="light" onClick={handleButtonClickIsEarly} style={{backgroundColor: !isEarly ? "#606060" : "#C0C0C0", color:"white"}} disabled={isEarly}>
        Earliest
      </MDBBtn>
      <MDBBtn color="light" onClick={handleButtonClickIsEarly} style={{backgroundColor: isEarly ? "#606060" : "#C0C0C0", color:"white"}} disabled={!isEarly}>
        Latest
      </MDBBtn>
      <MDBBtn color="light" onClick={handleButtonClick} style={{backgroundColor: !clickedButton ? "#606060" : "#C0C0C0", color:"white"}} disabled={clickedButton}>
        Closed orders
      </MDBBtn>
      <MDBBtn color="light" onClick={handleButtonClick} style={{backgroundColor: clickedButton ? "#606060" : "#C0C0C0", color:"white"}} disabled={!clickedButton}>
        Open orders
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
            <th>Open Check At</th>
            <th>Close Check At</th>
            <th>Amount</th>
            <th>Count of Candidates</th>
            <th>Ignore order</th>
            <th>Add Candidate</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.id}>
              <td>{i + 1 + 10 * pageNumber}</td>
              <td><Link to={"/candidateItms/"+order.id} >{order.docNumber}</Link></td>
              <td>{order.tableName}</td>
              <td>{order.hallName}</td>
              <td>{order.employeeName}</td>
              <td>{order.openCheckAt}</td>
              <td>{order.closeCheckAt}</td>
              <td>{order.amount}</td>
              <td>{(order.countCandidates) ? order.countCandidates: "?"}</td>
              <td>
                <MDBBtn onClick={() => updateIsIgnore(order.id)} className="me-1" color="danger">
                  Ignore
                </MDBBtn>
              </td>
              <td>
              <Link to={"/listCanidates/"+order.id}>
                <MDBBtn className="me-1" color="success">
                  Add Candidate
                </MDBBtn>
              </Link>
              </td>

            </tr>
          ))}
        </tbody>
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
          <li className={`page-item ${(pageNumber + 1) * 10 > count ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default OrdersList;
