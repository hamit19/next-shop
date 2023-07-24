"use client";

import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import Button from "../components/Button";
import TextField from "../components/inputs/TextField";
import { ReactSVGElement } from "react";

interface CustomFormProps {
  title?: string;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  subtitle?: string;
  formBody?: any;
  small?: boolean;
  icon?: any;
  action?: () => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  handleSubmit,
  subtitle,
  formBody,
  small,
  icon: Icon,
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
