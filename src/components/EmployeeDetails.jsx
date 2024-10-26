import { MDBBtn, MDBCheckbox, MDBFile, MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EmployeeDetailService } from '../services/employeeDetailService';

const EmployeeDetails = () => {

    const navigate = useNavigate()
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [basicModalDelete, setBasicModalDelete] = useState(false);
    const toggleOpenDelete = () => setBasicModalDelete(!basicModalDelete);
    const [basicModalUpdate, setBasicModalUpdate] = useState(false);
    const toggleOpenUpdate = () => setBasicModalUpdate(!basicModalUpdate);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [salary, setSalary] = useState(0.0)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [position, setPosition] = useState("")
    const [startWorkDate, setStartWorkDate] = useState()
    const [endWorkDate, setEndWotkDate] = useState()
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    const [response, setResponse] = useState({})
    const [datas, setDatas] = useState([])
    const [id, setId] = useState(0);
    const [deleteRes, setDeleteRes] = useState({})
    const [isImage, setIsImage] = useState(false);
    const [isWorking, setIsWoring] = useState();

    useEffect(() => {
        const employeeDetailService = new EmployeeDetailService();

        employeeDetailService.getAll(pageNumber).then(res => {
            setDatas(res.data.data)
        })
    }, [response, deleteRes, pageNumber])

    const formatDateToLocalDateTime = (date) => {
        return `${date}T00:00:00`;
      };


    const convertLocalDateTimeToDateString = (localDateTime) => {
        
        const [datePart] = localDateTime.split('T');
        return datePart; 
      };

    const handleDelete = () => {
        const employeeDetailService = new EmployeeDetailService();

        employeeDetailService.deleteById(id).then(res => {
            if (res.status === 200) {
                setDeleteRes(res.data);
                toggleOpenDelete();
            }
        }).catch(e => {
            navigate("/login")
        });
    }

    const handleUpdate = () => {
        const startWorkDate2 = formatDateToLocalDateTime(startWorkDate);
        const endWorkDate2 = formatDateToLocalDateTime(endWorkDate);
        const data = {
            id,
            firstName,
            lastName,
            salary,
            phoneNumber,
            position,
            isWorking,
            startWorkDate: startWorkDate2,
            endWorkDate: endWorkDate2
        };

        const employeeDetailService = new EmployeeDetailService();

        employeeDetailService.updateEmployee(data).then(res => {
            setResponse(res.data)
            toggleOpenUpdate();
            setFirstName("")
            setLastName("")
            setSalary(0.0)
            setPhoneNumber("")
            setPosition("")
            setStartWorkDate("")
            setEndWotkDate("")
            setIsImage(false)
        }).catch(e => navigate("/login"))
    }

    const setIdAndToggleOpenDelete = (id) => {
        setId(id);
        toggleOpenDelete();
    }

    const getDatasAndToggleOpenUpdate = (id) => {
        const employeeDetailService = new EmployeeDetailService();

        employeeDetailService.getEmployeeDetailById(id).then(res => {
            setId(res.data.data.id)
            setFirstName(res.data.data.firstName)
            setLastName(res.data.data.lastName)
            setSalary(res.data.data.salary)
            setPhoneNumber(res.data.data.phoneNumber)
            setPosition(res.data.data.position)
            setStartWorkDate(convertLocalDateTimeToDateString(res.data.data.startWorkDate))
            setEndWotkDate(convertLocalDateTimeToDateString(res.data.data.startWorkDate))
            setIsWoring(res.data.data.working)


            const formData = new FormData();
                
            formData.append("employeeDetailId", id)

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('pictures', selectedFiles[i]);
            }
            if(isImage){
              employeeDetailService.savePhotos(formData)
            }

        })
        .catch(e => {
            navigate("/login")
        })

        toggleOpenUpdate();
    }

    const handleSubmit = () => {
        const employeeDetailService = new EmployeeDetailService();

        const startWorkDate2 = formatDateToLocalDateTime(startWorkDate);

        
        const data = {
            firstName,
            lastName,
            salary,
            phoneNumber,
            position,
            startWorkDate: startWorkDate2
        };
        employeeDetailService.saveEmployee(data)
            .then(res => {
                const formData = new FormData();

                formData.append("employeeDetailId", res.data.data)

                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('pictures', selectedFiles[i]);
                }
                if(isImage){
                  employeeDetailService.savePhotos(formData)
                }

                setResponse(res)
                toggleOpen()
                setFirstName("")
                setLastName("")
                setSalary(0.0)
                setPhoneNumber("")
                setPosition("")
                setStartWorkDate("")
                setIsImage(false)
                
            }).catch(e => navigate("/login"))
    }

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <MDBBtn onClick={toggleOpen} className="me-1" color="success">
                    Add
                </MDBBtn>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Salary</th>
                        <th>Phone number</th>
                        <th>Position</th>
                        <th>Start work date</th>
                        <th>End work date</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1 + 50 * pageNumber}</td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.salary}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.position}</td>
                            <td>{data.startWorkDate}</td>
                            <td>{data.isWorking ? data.endWorkDate : "Works"}</td>
                            <td><MDBBtn onClick={() => getDatasAndToggleOpenUpdate(data.id)}>Update</MDBBtn></td>
                            <td><MDBBtn color='danger' onClick={() => setIdAndToggleOpenDelete(data.id)}>Delete</MDBBtn></td>
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

            {/* Modal for add employee */}

            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Update</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <MDBInput onChange={(e) => setFirstName(e.target.value)} value={firstName} label="First name" id="form1" type="text" />
                            <MDBInput onChange={(e) => setLastName(e.target.value)} value={lastName} label="Last name" id="form1" type="text" />
                            <MDBInput onChange={(e) => setSalary(e.target.value)} value={salary} label="Salary" id="form1" type="text" />
                            <MDBInput onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} label="Phone number" id="form1" type="text" />
                            <MDBInput onChange={(e) => setPosition(e.target.value)} value={position} label="Position" id="form1" type="text" />
                            <MDBInput onChange={(e) => setStartWorkDate(e.target.value)} value={startWorkDate} label="Start work date" id="form1" type="date" />
                            {isImage ? <MDBFile onChange={handleFileChange} multiple label='Choose ID Card photos' id='customFile' /> : null}
                            <MDBCheckbox label='Image ID card' onChange={(e) => setIsImage(e.target.checked)}/>
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

            {/* Modal for delete employee */}

            <MDBModal open={basicModalDelete} onClose={() => setBasicModalDelete(false)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Delete</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenDelete}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <p>Are you sure delete the employee</p>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenDelete}>
                                Close
                            </MDBBtn>
                            <MDBBtn color='danger' onClick={handleDelete}>Delete</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            
            {/* Modal for update employee */}
            <MDBModal open={basicModalUpdate} onClose={() => setBasicModalUpdate(false)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Update</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenUpdate}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <MDBInput onChange={(e) => setFirstName(e.target.value)} value={firstName} label="First name" id="form1" type="text" />
                            <MDBInput onChange={(e) => setLastName(e.target.value)} value={lastName} label="Last name" id="form1" type="text" />
                            <MDBInput onChange={(e) => setSalary(e.target.value)} value={salary} label="Salary" id="form1" type="text" />
                            <MDBInput onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} label="Phone number" id="form1" type="text" />
                            <MDBInput onChange={(e) => setPosition(e.target.value)} value={position} label="Position" id="form1" type="text" />
                            <MDBInput onChange={(e) => setStartWorkDate(e.target.value)} value={startWorkDate} label="Start work date" id="form1" type="date" />
                            <MDBInput onChange={(e) => setEndWotkDate(e.target.value)} value={endWorkDate} label="End work date" id="form1" type="date" />
                            {isImage ? <MDBFile onChange={handleFileChange} multiple label='Choose ID Card photos' id='customFile' /> : null}
                            <MDBCheckbox label='Image ID card' onChange={(e) => setIsImage(e.target.checked)}/>
                            <MDBCheckbox checked={isWorking} onChange={(e) => setIsWoring(e.target.checked)} label="Status employee" id="form1"/>
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
    )
}

export default EmployeeDetails
