import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCheckbox,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { ExpenseService } from "../services/expenseService";
import { Select } from "semantic-ui-react";
import { ItemExpenseService } from "../services/itemExpenseService";
import { EmployeeDetailService } from "../services/employeeDetailService";

const Expense = () => {
  const [datas, setDatas] = useState({});
  const [itemExpenseId, setItemExpenseId] = useState(0);
  const [res, setRes] = useState({});
  const [id, setId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [name, setName] = useState("");
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);

  const [isDateSet, setIsDateSet] = useState(false);
  const [itemExpenseName, setItemExpenseName] = useState("");

  const toggleOpen = () => {
    setBasicModal(!basicModal);
    setIsDateSet(false);
    const itemExpenseService = new ItemExpenseService();

    itemExpenseService
      .findAllByItemExpenseName(itemExpenseName)
      .then((res) => {
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
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState();
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);
  const toggleOpenUpdate = () => setBasicModalUpdate(!basicModalUpdate);

  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const toggleOpenDelete = () => setBasicModalDelete(!basicModalDelete);

  const [basicModalUpdateAll, setBasicModalUpdateAll] = useState(false);
  const toggleOpenUpdateAll = () =>
    setBasicModalUpdateAll(!basicModalUpdateAll);

  const [options, setOptions] = useState([]);

  const getInnerGroupExpenseAndUpenToggle = (id) => {
    setId(id);
    const itemExpenseService = new ItemExpenseService();

    itemExpenseService
      .findAllByItemExpenseName(itemExpenseName)
      .then((res) => {
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

  const handleUpdateAll = () => {
    const expenseService = new ExpenseService();

    const data = {
      id,
      amount,
      date,
      itemExpenseId,
    };

    expenseService
      .updateExpense(data)
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
  const getInnerGroupExpenseAndUpenAllToggle = (data) => {
    setId(data.id);
    setName(data.name);
    setAmount(data.amount);
    setItemExpenseId(data.itemExpenseId);
    setDate(data.date);

    const itemExpenseService = new ItemExpenseService();

    itemExpenseService
      .findAllByItemExpenseName(itemExpenseName)
      .then((res) => {
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

    toggleOpenUpdateAll();
  };

  const handleDelete = () => {
    const expenseService = new ExpenseService();

    expenseService
      .delete(id)
      .then((res) => {
        setRes(res);
        if (res.status === 200) {
          toggleOpenDelete();
        }
      })
      .catch((e) => {
        navigate("/login");
      });
  };

  const openToggleDeleteAndSetId = (id) => {
    setId(id);
    toggleOpenDelete();
  };

  const handleSubmit = () => {
    const expenseService = new ExpenseService();

    const data = {
      name,
      amount,
      date,
      isDateSet,
      itemExpenseId,
    };

    expenseService
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

  const handleUpdate = () => {
    const expense = new ExpenseService();

    expense.update(id, itemExpenseId).then((res) => {
      setRes(res.data);
      if (res.status === 200) {
        toggleOpenUpdate();
      }
    });
  };

  const handleSelect = (value, text) => {
    setItemExpenseId(value);

    const employeeDetailService = new EmployeeDetailService();

    const encodedText = encodeURIComponent(text);

    employeeDetailService
      .findEmployeeDetailByFullNameAndPosition(encodedText)
      .then((res) => {
        if (res.data.data) {
          setAmount(res.data.data.salary);
        }
      })
      .catch((e) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    const expenseService = new ExpenseService();

    expenseService.findAll(pageNumber).then((res) => {
      setDatas(res.data.data);
    });
  }, [pageNumber, response, res]);

  useEffect(() => {

    const itemExpenseService = new ItemExpenseService()

    itemExpenseService
      .findAllByItemExpenseName(itemExpenseName)
      .then((res) => {
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
  }, [itemExpenseName]);
  return (
    <div>
      <h2>Expense</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={"/expensesGroup"}>
            <MDBBtn>Category</MDBBtn>
          </Link>
          <Link to={"/allInnerGroupExpense"}>
            <MDBBtn>Subcategory</MDBBtn>
          </Link>
          <Link to={"/itemExpense"}>
            <MDBBtn>item</MDBBtn>
          </Link>
        </div>
        <MDBBtn onClick={toggleOpen} className="me-1" color="success">
          Expense Add
        </MDBBtn>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Subcategory name</th>
            <th>Category name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {datas.content?.map((data, i) => (
            <tr key={data.id}>
              <td>{i + 1 + 50 * pageNumber}</td>
              <td>{data?.itemExpenseName}</td>
              <td>{data?.amount}</td>
              <td>{data?.date}</td>
              <td>
                {data?.innerGroupName ? (
                  data?.innerGroupName
                ) : (
                  <p>No subcategory</p>
                )}
              </td>
              <td>{data?.groupName ? data?.groupName : <p>No category</p>}</td>
              <td>
                <MDBBtn
                  onClick={() => getInnerGroupExpenseAndUpenAllToggle(data)}
                  color="warning"
                >
                  Update
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  color="danger"
                  onClick={() => openToggleDeleteAndSetId(data.id)}
                >
                  Delete
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
              <MDBModalTitle>Add expense</MDBModalTitle>
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
                className="mb-4"
                type="text"
                name="itemExpenseName"
                label="Item name"
                value={itemExpenseName}
                onChange={(e) => setItemExpenseName(e.target.value)}
              />
              <Select
                onChange={(e, data) => {
                  const selectedOption = options.find(
                    (option) => option.value === data.value
                  );
                  const text = selectedOption ? selectedOption.text : "";
                  handleSelect(data.value, text);
                }}
                placeholder="Select Message Content"
                options={options}
              />
              <MDBInput
                className="mb-4"
                type="number"
                name="amount"
                label="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {isDateSet ? (
                <MDBInput
                  className="mb-4"
                  type="datetime-local"
                  name="date"
                  label="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              ) : null}
              <MDBCheckbox
                label="Date"
                onChange={(e) => setIsDateSet(e.target.checked)}
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
              <MDBInput
                className="mb-4"
                type="text"
                name="itemExpenseName"
                label="Item name"
                value={itemExpenseName}
                onChange={(e) => setItemExpenseName(e.target.value)}
              />
              <Select
                onChange={(e, data) => setItemExpenseId(data.value)}
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

      {/* Modal for update all field */}

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
                value={amount}
                className="mb-4"
                label="amount"
                type="number"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <MDBInput
                value={date}
                className="mb-4"
                type="datetime-local"
                name="date"
                label="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <MDBInput
                className="mb-4"
                type="text"
                name="itemExpenseName"
                label="Item name"
                value={itemExpenseName}
                onChange={(e) => setItemExpenseName(e.target.value)}
              />
              <Select
                onChange={(e, data) => setItemExpenseId(data.value)}
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

      {/* Modal for delete */}

      <MDBModal
        open={basicModalDelete}
        onClose={() => setBasicModalDelete(false)}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpenDelete}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <p>Are you sure to delete</p>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpenDelete}>
                Close
              </MDBBtn>
              <MDBBtn color="danger" onClick={handleDelete}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Expense;
