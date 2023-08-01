"use client";

import OTPInput from "react-otp-input";
import Edit from "../svgs/icons/Edit";
import CustomForm from "./CustomForm";
import { BeatLoader } from "react-spinners";
import Button from "../components/Button";

interface CheckOTPFormProps {
  getOTPHandler: (otp: string) => void;
  checkOTPHandler?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  resendOTPHandler?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isLoading?: boolean;
  back?: () => void;
  sendOtpResponse?: any;
  otp: string;
  time: number;
}

const CheckOTPForm: React.FC<CheckOTPFormProps> = ({
  getOTPHandler,
  checkOTPHandler,
  resendOTPHandler,
  sendOtpResponse,
  back,
  isLoading,
  otp,
  time,
}) => {
  let FormBody = (
    <OTPInput
      numInputs={6}
      value={otp}
      onChange={getOTPHandler}
      shouldAutoFocus={true}
      containerStyle={"w-full gap-1 "}
      inputType='number'
      renderInput={(props) => (
        <div className='flex-1 w-full'>
          <input
            {...props}
            className='text-center textField__input text-secondary-500'
            style={{
              width: "100%",
            }}
          />
        </div>
      )}
    />
  );

  let formFooter = (
    <div className='flex flex-col gap-3'>
      {isLoading ? (
        <div className='flex items-center justify-center w-full py-3 '>
          <BeatLoader color='#4A6DFF' />
        </div>
      ) : (
        <Button
          action={checkOTPHandler}
          label='Submit'
          buttonType={{ type: "submit" }}
          disabled={time <= 0}
        />
      )}

      <div className='mt-4 text-sm text-center text-secondary-800'>
        {time ? (
          <span>Resend code within {time} seconds</span>
        ) : (
          <span onClick={resendOTPHandler} className='cursor-pointer '>
            Resend code
          </span>
        )}
      </div>
    </div>
  );

  return (
    <CustomForm
      title='Next Shop'
      subtitle={`Verification code has sent to ${
        sendOtpResponse?.data?.email || "..."
      }`}
      formBody={FormBody}
      small
      handleSubmit={checkOTPHandler}
      icon={Edit}
      action={back}
      loading={isLoading}
      formFooter={formFooter}
    />
  );
};

export default CheckOTPForm;
