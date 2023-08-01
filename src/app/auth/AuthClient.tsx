"use client";
import authSvg from "@/app/svgs/auth.svg";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BackArrow from "../svgs/icons/BackArrow";

import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOTP, getOTP } from "@/app/services/authServices";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";

enum STEPS {
  SEND_OTP = 0,
  CHECK_OTP = 1,
}

const RESEND_TIME = 90;

const AuthClient = () => {
  const [step, setStep] = useState<number>(STEPS.SEND_OTP);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(RESEND_TIME);

  const {
    isLoading: isLoadingSend,
    data: sendOtpResponse,
    mutateAsync: mutateSendOTP,
  } = useMutation({
    mutationFn: getOTP,
  });

  const { isLoading: isLoadingCheck, mutateAsync: mutateCheckOTP } =
    useMutation({ mutationFn: checkOTP });

  const emailHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const getOTPHandler = useCallback(
    (otp: string) => {
      setOTP(otp);
    },
    [setOTP]
  );

  const back = useCallback(() => {
    if (step !== STEPS.CHECK_OTP) return;

    setStep(step - 1);
  }, [step]);

  const sendOTPHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      try {
        const data = await mutateSendOTP({ email });

        toast.success(data?.data.message);

        setStep(STEPS.CHECK_OTP);
        setTime(RESEND_TIME);
        setOTP("");
      } catch (err: any) {
        toast.error(
          email.length >= 0
            ? "Please enter your email"
            : "Something went wrang, please try again!"
        );
      }
    },
    [email, mutateSendOTP]
  );

  const checkOTPHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        const data = await mutateCheckOTP({ email, otp: OTP });

        toast.success(data.message, {
          style: {
            fontSize: ".9rem",
          },
        });
      } catch (err: any) {
        toast.error(err.response.data.message);
      }

      setOTP("");
    },
    [OTP, email, mutateCheckOTP]
  );

  const renderSteps = () => {
    switch (step) {
      case STEPS.SEND_OTP:
        return (
          <SendOTPForm
            isLoading={isLoadingSend}
            sendOTPHandler={sendOTPHandler}
            emailHandler={emailHandler}
            key={"SendOTPForm"}
          />
        );

      case STEPS.CHECK_OTP:
        return (
          <CheckOTPForm
            isLoading={isLoadingCheck}
            checkOTPHandler={checkOTPHandler}
            getOTPHandler={getOTPHandler}
            resendOTPHandler={sendOTPHandler}
            back={back}
            sendOtpResponse={sendOtpResponse}
            key={"checkOTPForm"}
            otp={OTP}
            time={time}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className='absolute inset-0 bg-slate-100'>
      <div className='grid grid-cols-1 lg:grid-cols-8 '>
        <div className='hidden h-[100vh] rounded-r-[80px] lg:flex lg:items-center lg:justify-center col-span-5 bg-primary-900'>
          <div className='w-[500px] h-[500px] relative'>
            <Image
              fill
              objectFit='cover'
              blurDataURL={authSvg}
              src={authSvg}
              alt='auth svg'
            />
          </div>
        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center lg:max-w-[400px] col-span-1 lg:h-[450px] bg-white rounded-2xl lg:translate-y-[30%] lg:mb-[50%]  lg:ml-[50%]'>
          {step !== STEPS.SEND_OTP && (
            <div
              onClick={back}
              className='absolute rounded-sm cursor-pointer left-5 top-5'
            >
              <BackArrow className='transition stroke-primary-900 hover:stroke-primary-700' />
            </div>
          )}
          {renderSteps()}
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
