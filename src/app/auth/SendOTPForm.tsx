import TextField from "../components/inputs/TextField";
import CustomForm from "./CustomForm";

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

  return (
    <CustomForm
      title='Next Shop'
      subtitle='Login | Sign up'
      handleSubmit={sendOTPHandler}
      formBody={FormBody}
      loading={isLoading}
    />
  );
};

export default SendOTPForm;
