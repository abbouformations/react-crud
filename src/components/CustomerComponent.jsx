import { useState } from "react";
import api from "../api/axiosConfig";
import CustomerList from "./CustomerList";

const CustomerComponent = ({ load, customers }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [identityRef, setIdentityRef] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  async function save(event) {
    event.preventDefault();
   if (id) {
    await api.put("/update/"+id, {
      lastname: lastname,
      firstname: firstname,
      identityRef: identityRef,
      username: username
    });

   } else {
    await api.post("/create", {
      firstname: firstname,
      lastname: lastname,
      identityRef: identityRef,
      username: username
    });
 
  }
  alert("Customer Record Saved");
  // reset state
  setId("");
  setFirstname("");
  setLastname("");
  setIdentityRef("");
  setUsername("");
  load();
  }

  async function editCustomer(customers) {
    setFirstname(customers.firstname);
    setLastname(customers.lastname);
    setIdentityRef(customers.identityRef);
    setUsername(customers.username);
    setId(customers.id);
  }

  async function deleteCustomer(id) {
    await api.delete("/delete/" + id);
    alert("Customer Details Deleted Successfully");
    load();
  }

 
  /* end handlers */

/* jsx */
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
          hidden
            type="text"
            className="form-control"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <label>Lastname</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Firstname</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-4">
            <label>Identity Ref</label>
            <input
              type="text"
              className="form-control"
              value={identityRef}
              onChange={e => setIdentityRef(e.target.value)}
            />
          </div>
        </div>

        
        <div className="row">
          <div className="col-4">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              placeholder="Customers"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Save
          </button>
        </div>
      </form>
      <CustomerList
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
    </div>
  );
};

export default CustomerComponent;