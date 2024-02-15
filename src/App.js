import './App.css';
import AuthSuccess from "./components/authSuccess/AuthSuccess";
import {Route, Routes} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Register from "./components/register/Register";
import AuthSendPassword from "./components/authSendPassword/authSendPassword";
import RegisterSuccess from "./components/registerSuccess/registerSuccess";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="authSuccess" element={<AuthSuccess/>}/>
            <Route path="registerSuccess" element={<RegisterSuccess/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="passwordSend" element={<AuthSendPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;
