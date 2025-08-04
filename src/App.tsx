
 import { Routes,Route } from "react-router";
import "./index.css";
import SplashPage from "./SplashPage";
import SignupPage from "./SignUpPage";
import SignInPage from "./SigninPage";


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/api/Signup" element={<SignupPage/>}/>
        <Route path="/api/Signin" element={<SignInPage/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
