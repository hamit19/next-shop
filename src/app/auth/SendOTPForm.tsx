import { BeatLoader } from "react-spinners";
import TextField from "../components/inputs/TextField";
import CustomForm from "./CustomForm";
import Button from "../components/Button";

interface SendOTPFormProps {
  emailHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendOTPHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  email?: string;
  isLoading?: boolean;
}

const SendOTPForm: React.FC<SendOTPFormProps> = ({
  emailHandler,
  sendOTPHandler,
  email,
  isLoading,
}) => {
  let FormBody = (
    <TextField
      name='email'
      id='email'
      type='string'
      label='Please enter your email'
      onChange={emailHandler}
      value={email}
    />
  );

  let formFooter = (
    <div className=''>
      {isLoading ? (
        <div className='flex items-center justify-center w-full py-3 '>
          <BeatLoader color='#4A6DFF' />
        </div>
      ) : (
        <Button
          action={sendOTPHandler}
          label='Submit'
          buttonType={{ type: "submit" }}
        />
      )}
    </div>
  );

  return (
    <CustomForm
      title='Next Shop'
      subtitle='Login | Sign up'
      handleSubmit={sendOTPHandler}
      formBody={FormBody}
      loading={isLoading}
      formFooter={formFooter}
    />
  );
};

export default SendOTPForm;
