import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
