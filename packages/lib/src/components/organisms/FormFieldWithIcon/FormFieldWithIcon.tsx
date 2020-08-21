import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldWithIconProps {
  error?: FieldError;
  icon: JSX.Element;
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (Ref: any, validateRule?: any) => any;
  validate: {
    required?: boolean;
    validate?: (arg0: string) => string | void;
    minLength?: { value: number; message: string };
  };
  visible: boolean;
}

export const FormFieldWithIcon: React.FC<FormFieldWithIconProps> = ({
  error,
  icon,
  name,
  placeholder,
  register,
  validate,
  visible,
}) => {
  return (
    <div
      className={`${
        error ? 'inputError' : 'form-field-with-icon'
      } form-group d-flex flex-row justify-content-between align-items-center`}
    >
      <input
        name={name}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete="new-password"
        className={`flex-fill form-field-with-icon-input`}
        ref={register(validate)}
      />
      {icon}
    </div>
  );
};
