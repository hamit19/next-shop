"use client";

interface ButtonProps {
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
  loading?: boolean;
  icon?: string;
  buttonType: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: "submit" | "reset" | "button" | undefined;
  };
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  action,
  label,
  loading,
  icon: Icon,
  buttonType,
  disabled,
}) => {
  return (
    <button
      type={buttonType.type || "button"}
      className={`
        bg-primary-900
        text-white
        font-medium 
        rounded-2xl
        py-4
        shadow-primary-600/40
        shadow-lg
        hover:bg-primary-800
        transition
        cursor-pointer
        disabled:bg-primary-400
        disabled:cursor-not-allowed
        flex
        flex-row
        gap-4
        items-center
        justify-center
        w-full
      `}
      onClick={action}
      disabled={disabled}
    >
      {label}

      {Icon && <Icon />}
    </button>
  );
};

export default Button;
