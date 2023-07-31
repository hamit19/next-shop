"use client";

import OTPInput from "react-otp-input";
import TextField from "../components/inputs/TextField";
import Edit from "../svgs/icons/Edit";
import CustomForm from "./CustomForm";

interface CheckOTPFormProps {
  getOTPHandler: (otp: string) => void;
  checkOTPHandler?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isLoading?: boolean;
  back?: () => void;
  email?: string;
  otp: string;
}

const CheckOTPForm: React.FC<CheckOTPFormProps> = ({
  getOTPHandler,
  checkOTPHandler,
  back,
  email,
  isLoading,
  otp,
}) => {
  let FormBody = (
    <OTPInput
      numInputs={6}
      value={otp}
      onChange={getOTPHandler}
      shouldAutoFocus={true}
      containerStyle={"w-full gap-1"}
      inputType='number'
      renderInput={(props) => (
        <input
          {...props}
          className='textField__input text-center text-secondary-500 w-full flex-1'
        />
      )}
    />
  );

  return (
    <CustomForm
      title='Next Shop'
      subtitle={`Verification code has sent to ${email} `}
      formBody={FormBody}
      small
      handleSubmit={checkOTPHandler}
      icon={Edit}
      action={back}
      loading={isLoading}
    />
  );
};

export default CheckOTPForm;
