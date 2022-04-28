import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PersonName from './pages/PersonName';
import TaxPage from "./pages/Tax";
import UpdatePage from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonName />} />
          <Route path='/tax' element={<TaxPage />} />
          <Route path="/update" element={<UpdatePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
