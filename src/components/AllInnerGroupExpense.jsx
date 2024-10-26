import React, { useEffect, useState } from "react";
import { InnerGroupExpenseService } from "../services/innerGroupExpenseService";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { GroupExpenseService } from "../services/gruopExpenseService";
import { Select } from "semantic-ui-react";

const AllInnerGroupExpense = () => {
  const [datas, setDatas] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("");
  const [response, setResponse] = useState({});
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [groupId, setGroupId] = useState(0);
  const [id, setId] = useState(0);
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);
  const toggleOpenUpdate = () => setBasicModalUpdate(!basicModalUpdate);
  const [basicModalUpdateAll, setBasicModalUpdateAll] = useState(false);
  const toggleOpenUpdateAll = () =>
    setBasicModalUpdateAll(!basicModalUpdateAll);
  const [res, setRes] = useState({});

  useEffect(() => {
    const innerGroupExpenseService = new InnerGroupExpenseService();

    innerGroupExpenseService
      .findAll(pageNumber)
      .then((res) => setDatas(res.data.data))
      .catch((e) => {
        navigate("/login");
      });
  }, [pageNumber, response, res]);

  const handleSubmit = () => {
    const innerGroupExpensesService = new InnerGroupExpenseService();

    const data = {
      name,
    };

    innerGroupExpensesService
      .save(data)
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data);
          alert("Successfuly saved");
          toggleOpen();
          setName("");
        }
      })
      .catch((e) => navigate("/login"));
  };

  const handleUpdateAllAndSetDatas = (data) => {
    setId(data.id);
    setName(data.name);
    setGroupId(data.groupId);
    toggleOpenUpdateAll();

    const groupExpenseService = new GroupExpenseService();

    groupExpenseService
      .findAll()
      .then((res) => {
        console.log(res.data.data);

        const formattedOptions = res.data.data.map((item) => ({
          key: item.id,
          text: item.name,
          value: item.id,
        }));
        setOptions(formattedOptions);
      })
      .catch((e) => {
        navigate("/login");
      });
  };

  const handleUpdateAll = () => {
    const innerGroupExpenseService = new InnerGroupExpenseService();

    const data = {
      id,
      name,
      groupId,
    };

    innerGroupExpenseService
      .updateInnerGroupExpense(data)
      .then((res) => {
        setRes(res.data);
        if (res.status === 200) {
          toggleOpenUpdateAll();
        }
      })
      .catch((e) => {
        navigate("/login");
      });
  };

  const getGroupExpenseAndUpenToggle = (id) => {
    setId(id);
    const groupExpenseService = new GroupExpenseService();

    groupExpenseService
      .findAll()
      .then((res) => {
        console.log(res.data.data);

        const formattedOptions = res.data.data.map((item) => ({
          key: item.id,
          text: item.name,
          value: item.id,
        }));
        setOptions(formattedOptions);
      })
      .catch((e) => {
        navigate("/login");
      });

    toggleOpenUpdate();
  };

  const handleUpdate = () => {
    const innerGroupExpenseservice = new InnerGroupExpenseService();

    innerGroupExpenseservice.update(id, groupId).then((res) => {
      setRes(res.data);
      if (res.status === 200) {
        toggleOpenUpdate();
      }
    });
  };

  return (
    <div>
      <h2>Subcategory</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={"/expensesGroup"}>
            <MDBBtn>Group</MDBBtn>
          </Link>
        </div>
        <MDBBtn onClick={toggleOpen} className="me-1" color="success">
          Subcategory Add
        </MDBBtn>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Group name</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {datas.content?.map((data, i) => (
            <tr key={data.id}>
              <td>{i + 1 + 50 * pageNumber}</td>
              <td>{data?.name}</td>
              <td>
                {data?.groupName ? (
                  data?.groupName
                ) : (
                  <MDBBtn onClick={() => getGroupExpenseAndUpenToggle(data.id)}>
                    Choose group group
                  </MDBBtn>
                )}
              </td>
              <td>
                <MDBBtn
                  color="warning"
                  onClick={() => handleUpdateAllAndSetDatas(data)}
                >
                  Update
                </MDBBtn>
              </td>
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

      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <MDBInput
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Name"
                id="form1"
                type="text"
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal for update */}

      <MDBModal
        open={basicModalUpdate}
        onClose={() => setBasicModalUpdate(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpenUpdate}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Select
                onChange={(e, data) => setGroupId(data.value)}
                placeholder="Select Message Content"
                options={options}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpenUpdate}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleUpdate}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal for update all */}

      <MDBModal
        open={basicModalUpdateAll}
        onClose={() => setBasicModalUpdateAll(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpenUpdateAll}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <MDBInput
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Name"
                id="form1"
                type="text"
              />
              <Select
                onChange={(e, data) => setGroupId(data.value)}
                placeholder="Select Message Content"
                options={options}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpenUpdateAll}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleUpdateAll}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default AllInnerGroupExpense;
