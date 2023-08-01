"use client";

import { useCallback, useEffect, useRef } from "react";

interface TextFiledProps {
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputRefs?: HTMLInputElement[];
  value?: string | number;
}

const TextField: React.FC<TextFiledProps> = ({
  label,
  name,
  id,
  placeholder,
  type,
  onChange,
  value,
}) => {
  return (
    <div className='relative flex flex-col w-full gap-2 '>
      <label className='pb-1 text-sm text-secondary-900' htmlFor={id}>
        {label}
      </label>
      <input
        className={`textField__input`}
        name={name}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
