import AuthClient from "./AuthClient";

const AuthPage = () => {
  return <AuthClient />;
};

export default AuthPage;

// 1. creating a form that be able to get the user's phone number and send the OTP to user
// 2. create a form that be able to check the OTP
// how to send the requests ==>
// 1. use the axios
// 2. useFetch of react-query lib
