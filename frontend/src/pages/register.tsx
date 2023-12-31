import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterForm: FC = () => {
  const auth = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpStatus, setOtpStatus] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: add form validation
    auth
      .signUp(username, email, password)
      .then((data) => {
        if (data.success) {
          handleResetForm();
          setOtpStatus(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(`submit : ${username} ${email}`);
  };

  const handleResetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.confirmSignUp(email, otpValue).then((data) => {
      if (data.success) {
        // TODO: redirect to login or directly to dashboard page
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-200">
      <div className="form-container border border-black rounded-lg p-6 bg-slate-100">
        <h1 className="font-bold text-4xl mb-6 text-center">Sign up</h1>
        {!otpStatus ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                className="rounded-2xl border border-black p-2"
                type="text"
                placeholder="Username"
                onChange={handleUsernameChange}
                name="username"
              />
              <input
                className="rounded-2xl border border-black p-2"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                name="email"
              />
              <input
                className="rounded-2xl border border-black p-2"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                name="password"
              />
              <input
                className="rounded-2xl border border-black p-2"
                type="password"
                placeholder="Password confirmation"
                onChange={handlePasswordChange}
                name="passwordConfirm"
              />
              <input
                className="rounded-2xl text-white p-2 bg-orange-500 hover:bg-orange-600"
                type="submit"
                value="Sign up"
              />
            </form>
            <div className="mt-6">
              <p>
                Already have an account ?{" "}
                <Link className="text-blue-500 hover:text-blue-600" to="/login">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        ) : (
          <form className="mt-4 flex flex-col gap-2" onSubmit={handleOtpSubmit}>
            <label htmlFor="otp">Confirmation code</label>
            <input
              className="rounded-2xl border border-black p-2"
              onChange={(event) => setOtpValue(event.target.value)}
              type="text"
              name="otp"
            />
            <input
              className="rounded-2xl text-white p-2 bg-orange-500 hover:bg-orange-600"
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
