interface UseValidator {
  emailValidation: (email: string) => ValidatorResult;
  lengthValidation: (
    value: string,
    minLength?: number,
    maxLength?: number
  ) => ValidatorResult;
  passwordValidation: (password: string) => ValidatorResult;
  passwordMatch: (password: string, confirmPassword: string) => ValidatorResult;
}

export type ValidatorResult = {
  success: boolean;
  message: string;
};

const useValidator = (): UseValidator => {
  const emailValidation = (email: string): ValidatorResult => {
    // Regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    if (regex.test(email)) {
      return {
        success: true,
        message: "Email is valid",
      };
    } else {
      return {
        success: false,
        message: "Email is invalid",
      };
    }
  };

  const lengthValidation = (
    value: string,
    minLength?: number,
    maxLength?: number
  ): ValidatorResult => {
    if (minLength !== undefined && maxLength !== undefined) {
      if (value.length >= minLength && value.length <= maxLength) {
        return {
          success: true,
          message: "value is valid",
        };
      } else {
        return {
          success: false,
          message: `must be at least ${minLength} characters long and at most ${maxLength} characters long`,
        };
      }
    } else if (minLength !== undefined && maxLength === undefined) {
      if (value.length >= minLength) {
        return {
          success: false,
          message: `must be at least ${minLength} characters long`,
        };
      } else {
        return {
          success: true,
          message: "value is valid",
        };
      }
    } else if (minLength === undefined && maxLength !== undefined) {
      if (value.length <= maxLength) {
        return {
          success: false,
          message: `must be at most ${maxLength} characters long`,
        };
      } else {
        return {
          success: true,
          message: "value is valid",
        };
      }
    }
    return {
      success: false,
      message: "value is invalid",
    };
  };

  const passwordValidation = (password: string): ValidatorResult => {
    // Regex from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const regex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    if (regex.test(password)) {
      return {
        success: true,
        message: "Password is valid",
      };
    } else {
      return {
        success: false,
        message:
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number and 8 characters",
      };
    }
  };

  const passwordMatch = (
    password: string,
    confirmPassword: string
  ): ValidatorResult => {
    if (password === confirmPassword) {
      return {
        success: true,
        message: "Password match",
      };
    } else {
      return {
        success: false,
        message: "Password does not match",
      };
    }
  };

  return {
    emailValidation,
    lengthValidation,
    passwordValidation,
    passwordMatch,
  };
};
export default useValidator;
