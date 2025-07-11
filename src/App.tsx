import { useState } from "react";
 import "./index.css";
import {SplashPage} from "./SplashPage";


function App() {
  const [splash,setSplash] = useState<boolean>(true)

  return (
    <div className="app">

     {splash && <SplashPage/>}
    
    </div>
  );
}

export default App;
