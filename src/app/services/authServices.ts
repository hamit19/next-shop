import http from "./httpService";

interface GetOTPParams {
  email: string;
}

interface CheckOTPParams {
  email: string;
  otp: string;
}

export const getOTP = (email: GetOTPParams) => {
  return http.post("/user/get-otp", email);
};

export const checkOTP = ({ email, otp }: CheckOTPParams) => {
  return http
    .post(`/user/check-otp`, {
      email,
      otp,
    })
    .then(({ data }) => data.data);
};
