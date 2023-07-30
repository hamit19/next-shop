"use client";
import authSvg from "@/app/svgs/auth.svg";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import CustomForm from "./CustomForm";
import TextField from "../components/inputs/TextField";
import BackArrow from "../svgs/icons/BackArrow";
import Edit from "../svgs/icons/Edit";
import http from "../services/httpService";
import { toast } from "react-hot-toast";

enum STEPS {
  ENTER_INFO = 0,
  VERIFY = 1,
}

type OTPType = {
  digit1: number;
  digit2: number;
  digit3: number;
  digit4: number;
  digit5: number;
  digit6: number;
};

const initialOTPState = {
  digit1: 0,
  digit2: 0,
  digit3: 0,
  digit4: 0,
  digit5: 0,
  digit6: 0,
};

// todo ==> the auto focus on inputs should be handled!

// todo ==> replace the OTP phone number verification with email verification OTP!

const AuthClient = () => {
  const [step, setStep] = useState(STEPS.VERIFY);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState(initialOTPState);
  const [loading, setLoading] = useState(false);

  let FormBody: any;

  const inputRefs: HTMLInputElement[] = [];

  const handleSubmitInfo = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      try {
        setLoading(true);
        const { data } = await http.post("/user/get-otp", {
          email,
        });
        toast.success(data.message);
        setStep(STEPS.VERIFY);
      } catch (err: any) {
        toast.error("Something went wrang, please try again!");
      }

      setLoading(false);
    },
    [email]
  );

  const getInfoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const getOTPHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOTP({
        ...OTP,
        [e.target.name]: e.target.value,
      } as Pick<OTPType, keyof OTPType>);
    },
    [OTP]
  );

  const back = useCallback(() => {
    if (step !== STEPS.VERIFY) return;

    setStep(step - 1);
  }, [step]);

  const handleSubmitOTP = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      setLoading(true);

      try {
        const keys = Object.keys(OTP);
        //@ts-ignore
        const codesArray = keys.map((key) => OTP[key]);

        let finalOTP = codesArray.join("");

        const { data } = await http.post(`/user/check-otp`, {
          email,
          otp: finalOTP,
        });

        toast.success(data.data.message, {
          style: {
            fontSize: ".9rem",
          },
        });
      } catch (err: any) {
        toast.error(err.response.data.message);
      }

      setLoading(false);
    },
    [OTP, email]
  );

  // useEffect(() => {
  //   inputRefs?.forEach((input) => {
  //     if (input.id === "digit1") {
  //       if (input.value.length < 1) {
  //         input.focus();
  //       }
  //     }

  //     input.addEventListener("keydown", (e) => {
  //       const num = Number(e.key);
  //       if (num && num >= 0 && num <= 9) {
  //         // Only allow numbers
  //         if (input.value.length >= input.maxLength) {
  //           e.preventDefault();
  //           focusNext();
  //         }
  //       }
  //     });
  //   });
  // }, []);

  // function focusNext() {
  //   if (inputRefs) {
  //     const currInput: any = document.activeElement;

  //     const currInputIndex: any = inputRefs?.indexOf(currInput);

  //     const nextInputIndex: number = (currInputIndex + 1) % inputRefs.length;

  //     const input = inputRefs?.[nextInputIndex];

  //     input.focus();
  //   }
  // }

  if (step === STEPS.ENTER_INFO) {
    FormBody = (
      <TextField
        name='email'
        id='email'
        type='string'
        label='Please enter your email'
        onChange={getInfoHandler}
        value={email}
      />
    );
  }

  if (step === STEPS.VERIFY) {
    FormBody = (
      <div className='flex flex-col gap-1'>
        <h5 className='text-md text-secondary-800'>
          Enter the verification code
        </h5>
        <div className='grid grid-cols-6 gap-1 '>
          <TextField
            key={"digit1"}
            onChange={getOTPHandler}
            center
            name='digit1'
            id='digit1'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit1}
          />

          <TextField
            key={"digit2"}
            onChange={getOTPHandler}
            center
            name='digit2'
            id='digit2'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit2}
          />

          <TextField
            key={"digit3"}
            onChange={getOTPHandler}
            center
            name='digit3'
            id='digit3'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit3}
          />

          <TextField
            key={"digit4"}
            onChange={getOTPHandler}
            center
            name='digit4'
            id='digit4'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit4}
          />

          <TextField
            key={"digit5"}
            onChange={getOTPHandler}
            center
            name='digit5'
            id='digit5'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit5}
          />

          <TextField
            key={"digit6"}
            onChange={getOTPHandler}
            center
            name='digit6'
            id='digit6'
            type='number'
            inputRefs={inputRefs}
            maxLength={1}
            // value={verificationCode.digit6}
          />
        </div>
      </div>
    );
  }

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
          {step !== STEPS.ENTER_INFO && (
            <div
              onClick={back}
              className='absolute rounded-sm cursor-pointer left-5 top-5'
            >
              <BackArrow className='transition stroke-primary-900 hover:stroke-primary-700' />
            </div>
          )}
          {step === STEPS.ENTER_INFO ? (
            <CustomForm
              title='Next Shop'
              subtitle='Login | Sign up'
              handleSubmit={handleSubmitInfo}
              formBody={FormBody}
              loading={loading}
            />
          ) : (
            <CustomForm
              title='Next Shop'
              subtitle={`Verification code has sent to ${email} `}
              formBody={FormBody}
              small
              handleSubmit={handleSubmitOTP}
              icon={Edit}
              action={back}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
