import React, { useEffect, useState } from 'react'
import { OrderService } from '../services/orderService'
import { MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const SearchOrders = () => {

  const [datas, setDatas] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [docNumber, setDocNumber] = useState("")

  useEffect(() => {
    const orderService = new OrderService()

    orderService.findByDocNumberContains(pageNumber, docNumber).then(res => {
      setDatas(res.data.data)
      console.log(res.data.data);
      
    })

  },[pageNumber, docNumber])

  return (
    <div>
      <MDBInput
        onChange={(e) => {
          setDocNumber(e.target.value)
          setPageNumber(0)
        }}
        label="Find by Doc Number"
        id="form1"
        type="text"
      />
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Doc Number</th>
            <th scope="col">Table</th>
            <th scope="col">Hall</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Candidate Name</th>
            <th scope="col">Branch</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {datas?.content?.map((data, i) => (
            <tr>
              <th scope="row">{pageNumber * 100 + i + 1}</th>
              <td><Link to={"/candidateItms/"+data?.id} >{data.docNumber}</Link></td>
              <td>{data?.table}</td>
              <td>{data?.hallName}</td>
              <td>{data?.amount}</td>
              <td>{data?.date}</td>
              <td>{data?.time}</td>
              <td>{data?.candidateName}</td>
              <td>{data?.foodDepartments?.map(food => (
                <p>{food?.name}</p>
              ))}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

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
    </div>
  )
}

export default SearchOrders
