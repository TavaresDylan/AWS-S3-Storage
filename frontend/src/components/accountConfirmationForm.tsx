import { FC, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type AccountConfirmationFormProps = {
  email: string;
  to: string;
};

const AccountConfirmationForm: FC<AccountConfirmationFormProps> = ({
  email,
  to,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState<string>("");

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth
      .confirmSignUp(email, otpValue)
      .then((data) => {
        if (data.success) {
          navigate(to);
        } else {
          console.log("error confirm signup : ", data);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleResendConfirmationCode = () => {
    auth.resendConfirmationCode(email).then((data) => {
      console.log("resend confirmation code : ", data);
    });
  };

  return (
    <div>
      <form className="mt-4 flex flex-col gap-2" onSubmit={handleOtpSubmit}>
        <label htmlFor="otp">Confirmation code</label>
        <input
          className="rounded-2xl border border-black p-2"
          onChange={(event) => setOtpValue(event.target.value)}
          type="text"
          name="otp"
          required
        />
        <p className="text-red-500">{error}</p>
        <input
          className="rounded-2xl text-white p-2 bg-orange-500 hover:bg-orange-600"
          value={"Re-send code"}
          onClick={handleResendConfirmationCode}
          type="button"
        />
        <input
          className="rounded-2xl text-white p-2 bg-orange-500 hover:bg-orange-600"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AccountConfirmationForm;
