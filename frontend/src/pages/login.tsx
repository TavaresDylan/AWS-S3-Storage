import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`submit : ${username}`);
    navigate("/dashboard");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-200">
      <div className="form-container border border-black rounded-lg p-6 bg-slate-100">
        <h1 className="font-bold text-4xl mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="rounded-2xl border border-black p-2"
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <input
            className="rounded-2xl border border-black p-2"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <input
            className="rounded-2xl text-white p-2 bg-orange-500 hover:bg-orange-600"
            type="submit"
            value="Login"
          />
        </form>
        <div className="mt-6">
          <p>
            Don't have an account ?{" "}
            <Link className="text-blue-500 hover:text-blue-600" to="/register">
              Register
            </Link>
          </p>
          <p>
            Forgot your password ?{" "}
            <Link
              className="text-blue-500 hover:text-blue-600"
              to="/forgot-password"
            >
              Reset
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
