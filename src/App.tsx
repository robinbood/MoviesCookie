
 import { Routes,Route } from "react-router";
import "./index.css";
import SplashPage from "./SplashPage";
import SignupPage from "./SignUpPage";


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/Signup" element={<SignupPage/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
