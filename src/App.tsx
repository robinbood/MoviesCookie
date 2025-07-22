
 import { Routes,Route } from "react-router";
import "./index.css";
import SplashPage from "./SplashPage";


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
