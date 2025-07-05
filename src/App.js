import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Dbate_Past from './components/Dbate_Past/Dbate_Past'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./components/Home/Home"
import Dbate from './components/Dbate/Dbate';
import NewDebate from './components/NewDebate/NewDebate';
import Account from './components/Account/Account'
import Register from './components/Register/Register';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return(
    <Router>
      {/* <MoneyTransfer /> */}
      {isAuthenticated && <Header />}
      <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route
          path="/register"
          element={isAuthenticated ? <Home /> : <Register />}
      />
      <Route path="/debate" element={ <Dbate /> } />
      <Route path="/debate_past" element={ <Dbate_Past /> } /> 
      <Route
          path="/newdebate"
          element={isAuthenticated ? <NewDebate /> : <Login />}
      />
      <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
      />
      </Routes>
    </Router>
  );
}
export default App;
