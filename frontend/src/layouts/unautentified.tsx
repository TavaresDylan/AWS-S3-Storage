import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import RegisterForm from "../pages/register";
import "./styles.css";

const UnautentifiedLayout: FC = () => {
  return (
    <div className="grid grid-rows-1 h-screen grid-cols-2">
      <div className="w-50 h-100 background-svg flex justify-center items-center">
        <h1 className="text-4xl font-bold text-white font-sans">AWS S3 Private Storage</h1>
      </div>
      <div className="w-50 h-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default UnautentifiedLayout;
