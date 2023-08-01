"use client";

interface CustomFormProps {
  title?: string;
  subtitle?: string;
  small?: boolean;
  formBody?: any;
  formFooter?: any;
  icon?: any;
  loading?: boolean;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  action?: () => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  subtitle,
  formBody,
  small,
  icon: Icon,
  action,
  formFooter,
}) => {
  return (
    <form className='flex flex-col w-full p-4 sm:max-w-md'>
      <h3 className='py-2 mt-2 mb-10 text-xl font-bold text-center text-secondary-900 '>
        {title}
      </h3>

      <div className='relative flex flex-col justify-center w-full h-full gap-6 p-4 '>
        <h5
          className={`
             mb-1
             text-secondary-800
             flex flex-row gap-3
             items-center
             leading-relaxed
            ${small ? "text-xs" : "text-md"}
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

        {small && <h5 className='font-bold text-md'>Enter verify code</h5>}

        {formBody}

        {formFooter}
      </div>
    </form>
  );
};

export default CustomForm;
