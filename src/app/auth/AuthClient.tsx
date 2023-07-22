"use client";

import Button from "../components/Button";
import TextField from "../components/inputs/TextField";

const AuthClient = () => {
  return (
    <div className='container'>
      <div className='grid grid-cols-1 lg:grid-cols-4 '>
        <div className='absolute inset-0 flex flex-col justify-center items-center lg:max-w-md col-span-1 lg:h-[400px] bg-white rounded-2xl lg:relative  lg:col-start-3 lg:col-end-5 '>
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
                label='Please enter you phone number'
              />

              <Button label='Log in' buttonType={{ type: "submit" }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
