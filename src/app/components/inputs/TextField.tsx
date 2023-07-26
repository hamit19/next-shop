"use client";

import { useCallback, useEffect, useRef } from "react";

interface TextFiledProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  center?: boolean;
  inputRefs?: HTMLInputElement[];
  value?: string | number;
  maxLength?: number;
}

const TextField: React.FC<TextFiledProps> = ({
  label,
  name,
  id,
  placeholder,
  type,
  onChange,
  center,
  inputRefs,
  value,
  maxLength,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current?.id.includes("digit")) {
      inputRefs?.push(inputRef.current);
    }
  }, [inputRefs]);

  return (
    <div className='relative flex flex-col w-full gap-2 '>
      <label className='pb-1 text-sm text-secondary-600' htmlFor={id}>
        {label}
      </label>
      <input
        className={`
        textField__input
        ${center && "text-center"}
      `}
        name={name}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        ref={inputRef}
        value={value}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextField;
