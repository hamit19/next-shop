"use client";
import authSvg from "@/app/svgs/auth.svg";
import Image from "next/image";
import { useCallback, useState } from "react";
import CustomForm from "./CustomForm";
import TextField from "../components/inputs/TextField";
import BackArrow from "../svgs/icons/BackArrow";
import Edit from "../svgs/icons/Edit";

enum STEPS {
  ENTER_INFO = 0,
  VERIFY = 1,
}

type verificationCodeType = {
  digit1: number;
  digit2: number;
  digit3: number;
  digit4: number;
  digit5: number;
  digit6: number;
};

const initialVerificationCodeState = {
  digit1: 0,
  digit2: 0,
  digit3: 0,
  digit4: 0,
  digit5: 0,
  digit6: 0,
};

// todo ==> the auto focus on inputs should be handled!

const AuthClient = () => {
  let FormBody: any;
  const [step, setStep] = useState(STEPS.ENTER_INFO);
  const [inputValue, setInputValue] = useState("");
  const [verificationCode, setVerificationCode] = useState(
    initialVerificationCodeState
  );

  const inputRefs: HTMLInputElement[] = [];

  const handleSubmitInfo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      // todo () ==> axios.post('localhost/api/opt',{...inputValue} )

      setStep(STEPS.VERIFY);
    },
    []
  );

  const getInfoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const getVerificationCodeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerificationCode({
        ...verificationCode,
        [e.target.name]: e.target.value,
      } as Pick<verificationCodeType, keyof verificationCodeType>);
    },
    [verificationCode]
  );

  const back = useCallback(() => {
    if (step !== STEPS.VERIFY) return;

    setStep(step - 1);
  }, [step]);

  const handleSubmitVerificationCode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      const keys = Object.keys(verificationCode);
      //@ts-ignore
      const codesArray = keys.map((key) => verificationCode[key]);

      let code = codesArray.join("");

      // todo ==> axios.post(`localhost:5000/api/topCheck`, {...code})
    },
    [verificationCode]
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
        name='phone'
        id='phone'
        type='string'
        label='Please enter your phone number or email'
        onChange={getInfoHandler}
        value={inputValue}
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
            onChange={getVerificationCodeHandler}
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
            onChange={getVerificationCodeHandler}
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
            onChange={getVerificationCodeHandler}
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
            onChange={getVerificationCodeHandler}
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
            onChange={getVerificationCodeHandler}
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
            onChange={getVerificationCodeHandler}
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
        <div className='hidden h-[100vh] rounded-r-[80px] lg:flex  lg:items-center lg:justify-center col-span-5 bg-primary-900'>
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
            />
          ) : (
            <CustomForm
              title='Next Shop'
              subtitle={`Verification code has sent to ${"09014693924"} `}
              formBody={FormBody}
              small
              handleSubmit={handleSubmitVerificationCode}
              icon={Edit}
              action={back}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
