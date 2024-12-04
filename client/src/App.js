
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Login from "./Component/Login";
import ControlPanel from "./Component/ControlPanel";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Login/>}/>
                <Route path={"/control-panel"} element={<ControlPanel/>}/>

          </Routes>
      </BrowserRouter>
    );
}

export default App;
