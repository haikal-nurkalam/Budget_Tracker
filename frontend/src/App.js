import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Expense from "./Pages/Expense";
import AddExpense from "./Pages/AddExpense";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./Template/NotFound";
import AddIncome from "./Pages/AddIncome";
import Transaction from "./Pages/Transaction";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const userDetail = JSON.parse(localStorage.getItem("user"));

  return userDetail ? element : null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={<PrivateRoute element={<Dashboard />} />}
        ></Route>
        <Route
          path="/expense"
          element={<PrivateRoute element={<Expense />} />}
        ></Route>
        <Route
          path="/add-expense"
          element={<PrivateRoute element={<AddExpense />} />}
        ></Route>
        <Route
          path="/add-income"
          element={<PrivateRoute element={<AddIncome />} />}
        ></Route>
        <Route
          path="/transaction"
          element={<PrivateRoute element={<Transaction />} />}
        ></Route>
        <Route path="*" element={<NotFound />} /> {/* Route untuk laman 404 */}
      </Routes>
    </Router>
  );
}

export default App;
