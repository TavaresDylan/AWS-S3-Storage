import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../hooks/useAuth";

const AuthentifiedLayout: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handelDisconnect = () => {
    const res = auth.signOut();
    if (res) {
      res.then((data) => {
        if (data.success) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-12 max-h-screen">
      <div className="background-svg h-screen bg-orange-700 flex items-center justify-between flex-col py-4 shadow-xl col-span-3">
        <div className="">
          <img
            className="rounded-full object-cover w-32 h-32 m-auto border-2 border-black shadow-sm"
            src="https://as1.ftcdn.net/v2/jpg/02/18/45/30/1000_F_218453068_WRjhtH9MzO33Cb19K8acZI2VZvXueQ70.jpg"
            alt=""
          />
          <h1 className="text-white font-bold text-2xl font-sans mt-2">Dylan Tavares</h1>
        </div>

        <button onClick={handelDisconnect} className="rounded-xl bg-rose-600 hover:bg-rose-700 p-2 text-white">
          Disconnect
        </button>
      </div>
      <div className="col-span-9 pl-2 max-h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthentifiedLayout;
