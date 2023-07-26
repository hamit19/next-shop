"use client";

import Button from "../components/Button";

interface CustomFormProps {
  title?: string;
  subtitle?: string;
  small?: boolean;
  formBody?: any;
  icon?: any;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  action?: () => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  subtitle,
  formBody,
  small,
  icon: Icon,
  handleSubmit,
  action,
}) => {
  return (
    <form className='flex flex-col w-full p-4 sm:max-w-md'>
      <h3 className='py-2 mt-2 mb-10 text-xl font-bold text-center text-secondary-900 '>
        {title}
      </h3>

      <div className='relative flex flex-col justify-center w-full h-full p-4 gap-7 '>
        <h5
          className={`
             mb-4
             text-secondary-600
             flex flex-row gap-3
             items-center
            ${small ? "text-sm" : "text-md"}
        `}
        >
          {subtitle}{" "}
          {Icon && (
            <Icon
              onClick={action}
              className='scale-75 cursor-pointer stroke-primary-900 hover:stroke-primary-600'
            />
          )}
        </h5>
        {formBody}

        <Button
          action={handleSubmit}
          label='Log in'
          buttonType={{ type: "submit" }}
        />
      </div>
    </form>
  );
};

export default CustomForm;
