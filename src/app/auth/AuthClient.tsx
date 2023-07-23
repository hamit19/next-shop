"use client";
import authSvg from "@/app/svgs/auth.svg";
import Button from "../components/Button";
import TextField from "../components/inputs/TextField";
import Image from "next/image";
import { useCallback, useState } from "react";

enum STEPS {
  ENTER_INFO = 0,
  VERIFY = 1,
}

const AuthClient = () => {
  const [step, setStep] = useState(STEPS.ENTER_INFO);
  const [inputValue, setInputValue] = useState("");

  const HandleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      // ! () ==> axios.post('localhost/api/opt',{...inputValue} )

      setStep(STEPS.VERIFY);
    },
    [inputValue]
  );

  if (step === STEPS.ENTER_INFO) {
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
          <div className='absolute inset-0 flex flex-col justify-center items-center lg:max-w-[400px] col-span-1 lg:h-[400px] bg-white rounded-2xl lg:translate-y-[40%] lg:mb-[50%]  lg:ml-[50%]'>
            <form className='flex flex-col w-full p-4 sm:max-w-md'>
              <h3 className='py-2 mt-2 mb-10 text-xl font-bold text-center text-secondary-900 '>
                Next Shop
              </h3>

              <div className='flex flex-col justify-center h-full p-4 gap-7 '>
                <h5 className='mb-4 text-secondary-600'>Login | Sing up</h5>
                <TextField
                  name='phone'
                  id='phone'
                  type='string'
                  label='Please enter your phone number or email'
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                  action={HandleSubmit}
                  label='Log in'
                  buttonType={{ type: "submit" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.VERIFY) {
    return <div className=''>testing</div>;
  }
};

export default AuthClient;
