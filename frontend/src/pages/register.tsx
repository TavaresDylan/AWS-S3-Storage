import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useValidator, { ValidatorResult } from "../hooks/useValidator";
import AccountConfirmationForm from "../components/accountConfirmationForm";

type FormValidatorErrors = {
  field: string;
  validatorResult: ValidatorResult;
};

type FormValues = {
  type: string;
  name: string;
  placeholder: string;
  handleChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const RegisterForm: FC = () => {
  const auth = useAuth();
  const validator = useValidator();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otpStatus, setOtpStatus] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormValidatorErrors[]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      auth
        .signUp(username, email, password)
        .then((data) => {
          if (data.success) {
            setOtpStatus(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const updateFormError = (
    field: string,
    message: string,
    successStatus: boolean
  ) => {
    let newFormErrors = formErrors?.map((key) => {
      if (key.field === field) {
        return {
          ...key,
          validatorResult: {
            success: successStatus,
            message: message,
          },
        };
      }
      return key;
    });
    setFormErrors(newFormErrors);
  };

  const isFormValid = (): boolean => {
    const isValid = validator.passwordMatch(password, confirmPassword);
    const isValidEmail = validator.emailValidation(email);
    const isValidPassword = validator.passwordValidation(password);
    const isValidUsername = validator.lengthValidation(username, 3, 20);
    if (
      !isValid.success ||
      !isValidEmail.success ||
      !isValidPassword.success ||
      !isValidUsername.success
    ) {
      setFormErrors([
        {
          field: "passwordConfirm",
          validatorResult: isValid,
        },
        {
          field: "email",
          validatorResult: isValidEmail,
        },
        {
          field: "password",
          validatorResult: isValidPassword,
        },
        {
          field: "username",
          validatorResult: isValidUsername,
        },
      ]);
      return false;
    } else {
      return true;
    }
  };

  const handleResetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidUsername = validator.lengthValidation(e.target.value, 3, 20);
    updateFormError(
      "username",
      isValidUsername.message,
      isValidUsername.success
    );
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidEmail = validator.emailValidation(e.target.value);
    updateFormError("email", isValidEmail.message, isValidEmail.success);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidPassword = validator.passwordValidation(e.target.value);
    updateFormError(
      "password",
      isValidPassword.message,
      isValidPassword.success
    );
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isPasswordsMatch = validator.passwordMatch(password, e.target.value);
    updateFormError(
      "passwordConfirm",
      isPasswordsMatch.message,
      isPasswordsMatch.success
    );
    setConfirmPassword(e.target.value);
  };

  const formValues: FormValues[] = [
    {
      type: "text",
      name: "username",
      placeholder: "Username",
      handleChangeFunction: handleUsernameChange,
      required: true,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
      handleChangeFunction: handleEmailChange,
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      handleChangeFunction: handlePasswordChange,
      required: true,
    },
    {
      type: "password",
      name: "passwordConfirm",
      placeholder: "Confirm Password",
      handleChangeFunction: handleConfirmPasswordChange,
      required: true,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-200">
      <div className="form-container border border-black rounded-lg p-6 bg-slate-100 max-w-sm">
        <h1 className="font-bold text-4xl mb-6 text-center">Sign up</h1>
        {!otpStatus ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {formValues.map((field) => {
                return (
                  <>
                    <label className="capitalize" htmlFor={field.name}>
                      {field.name}
                    </label>
                    <input
                      className="rounded-2xl border border-black p-2"
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={field.handleChangeFunction}
                      name={field.name}
                      required={field.required}
                    />
                    {formErrors?.map((errorfield) => {
                      if (
                        errorfield.field === field.name &&
                        !errorfield.validatorResult.success
                      ) {
                        return (
                          <p className="text-red-600">
                            {errorfield.validatorResult.message}
                          </p>
                        );
                      }
                    })}
                  </>
                );
              })}
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
          <AccountConfirmationForm email={email} to="/dashboard" />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
