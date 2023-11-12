import "bootstrap/dist/css/bootstrap.css";
import api from "./api/axiosConfig";
import { useEffect, useState } from "react";
import "./App.css";
import CustomerComponent from "./components/CustomerComponent";

function App() {
  const [customers, setCustomers] = useState([]);

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await api.get("/all");
    setCustomers(result.data);
  }

  return (
    <div>
      <h1 className="text-center">List Of customers</h1>
      <CustomerComponent load={load} customers={customers} />
    </div>
  );
}

export default App;