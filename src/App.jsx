import { Route, Routes } from "react-router-dom";
import "./App.css";
import ParentHomeLayout from "./Homepage/MainHome/ParentHomeLayout";
import Navbar from "./Navigation-Components/NavBar";
import SignUp from "./LoginPage/SignUp";
import Login from "./LoginPage/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<ParentHomeLayout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
