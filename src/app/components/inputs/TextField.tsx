"use client";

interface TextFiledProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField: React.FC<TextFiledProps> = ({
  label,
  name,
  id,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <div className='relative flex flex-col w-full gap-2 '>
      <label className='pb-1 text-sm text-secondary-500' htmlFor={id}>
        {label}
      </label>
      <input
        className={`
        border
        border-white
        rounded-2xl
        hover:border-primary-300
        focus:border-primary-400
        focus:shadow-xl
        focus:bg-white
        transition
        p-4
        text-secondary-800
        outline-none
        bg-slate-100/90
      `}
        name={name}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
